defmodule Homework.Shiren.Prices do
  use Ecto.Schema
  import Ecto.Changeset

  schema "price" do
    field :amount, :integer
    field :category, :string
    field :type, :string

    timestamps()
  end

  @doc false
  def changeset(prices, attrs) do
    prices
    |> cast(attrs, [:category, :amount, :type])
    |> validate_required([:category, :amount, :type])
  end
end
