defmodule Homework.Merchants do
  @moduledoc """
  The Merchants context.
  """

  import Ecto.Query, warn: false
  alias Homework.Repo

  alias Homework.Merchants.Merchant

  @spec list_merchants(map) :: list(%Merchant{})
  @doc """
  Returns the list of merchants.

  ## Examples

      iex> list_merchants([])
      [%Merchant{}, ...]

  """
  def list_merchants(_args) do
    Repo.all(Merchant)
  end

  @spec get_merchant!(Ecto.UUID.t()) :: %Merchant{}
  @doc """
  Gets a single merchant.

  Raises `Ecto.NoResultsError` if the Merchant does not exist.

  ## Examples

      iex> get_merchant!(123)
      %Merchant{}

      iex> get_merchant!(456)
      ** (Ecto.NoResultsError)

  """
  def get_merchant!(id), do: Repo.get!(Merchant, id)

  @spec create_merchant(map) :: {:ok, %Merchant{}}
  @doc """
  Creates a merchant.

  ## Examples

      iex> create_merchant(%{field: value})
      {:ok, %Merchant{}}

      iex> create_merchant(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_merchant(attrs \\ %{}) do
    %Merchant{}
    |> Merchant.changeset(attrs)
    |> Repo.insert()
  end

  @spec update_merchant(%Merchant{}, map) :: {:ok, %Merchant{}}
  @doc """
  Updates a merchant.

  ## Examples

      iex> update_merchant(merchant, %{field: new_value})
      {:ok, %Merchant{}}

      iex> update_merchant(merchant, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_merchant(%Merchant{} = merchant, attrs) do
    merchant
    |> Merchant.changeset(attrs)
    |> Repo.update()
  end

  @spec delete_merchant(%Merchant{}) :: {:ok, %Merchant{}}
  @doc """
  Deletes a merchant.

  ## Examples

      iex> delete_merchant(merchant)
      {:ok, %Merchant{}}

      iex> delete_merchant(merchant)
      {:error, %Ecto.Changeset{}}

  """
  def delete_merchant(%Merchant{} = merchant) do
    Repo.delete(merchant)
  end

  @spec change_merchant(
          %Merchant{},
          :invalid | %{optional(:__struct__) => none, optional(atom | binary) => any}
        ) :: Ecto.Changeset.t()
  @doc """
  Returns an `%Ecto.Changeset{}` for tracking merchant changes.

  ## Examples

      iex> change_merchant(merchant)
      %Ecto.Changeset{data: %Merchant{}}

  """
  def change_merchant(%Merchant{} = merchant, attrs \\ %{}) do
    Merchant.changeset(merchant, attrs)
  end

  @spec search_merchants(String.t(), integer) :: list(%Merchant{})
  @doc """
  Returns a list of merchants by fuzzy search on the name using the Levenshtein algorithm.

  ## Examples

      iex> search_merchants(name, max_distance)
      [%Merchant{}, ...]

  """
  def search_merchants(name, max_distance) do
    query = from merchant in Merchant,
      where: fragment("levenshtein(?, ?)", merchant.name, ^name) <= ^max_distance
    Repo.all(query)
  end
end
