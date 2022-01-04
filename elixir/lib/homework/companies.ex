defmodule Homework.Companies do
  @moduledoc """
  The Companies context.
  """

  import Ecto.Query, warn: false
  alias Homework.Repo

  alias Homework.Companies.Company

  @doc """
  Returns the list of companies.

  ## Examples

      iex> list_companies()
      [%Company{}, ...]

  """
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
    attrs = apply_available_credit(attrs)

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
    attrs = apply_available_credit(company, attrs)

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
  Returns a list of companies by fuzzy search on the name using the Levenshtein algorithm.

  ## Examples

      iex> search_companies(name, max_distance)
      [%Company{}, ...]

  """
  def search_companies(name, max_distance) do
    query = from company in Company,
      where: fragment("levenshtein(?, ?)", company.name, ^name) <= ^max_distance
    Repo.all(query)
  end

  @doc """
  Apply available credit for inserts.

  ## Examples

      iex> apply_available_credit(attrs)
      attrs

  """
  def apply_available_credit(attrs) when map_size(attrs) == 0 do attrs end
  def apply_available_credit(%{credit_line: credit_line} = attrs) when is_nil(credit_line) do attrs end
  def apply_available_credit(%{credit_line: credit_line} = attrs) when not is_nil(credit_line) do
    apply_available_credit(attrs, credit_line, 0)
  end

  @doc """
  Apply available credit for updates by difference between new and existing credit_line values.

  ## Examples

      iex> apply_available_credit(company, attrs)
      attrs

  """
  def apply_available_credit(%Company{} = _company, %{credit_line: credit_line, available_credit: _available_credit} = attrs) when is_nil(credit_line) do attrs end
  def apply_available_credit(%Company{} = company, %{credit_line: credit_line} = attrs) when not is_nil(credit_line) do
    difference = credit_line - company.credit_line
    apply_available_credit(attrs, company.available_credit, difference)
  end
  def apply_available_credit(%Company{} = _company, attrs) do attrs end

  @doc """
  Apply available credit by adding the amount to the available_credit.

  ## Examples

      iex> apply_available_credit(attrs, available_credit, amount)
      attrs

  """
  def apply_available_credit(attrs, available_credit, amount) do
    attrs |> Map.put(:available_credit, available_credit + amount)
  end

  @doc """
  Apply available credit by the transaction amount.

  Note: Amount may be positive for addition and negative for subtraction.

  ## Examples

      iex> apply_available_credit_amount(id, amount)
      {:ok, %Company{}}

  """
  def apply_available_credit_amount(id, amount) do
    company = Repo.get!(Company, id)
    available_credit = company.available_credit + amount
    attrs = %{available_credit: available_credit}
    update_company(company, attrs)
  end
end
