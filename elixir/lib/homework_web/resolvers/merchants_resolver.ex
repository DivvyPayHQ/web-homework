defmodule HomeworkWeb.MerchantsResolver do
  alias Homework.Merchants

  def merchants(_root, args, _info) do
    {:ok, Merchants.list_merchants(args)}
  end
end
