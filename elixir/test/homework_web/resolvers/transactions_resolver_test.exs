defmodule Homework.TransactionsResolverTest do
  use HomeworkWeb.ConnCase

  alias Homework.Merchants
  alias Homework.Transactions
  alias Homework.Users
  alias Homework.Companies

  describe "transactions" do
    setup do
      {:ok, merchant1} =
        Merchants.create_merchant(%{description: "some description", name: "some name"})

      {:ok, merchant2} =
        Merchants.create_merchant(%{
          description: "some updated description",
          name: "some updated name"
        })

      {:ok, company1} =
        Companies.create_company(%{name: "some name", credit_line: 1000000})

      {:ok, company2} =
        Companies.create_company(%{
          name: "some updated name",
          credit_line: 1000000
        })

      {:ok, user1} =
        Users.create_user(%{
          company_id: company1.id,
          dob: "some dob",
          first_name: "some first_name",
          last_name: "some last_name"
        })

      {:ok, user2} =
        Users.create_user(%{
          company_id: company2.id,
          dob: "some updated dob",
          first_name: "some updated first_name",
          last_name: "some updated last_name"
        })

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
        id: nil,
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

    test "list returns all transactions", %{conn: conn, valid_attrs: valid_attrs} do
      transaction = transaction_fixture(valid_attrs)

      list_query = """
      {
        transactions {
          id
          description
          amount
          credit
          debit
        }
      }
      """

      conn = post(conn, "/api", %{
        "query" => list_query,
        "variables" => nil
      })

      assert json_response(conn, 200) == %{
        "data" => %{"transactions" => [%{
          "id" => transaction.id, "description" => transaction.description, "amount" => "0.42", "credit" => transaction.credit, "debit" => transaction.debit
        }]}
      }
    end

    test "create with valid data creates transaction", %{conn: conn, valid_attrs: valid_attrs} do
      %{amount: amount, description: description, credit: credit, debit: debit, merchant_id: merchant_id, user_id: user_id, company_id: company_id} = valid_attrs

      create_query = """
      mutation CreateTransaction {
        createTransaction(amount: "#{amount}", description: "#{description}", credit: #{credit}, debit: #{debit}, merchantId: "#{merchant_id}", userId: "#{user_id}", companyId: "#{company_id}") {
          description
          amount
          credit
          debit
        }
      }
      """

      conn = post(conn, "/api", %{
        "query" => create_query,
        "variables" => valid_attrs
      })

      assert json_response(conn, 200) == %{
        "data" => %{"createTransaction" => %{
          "description" => description, "amount" => "42.00", "credit" => credit, "debit" => debit
        }}
      }
    end

    test "update with valid data update transaction", %{conn: conn, valid_attrs: valid_attrs, update_attrs: update_attrs} do
      transaction = transaction_fixture(valid_attrs)
      %{amount: amount, description: description, credit: credit, debit: debit, merchant_id: merchant_id, user_id: user_id, company_id: company_id} = update_attrs

      update_query = """
      mutation UpdateTransaction {
        updateTransaction(id: "#{transaction.id}", amount: "#{amount}", description: "#{description}", credit: #{credit}, debit: #{debit}, merchantId: "#{merchant_id}", userId: "#{user_id}", companyId: "#{company_id}") {
          id
          description
          amount
          credit
          debit
        }
      }
      """

      conn = post(conn, "/api", %{
        "query" => update_query,
        "variables" => %{update_attrs | id: transaction.id}
      })

      assert json_response(conn, 200) == %{
        "data" => %{"updateTransaction" => %{
          "id" => transaction.id, "description" => description, "amount" => "43.00", "credit" => credit, "debit" => debit
        }}
      }
    end

    test "delete removes transaction", %{conn: conn, valid_attrs: valid_attrs} do
      transaction = transaction_fixture(valid_attrs)

      delete_query = """
      mutation DeleteTransaction {
        deleteTransaction(id: "#{transaction.id}") {
          id
          description
          amount
          credit
          debit
        }
      }
      """

      conn = post(conn, "/api", %{
        "query" => delete_query,
        "variables" => %{id: transaction.id}
      })

      assert json_response(conn, 200) == %{
        "data" => %{"deleteTransaction" => %{
          "id" => transaction.id, "description" => transaction.description, "amount" => "0.42", "credit" => transaction.credit, "debit" => transaction.debit
        }}
      }
    end

    test "search returns found transactions", %{conn: conn, valid_attrs: valid_attrs} do
      transaction = transaction_fixture(valid_attrs)

      search_query = """
      {
        searchTransactions(min: 0.00, max: 0.50) {
          id
          description
          amount
          credit
          debit
        }
      }
      """

      conn = post(conn, "/api", %{
        "query" => search_query,
        "variables" => %{name: "some"}
      })

      assert json_response(conn, 200) == %{
        "data" => %{"searchTransactions" => [%{
          "id" => transaction.id, "description" => transaction.description, "amount" => "0.42", "credit" => transaction.credit, "debit" => transaction.debit
        }]}
      }
    end
  end
end
