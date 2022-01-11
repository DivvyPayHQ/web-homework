defmodule Homework.Transactions do
  @moduledoc """
  The Transactions context.
  """

  import Ecto.Query, warn: false
  alias Homework.Repo

  alias Homework.Transactions.Transaction
  alias Homework.Users.User
  alias Homework.Companies.Company

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
  Finds all transactions with an amount within a given range.

  ## Examples

      iex> find_transactions(123, 456)
      [%Transaction{}, ...]

  """
  def find_transactions(min, max) do
    query =
      from t in Transaction,
           where: t.amount >= ^min and t.amount <= ^max,
           select: t
    Repo.all(query)
  end

  @doc """
  Creates a transaction. Also updates the available credit for the
  company associated with the transaction.

  ## Examples

      iex> create_transaction(%{field: value})
      {:ok, %Transaction{}}

      iex> create_transaction(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_transaction(%{amount: amount, credit: credit, user_id: user_id} = attrs \\ %{}) do
    change_amount = (if credit, do: 1, else: -1) * amount

    query =
      from c in Company,
        join: u in User,
        on: c.id == u.company_id,
        where: u.id == ^user_id
    Repo.update_all(query, inc: [available_credit: change_amount])

    %Transaction{}
    |> Transaction.changeset(attrs)
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
    transaction
    |> Transaction.changeset(attrs)
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
