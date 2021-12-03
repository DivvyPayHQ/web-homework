defmodule Homework.Transactions.Transaction do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query
  alias Homework.Merchants.Merchant
  alias Homework.Users.User

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "transactions" do
    field(:amount, :integer)
    field(:credit, :boolean, default: false)
    field(:debit, :boolean, default: false)
    field(:description, :string)

    belongs_to(:merchant, Merchant, type: :binary_id, foreign_key: :merchant_id)
    belongs_to(:user, User, type: :binary_id, foreign_key: :user_id)

    timestamps()
  end

  @doc false
  def changeset(transaction, attrs) do
    transaction
    |> cast(attrs, [:user_id, :amount, :debit, :description, :merchant_id])
    |> validate_required([:user_id, :amount, :debit, :description, :merchant_id])
  end

  def min_filter(query \\ Homework.Transactions.Transaction, min) do
    where(query, [t], t.amount > ^min)
  end

  def max_filter(query \\ Homework.Transactions.Transaction, max) do
    where(query, [t], t.amount < ^max)
  end
end