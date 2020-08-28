defmodule HomeworkWeb.TransactionsResolver do
  alias Homework.Merchants
  alias Homework.Transactions
  alias Homework.Users

  def transactions(_root, args, _info) do
    {:ok, Transactions.list_transactions(args)}
  end

  def user(_root, args, %{source: %{user_id: user_id}} = info) do
    {:ok, Users.get_user!(user_id)}
  end

  def merchant(_root, args, %{source: %{merchant_id: merchant_id}} = info) do
    {:ok, Merchants.get_merchant!(merchant_id)}
  end
end
