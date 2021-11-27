defmodule HomeworkWeb.Resolvers.TransactionsResolver do
  alias Homework.Merchants
  alias Homework.Transactions
  alias Homework.Users
  alias Homework.Companies
  alias Homework.Transactions.Transaction

  @doc """
  Get a list of transcations
  """
  def transactions(_root, args, _info) do
    {:ok, Transactions.list_transactions(args)}
  end

  @doc """
  Get the user associated with a transaction
  """
  def user(_root, _args, %{source: %{user_id: user_id}}) do
    {:ok, Users.get_user!(user_id)}
  end

  @doc """
  Get the user associated with a company
  """
  def company(_root, _args, %{source: %{company_id: company_id}}) do
    {:ok, Companies.get_company!(company_id)}
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
  def create_transaction(_root, %{company_id: cid} = args, _info) do
    company = Companies.get_company!(cid)

    case Transactions.create_transaction(company, args) do
      {:ok, transaction} ->
        %{amount: amount} = transaction
        {:ok, %{transaction | amount: Transaction.int_to_dec(amount)}}

      error ->
        {:error, "could not create transaction: #{inspect(error)}"}
    end
  end

  @doc """
  Updates a transaction for an id with args specified.
  """
  def update_transaction(_root, %{id: id, company_id: cid} = args, _info) do
    transaction = Transactions.get_transaction!(id)
    company = Companies.get_company!(cid)

    case Transactions.update_transaction(transaction, company, args) do
      {:ok, transaction} ->
        %{amount: amount} = transaction
        {:ok, %{transaction | amount: Transaction.int_to_dec(amount)}}

      error ->
        {:error, "could not update transaction: #{inspect(error)}"}
    end
  end

  @doc """
  Deletes a transaction for an id
  """
  def delete_transaction(_root, %{id: id}, _info) do
    transaction = Transactions.get_transaction!(id)
    company = Companies.get_company!(transaction.company_id)

    case Transactions.delete_transaction(transaction, company) do
      {:ok, transaction} ->
        %{amount: amount} = transaction
        {:ok, %{transaction | amount: Transaction.int_to_dec(amount)}}

      error ->
        {:error, "could not update transaction: #{inspect(error)}"}
    end
  end
end
