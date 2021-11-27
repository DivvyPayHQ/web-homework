defmodule Homework.Companies.Company do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "companies" do
    field(:name, :string)
    field(:credit_line, :integer)
    field(:availiable_credit, :integer)

    timestamps()
  end

  def changeset(company, attrs) do
    company
    |> cast(attrs, [:name, :credit_line, :availiable_credit])
    |> validate_required([:name, :credit_line, :availiable_credit])
  end

  def avail_credit_changeset(company, %{amount: amount} = attrs) do
    company
    |> cast(attrs, [:availiable_credit])
    |> change(availiable_credit: company.availiable_credit - convert_to_int(amount))
    |> validate_required([:availiable_credit])
  end

  def avail_credit_changeset(company, transaction, %{amount: new_amount} = attrs) do
    company
    |> cast(attrs, [:availiable_credit])
    |> change(availiable_credit: company.availiable_credit - (convert_to_int(new_amount) - transaction.amount))
    |> validate_required([:availiable_credit])
  end

  def delete_trans_changeset(company, transaction) do
    company
    |> change(availiable_credit: company.availiable_credit + transaction.amount)
    |> validate_required([:availiable_credit])
  end

  def convert_to_int(number) do
    Decimal.new(number)
    |> Decimal.to_integer()
  end
end
