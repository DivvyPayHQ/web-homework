defmodule Homework.Repo.Migrations.AddCompanyIdToTransactionsTable do
  use Ecto.Migration

  def change do
    alter table(:transactions) do
      add(:company_id, references(:companies, type: :uuid, on_delete: :nothing))
    end
  end
end
