defmodule Homework.Companies do
  @moduledoc """
  The Companies context
  """

  import Ecto.Query, warn: false
  alias Homework.Repo

  alias Homework.Companies.Company

  @doc """
  Returns a list of companies

  ## Examples

      iex> list_companies([])
      [%Company{}, ...]
  """
  def list_companies(_args) do
    Repo.all(Company)
  end

  @doc """
  Gets a single company

  Raises 'Ecto.NoResultsError' if the Company does not exist.any()

  ## Examples

      iex> get_company!(123)
      %Company{}

      iex> get_company!(456)
      ** (Ecto.NoResultsError)
  """
  def get_company!(id), do: Repo.get!(Company, id)

  @doc """
  Creates a company
  """
  def create_company(attrs \\ %{}) do
    %Company{}
    |> Company.changeset(attrs)
    |> Repo.insert()
  end
end
