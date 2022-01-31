defmodule Homework.Repo.Migrations.AlterUsers do
  use Ecto.Migration

  def change do
    alter table(:users, primary_key: false) do
       add(:company_id, references(:companies, type: :uuid, on_delete: :nothing), [null: false])
    end
  end
end