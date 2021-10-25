defmodule Homework.Companies do
  import Ecto.Query, warn: false
  alias Homework.Repo

  alias Homework.Companies.Company
  alias Homework.Transactions.Transaction

  def list_companies(_args) do
    Repo.all(Company)
      |> convert_company_to_decimal()
  end

  def get_company_formatted!(id) do
    company = get_company!(id)
    %{credit_line: credit, available_credit: avail} = company

    %{company | credit_line: convert_to_decimal(credit), available_credit: convert_to_decimal(avail)}
  end

  def get_company!(id) do
    Repo.get!(Company, id)
  end

  def create_company(%{name: name, credit_line: dec_credit}) when is_float(dec_credit) do
    %{name: name, credit_line: convert_to_integer(dec_credit)}
      |> create_company()
  end

  def create_company(%{name: name, credit_line: credit}) do
    %Company{}
      |> Company.changeset(%{name: name, credit_line: credit, available_credit: credit})
      |> Repo.insert()
  end

  def update_company(%Company{} = company, attrs = %{credit_line: credit}) do
    new_available_credit = (credit - company.available_credit) + company.available_credit
    updated_attrs = %{attrs | available_credit: new_available_credit}

    company
      |> Company.changeset(updated_attrs)
      |> Repo.update()
  end

  def update_company(%Company{} = company, attrs) do
    company
      |> Company.changeset(attrs)
      |> Repo.update()
  end

  def delete_company(%Company{} = company) do
    Repo.delete(company)
  end

  def reduce_credit(%{company_id: id, amount: amount}, %Transaction{} = transaction) do
    company = get_company!(id)
    new_available_credit = company.available_credit - (amount - convert_to_integer(transaction.amount))

    update_company(company, %{available_credit: new_available_credit})
  end

  def reduce_credit(%{company_id: id, amount: amount}) do
    company = get_company!(id)
    new_available_credit = company.available_credit - amount

    update_company(company, %{available_credit: new_available_credit})
  end

  def reduce_credit(_args), do: nil

  def convert_to_decimal(amount), do: amount / 100.0

  def convert_company_to_decimal(%Company{} = company) do
    %{available_credit: avail, credit_line: credit} = company
    %{company | available_credit: convert_to_decimal(avail), credit_line: convert_to_decimal(credit)}
  end

  def convert_to_integer(amount), do: trunc(amount * 100)
end
