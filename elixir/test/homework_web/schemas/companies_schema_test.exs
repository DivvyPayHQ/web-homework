defmodule HomeworkWeb.CompaniesSchemaTest do
  use HomeworkWeb.ConnCase, async: true

  alias Homework.Companies
  alias Homework.Merchants
  alias Homework.Transactions
  alias Homework.Users

  setup do
    {:ok, co1} = Companies.create_company(%{name: "Pfizer", credit_line: 100})
    {:ok, _} = Companies.create_company(%{name: "Moderna", credit_line: 500})
    {:ok, merchant} = Merchants.create_merchant(%{name: "merchant", description: "desc"})

    {:ok, user} =
      Users.create_user(%{
        dob: "1980-01-01",
        first_name: "Jane",
        last_name: "Doe",
        company_id: co1.id
      })

    {:ok, transaction} =
      Transactions.create_transaction(%{
        amount: 99,
        credit: false,
        debit: true,
        description: "purchase",
        merchant_id: merchant.id,
        user_id: user.id,
        company_id: co1.id
      })

    {:ok,
     %{
       company1: co1,
       user: user,
       transaction: transaction
     }}
  end

  test "resolves lookups" do
    query = """
      {
        companies {
          name
          creditLine
          availableCredit
        }
      }
    """

    assert {:ok, %{data: data}} = Absinthe.run(query, HomeworkWeb.Schema, context: %{})

    assert MapSet.new(data["companies"]) ==
             MapSet.new([
               %{"name" => "Pfizer", "creditLine" => 100, "availableCredit" => 1},
               %{"name" => "Moderna", "creditLine" => 500, "availableCredit" => 500}
             ])
  end

  test "resolves queries filtering on name" do
    query = """
      {
        companies(namedLike: "Mod") {
          name
        }
      }
    """

    assert {:ok, %{data: data}} = Absinthe.run(query, HomeworkWeb.Schema, context: %{})
    assert data["companies"] == [%{"name" => "Moderna"}]
  end

  test "creates companies" do
    mutation = """
      mutation($creditLine: Int!, $name: String!) {
        createCompany(creditLine: $creditLine, name: $name) {
          id
          name
        }
      }
    """

    args = %{
      "creditLine" => 10_00,
      "name" => "newly created"
    }

    assert {:ok, %{data: %{"createCompany" => result}}} =
             Absinthe.run(mutation, HomeworkWeb.Schema, variables: args)

    assert result["name"] == "newly created"
    assert is_binary(Map.get(result, "id"))
  end

  test "updates companies", %{company1: company} do
    mutation = """
      mutation($id: ID!, $creditLine: Int!, $name: String!) {
        updateCompany(id: $id, creditLine: $creditLine, name: $name) {
          id
          name
          creditLine
        }
      }
    """

    args = %{
      "id" => company.id,
      "creditLine" => 100_00,
      "name" => "modified"
    }

    assert {:ok, %{data: %{"updateCompany" => result}}} =
             Absinthe.run(mutation, HomeworkWeb.Schema, variables: args)

    assert result == %{
             "id" => company.id,
             "creditLine" => 100_00,
             "name" => "modified"
           }
  end

  test "deletes companies", %{company1: company, user: user, transaction: transaction} do
    mutation = """
      mutation($company: ID!, $transaction: ID!, $user: ID!) {
        deleteTransaction(id: $transaction) {
          id
        }

        deleteUser(id: $user) {
          id
        }

        deleteCompany(id: $company) {
          id
        }
      }
    """

    args = %{
      "user" => user.id,
      "transaction" => transaction.id,
      "company" => company.id
    }

    assert {:ok, %{data: _}} = Absinthe.run(mutation, HomeworkWeb.Schema, variables: args)

    query = """
      {
        companies(namedLike: "Pfizer") {
          name
        }
      }
    """

    assert {:ok, %{data: data}} = Absinthe.run(query, HomeworkWeb.Schema, context: %{})
    assert data["companies"] == []
  end
end
