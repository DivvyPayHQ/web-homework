defmodule Homework.Repo.Migrations.UpdateTransactionsTable do
  use Ecto.Migration

  def change do
    alter table(:transactions) do
      add :date, :date
      modify :amount, :float
    end
  end
end
