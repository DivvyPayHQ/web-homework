defmodule HomeworkWeb.Schemas.UsersSchemaTest do
  use HomeworkWeb.ConnCase, async: true

  import Homework.CompaniesFixtures, only: [company_fixture: 0]
  import Homework.UsersFixtures, only: [user_fixture: 0]

  describe "mutation: createUser" do
    @create_user_mutation """
    mutation ($firstName: String, $lastName: String, $dob: String, $companyId: ID) {
      createUser(firstName: $firstName, lastName: $lastName, dob: $dob, companyId: $companyId) {
        firstName
        lastName
        dob
        companyId
      }
    }
    """

    test "creates a user with valid fields", %{conn: conn} do
      %{id: company_id} = company_fixture()

      user_vars = %{
        "firstName" => "Tester",
        "lastName" => "McTesterson",
        "dob" => "why is this a string field?",
        "companyId" => company_id
      }

      conn =
        post(conn, "/graphiql", %{
          "query" => @create_user_mutation,
          "variables" => user_vars
        })

      assert json_response(conn, 200) == %{
               "data" => %{
                 "createUser" => user_vars
               }
             }
    end
  end

  describe "mutation: updateUser" do
    @update_user_mutation """
    mutation ($id: ID, $firstName: String, $lastName: String, $dob: String, $companyId: ID) {
      updateUser(id: $id, firstName: $firstName, lastName: $lastName, dob: $dob, companyId: $companyId) {
        id
        firstName
        lastName
        dob
        companyId
      }
    }
    """

    test "updates a user with valid fields", %{conn: conn} do
      %{id: existing_user_id} = user_fixture()
      %{id: new_company_id} = company_fixture()

      user_vars = %{
        "id" => existing_user_id,
        "firstName" => "Updated First Name",
        "lastName" => "Updated Last Name",
        "dob" => "Updated DOB",
        "companyId" => new_company_id
      }

      conn =
        post(conn, "/graphiql", %{
          "query" => @update_user_mutation,
          "variables" => user_vars
        })

      assert json_response(conn, 200) == %{
               "data" => %{
                 "updateUser" => user_vars
               }
             }
    end
  end
end
