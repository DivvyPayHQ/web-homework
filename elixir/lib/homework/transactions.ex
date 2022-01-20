defmodule Homework.Transactions do
  @moduledoc """
  The Transactions context.
  """

  alias Homework.Repo
  alias Homework.Transactions.{FilterTransactions, SearchTransactionsByMaxMin, Transaction}
  import Ecto.Query, warn: false

  ##########################################
  ### Batching for nested graphql schemas
  ##########################################
  def batch_company_transactions(company_ids) do
    Transaction
    |> where([t], t.company_id in ^company_ids)
    |> Repo.all()
    |> Enum.group_by(& &1.company_id, & &1)
  end

  ##########################################
  ### Transactions queries
  ##########################################
  defdelegate filter_transactions(params), to: FilterTransactions, as: :call
  defdelegate search_transactions_by_max_min(params), to: SearchTransactionsByMaxMin, as: :call

  @doc """
  Returns the list of transactions.

  ## Examples

      iex> list_transactions()
      [%Transaction{}, ...]

  """
  @spec list_transactions(map()) :: [Transaction.t()]
  def list_transactions(params \\ %{}), do: filter_transactions(params)

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking transaction changes.

  ## Examples

      iex> change_transaction(transaction)
      %Ecto.Changeset{data: %Transaction{}}

  """
  @spec change_transaction(Transaction.t(), map()) :: Ecto.Changeset.t()
  def change_transaction(%Transaction{} = transaction, attrs \\ %{}),
    do: Transaction.changeset(transaction, attrs)

  @doc """
  Creates a transaction.

  ## Examples

      iex> create_transaction(%{field: value})
      {:ok, %Transaction{}}

      iex> create_transaction(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @spec create_transaction(map()) :: {:ok, Transaction.t()} | {:error, Ecto.Changeset.t()}
  def create_transaction(attrs \\ %{}) do
    %Transaction{}
    |> Transaction.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Deletes a transaction.

  ## Examples

      iex> delete_transaction(transaction)
      {:ok, %Transaction{}}

      iex> delete_transaction(transaction)
      {:error, %Ecto.Changeset{}}

  """
  @spec delete_transaction(Transaction.t()) ::
          {:ok, Transaction.t()} | {:error, Ecto.Changeset.t()}
  def delete_transaction(%Transaction{} = transaction) do
    transaction
    |> Transaction.deletion_changeset()
    |> Repo.delete()
  end

  @doc """
  Gets a single transaction.

  Raises `Ecto.NoResultsError` if the Transaction does not exist.

  ## Examples

      iex> get_transaction!(123)
      %Transaction{}

      iex> get_transaction!(456)
      ** (Ecto.NoResultsError)

  """
  @spec get_transaction!(String.t()) :: Transaction.t()
  def get_transaction!(id), do: get_transaction_by!(id: id)

  @doc """
  Gets a single transaction by the provided attribute(s).

  Raises `Ecto.NoResultsError` if the Transaction does not exist.
  Raises `Ecto.MultipleResultsError` if more than one entry.

  ## Examples

      iex> get_transaction_by!(id: 123)
      %Transaction{}

      iex> get_transaction_by!(id: 456)
      ** (Ecto.NoResultsError)

  """
  @spec get_transaction_by!(Keyword.t()) :: Transaction.t()
  def get_transaction_by!(opts), do: Repo.get_by!(Transaction, opts)

  @doc """
  Updates a transaction.

  ## Examples

      iex> update_transaction(transaction, %{field: new_value})
      {:ok, %Transaction{}}

      iex> update_transaction(transaction, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @spec update_transaction(Transaction.t(), map()) ::
          {:ok, Transaction.t()} | {:error, Ecto.Changeset.t()}
  def update_transaction(%Transaction{} = transaction, attrs) do
    transaction
    |> Transaction.changeset(attrs)
    |> Repo.update()
  end
end
