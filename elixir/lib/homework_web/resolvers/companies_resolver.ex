defmodule HomeworkWeb.Resolvers.CompaniesResolver do

  alias Homework. Companies

  @doc """
  Get a list of companies
  """
  def companies(_root, args, _info) do
    {:ok, Companies.list_companies(args)}
  end

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
end
