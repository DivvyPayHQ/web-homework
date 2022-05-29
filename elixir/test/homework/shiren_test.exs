defmodule Homework.ShirenTest do
  use Homework.DataCase

  alias Homework.Shiren

  describe "price" do
    alias Homework.Shiren.Prices

    @valid_attrs %{amount: 42, category: "some category", type: "some type"}
    @update_attrs %{amount: 43, category: "some updated category", type: "some updated type"}
    @invalid_attrs %{amount: nil, category: nil, type: nil}

    def prices_fixture(attrs \\ %{}) do
      {:ok, prices} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Shiren.create_prices()

      prices
    end

    test "list_price/0 returns all price" do
      prices = prices_fixture()
      assert Shiren.list_price() == [prices]
    end

    test "get_prices!/1 returns the prices with given id" do
      prices = prices_fixture()
      assert Shiren.get_prices!(prices.id) == prices
    end

    test "create_prices/1 with valid data creates a prices" do
      assert {:ok, %Prices{} = prices} = Shiren.create_prices(@valid_attrs)
      assert prices.amount == 42
      assert prices.category == "some category"
      assert prices.type == "some type"
    end

    test "create_prices/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Shiren.create_prices(@invalid_attrs)
    end

    test "update_prices/2 with valid data updates the prices" do
      prices = prices_fixture()
      assert {:ok, %Prices{} = prices} = Shiren.update_prices(prices, @update_attrs)
      assert prices.amount == 43
      assert prices.category == "some updated category"
      assert prices.type == "some updated type"
    end

    test "update_prices/2 with invalid data returns error changeset" do
      prices = prices_fixture()
      assert {:error, %Ecto.Changeset{}} = Shiren.update_prices(prices, @invalid_attrs)
      assert prices == Shiren.get_prices!(prices.id)
    end

    test "delete_prices/1 deletes the prices" do
      prices = prices_fixture()
      assert {:ok, %Prices{}} = Shiren.delete_prices(prices)
      assert_raise Ecto.NoResultsError, fn -> Shiren.get_prices!(prices.id) end
    end

    test "change_prices/1 returns a prices changeset" do
      prices = prices_fixture()
      assert %Ecto.Changeset{} = Shiren.change_prices(prices)
    end
  end
end
