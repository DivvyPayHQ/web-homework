defmodule Homework.Repo.Migrations.CreateCompanies do
  use Ecto.Migration

  def change do
    create table(:companies, primary_key: false) do
      add(:id, :uuid, primary_key: true)
      add(:name, :string, null: false)
      add(:credit_line, :integer, null: false, default: 0)

      timestamps()
    end

    create(unique_index(:companies, [:name]))
  end
end
