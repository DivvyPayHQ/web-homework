defmodule Homework.Transactions do
  @moduledoc """
  The Transactions context.
  """

  import Ecto.Query, warn: false
  alias Homework.Repo

  alias Homework.Transactions.Transaction
  alias Homework.Companies

  @spec list_transactions(map) :: list(%Transaction{})
  @doc """
  Returns the list of transactions.

  ## Examples

      iex> list_transactions([])
      [%Transaction{}, ...]

  """
  def list_transactions(_args) do
    Repo.all(Transaction)
  end

  @spec get_transaction!(Ecto.UUID.t()) :: %Transaction{}
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

  @spec create_transaction(map) :: {:ok, %Transaction{}}
  @doc """
  Creates a transaction.

  ## Examples

      iex> create_transaction(%{field: value})
      {:ok, %Transaction{}}

      iex> create_transaction(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_transaction(attrs \\ %{}) do
    apply_available_credit(attrs)

    %Transaction{}
    |> Transaction.changeset(attrs)
    |> Repo.insert()
  end

  @spec update_transaction(%Transaction{}, map) :: {:ok, %Transaction{}}
  @doc """
  Updates a transaction.

  ## Examples

      iex> update_transaction(transaction, %{field: new_value})
      {:ok, %Transaction{}}

      iex> update_transaction(transaction, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_transaction(%Transaction{} = transaction, attrs) do
    apply_available_credit(transaction, attrs)

    transaction
    |> Transaction.changeset(attrs)
    |> Repo.update()
  end

  @spec delete_transaction(%Transaction{}) :: {:ok, %Transaction{}}
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

  @spec change_transaction(
          %Transaction{},
          :invalid | %{optional(:__struct__) => none, optional(atom | binary) => any}
        ) :: Ecto.Changeset.t()
  @doc """
  Returns an `%Ecto.Changeset{}` for tracking transaction changes.

  ## Examples

      iex> change_transaction(transaction)
      %Ecto.Changeset{data: %Transaction{}}

  """
  def change_transaction(%Transaction{} = transaction, attrs \\ %{}) do
    Transaction.changeset(transaction, attrs)
  end

  @spec search_transactions(integer, integer) :: list(%Transaction{})
  @doc """
  Returns a list of transactions between min and max.

  ## Examples

      iex> search_transactions(min, max)
      [%Transaction{}, ...]

  """
  def search_transactions(min, max) do
    query = from transaction in Transaction,
      where: fragment("? BETWEEN ? AND ?", transaction.amount, ^min, ^max)
    Repo.all(query)
  end

  # When we create a transaction, we apply available credit only when the company_id is present
  defp apply_available_credit(attrs) when map_size(attrs) == 0 do attrs end
  defp apply_available_credit(%{company_id: company_id} = attrs) when is_nil(company_id) do attrs end
  defp apply_available_credit(%{company_id: company_id, amount: amount, debit: debit} = _attrs) do
    apply_available_credit(company_id, amount, debit)
  end

  # When we update a transaction, we apply the available credit difference from the existing amount
  defp apply_available_credit(%Transaction{} = _transaction, %{company_id: company_id} = attrs) when is_nil(company_id) do attrs end
  defp apply_available_credit(%Transaction{} = transaction, %{company_id: company_id, amount: amount, debit: debit} = _attrs) when not is_nil(company_id) do
    difference = amount - transaction.amount
    apply_available_credit(company_id, difference, debit)
  end

  # The debit field determines if we add a negative or positive amount
  defp apply_available_credit(company_id, amount, debit) do
    if debit do
      Companies.apply_available_credit_amount(company_id, -amount)
    else
      Companies.apply_available_credit_amount(company_id, amount)
    end
  end
end
