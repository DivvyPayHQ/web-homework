defmodule Homework.Merchants do
  @moduledoc """
  The Merchants context.
  """

  alias Homework.Repo
  alias Homework.Merchants.{FilterMerchants, Merchant, SearchMerchantsByName}
  import Ecto.Query, warn: false

  ##########################################
  ### Batching for nested graphql schemas
  ##########################################
  def batch_transaction_merchant(merchant_ids) do
    Merchant
    |> where([m], m.id in ^merchant_ids)
    |> Repo.all()
    |> Enum.group_by(& &1.id, & &1)
  end

  ##########################################
  ### Merchant queries
  ##########################################
  defdelegate filter_merchants(params), to: FilterMerchants, as: :call
  defdelegate search_merchants_by_name(params), to: SearchMerchantsByName, as: :call

  @doc """
  Returns the list of merchants.

  ## Examples

      iex> list_merchants()
      [%Merchant{}, ...]

  """
  @spec list_merchants(map()) :: [Merchants.t()]
  def list_merchants(params \\ %{}), do: filter_merchants(params)

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking merchant changes.

  ## Examples

      iex> change_merchant(merchant)
      %Ecto.Changeset{data: %Merchant{}}

  """
  @spec change_merchant(Merchant.t(), map()) :: Ecto.Changeset.t()
  def change_merchant(%Merchant{} = merchant, attrs \\ %{}),
    do: Merchant.changeset(merchant, attrs)

  @doc """
  Creates a merchant.

  ## Examples

      iex> create_merchant(%{field: value})
      {:ok, %Merchant{}}

      iex> create_merchant(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @spec create_merchant(map()) :: {:ok, Merchant.t()} | {:error, Ecto.Changeset.t()}
  def create_merchant(attrs \\ %{}) do
    %Merchant{}
    |> Merchant.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Deletes a merchant.

  ## Examples

      iex> delete_merchant(merchant)
      {:ok, %Merchant{}}

      iex> delete_merchant(merchant)
      {:error, %Ecto.Changeset{}}

  """
  @spec delete_merchant(Merchant.t()) :: {:ok, Merchant.t()} | {:error, Ecto.Changeset.t()}
  def delete_merchant(%Merchant{} = merchant), do: Repo.delete(merchant)

  @doc """
  Gets a single merchant.

  Raises `Ecto.NoResultsError` if the Merchant does not exist.

  ## Examples

      iex> get_merchant!(123)
      %Merchant{}

      iex> get_merchant!(456)
      ** (Ecto.NoResultsError)

  """
  @spec get_merchant!(String.t()) :: Merchant.t()
  def get_merchant!(id), do: get_merchant_by!(id: id)

  @doc """
  Gets a single merchant by the provided attribute(s).

  Raises `Ecto.NoResultsError` if the Merchant does not exist.
  Raises `Ecto.MultipleResultsError` if more than one entry.

  ## Examples

      iex> get_merchant_by!(id: 123)
      %Merchant{}

      iex> get_merchant_by!(id: 456)
      ** (Ecto.NoResultsError)

  """
  @spec get_merchant_by!(Keyword.t()) :: Merchant.t()
  def get_merchant_by!(opts), do: Repo.get_by!(Merchant, opts)

  @doc """
  Updates a merchant.

  ## Examples

      iex> update_merchant(merchant, %{field: new_value})
      {:ok, %Merchant{}}

      iex> update_merchant(merchant, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @spec update_merchant(Merchant.t(), map()) :: {:ok, Merchant.t()} | {:error, Ecto.Changeset.t()}
  def update_merchant(%Merchant{} = merchant, attrs) do
    merchant
    |> Merchant.changeset(attrs)
    |> Repo.update()
  end
end
