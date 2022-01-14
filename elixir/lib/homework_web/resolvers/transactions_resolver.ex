defmodule HomeworkWeb.Resolvers.TransactionsResolver do
  alias Absinthe.Resolution.Helpers
  alias Homework.{Companies, Merchants, Transactions, Users}

  @doc """
  Get a list of transcations
  """
  def transactions(_root, args, _info), do: {:ok, Transactions.list_transactions(args)}

  @doc """
  Get an existing transaction
  """
  def transaction(_root, %{id: id}, _info) do
    try do
      {:ok, Transactions.get_transaction!(id)}
    rescue
      Ecto.NoResultsError -> {:error, "could not get transaction: no result"}
    end
  end

  @doc """
  Get the company associated with a transaction
  """
  def company(transaction, _args, _info),
    do:
      Helpers.batch(
        {__MODULE__, :batch_transaction_company},
        transaction.company_id,
        fn batch_results ->
          batch_results
          |> Map.get(transaction.company_id)
          |> Enum.at(0)
          |> (&{:ok, &1}).()
        end
      )

  def batch_transaction_company(_, company_ids) do
    company_ids
    |> Enum.uniq()
    |> Companies.where_id_in()
  end

  @doc """
  Get the merchant associated with a transaction
  """
  def merchant(transaction, _args, _info),
    do:
      Helpers.batch(
        {__MODULE__, :batch_transaction_merchant},
        transaction.merchant_id,
        fn batch_results ->
          batch_results
          |> Map.get(transaction.merchant_id)
          |> Enum.at(0)
          |> (&{:ok, &1}).()
        end
      )

  def batch_transaction_merchant(_, merchant_ids) do
    merchant_ids
    |> Enum.uniq()
    |> Merchants.batch_transaction_merchant()
  end

  @doc """
  Get the user associated with a transaction
  """
  def user(transaction, _args, _info),
    do:
      Helpers.batch(
        {__MODULE__, :batch_transaction_user},
        transaction.user_id,
        fn batch_results ->
          batch_results
          |> Map.get(transaction.user_id)
          |> Enum.at(0)
          |> (&{:ok, &1}).()
        end
      )

  def batch_transaction_user(_, user_ids) do
    user_ids
    |> Enum.uniq()
    |> Users.batch_transaction_user()
  end

  @doc """
  Create a new transaction
  """
  def create_transaction(_root, args, _info) do
    case Transactions.create_transaction(args) do
      {:ok, transaction} ->
        {:ok, transaction}

      error ->
        {:error, "could not create transaction: #{inspect(error)}"}
    end
  end

  @doc """
  Deletes a transaction for an id
  """
  def delete_transaction(_root, args, _info) do
    with {:ok, transaction} <- transaction(%{}, args, %{}),
         {:ok, _transaction} = res <- Transactions.delete_transaction(transaction) do
      res
    else
      error ->
        {:error, "could not delete transaction: #{inspect(error)}"}
    end
  end

  @doc """
  Search existing transactions by the provided max and min
  """
  def search_transactions_by_max_min(_root, args, _info) do
    case Transactions.search_transactions_by_max_min(args) do
      resp when is_list(resp) ->
        {:ok, resp}

      error ->
        {:error, "could not search users by name: #{inspect(error)}"}
    end
  end

  @doc """
  Updates a transaction for an id with args specified.
  """
  def update_transaction(_root, args, _info) do
    with {:ok, transaction} <- transaction(%{}, args, %{}),
         {:ok, _transaction} = res <- Transactions.update_transaction(transaction, args) do
      res
    else
      error ->
        {:error, "could not update transaction: #{inspect(error)}"}
    end
  end
end
