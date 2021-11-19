defmodule Homework.Companies do
  @moduledoc """
  The Companies context.
  """

  import Ecto.Query, warn: false
  alias Homework.Repo

  alias Homework.Transactions.Transaction
  alias Homework.Companies.Company


  @doc """
  Returns the list of companies.

  ## Examples

      iex> list_companies([])
      [%Company{}, ...]

  """
  def list_companies(_args) do
    Repo.all(Company)
      |> get_company_decimals()
  end

  # @doc """
  # Returns the list of users associated with a company.

  # ## Examples

  #     iex> list_users([])
  #     [%Company{}, ...]

  # """
  # def list_companies(_args) do
  #   Repo.all(Company)
  #     |> amount_to_decimal()
  # end

  @doc """
  Gets a single company.
  """
  def get_company!(id), do: Repo.get!(Company, id)

  @doc """
  Creates a company.
  """
  def create_company(%{name: name, credit_line: float_credit}) when is_float(float_credit) do
    %{name: name, credit_line: amount_to_integer(float_credit)}
      |> create_company()
  end

  def create_company(%{name: name, credit_line: credit}) do
    %Company{}
      |> Company.changeset(%{name: name, credit_line: credit, available_credit: credit})
      |> Repo.insert()
  end


  @doc """
  Updates a company.
  """
  def update_company(%Company{} = company, attrs = %{credit_line: credit}) do
    updated_available_credit = (credit - company.available_credit) + company.available_credit
    updated_attrs = %{attrs | available_credit: updated_available_credit}

    company
      |> Company.changeset(updated_attrs)
      |> Repo.update()
  end

  def update_company(%Company{} = company, attrs) do
    company
    |> Company.changeset(attrs)
    |> Repo.update()
  end



  @doc """
  Deletes a company.
  """
  def delete_company(%Company{} = company) do
    Repo.delete(company)
  end

  @doc """
  Converts value to a decimal
  """
  def amount_to_decimal(amount), do: amount / 100

  # def amount_to_decimal(amount), do: erlang.float_to_binary(amount, [decimals:2])



  @doc """
  Converts decimal to an int
  """
  # using trunc() will return the integer part of a number. Use round() if we want to round to nearest int.
  def amount_to_integer(amount), do: trunc(amount*100)

  @doc """
  Get Company by Id with decimal values


  # We want failure here to raise an exception
  """
  def get_company_decimals(%Company{} = company) do
    %{available_credit: avail, credit_line: credit} = company
    %{company | available_credit: amount_to_decimal(avail), credit_line: amount_to_decimal(credit)}
  end

  def get_company_decimals(%Company{} = company) do
    %{available_credit: avail, credit_line: credit} = company
    %{company | available_credit: amount_to_decimal(avail), credit_line: amount_to_decimal(credit)}
  end

  @doc """
  Subtract credit from company via Transaction
  """
  def subtract_credit(%{company_id: id, amount: amount}, %Transaction{} = transaction) do

    company = get_company!(id)
    updated_available_credit = company.available_credit - (amount - amount_to_integer(transaction.amount))

    update_company(company, %{available_credit: updated_available_credit})
  end

  @doc """
  Subtract credit from company from amount
  """
  def subtract_credit(%{company_id: id, amount: amount}) do

    company = get_company!(id)
    updated_available_credit = company.available_credit - amount

    update_company(company, %{available_credit: updated_available_credit})
  end

  def subtract_credit(_args), do: nil





end
