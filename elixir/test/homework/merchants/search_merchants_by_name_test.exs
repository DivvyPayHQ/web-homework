defmodule Homework.Merchants.SearchMerchantsByNameTest do
  alias Homework.Merchants
  import Homework.Factory
  use Homework.DataCase

  describe "search_merchants_by_name/1" do
    @merchant_names [
      %{name: "Iron"},
      %{name: "Dolittle"},
      %{name: "Captain"},
      %{name: "Black"},
      %{name: "Black"},
      %{name: "Doctor"},
      %{name: "Ant"},
      %{name: "War"},
      %{name: "Nick"},
      %{name: "Iron"},
      %{name: "Doctor"},
      %{name: "Ant"},
      %{name: "ExDoctor"}
    ]

    setup do: [merchants: Enum.map(@merchant_names, fn m -> insert!(:merchant, m) end)]

    test "success: ascending list of merchants whose name closest to starting with 'dob'",
         _context do
      merchants = Merchants.search_merchants_by_name(%{search_term: "dob"})
      assert 3 = length(merchants)
      # requires 4 changes
      assert Enum.at(merchants, 0).name === "Doctor"
      # requires 6 changes
      assert Enum.at(merchants, 2).name === "Dolittle"
    end

    test "success: ascending list of merchants whose first name closest to starting with 'docitle'",
         _context do
      merchants = Merchants.search_merchants_by_name(%{search_term: "docitle"})

      assert 3 = length(merchants)
      # requires 2 changes
      assert Enum.at(merchants, 0).name === "Dolittle"
      # requires 4 changes
      assert Enum.at(merchants, 2).name === "Doctor"
    end
  end
end
