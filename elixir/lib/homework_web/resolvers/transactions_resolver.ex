defmodule HomeworkWeb.Resolvers.TransactionsResolver do
  alias Homework.Merchants
  alias Homework.Transactions
  alias Homework.Users
  alias Homework.Companies

  @spec transactions(any, any, any) :: {:ok, list(%Transactions.Transaction{})}
  @doc """
  Get a list of transcations
  """
  def transactions(_root, args, _info) do
    {:ok, Transactions.list_transactions(args) |> Enum.map(&to_dollars/1)}
  end

  @spec user(any, any, %{
          :source => %{:user_id => any, optional(any) => any},
          optional(any) => any
        }) :: {:ok, %Users.User{}}
  @doc """
  Get the user associated with a transaction
  """
  def user(_root, _args, %{source: %{user_id: user_id}}) do
    {:ok, Users.get_user!(user_id)}
  end

  @spec merchant(any, any, %{
          :source => %{:merchant_id => any, optional(any) => any},
          optional(any) => any
        }) :: {:ok, %Merchants.Merchant{}}
  @doc """
  Get the merchant associated with a transaction
  """
  def merchant(_root, _args, %{source: %{merchant_id: merchant_id}}) do
    {:ok, Merchants.get_merchant!(merchant_id)}
  end

  @spec company(any, any, %{
          :source => %{:company_id => any, optional(any) => any},
          optional(any) => any
        }) :: {:ok, %Companies.Company{}}
  @doc """
  Get the company associated with a transaction
  """
  def company(_root, _args, %{source: %{company_id: company_id}}) do
    {:ok, Companies.get_company!(company_id)}
  end

  @spec create_transaction(
          any,
          :invalid | %{optional(:__struct__) => none, optional(atom | binary) => any},
          any
        ) :: {:error, String.t()} | {:ok, %Companies.Company{}}
  @doc """
  Create a new transaction
  """
  def create_transaction(_root, args, _info) do
    case Transactions.create_transaction(args |> to_cents) do
      {:ok, transaction} ->
        {:ok, transaction |> to_dollars}

      error ->
        {:error, "could not create transaction: #{inspect(error)}"}
    end
  end

  @spec update_transaction(
          any,
          %{:id => any, optional(:__struct__) => none, optional(atom | binary) => any},
          any
        ) :: {:error, String.t()} | {:ok, %Transactions.Transaction{}}
  @doc """
  Updates a transaction for an id with args specified.
  """
  def update_transaction(_root, %{id: id} = args, _info) do
    transaction = Transactions.get_transaction!(id)

    case Transactions.update_transaction(transaction, args |> to_cents) do
      {:ok, transaction} ->
        {:ok, transaction |> to_dollars}

      error ->
        {:error, "could not update transaction: #{inspect(error)}"}
    end
  end

  @spec delete_transaction(any, %{:id => any, optional(any) => any}, any) ::
          {:error, String.t()} | {:ok, %Transactions.Transaction{}}
  @doc """
  Deletes a transaction for an id
  """
  def delete_transaction(_root, %{id: id}, _info) do
    transaction = Transactions.get_transaction!(id)

    case Transactions.delete_transaction(transaction) do
      {:ok, transaction} ->
        {:ok, transaction |> to_dollars}

      error ->
        {:error, "could not update transaction: #{inspect(error)}"}
    end
  end

  @spec search_transactions(any, %{:min => %Decimal{}, :max => %Decimal{}, optional(any) => any}, any) ::
          {:ok, list(%Transactions.Transaction{})}
  @doc """
  Search for transactions between min and max
  """
  def search_transactions(_root, %{min: min, max: max}, _info) do
    {:ok, Transactions.search_transactions(min |> to_cents, max |> to_cents) |> Enum.map(&to_dollars/1)}
  end

  defp to_dollars(cents) when is_integer(cents) do
    Decimal.div(cents, 100) |> Decimal.round(2)
  end

  defp to_dollars(%{amount: cents} = transaction) do
    %{transaction | amount: cents |> to_dollars}
  end

  defp to_cents(%Decimal{} = dollars) do
    Decimal.round(dollars, 2) |> Decimal.mult(100) |> Decimal.to_integer()
  end

  defp to_cents(%{amount: dollars} = transaction) do
    %{transaction | amount: dollars |> to_cents}
  end
end
