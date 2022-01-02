defmodule Homework.CompaniesResolverTest do
  use HomeworkWeb.ConnCase

  alias Homework.Companies

  describe "companies" do
    @valid_attrs %{available_credit: 4200, credit_line: 4200, name: "some name"}
    @update_attrs %{id: nil, available_credit: 4300, credit_line: 4300, name: "some updated name"}
    #@invalid_attrs %{available_credit: nil, credit_line: nil, name: nil}

    def company_fixture(attrs \\ %{}) do
      {:ok, merchant} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Companies.create_company()

      merchant
    end

    test "list returns all companies", %{conn: conn} do
      company = company_fixture()

      list_query = """
      {
        companies {
          id
          name
          creditLine
          availableCredit
        }
      }
      """

      conn = post(conn, "/api", %{
        "query" => list_query,
        "variables" => nil
      })

      assert json_response(conn, 200) == %{
        "data" => %{"companies" => [%{"availableCredit" => "42.00", "creditLine" => "42.00", "id" => company.id, "name" => company.name}]}
      }
    end

    test "create with valid data creates company", %{conn: conn} do
      create_query = """
      mutation CreateCompany {
        createCompany(name: "some name", creditLine: 42.00) {
          name
          creditLine
          availableCredit
        }
      }
      """

      # IO.inspect(create_query)

      conn = post(conn, "/api", %{
        "query" => create_query,
        "variables" => @valid_attrs
      })

      # body = json_response(conn, 200)
      # IO.inspect(body)

      assert json_response(conn, 200) == %{
        "data" => %{"createCompany" => %{"creditLine" => "42.00", "name" => "some name", "availableCredit" => nil}}
      }
    end

    test "update with valid data update company", %{conn: conn} do
      company = company_fixture()

      update_query = """
      mutation UpdateCompany {
        updateCompany(id: "#{company.id}", name: "some updated name", creditLine: 43.00) {
          id
          name
          creditLine
        }
      }
      """

      conn = post(conn, "/api", %{
        "query" => update_query,
        "variables" => %{@update_attrs | id: company.id}
      })

      assert json_response(conn, 200) == %{
        "data" => %{"updateCompany" => %{"creditLine" => "43.00", "id" => company.id, "name" => "some updated name"}}
      }
    end

    test "delete removes company", %{conn: conn} do
      company = company_fixture()

      delete_query = """
      mutation DeleteCompany {
        deleteCompany(id: "#{company.id}") {
          id
          name
        }
      }
      """

      conn = post(conn, "/api", %{
        "query" => delete_query,
        "variables" => %{id: company.id}
      })

      assert json_response(conn, 200) == %{
        "data" => %{"deleteCompany" => %{"id" => company.id, "name" => company.name}}
      }
    end

    test "search returns found companies", %{conn: conn} do
      company = company_fixture()

      search_query = """
      {
        searchCompanies(name: "some gnome") {
          id
          name
        }
      }
      """

      conn = post(conn, "/api", %{
        "query" => search_query,
        "variables" => %{name: "some"}
      })

      assert json_response(conn, 200) == %{
        "data" => %{"searchCompanies" => [%{"id" => company.id, "name" => company.name}]}
      }
    end
  end
end
