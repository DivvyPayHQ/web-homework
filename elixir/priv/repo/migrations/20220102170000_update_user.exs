defmodule Homework.Repo.Migrations.CreateUsers do
    use Ecto.Migration
  
    def change do
      alter table(:users) do
        add(:company_id, references(:companies, type: :uuid, on_delete: :nothing))
      end
      flush()
    end
  end
  