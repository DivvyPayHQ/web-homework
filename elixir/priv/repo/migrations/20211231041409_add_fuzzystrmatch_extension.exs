defmodule Homework.Repo.Migrations.AddFuzzystrmatchExtension do
  use Ecto.Migration

  def up do
    execute "CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;"
  end

  def down do
    execute "DROP EXTENSION IF EXISTS fuzzystrmatch;"
  end
end
