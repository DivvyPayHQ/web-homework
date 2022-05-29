defmodule Homework.Repo.Migrations.CreateCards do
  use Ecto.Migration

  def change do
    create table(:cards) do
      add :description, :string

      timestamps()
    end

  end
end
