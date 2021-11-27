defmodule Homework.Repo.Migrations.AddCompanyIdToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :company_id, references(:company)
    end

    create index(:users, [:company_id])
  end
end
