defmodule Homework.Transactions.Transaction do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query
  alias Homework.Merchants.Merchant
  alias Homework.Users.User
  alias Homework.Companies.Company

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

  @doc false
  def changeset(transaction, attrs) do
    transaction
    |> cast(attrs, [:user_id, :amount, :debit, :description, :merchant_id, :company_id])
    |> validate_required([:user_id, :amount, :debit, :description, :merchant_id, :company_id])
    |> foreign_key_constraint(:company_id)
    |> prepare_changes(fn changeset ->
      debit = get_change(changeset, :debit)
      raw_amount = get_change(changeset, :amount)
      amount = if debit, do: raw_amount * -1, else: raw_amount

      if company_id = get_change(changeset, :company_id) do
        query = from(Company, where: [id: ^company_id])
        changeset.repo.update_all(query, inc: [available_credit: amount])
      end

      changeset
    end)
  end
end
