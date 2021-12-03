defmodule Homework.Merchants.Merchant do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query

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

  def fuzzy_name_filter(query \\ Homework.Merchants.Merchant, name) do
    query
    |> where([m], fragment("? % ?", m.name, ^name))
  end
end
