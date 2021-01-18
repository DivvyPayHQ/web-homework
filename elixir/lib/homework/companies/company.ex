defmodule Homework.Companies.Company do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "companies" do
    field(:credit_line, :integer, default: 0)
    field(:name, :string)

    timestamps()
  end

  @doc false
  def changeset(company, attrs) do
    company
    |> cast(attrs, [:name, :credit_line])
    |> validate_required(:name)
    |> validate_length(:name, max: 255)
    |> unique_constraint(:name)
  end
end
