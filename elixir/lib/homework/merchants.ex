defmodule Homework.Merchants do
  @moduledoc """
  The Merchants context.
  """

  import Ecto.Query, warn: false
  alias Homework.Repo

  alias Homework.Merchants.Merchant

  @doc """
  Returns the list of merchants.

  ## Examples

      iex> list_merchants([])
      [%Merchant{}, ...]

  """
  @spec list_merchants(List.t) :: List.t
  def list_merchants(_args) do
    Repo.all(Merchant)
  end

  @doc """
  Gets a single merchant.

  Raises `Ecto.NoResultsError` if the Merchant does not exist.

  ## Examples

      iex> get_merchant!(123)
      %Merchant{}

      iex> get_merchant!(456)
      ** (Ecto.NoResultsError)

  """
  @spec get_merchant!(:binary_id) :: Merchant.t
  def get_merchant!(id), do: Repo.get!(Merchant, id)

  @doc """
  Creates a merchant.

  ## Examples

      iex> create_merchant(%{field: value})
      {:ok, %Merchant{}}

      iex> create_merchant(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @spec create_merchant(Map.t) :: Map.t
  def create_merchant(attrs \\ %{}) do
    %Merchant{}
    |> Merchant.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a merchant.

  ## Examples

      iex> update_merchant(merchant, %{field: new_value})
      {:ok, %Merchant{}}

      iex> update_merchant(merchant, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @spec update_merchant(Merchant, Map.t) :: Map.t
  def update_merchant(%Merchant{} = merchant, attrs) do
    merchant
    |> Merchant.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a merchant.

  ## Examples

      iex> delete_merchant(merchant)
      {:ok, %Merchant{}}

      iex> delete_merchant(merchant)
      {:error, %Ecto.Changeset{}}

  """
  @spec delete_merchant(Merchant) :: Map.t
  def delete_merchant(%Merchant{} = merchant) do
    Repo.delete(merchant)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking merchant changes.

  ## Examples

      iex> change_merchant(merchant)
      %Ecto.Changeset{data: %Merchant{}}

  """
  @spec change_merchant(Merchant, Map.t) :: Map.t
  def change_merchant(%Merchant{} = merchant, attrs \\ %{}) do
    Merchant.changeset(merchant, attrs)
  end

  @doc """
  Returns the merchant that match this name

  """
  @spec get_merchant_by_name(String.t) :: List.t
  def get_merchant_by_name(name) do
    Repo.one(from m in Merchant, where: m.name == ^name)
  end

  @doc """
  Fuzzy Search by name and return all merchants that partially or totally match

  """
  @spec get_merchant_by_fuzzy(String.t) :: List.t
  def get_merchant_by_fuzzy(partial_or_complete_match) do
    partial_or_complete_match = "%" <> partial_or_complete_match <> "%"
    Repo.all(from m in Merchant,
     where: like(m.name, ^partial_or_complete_match))
  end
end
