defmodule HomeworkWeb.Schemas.CompaniesSchemaTest do
  use HomeworkWeb.ConnCase, async: true

  import Homework.CompaniesFixtures, only: [company_fixture: 0]
  import Homework.TransactionsFixtures, only: [transaction_fixture: 1]

  describe "query: companies" do
    @companies_query """
    query {
      companies {
        id
        name
        availableCredit
      }
    }
    """

    test "returns an array of companies", %{conn: conn} do
      company1 = company_fixture()
      company2 = company_fixture()

      company1_transaction = transaction_fixture(%{company_id: company1.id, amount: 10})

      conn =
        post(conn, "/graphiql", %{
          "query" => @companies_query
        })

      assert json_response(conn, 200) == %{
               "data" => %{
                 "companies" => [
                   %{
                     "id" => company1.id,
                     "name" => company1.name,
                     "availableCredit" => company1.credit_line - company1_transaction.amount
                   },
                   %{
                     "id" => company2.id,
                     "name" => company2.name,
                     "availableCredit" => company1.credit_line
                   }
                 ]
               }
             }
    end
  end

  describe "mutation: createCompany" do
    @create_company_mutation """
    mutation ($name: String, $creditLine: Int) {
      createCompany(name: $name, creditLine: $creditLine) {
        name
        creditLine
        availableCredit
      }
    }
    """

    test "creates a company with valid fields", %{conn: conn} do
      company_vars = %{
        "name" => "Company Name ABC",
        "creditLine" => 123
      }

      conn =
        post(conn, "/graphiql", %{
          "query" => @create_company_mutation,
          "variables" => company_vars
        })

      assert json_response(conn, 200) == %{
               "data" => %{
                 "createCompany" => %{
                   "availableCredit" => 123,
                   "creditLine" => 123,
                   "name" => "Company Name ABC"
                 }
               }
             }
    end
  end
end
