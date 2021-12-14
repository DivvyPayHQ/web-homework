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
end
