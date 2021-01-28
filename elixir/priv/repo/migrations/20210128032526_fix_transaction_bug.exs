defmodule Homework.Repo.Migrations.FixTransactionBug do
  use Ecto.Migration
  import Ecto.Query

  def up do
    alter table(:transactions) do
      add :is_debit, :bool
    end

    flush()

    from(transaction in "transactions",
      update: [set: [is_debit: transaction.debit == true]],
    ) |> Homework.Repo.update_all([])

    flush()

    alter table(:transactions) do
      remove :debit
      remove :credit
    end
  end

  def down do
    alter table(:transactions) do
      add :debit, :bool
      add :credit, :bool
    end

    flush()

    from(transaction in "transactions",
    update: [set: [
      debit: transaction.is_debit == true,
      credit: transaction.is_debit == false
      ]],
  ) |> Homework.Repo.update_all([])


  alter table(:transactions) do
    remove :is_debit
  end
end
end
