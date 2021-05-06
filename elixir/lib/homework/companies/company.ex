defmodule Homework.Companies.Company do
  @moduledoc """
  An individual company.
  Companies are clients of Divvy; Users belong to a company,
  and make purchases from Merchants.
  """
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "companies" do
    field(:name, :string)
    field(:credit_line, :integer)

    # Available credit is a denormalization of
    # credit_line - sum(company transaction amounts).
    # This prevents us from having to sum potentially
    # thousands of transaction records every time we
    # query a company or (even worse!) make a query
    # over all companies be O(n^2).
    field(:available_credit, :integer)

    timestamps()
  end

  @doc """
  Because of the available_credit field (which is read-only from the
  perspective of the app---internal Postgres functions keep it up-to-
  date with the transaction register---we have one function read
  changesets and another for creations & updates.
  """
  def changeset_read(company, attrs) do
    company
    |> cast(attrs, [:name, :credit_line, :available_credit])
    |> validate_required([:name, :credit_line, :available_credit])
  end

  def changeset_write(company, attrs) do
    company
    |> cast(attrs, [:name, :credit_line])
    |> validate_required([:name, :credit_line])
  end
end
