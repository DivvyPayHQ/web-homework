defmodule Homework.Companies.Company do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query
  alias Homework.Transactions.Transaction
  alias Homework.Users.User

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "companies" do
    field :credit_line, :integer
    field :name, :string

    has_many :transactions, Transaction
    has_many :users, User

    timestamps()
  end

  @doc false
  def changeset(company, attrs) do
    company
    |> cast(attrs, [:name, :credit_line])
    |> validate_required([:name, :credit_line])
  end

  def companies_query(query \\ Homework.Companies.Company, company_ids) do
    query
    |> where([c], c.id in ^company_ids)
  end

  def companies_available_credit_query(query \\ Homework.Companies.Company) do
    query
    |> join(:inner, [c], t in Transaction, on: t.company_id == c.id)
    |> group_by([c], c.id)
    |> select([c, t], {c.id, sum(t.amount)})
  end
end
