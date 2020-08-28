defmodule Homework.Repo.Migrations.CreateMerchants do
  use Ecto.Migration

  def change do
    create table(:merchants, primary_key: false) do
      add(:id, :uuid, primary_key: true)
      add(:name, :string)
      add(:description, :string)

      timestamps()
    end
  end
end
