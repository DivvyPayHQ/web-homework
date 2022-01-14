defmodule HomeworkWeb.Schema.CompaniesTest do
  import Homework.Factory
  use HomeworkWeb.ConnCase, async: true

  @transaction """
  {
    amount
    companyId
    credit
    debit
    description
    id
    insertedAt
    merchantId
    updatedAt
    userId
  }
  """

  @user """
  {
    dob
    firstName
    id
    insertedAt
    lastName
    updatedAt
  }
  """

  @company """
  {
    available_credit
    credit_line
    id
    inserted_at
    name
    transactions #{@transaction}
    updated_at
    users #{@user}
  }
  """

  @companies_query """
  query Companies {
    companies #{@company}
  }
  """

  @company_query """
  query Company(
    $id: ID!
  ){
    company(
      id: $id
    ) #{@company}
  }
  """

  @create_company_query """
  mutation CreateCompany(
    $availableCredit: Int!
    $creditLine: Int!
    $name: String!
  ){
    createCompany(
      availableCredit: $availableCredit
      creditLine: $creditLine
      name: $name
    ) #{@company}
  }
  """

  @delete_company_query """
  mutation DeleteCompany(
    $id: ID!
  ){
    deleteCompany(
      id: $id
    ) #{@company}
  }
  """

  @update_company_query """
  mutation UpdateCompany(
    $creditLine: Int
    $id: ID!
    $name: String
  ){
    updateCompany(
      creditLine: $creditLine
      id: $id
      name: $name
    ) #{@company}
  }
  """

  defp graphql_host(conn, opts) do
    conn
    |> post("/graphiql", %{
      query: Keyword.get(opts, :query, ""),
      variables: Keyword.get(opts, :variables, %{})
    })
    |> json_response(200)
  end

  describe "companies" do
    setup do: [companies: Enum.map(0..5, fn _ -> insert!(:company) end)]

    test "gets companies", context do
      %{id: company_0_id} = company_0 = Enum.at(context.companies, 0)
      %{id: company_2_id} = company_2 = Enum.at(context.companies, 2)
      %{id: company_4_id} = company_4 = Enum.at(context.companies, 4)

      company_0_users = Enum.map(0..2, fn _ -> insert!(:user, %{company: company_0}) end)
      Enum.each(0..5, fn _ -> insert!(:user, %{company: company_2}) end)
      company_4_users = Enum.map(0..3, fn _ -> insert!(:user, %{company: company_4}) end)

      # company_0: 3 users each with 4 transactions : 12 total transactions
      Enum.each(company_0_users, fn u ->
        Enum.each(0..3, fn _ -> insert!(:transaction, %{company: u.company, user: u}) end)
      end)

      # company_4: 4 users each with 5 transactions : 20 total transactions
      Enum.each(company_4_users, fn u ->
        Enum.each(0..4, fn _ -> insert!(:transaction, %{company: u.company, user: u}) end)
      end)

      conn = Map.get(context, :conn)
      body = graphql_host(conn, query: @companies_query)
      refute body["errors"]
      companies = body["data"]["companies"]

      assert 6 = length(companies)

      :ok =
        Enum.each(companies, fn c ->
          assert Map.has_key?(c, "available_credit")
          assert Map.has_key?(c, "credit_line")
          assert Map.has_key?(c, "id")
          assert Map.has_key?(c, "inserted_at")
          assert Map.has_key?(c, "name")
          assert Map.has_key?(c, "updated_at")
          assert Map.has_key?(c, "users")

          case c["id"] do
            ^company_0_id ->
              assert 3 = length(c["users"])
              assert 12 = length(c["transactions"])

            ^company_2_id ->
              assert 6 = length(c["users"])
              assert 0 = length(c["transactions"])

            ^company_4_id ->
              assert 4 = length(c["users"])
              assert 20 = length(c["transactions"])

            _ ->
              assert 0 = length(c["users"])
              assert 0 = length(c["transactions"])
          end
        end)
    end

    test "gets a company", context do
      %{id: company_id} = company = Enum.at(context.companies, 0)
      company_users = Enum.map(0..2, fn _ -> insert!(:user, %{company: company}) end)

      # company: 3 users each with 3 transactions : 9 total transactions
      Enum.each(company_users, fn u ->
        Enum.each(0..2, fn _ -> insert!(:transaction, %{company: u.company, user: u}) end)
      end)

      variables = %{
        id: company_id
      }

      conn = Map.get(context, :conn)
      body = graphql_host(conn, query: @company_query, variables: variables)
      refute body["errors"]
      c = body["data"]["company"]

      assert Map.get(c, "available_credit") == company.available_credit
      assert Map.get(c, "credit_line") == company.credit_line
      assert Map.get(c, "id") == company_id

      assert Map.get(c, "inserted_at") ==
               company.inserted_at |> NaiveDateTime.to_string() |> String.replace(" ", "T")

      assert Map.get(c, "name") == company.name
      assert length(Map.get(c, "transactions")) == 9

      assert Map.get(c, "updated_at") ==
               company.updated_at |> NaiveDateTime.to_string() |> String.replace(" ", "T")

      assert length(Map.get(c, "users")) == 3
    end

    test "gets a company: handles no result error gracefully", %{conn: conn} do
      variables = %{
        id: Ecto.UUID.generate()
      }

      body = graphql_host(conn, query: @company_query, variables: variables)
      assert body["errors"]
      [errors | _] = body["errors"]
      assert errors["message"] =~ "could not get company: no result"
    end

    test "creates a company", %{conn: conn} do
      variables = %{
        availableCredit: 10_000,
        creditLine: 10_000,
        name: "Worthington Industries"
      }

      body = graphql_host(conn, query: @create_company_query, variables: variables)
      refute body["errors"]
      c = body["data"]["createCompany"]

      assert Map.get(c, "available_credit") == variables.availableCredit
      assert Map.get(c, "credit_line") == variables.creditLine
      assert Map.has_key?(c, "id")
      assert Map.has_key?(c, "inserted_at")
      assert Map.get(c, "name") == variables.name
      assert Map.get(c, "transactions") == []
      assert Map.has_key?(c, "updated_at")
      assert Map.get(c, "users") == []
    end

    test "deletes a company", context do
      %{id: company_id} = Enum.at(context.companies, 0)

      variables = %{
        id: company_id
      }

      conn = Map.get(context, :conn)
      body = graphql_host(conn, query: @delete_company_query, variables: variables)
      refute body["errors"]

      # confirm actually deleted
      body = graphql_host(conn, query: @company_query, variables: variables)
      assert body["errors"]
      [errors | _] = body["errors"]
      assert errors["message"] =~ "could not get company: no result"
    end

    test "updates a company", context do
      %{credit_line: company_credit_line, id: company_id, name: company_name} =
        Enum.at(context.companies, 0)

      variables = %{
        creditLine: 4242,
        id: company_id,
        name: "Serval Industries"
      }

      assert company_credit_line != variables.creditLine
      assert company_id == variables.id
      assert company_name != variables.name

      conn = Map.get(context, :conn)
      body = graphql_host(conn, query: @update_company_query, variables: variables)
      refute body["errors"]
      c = body["data"]["updateCompany"]

      assert Map.get(c, "credit_line") == variables.creditLine
      assert Map.get(c, "id") == variables.id
      assert Map.get(c, "name") == variables.name
    end
  end
end
