defmodule Homework.Repo.Migrations.CreateCompanies do
  use Ecto.Migration

  def change do
    create table(:companies, primary_key: false) do
      add(:id, :uuid, primary_key: true)
      add(:available_credit, :integer)
      add(:credit_line, :integer)
      add(:name, :string)
      add(:tid, :string)

      timestamps()
    end

    alter table(:users) do
      add(:company_id, references(:companies, type: :uuid, on_delete: :nothing))
    end

    alter table(:transactions) do
      add(:company_id, references(:companies, type: :uuid, on_delete: :nothing))
    end
  end
end
