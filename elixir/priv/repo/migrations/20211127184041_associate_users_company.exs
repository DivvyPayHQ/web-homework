defmodule Homework.Repo.Migrations.AssociateUsersCompany do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :company_id, references(:company, type: :uuid, on_delete: :nothing)
    end
  end
end
