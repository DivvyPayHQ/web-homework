defmodule Homework.Companies.Company do
use Ecto.Schema
  import Ecto.Changeset

  alias Homework.Transactions.Transaction

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "companies" do
    field(:name, :string)
    field(:credit_line, :float)
    field(:available_credit, :float, virtual: true)

    timestamps()
  end

  @doc false
  def changeset(company, attrs) do
    company
    |> cast(attrs, [:name, :credit_line])
    |> validate_required([:name, :credit_line])
  end


end
