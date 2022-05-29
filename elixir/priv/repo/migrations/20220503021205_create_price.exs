defmodule Homework.Repo.Migrations.CreatePrice do
  use Ecto.Migration

  def change do
    create table(:price) do
      add :category, :string
      add :amount, :integer
      add :type, :string

      timestamps()
    end

  end
end
