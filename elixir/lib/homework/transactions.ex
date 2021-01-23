defmodule Homework.Transactions do
  @moduledoc """
  The Transactions context.
  """

  import Ecto.Query, warn: false
  import Ecto.Changeset, only: [change: 2]
  import Homework.Utils

  alias Homework.Repo

  alias Homework.Transactions.Transaction
  alias Homework.Companies.Company

  @doc """
  Returns the list of transactions.

  ## Examples

      iex> list_transactions([])
      [%Transaction{}, ...]

  """
  def list_transactions(_args) do
    query = from t in Homework.Transactions.Transaction
    min = if _args[:min], do: _args[:min]
    max = if _args[:max], do: _args[:max]
    query = if not is_nil(min), do: (from t in query, where: t.amount >= ^min), else: query
    query = if not is_nil(max), do: (from t in query, where: t.amount <= ^max), else: query
    query = paginate_query(query, _args)
    Repo.all(query)
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
    {:ok, result} = Repo.transaction(fn ->
      {:ok, transaction} = %Transaction{}
      |> Transaction.changeset(attrs)
      |> Repo.insert()

      company_update = update_company(transaction)
      transaction
    end)

    {:ok, result}
  end

  def update_company(transaction) do
    query = from t in Homework.Transactions.Transaction,
                 where: t.company_id == ^transaction.company_id

    amount = Repo.aggregate(query, :sum, :amount)
    company = Repo.get!(Company, transaction.company_id)
    company_update = Repo.update!(change(company, available_credit: company.credit_line - amount))
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
    {:ok, result} = Repo.transaction(fn ->
      {:ok, transaction} = transaction
                           |> Transaction.changeset(attrs)
                           |> Repo.insert()

      company_udpate = update_company(transaction)
      transaction
    end)

    {:ok, result}
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
    {:ok, result} = Repo.transaction(fn ->
      {:ok, transaction} = Repo.delete(transaction)
      company_update = update_company(transaction)
      transaction
    end)

    {:ok, result}
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
