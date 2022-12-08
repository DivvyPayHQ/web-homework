defmodule Homework.Companies.Company do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "companies" do
    field(:name, :string)
    field(:credit_line, :integer)
    field(:available_credit, :integer)

    timestamps()
  end

  @doc false
  def changeset(company, attrs) do
    company
    |> cast(attrs, [:name, :available_credit, :credit_line])
    |> validate_required([:name, :available_credit, :credit_line])
  end

end
