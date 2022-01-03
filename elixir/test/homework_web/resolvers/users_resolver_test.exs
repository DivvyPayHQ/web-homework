defmodule Homework.UsersResolverTest do
  use HomeworkWeb.ConnCase

  alias Homework.Users
  alias Homework.Companies

  describe "users" do
    setup do
      {:ok, company} =
        Companies.create_company(%{name: "some name", credit_line: 1000000})

      valid_attrs = %{company_id: company.id, dob: "some dob", first_name: "some first_name", last_name: "some last_name"}
      update_attrs = %{
        id: nil,
        company_id: company.id,
        dob: "some updated dob",
        first_name: "some updated first_name",
        last_name: "some updated last_name"
      }
      invalid_attrs = %{company_id: nil, dob: nil, first_name: nil, last_name: nil}

      {:ok,
       %{
         valid_attrs: valid_attrs,
         update_attrs: update_attrs,
         invalid_attrs: invalid_attrs,
         company: company,
       }}
    end

    def user_fixture(valid_attrs, attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(valid_attrs)
        |> Users.create_user()

      user
    end

    test "list returns all users", %{conn: conn, valid_attrs: valid_attrs} do
      user = user_fixture(valid_attrs)

      list_query = """
      {
        users {
          id
          firstName
          lastName
          dob
        }
      }
      """

      conn = post(conn, "/api", %{
        "query" => list_query,
        "variables" => nil
      })

      assert json_response(conn, 200) == %{
        "data" => %{"users" => [%{"id" => user.id, "firstName" => user.first_name, "lastName" => user.last_name, "dob" => user.dob}]}
      }
    end

    test "create with valid data creates user", %{conn: conn, valid_attrs: valid_attrs} do
      %{company_id: company_id, first_name: first_name, last_name: last_name, dob: dob} = valid_attrs

      create_query = """
      mutation CreateUser {
        createUser(companyId: "#{company_id}", firstName: "#{first_name}", lastName: "#{last_name}", dob: "#{dob}") {
          firstName
          lastName
          dob
        }
      }
      """

      conn = post(conn, "/api", %{
        "query" => create_query,
        "variables" => valid_attrs
      })

      assert json_response(conn, 200) == %{
        "data" => %{"createUser" => %{"firstName" => "#{first_name}", "lastName" => "#{last_name}", "dob" => "#{dob}"}}
      }
    end

    test "update with valid data update user", %{conn: conn, valid_attrs: valid_attrs, update_attrs: update_attrs} do
      user = user_fixture(valid_attrs)
      %{first_name: first_name, last_name: last_name, dob: dob} = update_attrs

      update_query = """
      mutation UpdateUser {
        updateUser(id: "#{user.id}", firstName: "#{first_name}", lastName: "#{last_name}", dob: "#{dob}") {
          id
          firstName
          lastName
          dob
        }
      }
      """

      conn = post(conn, "/api", %{
        "query" => update_query,
        "variables" => %{update_attrs | id: user.id}
      })

      assert json_response(conn, 200) == %{
        "data" => %{"updateUser" => %{"id" => user.id, "firstName" => "#{first_name}", "lastName" => "#{last_name}", "dob" => "#{dob}"}}
      }
    end

    test "delete removes user", %{conn: conn, valid_attrs: valid_attrs} do
      user = user_fixture(valid_attrs)

      delete_query = """
      mutation DeleteUser {
        deleteUser(id: "#{user.id}") {
          id
          firstName
          lastName
          dob
        }
      }
      """

      conn = post(conn, "/api", %{
        "query" => delete_query,
        "variables" => %{id: user.id}
      })

      assert json_response(conn, 200) == %{
        "data" => %{"deleteUser" => %{"id" => user.id, "firstName" => user.first_name, "lastName" => user.last_name, "dob" => user.dob}}
      }
    end

    test "search returns found users", %{conn: conn, valid_attrs: valid_attrs} do
      user = user_fixture(valid_attrs)

      search_query = """
      {
        searchUsers(firstName: "some first_gnome", lastName: "some last_gnome") {
          id
          firstName
          lastName
          dob
        }
      }
      """

      conn = post(conn, "/api", %{
        "query" => search_query,
        "variables" => %{name: "some"}
      })

      assert json_response(conn, 200) == %{
        "data" => %{"searchUsers" => [%{"id" => user.id, "firstName" => user.first_name, "lastName" => user.last_name, "dob" => user.dob}]}
      }
    end
  end
end
