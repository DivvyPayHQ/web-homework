defmodule HomeworkWeb.Resolvers.TransactionsResolver do
  alias Homework.Merchants
  alias Homework.Transactions
  alias Homework.Users
  alias Homework.Companies

  @doc """
  Get a list of transcations
  """
  def transactions(_root, args, _info) do
    list_transactions = Transactions.list_transactions(args)

    {:ok,
     Enum.map(list_transactions, fn data ->
       data |> Map.put(:amount, integer_to_decimal(data.amount))
     end)}
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
  Get the company associated with a transaction
  """
  def company(_root, _args, %{source: %{company_id: company_id}}) do
    {:ok, Companies.get_company!(company_id)}
  end

  @doc """
  Create a new transaction
  """
  def create_transaction(_root, args, _info) do
    with {:ok, transaction} <-
           Transactions.create_transaction(
             args
             |> Map.put(:amount, decimal_to_integer(args.amount))
           ),
         {:ok, _company} <-
           Companies.update_company_credit(transaction.company_id, transaction.amount) do
      {:ok, transaction}
    else
      error ->
        {:error, "could not create transaction: #{inspect(error)}"}
    end
  end

  @doc """
  Updates a transaction for an id with args specified.
  """
  def update_transaction(_root, %{id: id} = args, _info) do
    transaction = Transactions.get_transaction!(id)

    with {:ok, transaction} <-
           Transactions.update_transaction(transaction, args |> Map.put(:amount, decimal_to_integer(args.amount))
           ),
         {:ok, _company} <-
           Companies.update_company_credit(transaction.company_id, decimal_to_integer(transaction.amount)) do
      {:ok, transaction}
    else
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
        {:ok, transaction}

      error ->
        {:error, "could not update transaction: #{inspect(error)}"}
    end
  end

  @doc """
  Converts decimal to integer format
  """
  def decimal_to_integer(amount) do
    int_amount = Money.parse(amount, :USD) |> elem(1)
    int_amount.amount
  end

  @doc """
  Converts integer to decimal format
  """
  def integer_to_decimal(amount) do
    float_amount = :erlang.float_to_binary(amount / 100, decimals: 2)
    String.to_float(float_amount)
  end
end
