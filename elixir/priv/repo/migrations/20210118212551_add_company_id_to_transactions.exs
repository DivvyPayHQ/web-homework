defmodule Homework.Repo.Migrations.AddCompanyIdToTransactions do
  use Ecto.Migration

  def change do
    alter table(:transactions) do
      add(:company_id, references(:companies, type: :uuid, on_delete: :delete_all), null: false)
    end

    create(index(:transactions, [:company_id]))
  end
end
