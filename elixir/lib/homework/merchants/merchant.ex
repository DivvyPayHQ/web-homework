defmodule Homework.Merchants.Merchant do
  @moduledoc false
  import Ecto.Changeset
  use Ecto.Schema

  @fields [:description, :name]
  @primary_key {:id, :binary_id, autogenerate: true}
  @required_fields @fields
  @type t :: %__MODULE__{}

  schema "merchants" do
    field(:description, :string)
    field(:name, :string)

    timestamps()
  end

  @doc false
  @spec changeset(__MODULE__.t(), map()) :: Ecto.Changeset.t()
  def changeset(merchant, attrs) do
    merchant
    |> cast(attrs, @fields)
    |> validate_required(@required_fields)
  end
end
