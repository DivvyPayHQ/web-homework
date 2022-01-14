defmodule Homework.Repo.Migrations.CreateCompanies do
  use Ecto.Migration

  def up do
    create table(:companies, primary_key: false) do
      add(:id, :uuid, primary_key: true)
      add(:available_credit, :integer)
      add(:credit_line, :integer)
      add(:name, :string)

      timestamps()
    end

    alter table("transactions") do
      add(:company_id, references(:companies, type: :uuid, on_delete: :nothing))
    end

    alter table("users") do
      add(:company_id, references(:companies, type: :uuid, on_delete: :nothing))
    end

  end

  def down do
    drop table("companies")

    alter table("transactions") do
      remove :company_id
    end

    alter table("users") do
      remove :company_id
    end
  end
end
