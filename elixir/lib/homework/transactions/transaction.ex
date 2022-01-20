defmodule Homework.Transactions.Transaction do
  @moduledoc false
  alias Homework.Companies.Company
  alias Homework.Merchants.Merchant
  alias Homework.Repo
  alias Homework.Users.User
  import Ecto.Changeset
  import Ecto.Query, warn: false
  use Ecto.Schema

  @fields [:amount, :company_id, :credit, :debit, :description, :merchant_id, :user_id]
  @primary_key {:id, :binary_id, autogenerate: true}
  @required_fields @fields
  @type t :: %__MODULE__{}

  schema "transactions" do
    field(:amount, :integer)
    field(:credit, :boolean, default: false)
    field(:debit, :boolean, default: false)
    field(:description, :string)

    belongs_to(:company, Company, type: :binary_id, foreign_key: :company_id)
    belongs_to(:merchant, Merchant, type: :binary_id, foreign_key: :merchant_id)
    belongs_to(:user, User, type: :binary_id, foreign_key: :user_id)

    timestamps()
  end

  @doc false
  @spec changeset(__MODULE__.t(), map()) :: Ecto.Changeset.t()
  def changeset(transaction, attrs) do
    transaction
    |> cast(attrs, @fields)
    |> validate_required(@required_fields)
    |> prepare_changes(&dont_allow_updated_company_id/1)
    |> prepare_changes(&handle_company_available_credit/1)
  end

  @doc false
  @spec deletion_changeset(__MODULE__.t()) :: Ecto.Changeset.t()
  def deletion_changeset(transaction) do
    transaction
    |> change()
    |> prepare_changes(&handle_company_available_credit/1)
  end

  # could possibly address in a database constraint :thinking
  defp dont_allow_updated_company_id(
         %{
           action: :update,
           changes: %{company_id: c_company_id},
           data: %{company_id: d_company_id},
           valid?: true
         } = changeset
       ) do
    if c_company_id != d_company_id do
      add_error(
        changeset,
        :company_id,
        "cannot update company_id for a transaction"
      )
    else
      changeset
    end
  end

  defp dont_allow_updated_company_id(changeset), do: changeset

  defp handle_company_available_credit(%{action: action, valid?: true} = changeset) do
    company_id = get_field(changeset, :company_id)

    %{
      credit_line: credit_line,
      transactions_count: transactions_count,
      transactions_sum: transactions_sum
    } =
      Company
      |> join(:left, [c], t in assoc(c, :transactions))
      |> where([c], c.id == ^company_id)
      |> group_by([c], c.id)
      |> select([c, t], %{
        credit_line: c.credit_line,
        transactions_count: count(t.id),
        transactions_sum: sum(t.amount)
      })
      |> Repo.one()

    amount = get_field(changeset, :amount)

    transactions_sum =
      if is_nil(transactions_sum) && transactions_count == 0, do: 0, else: transactions_sum

    available_credit =
      case action do
        :delete ->
          credit_line - (transactions_sum - amount)

        :update ->
          old_amount = changeset.data.amount
          credit_line - (transactions_sum + amount) - old_amount

        _ ->
          credit_line - (transactions_sum + amount)
      end

    Company
    |> from(where: [id: ^company_id])
    |> changeset.repo.update_all(set: [available_credit: available_credit])

    changeset
  end

  defp handle_company_available_credit(changeset), do: changeset
end
