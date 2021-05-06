defmodule Homework.Companies do
  @moduledoc """
  The Companies context.
  Companies are clients of Divvy; Users belong to a company,
  and make purchases from Merchants.
  """

  import Ecto.Query, warn: false
  alias Homework.Repo

  alias Homework.Companies.Company

  @doc "The list of companies, optionally filtered by name"
  def list_companies(args)

  # Fuzzy search companies by name, just like merchants.
  # Requires a matching initial character (case-insensitive),
  # then orders results by Levenshtein distance.
  def list_companies(%{named_like: search_name})
      when is_binary(search_name) and search_name != "" do
    start_character = String.first(search_name)

    from(
      c in Company,
      where: ilike(c.name, ^"#{start_character}%"),
      where: fragment("SIMILARITY(?, ?) > 0", c.name, ^search_name),
      order_by: fragment("LEVENSHTEIN(?, ?)", c.name, ^search_name)
    )
    |> Repo.all()
  end

  def list_companies(_args) do
    Repo.all(Company)
  end

  @doc """
  Gets a single company.
  Raises `Ecto.NoResultsError` if the Company does not exist.
  """
  def get_company!(id), do: Repo.get!(Company, id)

  @doc """
  Creates a company.
  Returns either {:ok, %Company{}} or {:error, %Ecto.Changeset{}.
  """
  def create_company(attrs \\ %{}) do
    %Company{}
    |> Company.changeset_write(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a company.
  Returns either {:ok, %Company{}} or {:error, %Ecto.Changeset{}.
  """
  def update_company(%Company{} = company, attrs) do
    company
    |> Company.changeset_write(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a company.
  Returns either {:ok, %Company{}} or {:error, %Ecto.Changeset{}.
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
    Company.changeset_write(company, attrs)
  end
end
