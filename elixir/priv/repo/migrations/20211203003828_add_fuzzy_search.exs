defmodule Homework.Repo.Migrations.AddFuzzySearch do
  use Ecto.Migration

  def change do
    execute "CREATE EXTENSION pg_trgm;", ""
  end
end
