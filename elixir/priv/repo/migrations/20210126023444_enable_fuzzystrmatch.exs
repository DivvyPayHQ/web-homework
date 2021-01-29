defmodule Homework.Repo.Migrations.EnableFuzzystrmatch do
  use Ecto.Migration

  def up do
    execute "CREATE EXTENSION IF NOT EXISTS fuzzystrmatch"
  end
end
