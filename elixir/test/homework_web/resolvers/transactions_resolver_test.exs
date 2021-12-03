defmodule HomeworkWeb.Resolvers.TransactionsResolverTest do
  use Homework.DataCase, async: true
  alias Homework.Merchants
  alias Homework.Users
  alias Homework.Companies
  alias Homework.Transactions
  alias HomeworkWeb.Resolvers.TransactionsResolver

  @merchant_one_setup %{
    name: "merchant one",
    description: "the first merchant"
  }

  @company_one_setup %{
    name: "Company one",
    credit_line: 100000
  }

  @user_one_setup %{
    first_name: "Laura",
    last_name: "Smith",
    dob: "dob 1"
  }

  @transaction_one_setup %{
    amount: 500,
    credit: true,
    debit: false,
    description: "the first transaction"
  }

  @transaction_two_setup %{
    amount: 1000,
    credit: false,
    debit: true,
    description: "the second transaction"
  }

  setup do
    company_one = create_company_through_context(@company_one_setup)
    merchant_one = create_merchant_through_context(@merchant_one_setup)
    user_one = @user_one_setup
    |> Map.put(:company_id, company_one.id)
    |> create_user_through_context()
    transaction_one = @transaction_one_setup
    |> Map.put(:user_id, user_one.id)
    |> Map.put(:merchant_id, merchant_one.id)
    |> Map.put(:company_id, company_one.id)
    |> create_transaction_through_context()
    %{
      company_one: company_one,
      user_one: user_one,
      merchant_one: merchant_one,
      transaction_one: transaction_one
    }
  end

  describe "@create_transaction" do
    test "tests create_transaction/3 in TransactionsResolver", state do
      transaction_two = @transaction_two_setup
        |> Map.put(:user_id, state.user_one.id)
        |> Map.put(:merchant_id, state.merchant_one.id)
      assert {:ok, transaction} = TransactionsResolver.create_transaction(nil, transaction_two, nil)
      transactions = get_all_transactions_through_context()
      assert Enum.find(transactions, fn x -> transaction.id === x.id end)
    end
    
  end

  describe "@update_transaction" do
    test "tests update_transaction/3 in TransactionsResolver", state do
      updated_field = 2000
      assert {:ok, transaction} = TransactionsResolver.update_transaction(nil, %{id: state.transaction_one.id, amount: updated_field}, nil)
      updated_transaction = get_transaction_through_context(transaction.id)
      assert updated_transaction.amount === updated_field
    end
  end

  describe "@transactions" do
    test "tests transactions/3 in TransactionsResolver", state do
      assert {:ok, transactions} = TransactionsResolver.transactions(nil, %{}, nil)
      assert Enum.find(transactions, fn x -> state.transaction_one.id === x.id end)
    end
  end

  describe "@delete_transaction" do
    test "tests delete_transaction/3 in TransactionsResolver", state do
      assert {:ok, _transaction} = TransactionsResolver.delete_transaction(nil, %{id: state.transaction_one.id}, nil)
      transactions = get_all_transactions_through_context()
      refute Enum.find(transactions, fn x -> state.transaction_one.id === x.id end)
    end
  end

  defp create_merchant_through_context(merchant) do
    assert {:ok, merchant} = Merchants.create_merchant(merchant)
    merchant
  end

  defp create_company_through_context(company) do
    assert {:ok, company} = Companies.create_company(company)
    company
  end

  defp create_user_through_context(user) do
    assert {:ok, user} = Users.create_user(user)
    user
  end

  defp create_transaction_through_context(transaction) do
    assert {:ok, transaction} = Transactions.create_transaction(transaction)
    transaction
  end

  defp get_transaction_through_context(id) do
    Transactions.get_transaction!(id)
  end

  defp get_all_transactions_through_context() do
    Transactions.list_transactions(%{})
  end
end