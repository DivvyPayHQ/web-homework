defmodule Homework.Companies do
  @moduledoc """
  The Companies context.
  """

  alias Homework.Companies.{Company, FilterCompanies, SearchCompaniesByName}
  alias Homework.Repo
  import Ecto.Query, warn: false

  ##########################################
  ### Batching for nested graphql schemas
  ##########################################
  def where_id_in(company_ids) do
    %{id_in: company_ids}
    |> filter_companies()
    |> Enum.group_by(& &1.id, & &1)
  end

  ##########################################
  ### Companies queries
  ##########################################
  defdelegate filter_companies(params), to: FilterCompanies, as: :call
  defdelegate search_companies_by_name(params), to: SearchCompaniesByName, as: :call

  @doc """
  Returns the list of companies.

  ## Examples

      iex> list_companies()
      [%Company{}, ...]

  """
  @spec list_companies(map()) :: [Company.t()]
  def list_companies(params \\ %{}), do: filter_companies(params)

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking Company changes.

  ## Examples

      iex> change_company(company)
      %Ecto.Changeset{data: %Company{}}

  """
  @spec change_company(Company.t(), map()) :: Ecto.Changeset.t()
  def change_company(%Company{} = company, attrs \\ %{}), do: Company.changeset(company, attrs)

  @doc """
  Creates a company.

  ## Examples

      iex> create_company(%{field: value})
      {:ok, %Company{}}

      iex> create_company(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @spec create_company(map()) :: {:ok, Company.t()} | {:error, Ecto.Changeset.t()}
  def create_company(attrs \\ %{}) do
    %Company{}
    |> Company.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Deletes a company.

  ## Examples

      iex> delete_company(company)
      {:ok, %Company{}}

      iex> delete_company(company)
      {:error, %Ecto.Changeset{}}

  """
  @spec delete_company(Company.t()) :: {:ok, Company.t()} | {:error, Ecto.Changeset.t()}
  def delete_company(%Company{} = company), do: Repo.delete(company)

  @doc """
  Gets a single company.

  Raises `Ecto.NoResultsError` if the Company does not exist.

  ## Examples

      iex> get_company!(123)
      %Company{}

      iex> get_company!(456)
      ** (Ecto.NoResultsError)

  """
  @spec get_company!(String.t()) :: Company.t()
  def get_company!(id), do: get_company_by!(id: id)

  @doc """
  Gets a single company by the provided attribute(s).

  Raises `Ecto.NoResultsError` if the Company does not exist.
  Raises `Ecto.MultipleResultsError` if more than one entry.

  ## Examples

      iex> get_company_by!(id: 123)
      %Company{}

      iex> get_company_by!(id: 456)
      ** (Ecto.NoResultsError)

  """
  @spec get_company_by!(Keyword.t()) :: Company.t()
  def get_company_by!(opts), do: Repo.get_by!(Company, opts)

  @doc """
  Updates a Company.

  ## Examples

      iex> update_company(company, %{field: new_value})
      {:ok, %Company{}}

      iex> update_company(company, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @spec update_company(Company.t(), map()) :: {:ok, Company.t()} | {:error, Ecto.Changeset.t()}
  def update_company(%Company{} = company, attrs) do
    company
    |> Company.changeset(attrs)
    |> Repo.update()
  end
end
