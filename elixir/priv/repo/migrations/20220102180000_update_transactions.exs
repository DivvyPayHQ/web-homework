defmodule Homework.Repo.Migrations.CreateTransactions do
    use Ecto.Migration
  
    def change do
      alter table(:transactions) do
        add(:company_id, references(:companies, type: :uuid, on_delete: :nothing))
      end
      flush()
    end
  end
  