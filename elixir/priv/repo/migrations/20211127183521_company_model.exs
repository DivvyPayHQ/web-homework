defmodule Homework.Repo.Migrations.CompanyModel do
  use Ecto.Migration

  def change do
    create table(:company, primary_key: false) do
      add(:id, :uuid, primary_key: true)
      add(:credit_line, :integer)
      add(:available_credit, :integer)
      add(:name, :string)
    timestamps()
    end

  end
end
