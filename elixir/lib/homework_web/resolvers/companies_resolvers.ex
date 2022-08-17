defmodule HomeworkWeb.Resolvers.CompaniesResolver do
  alias Homework.Companies

  @doc """
  Get a list of companies 
  """
  def companies(_root, args, _info) do
    {:ok, Companies.list_company(args)}
  end

  @doc """
  Creates a companies 
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
  Updates a company for an id with args specified.
  """
  def update_company(_root, %{id: id} = args, _info) do
    company = Companies.get_company!(id)
    !(id)

    case Companies.update_company(company, args) do
      {:ok, company} ->
        {:ok, company}

      error ->
        {:error, "could not update company: #{inspect(error)}"}
    end
  end

  @doc """
  Deletes a user for an id
  """
  def delete_company(_root, %{id: id}, _info) do
    company  = Companies.get_company!(id)

    case Companies.delete_company(company) do
      {:ok, company } ->
        {:ok, company }

      error ->
        {:error, "could not update company: #{inspect(error)}"}
    end
  end
end
