defmodule Homework.TransactionsTest do
  use Homework.DataCase

  import Homework.CompaniesFixtures, only: [company_fixture: 0]
  import Homework.UsersFixtures, only: [user_fixture: 1]

  alias Homework.{Companies, Merchants, Transactions}

  describe "transactions" do
    alias Homework.Transactions.Transaction

    setup do
      {:ok, merchant1} =
        Merchants.create_merchant(%{description: "some description", name: "some name"})

      {:ok, merchant2} =
        Merchants.create_merchant(%{
          description: "some updated description",
          name: "some updated name"
        })

      company1 = company_fixture()
      company2 = company_fixture()
      user1 = user_fixture(%{company_id: company1.id})
      user2 = user_fixture(%{company_id: company2.id})

      valid_attrs = %{
        amount: 42,
        credit: true,
        debit: true,
        description: "some description",
        merchant_id: merchant1.id,
        user_id: user1.id,
        company_id: company1.id
      }

      update_attrs = %{
        amount: 43,
        credit: false,
        debit: false,
        description: "some updated description",
        merchant_id: merchant2.id,
        user_id: user2.id,
        company_id: company2.id
      }

      invalid_attrs = %{
        amount: nil,
        credit: nil,
        debit: nil,
        description: nil,
        merchant_id: nil,
        user_id: nil,
        company_id: nil
      }

      {:ok,
       %{
         valid_attrs: valid_attrs,
         update_attrs: update_attrs,
         invalid_attrs: invalid_attrs,
         merchant1: merchant1,
         merchant2: merchant2,
         user1: user1,
         user2: user2,
         company1: company1,
         company2: company2
       }}
    end

    def transaction_fixture(valid_attrs, attrs \\ %{}) do
      {:ok, transaction} =
        attrs
        |> Enum.into(valid_attrs)
        |> Transactions.create_transaction()

      transaction
    end

    test "list_transactions/1 returns all transactions", %{valid_attrs: valid_attrs} do
      transaction = transaction_fixture(valid_attrs)
      assert Transactions.list_transactions([]) == [transaction]
    end

    test "get_transaction!/1 returns the transaction with given id", %{valid_attrs: valid_attrs} do
      transaction = transaction_fixture(valid_attrs)
      assert Transactions.get_transaction!(transaction.id) == transaction
    end

    test "create_transaction/1 with valid data creates a transaction", %{
      valid_attrs: valid_attrs,
      merchant1: merchant1,
      user1: user1,
      company1: company1
    } do
      assert {:ok, %Transaction{} = transaction} = Transactions.create_transaction(valid_attrs)
      assert transaction.amount == 42
      assert transaction.credit == true
      assert transaction.debit == true
      assert transaction.description == "some description"
      assert transaction.merchant_id == merchant1.id
      assert transaction.user_id == user1.id
      assert transaction.company_id == company1.id
    end

    test "create_transaction/1 with valid data adjusts companies available_credit", %{
      valid_attrs: valid_attrs,
      company1: company1
    } do
      %{available_credit: original_available_credit} = company1
      {:ok, %Transaction{} = transaction} = Transactions.create_transaction(valid_attrs)
      %{available_credit: updated_available_credit} = Companies.get_company!(company1.id)
      assert updated_available_credit == original_available_credit - transaction.amount
    end

    test "create_transaction/1 with invalid data returns error changeset", %{
      invalid_attrs: invalid_attrs
    } do
      assert {:error, %Ecto.Changeset{}} = Transactions.create_transaction(invalid_attrs)
    end

    test "create_transaction/1 with non-existant company returns error changeset", %{
      valid_attrs: valid_attrs
    } do
      non_persisted_id = Ecto.UUID.generate()

      assert {:error, %Ecto.Changeset{errors: errors}} =
               Transactions.create_transaction(%{valid_attrs | company_id: non_persisted_id})

      assert {"does not exist", _} = errors[:company_id]
    end

    test "update_transaction/2 with valid data updates the transaction", %{
      valid_attrs: valid_attrs,
      update_attrs: update_attrs,
      merchant2: merchant2,
      user2: user2,
      company2: company2
    } do
      transaction = transaction_fixture(valid_attrs)

      assert {:ok, %Transaction{} = transaction} =
               Transactions.update_transaction(transaction, update_attrs)

      assert transaction.amount == 43
      assert transaction.credit == false
      assert transaction.debit == false
      assert transaction.description == "some updated description"
      assert transaction.merchant_id == merchant2.id
      assert transaction.user_id == user2.id
      assert transaction.company_id == company2.id
    end

    test "update_transaction/2 with invalid data returns error changeset", %{
      valid_attrs: valid_attrs,
      invalid_attrs: invalid_attrs
    } do
      transaction = transaction_fixture(valid_attrs)

      assert {:error, %Ecto.Changeset{}} =
               Transactions.update_transaction(transaction, invalid_attrs)

      assert transaction == Transactions.get_transaction!(transaction.id)
    end

    test "delete_transaction/1 deletes the transaction", %{valid_attrs: valid_attrs} do
      transaction = transaction_fixture(valid_attrs)
      assert {:ok, %Transaction{}} = Transactions.delete_transaction(transaction)
      assert_raise Ecto.NoResultsError, fn -> Transactions.get_transaction!(transaction.id) end
    end

    test "change_transaction/1 returns a transaction changeset", %{valid_attrs: valid_attrs} do
      transaction = transaction_fixture(valid_attrs)
      assert %Ecto.Changeset{} = Transactions.change_transaction(transaction)
    end

    test "total_amount_for_company/1 returns sum of transactios amounts", %{
      valid_attrs: valid_attrs,
      company1: company
    } do
      transaction1 =
        transaction_fixture(%{valid_attrs | amount: 1, company_id: company.id, debit: true})

      transaction2 =
        transaction_fixture(%{valid_attrs | amount: 3, company_id: company.id, debit: true})

      expected_total_transactions_amount = transaction1.amount + transaction2.amount

      assert Transactions.total_amount_for_company(company) == expected_total_transactions_amount
    end
  end
end
