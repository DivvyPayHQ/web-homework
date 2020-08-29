defmodule HomeworkWeb.Resolvers.MerchantsResolver do
  alias Homework.Merchants

  def merchants(_root, args, _info) do
    {:ok, Merchants.list_merchants(args)}
  end

  def create_merchant(_root, args, _info) do
    case Merchants.create_merchant(args) do
      {:ok, merchant} ->
        {:ok, merchant}

      error ->
        {:error, "could not create merchant: #{inspect(error)}"}
    end
  end
end
