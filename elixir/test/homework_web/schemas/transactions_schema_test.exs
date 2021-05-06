defmodule HomeworkWeb.TransactionsSchemaTest do
  use HomeworkWeb.ConnCase, async: true

  alias Homework.Companies
  alias Homework.Merchants
  alias Homework.Transactions
  alias Homework.Users

  setup do
    {:ok, company} = Companies.create_company(%{name: "Pfizer", credit_line: 100})
    {:ok, merchant} = Merchants.create_merchant(%{name: "merchant", description: "desc"})

    {:ok, user} =
      Users.create_user(%{
        dob: "1980-01-01",
        first_name: "Jane",
        last_name: "Doe",
        company_id: company.id
      })

    {:ok, transaction1} =
      Transactions.create_transaction(%{
        amount: 99,
        credit: false,
        debit: true,
        description: "purchase",
        merchant_id: merchant.id,
        user_id: user.id,
        company_id: company.id
      })

    {:ok, transaction2} =
      Transactions.create_transaction(%{
        amount: 99_99,
        credit: false,
        debit: true,
        description: "purchase2",
        merchant_id: merchant.id,
        user_id: user.id,
        company_id: company.id
      })

    {:ok, transaction3} =
      Transactions.create_transaction(%{
        amount: 9_99,
        credit: true,
        debit: false,
        description: "payment1",
        merchant_id: merchant.id,
        user_id: user.id,
        company_id: company.id
      })

    {:ok,
     %{
       all_transactions: [transaction1, transaction2, transaction3],
       transaction1: transaction1,
       transaction2: transaction2,
       transaction3: transaction3,
       company: company,
       user: user,
       merchant: merchant
     }}
  end

  test "resolves lookups", %{
    all_transactions: transactions,
    company: company,
    user: user,
    merchant: merchant
  } do
    query = """
      {
        transactions {
          credit
          debit
          description
          merchant {
            name
          }
          user {
            firstName
            lastName
          }
          company {
            name
          }
        }
      }
    """

    assert {:ok, %{data: data}} = Absinthe.run(query, HomeworkWeb.Schema, context: %{})

    expected_transactions =
      Enum.map(transactions, fn transaction ->
        %{
          "credit" => transaction.credit,
          "debit" => transaction.debit,
          "description" => transaction.description,
          "merchant" => %{"name" => merchant.name},
          "user" => %{"firstName" => user.first_name, "lastName" => user.last_name},
          "company" => %{"name" => company.name}
        }
      end)

    assert MapSet.new(data["transactions"]) == MapSet.new(expected_transactions)
  end

  test "creates transactions", %{company: company, user: user, merchant: merchant} do
    mutation = """
      mutation($amount: Int!, $credit: Boolean!, $debit: Boolean!, $description: String!, $merchant: ID!, $user: ID!, $company: ID!) {
        createTransaction(amount: $amount, credit: $credit, debit: $debit, description: $description, merchant_id: $merchant, user_id: $user, company_id: $company) {
          id
          amount
          debit
          credit
          description
          merchant {
            name
          }
          user {
            firstName
            lastName
          }
          company {
            name
          }
        }
      }
    """

    args = %{
      "amount" => 10_00,
      "debit" => true,
      "credit" => false,
      "description" => "newly created",
      "merchant" => merchant.id,
      "user" => user.id,
      "company" => company.id
    }

    assert {:ok, %{data: %{"createTransaction" => result}}} =
             Absinthe.run(mutation, HomeworkWeb.Schema, variables: args)

    assert Map.delete(result, "id") == %{
             "amount" => 10_00,
             "credit" => false,
             "debit" => true,
             "description" => "newly created",
             "merchant" => %{"name" => merchant.name},
             "user" => %{"firstName" => user.first_name, "lastName" => user.last_name},
             "company" => %{"name" => company.name}
           }

    assert is_binary(Map.get(result, "id"))
  end

  test "updates transactions", %{transaction1: transaction} do
    {:ok, new_company} = Companies.create_company(%{name: "Johnson & Johnson", credit_line: 100})
    {:ok, new_merchant} = Merchants.create_merchant(%{name: "new merchant", description: "desc2"})

    {:ok, new_user} =
      Users.create_user(%{
        dob: "1990-01-01",
        first_name: "John",
        last_name: "Smith",
        company_id: new_company.id
      })

    mutation = """
      mutation($id: ID!, $amount: Int!, $credit: Boolean!, $debit: Boolean!, $description: String!, $merchant: ID!, $user: ID!, $company: ID!) {
        updateTransaction(id: $id, amount: $amount, credit: $credit, debit: $debit, description: $description, merchant_id: $merchant, user_id: $user, company_id: $company) {
          amount
          debit
          credit
          description
          merchant {
            name
          }
          user {
            firstName
            lastName
          }
          company {
            name
          }
        }
      }
    """

    args = %{
      "id" => transaction.id,
      "amount" => transaction.amount * 2,
      "debit" => !transaction.debit,
      "credit" => !transaction.credit,
      "description" => "modified",
      "merchant" => new_merchant.id,
      "user" => new_user.id,
      "company" => new_company.id
    }

    assert {:ok, %{data: %{"updateTransaction" => result}}} =
             Absinthe.run(mutation, HomeworkWeb.Schema, variables: args)

    assert result == %{
             "amount" => transaction.amount * 2,
             "credit" => !transaction.credit,
             "debit" => !transaction.debit,
             "description" => "modified",
             "merchant" => %{"name" => new_merchant.name},
             "user" => %{"firstName" => new_user.first_name, "lastName" => new_user.last_name},
             "company" => %{"name" => new_company.name}
           }
  end

  test "deletes transactions", %{transaction1: transaction} do
    mutation = """
      mutation($transaction: ID!) {
        deleteTransaction(id: $transaction) {
          id
        }
      }
    """

    args = %{"transaction" => transaction.id}

    assert {:ok, %{data: %{"deleteTransaction" => result}}} =
             Absinthe.run(mutation, HomeworkWeb.Schema, variables: args)

    assert result == %{"id" => transaction.id}
  end
end
