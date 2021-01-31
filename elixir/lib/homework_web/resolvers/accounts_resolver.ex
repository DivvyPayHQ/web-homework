defmodule HomeworkWeb.Resolvers.AccountsResolver do
  alias Homework.Accounts

  @doc """
  Get a list of companies
  """
  def companies(_root, _args, _info) do
    {:ok, Accounts.list_companies()}
  end

  @doc """
  Creates a company
  """
  def create_company(_root, args, _info) do
    case Accounts.create_company(args) do
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
    company = Accounts.get_company!(id)

    case Accounts.update_company(company, args) do
      {:ok, company} ->
        {:ok, company}

      error ->
        {:error, "could not update company: #{inspect(error)}"}
    end
  end

  @doc """
  Deletes a company for an id
  """
  def delete_company(_root, %{id: id}, _info) do
    company = Accounts.get_company!(id)

    case Accounts.delete_company(company) do
      {:ok, company} ->
        {:ok, company}

      error ->
        {:error, "could not update company: #{inspect(error)}"}
    end
  end
end
