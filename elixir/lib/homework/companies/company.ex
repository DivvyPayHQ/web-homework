defmodule Homework.Companies.Company do
  @moduledoc false
  alias Homework.Transactions.Transaction
  import Ecto.Changeset
  use Ecto.Schema

  @fields [:available_credit, :credit_line, :name]
  @primary_key {:id, :binary_id, autogenerate: true}
  @required_fields @fields
  @type t :: %__MODULE__{}

  schema "companies" do
    field(:available_credit, :integer, default: 0)
    field(:credit_line, :integer)
    field(:name, :string)

    has_many(:transactions, Transaction)

    timestamps()
  end

  @doc false
  @spec changeset(__MODULE__.t(), map()) :: Ecto.Changeset.t()
  def changeset(transaction, attrs) do
    transaction
    |> cast(attrs, @fields)
    |> validate_required(@required_fields)
  end
end
