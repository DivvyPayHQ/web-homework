defmodule Homework.Companies.Company do
  use Ecto.Schema
  import Ecto.Changeset

  alias Homework.Transactions.Transaction
  alias Homework.Users.User

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "companies" do
    field(:name, :string)
    field(:credit_line, :integer)
    field(:available_credit, :integer)

    # has_many(:transactions, Transaction, foreign_key: :id)
    # has_many(:users, User, foreign_key: :id)

    timestamps()
  end

  @doc false
  def changeset(company, attrs) do
    company
    |> cast(attrs, [:name, :credit_line, :available_credit])
    |> validate_required([:name, :credit_line, :available_credit])
  end

  # def credit_validation(changeset, field, options \\ []) do

end
