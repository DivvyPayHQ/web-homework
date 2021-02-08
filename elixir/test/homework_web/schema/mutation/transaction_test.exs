defmodule HomeworkWeb.Mutation.TransactionTest do
  use HomeworkWeb.ConnCase, async: true

  import Homework.Factory

  describe "transaction" do
    setup do
      merchant = insert(:merchant)
      user = insert(:user)

      {:ok, merchant: merchant, user: user}
    end

    test "should create a new transaction", context do
      %{user: user, merchant: merchant} = context
      tx = build(:transaction, user: user, merchant: merchant)

      response =
        build_conn()
        |> post("graphql",
          query: """
          mutation CreateTransaction($input: CreateTransactionInput!) {
            createTransaction(input: $input) {
              id
              amount
              credit
              debit
              description
              user {
                id
                firstName
              }
              merchant {
                id
                name
              }
            }
          }
          """,
          variables: %{
            input: %{
              "amount" => tx.amount,
              "credit" => tx.credit,
              "debit" => tx.debit,
              "description" => tx.description,
              "merchantId" => merchant.id,
              "userId" => user.id
            }
          }
        )
        |> json_response(200)

      %{
        "data" => %{
          "createTransaction" => created_tx
        }
      } = response

      assert created_tx["amount"] == tx.amount
      assert created_tx["credit"] == tx.credit
      assert created_tx["debit"] == tx.debit
    end

    test "should update a given transaction", context do
      %{user: user, merchant: merchant} = context

      tx = insert(:transaction, user: user, merchant: merchant)

      response =
        build_conn()
        |> post("graphql",
          query: """
          mutation UpdateTransaction($input: UpdateTransactionInput!) {
            updateTransaction(input: $input) {
              id
              amount
              credit
              debit
              description
            }
          }
          """,
          variables: %{
            input: %{
              id: tx.id,
              amount: 42,
              merchantId: merchant.id,
              userId: user.id
            }
          }
        )
        |> json_response(200)

      %{
        "data" => %{
          "updateTransaction" => updated_tx
        }
      } = response

      assert updated_tx["amount"] == 42
    end

    test "should delete a transaction", context do
      %{user: user, merchant: merchant} = context

      tx = insert(:transaction, user: user, merchant: merchant)

      response =
        build_conn()
        |> post("graphql",
          query: """
          mutation DeleteTransaction($id: ID!) {
            deleteTransaction(id: $id) {
              id
            }
          }
          """,
          variables: %{
            "id" => tx.id
          }
        )
        |> json_response(200)

      %{
        "data" => %{
          "deleteTransaction" => %{
            "id" => id
          }
        }
      } = response

      assert id == tx.id
    end
  end
end
