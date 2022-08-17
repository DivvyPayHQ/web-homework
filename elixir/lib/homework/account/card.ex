defmodule Homework.Account.Card do
  use Ecto.Schema
  import Ecto.Changeset

  schema "cards" do
    field :description, :string

    timestamps()
  end

  @doc false
  def changeset(card, attrs) do
    card
    |> cast(attrs, [:description])
    |> validate_required([:description])
  end
end
