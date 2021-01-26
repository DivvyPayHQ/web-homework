defmodule Homework.Repo.Migrations.AddTidsToAllTables do
  use Ecto.Migration

  def change do
    alter table(:merchants), do: add :tid, :string
    alter table(:transactions), do: add :tid, :string
    alter table(:users), do: add :tid, :string
  end
end
