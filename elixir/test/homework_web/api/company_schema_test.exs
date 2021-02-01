defmodule HomeworkWeb.CompanySchemaTest do
  use HomeworkWeb.ConnCase, async: true

  test "get a list of companies", %{conn: conn} do
    insert(:company, name: "walmart")
    insert(:company, name: "amazon")
    insert(:company, name: "exxon")

    conn =
      get(conn, "/", %{
        "query" => """
        {
          companies {
            name
          }
        }
        """
      })

    assert json_response(conn, 200) == %{
             "data" => %{
               "companies" => [
                 %{"name" => "walmart"},
                 %{"name" => "amazon"},
                 %{"name" => "exxon"}
               ]
             }
           }
  end

  test "create a company" do
    mutation = """
      mutation createCompany($name: String, $creditLine: Int) {
        createCompany(name: $name, creditLine: $creditLine) {
          name
          credit_line
        }
      }
    """

    variables = %{
      "name" => "walmart",
      "creditLine" => 10_000_00
    }

    conn =
      build_conn()
      |> post("/", %{"query" => mutation, variables: variables})

    assert json_response(conn, 200) == %{
             "data" => %{
               "createCompany" => %{
                 "name" => "walmart",
                 "credit_line" => 10_000_00
               }
             }
           }
  end

  test "update a company" do
    company = insert(:company, name: "almart")

    mutation = """
      mutation updateCompany($id: ID, $name: String, $creditLine: Int) {
        updateCompany(id: $id, name: $name, creditLine: $creditLine) {
          name
        }
      }
    """

    variables = %{
      "id" => company.id,
      "name" => "walmart",
      "creditLine" => 10_000_00
    }

    conn =
      build_conn()
      |> post("/", %{"query" => mutation, variables: variables})

    assert json_response(conn, 200) == %{
             "data" => %{
               "updateCompany" => %{
                 "name" => "walmart"
               }
             }
           }
  end

  test "delete a company" do
    company = insert(:company, name: "walmart")

    mutation = """
      mutation deleteCompany($id: ID) {
        deleteCompany(id: $id) {
          name
        }
      }
    """

    variables = %{
      "id" => company.id
    }

    conn =
      build_conn()
      |> post("/", %{"query" => mutation, variables: variables})

    assert json_response(conn, 200) == %{
             "data" => %{
               "deleteCompany" => %{
                 "name" => "walmart"
               }
             }
           }
  end
end
