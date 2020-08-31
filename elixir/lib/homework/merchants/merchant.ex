defmodule Homework.Merchants.Merchant do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "merchants" do
    field(:description, :string)
    field(:name, :string)

    timestamps()
  end

  @doc false
  def changeset(merchant, attrs) do
    merchant
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
