defmodule HomeworkWeb.Resolvers.CompaniesResolver do
  @moduledoc false
  alias Absinthe.Resolution.Helpers
  alias Homework.{Companies, Transactions, Users}

  @doc """
  Get a list of companies
  """
  def companies(_root, args, _info), do: {:ok, Companies.list_companies(args)}

  @doc """
  Get an existing company
  """
  def company(_root, %{id: id}, _info) do
    {:ok, Companies.get_company!(id)}
  rescue
    Ecto.NoResultsError -> {:error, "could not get company: no result"}
  end

  @doc """
  Get the transactions associated with a company
  """
  def transactions(company, _args, _info),
    do:
      Helpers.batch({__MODULE__, :batch_company_transactions}, company.id, fn batch_results ->
        {:ok, Map.get(batch_results, company.id, [])}
      end)

  def batch_company_transactions(_, company_ids),
    do: Transactions.batch_company_transactions(company_ids)

  @doc """
  Get the users associated with a company
  """
  def users(company, _args, _info),
    do:
      Helpers.batch({__MODULE__, :batch_company_users}, company.id, fn batch_results ->
        {:ok, Map.get(batch_results, company.id, [])}
      end)

  def batch_company_users(_, company_ids), do: Users.batch_company_users(company_ids)

  @doc """
  Create a new company
  """
  def create_company(_root, args, _info) do
    case Companies.create_company(args) do
      {:ok, company} ->
        {:ok, company}

      error ->
        {:error, "could not create company: #{inspect(error)}"}
    end
  end

  @doc """
  Deletes a company for an id
  """
  def delete_company(_root, args, _info) do
    with {:ok, company} <- company(%{}, args, %{}),
         {:ok, _company} = res <- Companies.delete_company(company) do
      res
    else
      error ->
        {:error, "could not delete company: #{inspect(error)}"}
    end
  end

  @doc """
  Updates a company for an id with args specified.
  """
  def update_company(_root, args, _info) do
    with {:ok, company} <- company(%{}, args, %{}),
         {:ok, _company} = res <- Companies.update_company(company, args) do
      res
    else
      error ->
        {:error, "could not update company: #{inspect(error)}"}
    end
  end
end
