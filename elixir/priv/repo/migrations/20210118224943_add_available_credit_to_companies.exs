defmodule Homework.Repo.Migrations.AddAvailableCreditToCompanies do
  use Ecto.Migration

  def up do
    alter table(:companies) do
      add(:available_credit, :integer, null: false, default: 0)
    end

    execute("""
    update companies
    set available_credit = credit_line - comp_transactions.transaction_total
    from (
      select company_id, sum(comp_transactions_by_debit.amount) transaction_total
        from (
          select
            company_id,
            case when debit = true then sum(amount) else -sum(amount) end amount
          from transactions
          group by company_id, debit
        ) comp_transactions_by_debit
      group by company_id
    ) comp_transactions
    WHERE  id = comp_transactions.company_id
    """)
  end

  def down do
    alter table(:companies) do
      remove(:available_credit)
    end
  end
end
