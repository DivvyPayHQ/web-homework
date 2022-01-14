defmodule Homework.Merchants.MerchantsTest do
  alias Homework.Merchants
  alias Homework.Merchants.Merchant
  import Homework.Factory
  use Homework.DataCase

  describe "merchants" do
    @invalid_attrs %{description: nil, name: nil}

    setup do: [merchant: insert!(:merchant)]

    test "change_merchant/1 returns a merchant changeset", context do
      assert %Ecto.Changeset{} = Merchants.change_merchant(context.merchant)
    end

    test "create_merchant/1 with valid data creates a merchant" do
      attrs = %{description: "some description", name: "some name"}

      assert {:ok, %Merchant{} = merchant} = Merchants.create_merchant(attrs)
      assert merchant.description == "some description"
      assert merchant.name == "some name"
    end

    test "create_merchant/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Merchants.create_merchant(@invalid_attrs)
    end

    test "delete_merchant/1 deletes the merchant", context do
      merchant = context.merchant
      assert {:ok, %Merchant{}} = Merchants.delete_merchant(merchant)
      assert_raise Ecto.NoResultsError, fn -> Merchants.get_merchant!(merchant.id) end
    end

    test "get_merchant!/1 returns the merchant with given id", context do
      merchant = context.merchant
      assert Merchants.get_merchant!(merchant.id) == merchant
    end

    test "get_merchant_by!/1 returns the merchant with given name", context do
      merchant = context.merchant

      assert Merchants.get_merchant_by!(name: merchant.name).name ==
               merchant.name
    end

    test "get_merchant_by!/1 returns error multiple results", context do
      merchant = context.merchant
      # create another merchant; same name
      insert!(:merchant)

      assert_raise Ecto.MultipleResultsError, fn ->
        Merchants.get_merchant_by!(name: merchant.name)
      end
    end

    test "list_merchants/1 returns all merchants", context do
      merchant = context.merchant
      assert Merchants.list_merchants() == [merchant]
    end

    test "update_merchant/2 with valid data updates the merchant", context do
      merchant = context.merchant

      update_attrs = %{
        description: "some updated description",
        name: "some updated name"
      }

      assert {:ok, %Merchant{} = merchant} = Merchants.update_merchant(merchant, update_attrs)
      assert merchant.description == "some updated description"
      assert merchant.name == "some updated name"
    end

    test "update_merchant/2 with invalid data returns error changeset", context do
      merchant = context.merchant
      assert {:error, %Ecto.Changeset{}} = Merchants.update_merchant(merchant, @invalid_attrs)
      assert merchant == Merchants.get_merchant!(merchant.id)
    end
  end
end
