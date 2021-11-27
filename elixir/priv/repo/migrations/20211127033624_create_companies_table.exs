defmodule Homework.Repo.Migrations.CreateCompaniesTable do
  use Ecto.Migration

  def change do
    create table(:companies, primary_key: false) do
      add(:id, :uuid, primary_key: true)
      add(:name, :string, null: false)
      add(:credit_line, :integer, null: false)
      add(:availiable_credit, :integer, null: false)

      timestamps()
    end

    alter table(:transactions) do
      add(:company_id, references(:companies, type: :uuid, on_delete: :nothing))
    end
  end
end
