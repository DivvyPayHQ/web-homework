defmodule :"Elixir.Homework.Repo.Migrations.Add-transaction-relation-company" do
  use Ecto.Migration


  def change do
    alter table(:transactions) do
      add(:company_id, references(:company, type: :uuid, on_delete: :nothing))
    end
  end
end
