defmodule Homework.Repo.Migrations.AddTransactionsDebitCreditConstraint do
  use Ecto.Migration

  def up do
    create(
      constraint(
        :transactions,
        :debit_credit_xor,
        check: "(debit <> credit) and (debit or credit)"
      )
    )
  end

  def down do
    execute(
      "ALTER TABLE transactions DROP CONSTRAINT debit_credit_xor"
    )
  end
end
