defmodule Homework.Transactions.Transaction do
  use Ecto.Schema
  import Ecto.Changeset
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
    belongs_to(:company, Company, type: :binary_id, foreign_key: :company_id)

    timestamps()
  end

  # handle nil test case, also transaction bug = no credit in validation (never gets set)
  def changeset(transaction, %{amount: amount } = attrs) when is_nil(amount) do
    transaction
    |> cast(attrs, [:user_id, :amount, :credit, :debit, :description, :merchant_id, :company_id])
    |> validate_required([:user_id, :amount, :credit, :debit, :description, :merchant_id, :company_id])
  end

  @doc false
  def changeset(transaction, %{amount: amount} = attrs) do
    amt =
      if amount |> Decimal.new() |> Decimal.to_string() |> String.contains?(".") do
        # there is decimal value we must respect
        amount |> Decimal.round(2) |> Decimal.mult(Decimal.new(100)) |> Decimal.to_integer()
      else
        amount |> Decimal.new() |> Decimal.to_integer()
  end

    attrs2 = %{attrs | amount: amt  }
    transaction
    |> cast(attrs2, [:user_id, :amount, :credit, :debit, :description, :merchant_id, :company_id])
    |> validate_required([:user_id, :amount, :credit, :debit, :description, :merchant_id, :company_id])
  end

  @doc false
  def changeset(transaction, attrs) do
    transaction
    |> cast(attrs, [:user_id, :amount, :credit, :debit, :description, :merchant_id, :company_id])
    |> validate_required([:user_id, :amount, :credit, :debit, :description, :merchant_id, :company_id])
  end

  def int_to_dec(amount) do
    Decimal.div(Decimal.new(amount), Decimal.new(100))
  end
end
