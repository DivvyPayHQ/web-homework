defmodule Homework.Companies do
  @moduledoc """
  The Companies context.
  """

  import Ecto.Query, warn: false
  alias Homework.Repo

  alias Homework.Companies.Company
  alias Homework.Transactions.Transaction

  @doc """
  Returns the list of companies.

  ## Examples

      iex> list_companies([])
      [%Company{}, ...]

  """
  @spec list_companies(List.t) :: List.t
  def list_companies(_args) do
    Repo.all(Company)
  end

  @doc """
  Gets a single company.

  Raises `Ecto.NoResultsError` if the company does not exist.

  ## Examples

      iex> get_company!(123)
      %Company{}

      iex> get_company!(456)
      ** (Ecto.NoResultsError)

  """
  @spec get_company!(:binary_id) :: Merchant.t
  def get_company!(id) do
    query =
      from c in Company,
        left_join: t in Transaction,
        on: t.company_id == c.id,
        select: %{c | available_credit: c.credit_line - sum(t.amount)},
        where: c.id == ^id,
        group_by: c.id
    Repo.one!(query)
  end

  @doc """
  Creates a company.

  ## Examples

      iex> create_company(%{field: value})
      {:ok, %Company{}}

      iex> create_company(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @spec create_company(Map.t) :: Map.t
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
  @spec update_company(Company, Map.t) :: Map.t
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
  @spec delete_company(Company) :: Map.t
  def delete_company(%Company{} = company) do
    Repo.delete(company)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking company changes.

  ## Examples

      iex> change_company(company)
      %Ecto.Changeset{data: %Company{}}

  """
  @spec change_company(Company, Map.t) :: Map.t
  def change_company(%Company{} = company, attrs \\ %{}) do
    Company.changeset(company, attrs)
  end

  @doc """
  Returns the company that match this name

  """
  @spec get_company_by_name(String.t) :: List.t
  def get_company_by_name(name) do
    Repo.one(from c in Company, where: c.name == ^name)
  end

end
