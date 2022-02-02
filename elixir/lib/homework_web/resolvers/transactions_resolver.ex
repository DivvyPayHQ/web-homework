defmodule HomeworkWeb.Resolvers.TransactionsResolver do
  alias Homework.Merchants
  alias Homework.Transactions
  alias Homework.Users
  alias HomeworkWeb.Resolvers.Utils.MoneyTypeConverter

  @money_fields [:amount]

  @doc """
  Get a list of transactions
  """
  def transactions(_root, %{start_date: _start_date, end_date: _end_date} = args, _info) do
    {:ok, Transactions.list_transactions(args) |> MoneyTypeConverter.convert_structs(@money_fields)}
  end

  def transactions(_root, %{start_date: _start_date} = _args, _info) do
    {:error, "Cannot provide partial date range: missing end date"}
  end

  def transactions(_root, %{end_date: _end_date} = _args, _info) do
    {:error, "Cannot provide partial date range: missing start date"}
  end

  def transactions(_root, args, _info) do
    {:ok, Transactions.list_transactions(args) |> MoneyTypeConverter.convert_structs(@money_fields)}
  end

  @doc """
  Get the user associated with a transaction
  """
  def user(_root, _args, %{source: %{user_id: user_id}}) do
    {:ok, Users.get_user!(user_id)}
  end

  @doc """
  Get the merchant associated with a transaction
  """
  def merchant(_root, _args, %{source: %{merchant_id: merchant_id}}) do
    {:ok, Merchants.get_merchant!(merchant_id)}
  end

  @doc """
  Create a new transaction
  """
  def create_transaction(_root, args, _info) do
    case Transactions.create_transaction(args) do
      {:ok, transaction} ->
        {:ok, transaction |> MoneyTypeConverter.convert_fields(@money_fields)}

      error ->
        {:error, "could not create transaction: #{inspect(error)}"}
    end
  end

  @doc """
  Updates a transaction for an id with args specified.
  """
  def update_transaction(_root, %{id: id} = args, _info) do
    converted_args = MoneyTypeConverter.convert_fields(args, @money_fields)

    transaction = Transactions.get_transaction!(id)

    case Transactions.update_transaction(transaction, converted_args) do
      {:ok, transaction} ->
        {:ok, transaction |> MoneyTypeConverter.convert_fields(@money_fields)}

      error ->
        {:error, "could not update transaction: #{inspect(error)}"}
    end
  end

  @doc """
  Deletes a transaction for an id
  """
  def delete_transaction(_root, %{id: id}, _info) do
    transaction = Transactions.get_transaction!(id)

    case Transactions.delete_transaction(transaction) do
      {:ok, transaction} ->
        {:ok, MoneyTypeConverter.convert_fields(transaction, @money_fields)}

      error ->
        {:error, "could not update transaction: #{inspect(error)}"}
    end
  end
end
