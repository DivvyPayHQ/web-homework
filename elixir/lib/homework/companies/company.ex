defmodule Homework.Companies.Company do
  use Ecto.Schema
  import Ecto.{Changeset, Query}
  alias Homework.Transactions

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "companies" do
    field(:credit_line, :integer, default: 0)
    field(:name, :string)
    field(:available_credit, :integer)

    timestamps()
  end

  @doc false
  def changeset(company, attrs) do
    company
    |> cast(attrs, [:name, :credit_line])
    |> validate_required([:name, :credit_line])
    |> validate_length(:name, max: 255)
    |> unique_constraint(:name)
  end

  @doc false
  def insert_changeset(company, attrs) do
    company
    |> changeset(attrs)
    |> set_available_credit()
  end

  @doc false
  def update_changeset(company, attrs) do
    company
    |> changeset(attrs)
    |> prepare_changes(fn changeset ->
      credit_line_change = Map.get(changeset.changes, :credit_line)

      if credit_line_change do
        query = from(Company, where: [id: ^company.id])

        # TODO: set available_credit ?
      end

      changeset
    end)
  end

  defp set_available_credit(changeset) do
    credit_line = get_field(changeset, :credit_line)
    put_change(changeset, :available_credit, credit_line)
  end
end
