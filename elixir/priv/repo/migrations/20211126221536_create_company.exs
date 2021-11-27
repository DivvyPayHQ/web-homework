defmodule Homework.Repo.Migrations.CreateCompany do
  use Ecto.Migration

  def change do
    create table(:company) do
      add :name, :string
      add :credit_line, :integer
      add :available_credit, :integer

      timestamps()
    end

  end
end
