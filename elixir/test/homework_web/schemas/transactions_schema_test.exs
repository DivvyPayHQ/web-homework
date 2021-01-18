defmodule HomeworkWeb.Schemas.TransactionsSchemaTest do
  use HomeworkWeb.ConnCase, async: true

  import Homework.CompaniesFixtures, only: [company_fixture: 0]
  import Homework.UsersFixtures, only: [user_fixture: 1]

  setup %{conn: conn} do
    %{id: company_id} = company_fixture()
    %{id: user_id} = user_fixture(%{company_id: company_id})

    {:ok, %{id: merchant_id}} =
      Homework.Merchants.create_merchant(%{description: "some description", name: "some name"})

    %{conn: conn, company_id: company_id, user_id: user_id, merchant_id: merchant_id}
  end

  describe "mutation: createTransaction" do
    @create_transaction_mutation """
    mutation (
      $companyId: ID,
      $userId: ID,
      $merchantId: ID,
      $amount: Int,
      $credit: Boolean,
      $debit: Boolean,
      $description: String
    ) {
      createTransaction(
        companyId: $companyId,
        userId: $userId,
        merchantId: $merchantId,
        amount: $amount,
        credit: $credit,
        debit: $debit,
        description: $description
      ) {
        companyId
        userId
        merchantId
        amount
        credit
        debit
        description
      }
    }
    """

    test "creates a transaction with valid fields", %{
      conn: conn,
      company_id: company_id,
      user_id: user_id,
      merchant_id: merchant_id
    } do
      transaction_vars = %{
        "companyId" => company_id,
        "userId" => user_id,
        "merchantId" => merchant_id,
        "amount" => 10_000,
        "credit" => false,
        "debit" => true,
        "description" => "I bought something again"
      }

      conn =
        post(conn, "/graphiql", %{
          "query" => @create_transaction_mutation,
          "variables" => transaction_vars
        })

      assert json_response(conn, 200) == %{
               "data" => %{
                 "createTransaction" => transaction_vars
               }
             }
    end
  end
end
