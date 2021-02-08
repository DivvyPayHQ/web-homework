defmodule HomeworkWeb.Query.UsersTest do
  use HomeworkWeb.ConnCase, async: true

  import Homework.Factory

  describe "users" do
    @query """
    query ListUsers {
      users {
        id
        dob
        firstName
        lastName
      }
    }
    """

    test "should return an empty list" do
      response =
        build_conn()
        |> get("graphql", query: @query)

      expected = %{
        "data" => %{
          "users" => []
        }
      }

      assert expected == json_response(response, 200)
    end

    test "should return a list of users" do
      [user1, user2, user3] = insert_list(3, :user)

      response =
        build_conn()
        |> get("graphql", query: @query)

      expected = %{
        "data" => %{
          "users" => [
            %{
              "id" => user1.id,
              "dob" => user1.dob,
              "firstName" => user1.first_name,
              "lastName" => user1.last_name
            },
            %{
              "id" => user2.id,
              "dob" => user2.dob,
              "firstName" => user2.first_name,
              "lastName" => user2.last_name
            },
            %{
              "id" => user3.id,
              "dob" => user3.dob,
              "firstName" => user3.first_name,
              "lastName" => user3.last_name
            }
          ]
        }
      }

      assert expected == json_response(response, 200)
    end
  end

  describe "user" do
  end
end
