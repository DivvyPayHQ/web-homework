defmodule Homework.Companies do
  @moduledoc """
  The Companies context.
  """

  import Ecto.Query, warn: false

  alias Homework.Repo
  alias Homework.Companies.Company
  alias Homework.Transactions.Transaction
  alias Homework.Users.User

  @doc """
  Returns the list of companies.

  ## Examples

      iex> list_companies([])
      [%Company{}, ...]

  """
  def list_companies(%{name: _name} = args) do
    Repo.all_by_fuzzy_strings([args], Company)
  end

  def list_companies(_args) do
    Repo.all(Company)
  end

  @doc """
  Gets a single company.

  Raises `Ecto.NoResultsError` if the Company does not exist.

  ## Examples

      iex> get_company!(123)
      %Company{}

      iex> get_company!(456)
      ** (Ecto.NoResultsError)

  """
  def get_company!(id), do: Repo.get!(Company, id)

  @doc """
  Creates a company.

  ## Examples

      iex> create_company(%{field: value})
      {:ok, %Company{}}

      iex> create_company(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_company(attrs \\ %{}) do
    %Company{}
    |> Company.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a company.

  ## Examples

      iex> update_company(company, %{field: new_value})
      {:ok, %Company{}}

      iex> update_company(company, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_company(%Company{} = company, attrs) do
    company
    |> Company.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a company.

  ## Examples

      iex> delete_company(company)
      {:ok, %Company{}}

      iex> delete_company(company)
      {:error, %Ecto.Changeset{}}

  """
  def delete_company(%Company{} = company) do
    Repo.delete(company)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking company changes.

  ## Examples

      iex> change_company(company)
      %Ecto.Changeset{data: %Company{}}

  """
  def change_company(%Company{} = company, attrs \\ %{}) do
    Company.changeset(company, attrs)
  end

  @doc """
    Gets the available credit for one or more companies by calculating the total number or transactions against the companies credit line.
  """
  # TODO: There's got to be a better way to manage this then calculating every single transaction
  def get_available_credit([] = companies) when is_list(companies) do
    []
  end

  def get_available_credit([h | t] = companies) when is_list(companies) do
    [ get_available_credit(h) | get_available_credit(t)]
  end

  def get_available_credit(company) do
    {_transactions, total} = related_transactions(company.id) |> Enum.map_reduce(0, fn transaction, total -> {transaction, total + transaction.amount} end)
    available_credit = company.credit_line - total
    IO.puts("total: #{available_credit}")
    IO.puts("available credit: #{available_credit}")
    Map.update(company, :available_credit, available_credit, fn _existing_value -> available_credit end)
  end

  defp related_transactions(company_id) do
    from(
      t in Transaction,
      join: u in User, on: u.id == t.user_id and field(u, :company_id) == ^company_id
    )
    |> Repo.all()
  end
end
