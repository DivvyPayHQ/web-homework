defmodule HomeworkWeb.Resolvers.TransactionsResolver do
  alias Homework.Merchants
  alias Homework.Transactions
  alias Homework.Users
  alias Homework.Companies

  @doc """
  Get a list of transcations
  """
  def transactions(_root, args, _info) do
    {:ok, Enum.map(Transactions.list_transactions(args), &convert_to_decimal/1)}
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
    #case Transactions.create_transaction(update_company_credit(convert_to_cents(args))) do
    case Transactions.create_transaction(convert_to_cents(args)) do
      {:ok, transaction} ->
        {:ok, transaction}

      error ->
        {:error, "could not create transaction: #{inspect(error)}"}
    end
  end

  @doc """
  Updates a transaction for an id with args specified.
  """
  def update_transaction(_root, %{id: id} = args, _info) do
    transaction = Transactions.get_transaction!(id)

    case Transactions.update_transaction(transaction, convert_to_cents(args)) do
      {:ok, transaction} ->
        {:ok, transaction}

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
  Converts an integer value to a decimal
  """
  def convert_to_decimal(transaction) do
    %{transaction | amount: transaction.amount / 100}
  end

  @doc """
  Converts a decimal value to an integer
  """
  def convert_to_cents(transaction) do
    %{transaction | amount: round(transaction.amount * 100)}
  end

  @doc """
  **NOT FINISHED**
  This would update a company's available credit everytime a transaction was added
  """
  def update_company_credit(transaction) do
    company = Companies.get_company!(transaction.company_id)
    Companies.update_company(company, %{available_credit: company.available_credit - transaction.amount})
  end
end
