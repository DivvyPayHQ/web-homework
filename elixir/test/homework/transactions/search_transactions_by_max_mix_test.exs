defmodule Homework.Transactions.SearchTransactionsByMaxMinTest do
  alias Homework.Transactions
  import Homework.Factory
  use Homework.DataCase

  describe "search_transactions_by_max_min/1" do
    @max 500
    @min 100
    @transaction_amounts [
      %{amount: 100},
      %{amount: 2100},
      %{amount: 1100},
      %{amount: 1010},
      %{amount: 1010},
      %{amount: 100},
      %{amount: 50},
      %{amount: 50},
      %{amount: 101},
      %{amount: 400},
      %{amount: 399},
      %{amount: 1099}
    ]

    setup do: [transactions: Enum.map(@transaction_amounts, fn t -> insert!(:transaction, t) end)]

    test "count of transactions with amount between #{@max} and #{@min}",
         _context do
      assert 3 ===
               %{max: 500, min: 100}
               |> Transactions.search_transactions_by_max_min()
               |> length()
    end
  end
end
