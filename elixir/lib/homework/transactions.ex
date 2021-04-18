defmodule Homework.Transactions do
  @moduledoc """
  The Transactions context.
  """

  import Ecto.Query, warn: false
  alias Homework.Repo

  alias Homework.Transactions.Transaction
  alias Homework.Merchants.Merchant
  alias Homework.Users.User

  @doc """
  Returns the list of transactions.

  ## Examples

      iex> list_transactions([])
      [%Transaction{}, ...]

  """
  def list_transactions(_args) do
    Repo.all(Transaction)
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
  def get_transaction!(id), do: Repo.get!(Transaction, id)

  @doc """
  Creates a transaction.

  ## Examples

      iex> create_transaction(%{field: value})
      {:ok, %Transaction{}}

      iex> create_transaction(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_transaction(attrs \\ %{}) do

    #IO.puts("** In create_trasaction. Here is attrs as passed in:") # TODO: remove debug outputs
    #IO.inspect(attrs)
    amount2 = Money.parse(attrs.amount, :USD, attrs) #parses dollars and cents into an integer
    tuple = elem(amount2, 1) #gets the amount out of the tuple
    int_money = tuple.amount # assigns the amount
    #IO.inspect(int_money)
    attrs2 = %{amount: int_money, credit: attrs.credit, debit: attrs.debit, 
              description: attrs.description, merchant_id: attrs.merchant_id, user_id: attrs.user_id}
    #Map.put(attrs, :amount, int_money)  # change attrs with the new money integer value why didn't this work?  
    #IO.inspect(attrs2)
    transaction = %Transaction{}
    |> Transaction.changeset(attrs2)
    |> Repo.insert()
    
  end

  @doc """
  Updates a transaction.

  ## Examples

      iex> update_transaction(transaction, %{field: new_value})
      {:ok, %Transaction{}}

      iex> update_transaction(transaction, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_transaction(%Transaction{} = transaction, attrs) do
    amount2 = Money.parse(attrs.amount, :USD, attrs) #parses dollars and cents into an integer
    tuple = elem(amount2, 1) #gets the amount out of the tuple
    int_money = tuple.amount # assigns the amount
    attrs2 = %{amount: int_money, credit: attrs.credit, debit: attrs.debit, 
              description: attrs.description, merchant_id: attrs.merchant_id, user_id: attrs.user_id}
    transaction
    |> Transaction.changeset(attrs2)
    |> Repo.update()
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
