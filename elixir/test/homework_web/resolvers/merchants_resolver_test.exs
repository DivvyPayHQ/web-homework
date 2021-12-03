defmodule HomeworkWeb.Resolvers.MerchantsResolverTest do
  use Homework.DataCase, async: true
  alias Homework.Merchants
  alias HomeworkWeb.Resolvers.MerchantsResolver

  @merchant_one_setup %{
    name: "merchant one",
    description: "the first merchant"
  }

  @merchant_two_setup %{
    name: "merchant two",
    description: "the second merchant"
  }

  @merchant_three_setup %{
    name: "merchant Three",
    description: "the third merchant"
  }

  setup do
    merchant_one = create_merchant_through_context(@merchant_one_setup)
    merchant_two = create_merchant_through_context(@merchant_two_setup)
    %{
      merchant_one: merchant_one,
      merchant_two: merchant_two
    }
  end

  describe "@create_merchant" do
    test "tests create_merchant/3 in MerchantsResolver" do
      assert {:ok, merchant} = MerchantsResolver.create_merchant(nil, @merchant_three_setup, nil)
      merchants = get_all_merchants_through_context()
      assert Enum.find(merchants, fn x -> merchant.id === x.id end)
    end
    
  end

  describe "@update_merchant" do
    test "tests update_merchant/3 in MerchantsResolver", state do
      updated_field = "a new value"
      assert {:ok, merchant} = MerchantsResolver.update_merchant(nil, %{id: state.merchant_two.id, name: updated_field}, nil)
      updated_merchant = get_merchant_through_context(merchant.id)
      assert updated_merchant.name === updated_field
    end
  end

  describe "@merchants" do
    test "tests merchants/3 in MerchantsResolver", state do
      assert {:ok, merchants} = MerchantsResolver.merchants(nil, %{}, nil)
      assert Enum.find(merchants, fn x -> state.merchant_one.id === x.id end)
    end
  end

  describe "@delete_merchant" do
    test "tests delete_merchant/3 in MerchantsResolver", state do
      assert {:ok, _merchant} = MerchantsResolver.delete_merchant(nil, %{id: state.merchant_two.id}, nil)
      merchants = get_all_merchants_through_context()
      refute Enum.find(merchants, fn x -> state.merchant_two.id === x.id end)
    end
  end

  defp create_merchant_through_context(merchant) do
    assert {:ok, merchant} = Merchants.create_merchant(merchant)
    merchant
  end

  defp get_merchant_through_context(id) do
    Merchants.get_merchant!(id)
  end

  defp get_all_merchants_through_context() do
    Merchants.list_merchants(%{})
  end
end