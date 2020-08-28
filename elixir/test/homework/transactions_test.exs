defmodule Homework.TransactionsTest do
  use Homework.DataCase

  alias Homework.Transactions

  describe "transactions" do
    alias Homework.Transactions.Transaction

    @valid_attrs %{
      amount: 42,
      credit: true,
      debit: true,
      description: "some description",
      merchant_id: "some merchant_id",
      user_id: "some user_id"
    }
    @update_attrs %{
      amount: 43,
      credit: false,
      debit: false,
      description: "some updated description",
      merchant_id: "some updated merchant_id",
      user_id: "some updated user_id"
    }
    @invalid_attrs %{
      amount: nil,
      credit: nil,
      debit: nil,
      description: nil,
      merchant_id: nil,
      user_id: nil
    }

    def transaction_fixture(attrs \\ %{}) do
      {:ok, transaction} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Transactions.create_transaction()

      transaction
    end

    test "list_transactions/0 returns all transactions" do
      transaction = transaction_fixture()
      assert Transactions.list_transactions() == [transaction]
    end

    test "get_transaction!/1 returns the transaction with given id" do
      transaction = transaction_fixture()
      assert Transactions.get_transaction!(transaction.id) == transaction
    end

    test "create_transaction/1 with valid data creates a transaction" do
      assert {:ok, %Transaction{} = transaction} = Transactions.create_transaction(@valid_attrs)
      assert transaction.amount == 42
      assert transaction.credit == true
      assert transaction.debit == true
      assert transaction.description == "some description"
      assert transaction.merchant_id == "some merchant_id"
      assert transaction.user_id == "some user_id"
    end

    test "create_transaction/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Transactions.create_transaction(@invalid_attrs)
    end

    test "update_transaction/2 with valid data updates the transaction" do
      transaction = transaction_fixture()

      assert {:ok, %Transaction{} = transaction} =
               Transactions.update_transaction(transaction, @update_attrs)

      assert transaction.amount == 43
      assert transaction.credit == false
      assert transaction.debit == false
      assert transaction.description == "some updated description"
      assert transaction.merchant_id == "some updated merchant_id"
      assert transaction.user_id == "some updated user_id"
    end

    test "update_transaction/2 with invalid data returns error changeset" do
      transaction = transaction_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Transactions.update_transaction(transaction, @invalid_attrs)

      assert transaction == Transactions.get_transaction!(transaction.id)
    end

    test "delete_transaction/1 deletes the transaction" do
      transaction = transaction_fixture()
      assert {:ok, %Transaction{}} = Transactions.delete_transaction(transaction)
      assert_raise Ecto.NoResultsError, fn -> Transactions.get_transaction!(transaction.id) end
    end

    test "change_transaction/1 returns a transaction changeset" do
      transaction = transaction_fixture()
      assert %Ecto.Changeset{} = Transactions.change_transaction(transaction)
    end
  end
end
