defmodule Homework.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add(:id, :uuid, primary_key: true)
      add(:first_name, :string)
      add(:last_name, :string)
      add(:dob, :string)

     # add(:transaction_id, references(:transactions, type: :uuid, on_delete: :nothing))

      timestamps()
    end
  end
end
