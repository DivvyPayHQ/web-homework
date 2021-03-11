defmodule Homework.Repo.Migrations.AddCategoryIdColumnToTransactions do
  use Ecto.Migration

  def change do
    alter table("transactions") do
      add(:category_id, references(:categories, type: :uuid, on_delete: :nothing))
    end
  end
end
