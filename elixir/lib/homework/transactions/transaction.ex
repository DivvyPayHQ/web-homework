defmodule Homework.Transactions.Transaction do
  use Ecto.Schema
  import Ecto.Changeset
  alias HomeworkWeb.Categories.Category
  alias Homework.Companies.Company
  alias Homework.Merchants.Merchant
  alias Homework.Users.User

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "transactions" do
    field(:amount, :integer)
    field(:credit, :boolean, default: false)
    field(:debit, :boolean, default: false)
    field(:description, :string)

    belongs_to(:category, Category, type: :binary_id, foreign_key: :category_id)
    belongs_to(:company, Company, type: :binary_id, foreign_key: :company_id)
    belongs_to(:merchant, Merchant, type: :binary_id, foreign_key: :merchant_id)
    belongs_to(:user, User, type: :binary_id, foreign_key: :user_id)

    timestamps()
  end

  @doc false
  def changeset(transaction, attrs) do
    transaction
    |> cast(attrs, [:amount, :category_id, :company_id, :debit, :description, :merchant_id, :user_id])
    |> validate_required([:amount, :category_id, :company_id, :debit, :description, :merchant_id, :user_id])
  end
end
