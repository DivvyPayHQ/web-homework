defmodule Homework.Transactions do
  @moduledoc """
  The Transactions context.
  """

  import Ecto.Query, warn: false
  alias Homework.Repo

  alias Homework.Transactions.Transaction

  @doc """
  Returns the list of transactions.

  ## Examples

      iex> list_transactions([])
      [%Transaction{}, ...]

  """
  def list_transactions(%{min: min, max: max}) do
    query = from t in Transaction, where: t.amount >= ^min and t.amount <= ^max
    Repo.all(query)
      |> Enum.map(&convert_transaction_to_decimal/1)
  end

  def list_transactions(_args) do
    Repo.all(Transaction)
      |> Enum.map(&convert_transaction_to_decimal/1)
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
  def get_transaction!(id) do
    transaction = Repo.get!(Transaction, id)
    %{amount: amount} = transaction

    %{transaction | amount: convert_to_decimal(amount)}
  end

  @doc """
  Creates a transaction.

  ## Examples

      iex> create_transaction(%{field: value})
      {:ok, %Transaction{}}

      iex> create_transaction(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_transaction(attrs \\ %{}) do
    %Transaction{}
    |> Transaction.changeset(attrs)
    |> Repo.insert()
  end

  def create_transaction(attrs = %{amount: dec_amount}) when is_float(dec_amount) do
    %{attrs | amount: convert_to_integer(dec_amount)}
      |> create_transaction()
  end

  def convert_to_decimal(amount), do: amount / 100.0

  def convert_transaction_to_decimal(%Transaction{} = transaction) do
    %{amount: amount} = transaction
    %{transaction | amount: convert_to_decimal(amount)}
  end

  def convert_to_integer(amount), do: trunc(amount * 100)

  @doc """
  Updates a transaction.

  ## Examples

      iex> update_transaction(transaction, %{field: new_value})
      {:ok, %Transaction{}}

      iex> update_transaction(transaction, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_transaction(%Transaction{} = transaction, attrs) do
    transaction
    |> Transaction.changeset(attrs)
    |> Repo.update()
  end

  def update_transaction(%Transaction{} = transaction, attrs = %{amount: dec_amount}) when is_float(dec_amount) do
    %{attrs | amount: convert_to_integer(dec_amount)}
      |> update_transaction(attrs)
  end

  @doc """
  Deletes a transaction.

  ## Examples

      iex> delete_transaction(transaction)
      {:ok, %Transaction{}}

      iex> delete_transaction(transaction)
      {:error, %Ecto.Changeset{}}

  """
  def delete_transaction(%Transaction{} = transaction) do
    Repo.delete(transaction)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking transaction changes.

  ## Examples

      iex> change_transaction(transaction)
      %Ecto.Changeset{data: %Transaction{}}

  """
  def change_transaction(%Transaction{} = transaction, attrs \\ %{}) do
    Transaction.changeset(transaction, attrs)
  end
end
