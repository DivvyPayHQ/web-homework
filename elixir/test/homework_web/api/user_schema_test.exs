defmodule HomeworkWeb.UserSchemaTest do
  use HomeworkWeb.ConnCase, async: true

  test "gets a list of users", %{conn: conn} do
    insert(:user, first_name: "alice", last_name: "allen", tid: "alice")
    insert(:user, first_name: "bobby", last_name: "baker", tid: "bobby")
    insert(:user, first_name: "conor", last_name: "clark", tid: "conor")

    conn =
      get(conn, "/", %{
        "query" => """
        {
          users {
            firstName
            lastName
          }
        }
        """
      })

    assert json_response(conn, 200) == %{
             "data" => %{
               "users" => [
                 %{"firstName" => "alice", "lastName" => "allen"},
                 %{"firstName" => "bobby", "lastName" => "baker"},
                 %{"firstName" => "conor", "lastName" => "clark"}
               ]
             }
           }
  end

  test "creates a user" do
    company = insert(:company)

    mutation = """
      mutation createUser($companyId: ID, $dob: String, $firstName: String, $lastName: String) {
        createUser(companyId: $companyId, dob: $dob, firstName: $firstName, lastName: $lastName) {
          dob
          firstName
          lastName
        }
      }
    """

    variables = %{
      "companyId" => company.id,
      "dob" => "1998-01-30",
      "firstName" => "alice",
      "lastName" => "allen"
    }

    conn =
      build_conn()
      |> post("/", %{"query" => mutation, variables: variables})

    assert json_response(conn, 200) == %{
             "data" => %{
               "createUser" => %{
                 "dob" => "1998-01-30",
                 "firstName" => "alice",
                 "lastName" => "allen"
               }
             }
           }
  end
end
