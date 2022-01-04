defmodule Homework.Merchants.Merchant do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "merchants" do
    field(:description, :string)
    field(:name, :string)

    timestamps()
  end

  @spec changeset(
          {map, map}
          | %{
              :__struct__ => atom | %{:__changeset__ => map, optional(any) => any},
              optional(atom) => any
            },
          :invalid | %{optional(:__struct__) => none, optional(atom | binary) => any}
        ) :: Ecto.Changeset.t()
  @doc false
  def changeset(merchant, attrs) do
    merchant
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
