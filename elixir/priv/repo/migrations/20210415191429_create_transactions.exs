defmodule Homework.Repo.Migrations.CreateTransactions do
  use Ecto.Migration

  def change do
    create table(:transactions, primary_key: false) do
      add(:id, :uuid, primary_key: true)
      add(:amount, :integer)
      add(:credit, :boolean, default: false, null: false)
      add(:debit, :boolean, default: false, null: false)
      add(:description, :string)
      add(:user_id, references(:users, type: :uuid, on_delete: :nothing))
      add(:merchant_id, references(:merchants, type: :uuid, on_delete: :nothing))

      timestamps()
    end
  end
end
