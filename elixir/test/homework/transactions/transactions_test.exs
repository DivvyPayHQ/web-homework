defmodule Homework.Transactions.TransactionsTest do
  alias Homework.{Repo, Transactions}
  alias Homework.Transactions.Transaction
  import Homework.Factory
  use Homework.DataCase

  describe "transactions" do
    @invalid_attrs %{
      amount: nil,
      credit: nil,
      debit: nil,
      description: nil,
      merchant_id: nil,
      user_id: nil
    }

    setup do
      companies = Enum.map(0..2, fn _ -> insert!(:company) end)
      merchants = Enum.map(0..2, fn _ -> insert!(:merchant) end)
      users = Enum.map(0..2, fn _ -> insert!(:user, %{}) end)

      transaction =
        insert!(:transaction, %{
          company: Enum.at(companies, 0),
          merchant: Enum.at(merchants, 0),
          user: Enum.at(users, 0)
        })

      [
        companies: companies,
        merchants: merchants,
        transaction: transaction,
        users: users
      ]
    end

    test "change_transaction/1 returns a transaction changeset", context do
      assert %Ecto.Changeset{} = Transactions.change_transaction(context.transaction)
    end

    test "create_transaction/1 with valid data creates a transaction", context do
      company = Enum.at(context.companies, 0)
      merchant = Enum.at(context.merchants, 0)
      user = Enum.at(context.users, 0)

      attrs = %{
        amount: 35,
        company_id: company.id,
        credit: true,
        debit: true,
        description: "some description",
        merchant_id: merchant.id,
        user_id: user.id
      }

      assert {:ok, %Transaction{} = transaction} = Transactions.create_transaction(attrs)

      assert transaction.amount == 35
      # bug fix: Transactions changeset left out @fields.credit, rolled to default: false
      assert transaction.credit == true
      assert transaction.debit == true
      assert transaction.description == "some description"
      assert transaction.merchant_id == merchant.id
      assert transaction.user_id == user.id

      # bug fix: create another with %{credit: false} to again validate fix
      attrs = %{
        amount: 42,
        company_id: company.id,
        credit: false,
        debit: true,
        description: "some description",
        merchant_id: merchant.id,
        user_id: user.id
      }

      assert {:ok, %Transaction{} = transaction} = Transactions.create_transaction(attrs)

      assert transaction.credit == false
    end

    test "create_transaction/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Transactions.create_transaction(@invalid_attrs)
    end

    test "create_transaction/1 confirm company assoc. with trans. has correct `available_credit` after trans. creation",
         context do
      company = Enum.at(context.companies, 1)
      merchant = Enum.at(context.merchants, 0)
      user = Enum.at(context.users, 0)

      # insert multiple transactions for 2nd company
      Enum.map(0..8, fn _ ->
        insert!(:transaction, %{
          amount: 81,
          company: company,
          merchant: merchant,
          user: user
        })
      end)

      attrs = %{
        amount: 35,
        company_id: company.id,
        credit: true,
        debit: true,
        description: "some description",
        merchant_id: merchant.id,
        user_id: user.id
      }

      # create new transaction and confirm decrease to company available credit
      Transactions.create_transaction(attrs)
      company = Repo.get(Homework.Companies.Company, company.id)
      assert company.available_credit == 9236

      # again confirm new transaction decreases company available credit
      trans_amount_1 = 58
      Transactions.create_transaction(Map.put(attrs, :amount, trans_amount_1))
      company = Repo.get(Homework.Companies.Company, company.id)
      assert company.available_credit == 9236 - trans_amount_1
    end

    test "delete_transaction/1 deletes the transaction", context do
      transaction = context.transaction
      assert {:ok, %Transaction{}} = Transactions.delete_transaction(transaction)
      assert_raise Ecto.NoResultsError, fn -> Transactions.get_transaction!(transaction.id) end
    end

    test "delete_transaction/1 confirm company assoc. with trans. has correct `available_credit` after trans. deletion",
         context do
      company = Enum.at(context.companies, 0)
      merchant = Enum.at(context.merchants, 0)
      user = Enum.at(context.users, 0)

      attrs = %{
        amount: 35,
        company_id: company.id,
        credit: true,
        debit: true,
        description: "some description",
        merchant_id: merchant.id,
        user_id: user.id
      }

      # create new transaction and confirm decrease to company available credit
      {:ok, %Transaction{} = transaction} = Transactions.create_transaction(attrs)
      company = Repo.get(Homework.Companies.Company, company.id)
      assert company.available_credit == 9923

      # delete new transaction and increase to company available credit
      assert {:ok, %Transaction{}} = Transactions.delete_transaction(transaction)
      company = Repo.get(Homework.Companies.Company, company.id)
      assert company.available_credit == 9958
    end

    test "get_transaction!/1 returns the transaction with given id", context do
      transaction = context.transaction

      assert transaction ==
               transaction.id
               |> Transactions.get_transaction!()
               |> Repo.preload(company: [], merchant: [], user: [:company])
    end

    test "get_transaction_by!/1 returns the transaction with given amount", context do
      transaction = context.transaction

      assert Transactions.get_transaction_by!(amount: transaction.amount).amount ==
               transaction.amount
    end

    test "get_transaction_by!/1 returns error multiple results", context do
      transaction = context.transaction
      # create another transaction; same amount
      insert!(:transaction)

      assert_raise Ecto.MultipleResultsError, fn ->
        Transactions.get_transaction_by!(amount: transaction.amount)
      end
    end

    test "list_transactions/1 returns all transactions", context do
      transaction = context.transaction

      assert Transactions.list_transactions(%{
               preload: [company: [], merchant: [], user: [:company]]
             }) == [
               transaction
             ]
    end

    test "update_transaction/2 with valid data updates the transaction", context do
      company = Enum.at(context.companies, 0)
      merchant = Enum.at(context.merchants, 1)
      transaction = context.transaction
      user = Enum.at(context.users, 1)

      update_attrs = %{
        amount: 31,
        description: "some updated description",
        credit: false,
        debit: false,
        merchant_id: merchant.id,
        user_id: user.id
      }

      {:ok, %Transaction{} = transaction} =
        Transactions.update_transaction(transaction, update_attrs)

      assert transaction.amount == 31
      assert transaction.credit == false
      assert transaction.company_id == company.id
      assert transaction.debit == false
      assert transaction.description == "some updated description"
      assert transaction.merchant_id == merchant.id
      assert transaction.user_id == user.id
    end

    test "update_transaction/2 with new company_id returns error changeset", context do
      company = Enum.at(context.companies, 1)
      transaction = context.transaction

      update_attrs = %{
        company_id: company.id
      }

      assert {:error,
              %Ecto.Changeset{
                errors: [company_id: {"cannot update company_id for a transaction", []}]
              }} = Transactions.update_transaction(transaction, update_attrs)
    end

    test "update_transaction/2 with invalid data returns error changeset", context do
      transaction = context.transaction

      assert {:error, %Ecto.Changeset{}} =
               Transactions.update_transaction(transaction, @invalid_attrs)

      assert transaction ==
               transaction.id
               |> Transactions.get_transaction!()
               |> Repo.preload(company: [], merchant: [], user: [:company])
    end
  end
end
