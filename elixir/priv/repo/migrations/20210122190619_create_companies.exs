defmodule Homework.Repo.Migrations.CreateCompanies do
  use Ecto.Migration

  def change do
    create table(:companies, primary_key: false) do
      add(:id, :uuid, primary_key: true)
      add :name, :string
      add :credit_line, :integer
      add :available_credit, :integer

      timestamps()
    end

    alter table(:transactions) do
      add(:company_id, references(:companies, type: :uuid, on_delete: :nothing))
    end

    alter table(:users) do
      add(:company_id, references(:companies, type: :uuid, on_delete: :nothing))
    end
  end
end
