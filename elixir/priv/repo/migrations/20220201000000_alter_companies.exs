defmodule Homework.Repo.Migrations.AlterUsers do
  use Ecto.Migration

  def change do
    alter table(:companies) do
      remove :available_credit
    end
  end
end