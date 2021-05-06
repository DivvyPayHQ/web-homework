defmodule Homework.Repo.Migrations.AddAvailableCreditView do
  use Ecto.Migration

  # This uses an "eager materialized view" for scalability; that is, a
  # computed table, whose rows we update when a transaction occurs that
  # would affect a given company's available credit.
  #
  # Denormalization like this is... not something I'd do lightly (you
  # really, really have to be confident you're maintaining the invariants
  # you *think* you have!), but when you frequently need a computed value
  # that depends on tens or even hundred thousands of rows (sums of
  # transaction amounts in this case), it very well may be the best option.
  # A standard view could be thousands of times slower at that scale.
  #
  # https://hashrocket.com/blog/posts/materialized-view-strategies-using-postgresql
  def up do
    # Initialize available credit to the full value of the credit line
    execute("""
    create function company_insert() returns trigger
      security definer
      language plpgsql
    as $$
      begin
        if new.credit_line!=new.available_credit then
          new.available_credit=new.credit_line;
        end if;
        return new;
      end;
    $$;
    """)

    execute("""
    create trigger company_insert before insert on companies
        for each row execute procedure company_insert();
    """)

    # Update available credit when the company's credit line changes
    execute("""
    create function credit_line_change()
      returns trigger
      security definer
      language plpgsql
    as $$
      begin
        if old.credit_line!=new.credit_line then
          update companies
          set available_credit=
            old.available_credit + new.credit_line - old.credit_line
          where id=new.id;
        end if;
        return new;
      end;
    $$;
    """)

    execute("""
    create trigger credit_line_change after update on companies
        for each row execute procedure credit_line_change();
    """)

    # The trigger to update available credit any time a transaction
    # is created, updated, or deleted
    execute("""
    create function refresh_available_credit(_company_id uuid)
      returns void
      security definer
      language sql
    as $$
      update companies
      set available_credit=
        coalesce((
          select
            companies.credit_line - sum(case
              when debit then amount
              else -amount
            end)
          from transactions
          where companies.id=_company_id
            and transactions.updated_at <= current_timestamp
        ), 0)
      where id=_company_id;
    $$;
    """)

    # Refresh available credit whenever a transaction is created
    execute("""
    create function transaction_insert() returns trigger
      security definer
      language plpgsql
    as $$
      begin
        perform refresh_available_credit(new.company_id);
        return new;
      end;
    $$;
    """)

    execute("""
    create trigger transaction_insert after insert on transactions
        for each row execute procedure transaction_insert();
    """)

    # Updating on transaction deletion is really only for testing...
    # if you're deleting transactions in production, what on earth
    # are you doing?!
    execute("""
    create function transaction_delete()
      returns trigger
      security definer
      language plpgsql
    as $$
      begin
        perform refresh_available_credit(old.company_id);
        return old;
      end;
    $$;
    """)

    execute("""
    create trigger transaction_delete after delete on transactions
        for each row execute procedure transaction_delete();
    """)

    # Again, updating available credit on transaction update is probably testing-only
    execute("""
    create function transaction_update()
      returns trigger
      security definer
      language plpgsql
    as $$
      begin
        if old.company_id!=new.company_id then
          perform refresh_available_credit(old.company_id);
        end if;

        perform refresh_available_credit(new.company_id);
        return new;
      end;
    $$;
    """)

    execute("""
    create trigger transaction_update after update on transactions
        for each row execute procedure transaction_update();
    """)

    # Finally, initialize the available credit rows for existing
    # companies.
    execute("""
    select refresh_available_credit(id)
    from companies;
    """)
  end

  def down do
    # Ehhhh?
  end
end
