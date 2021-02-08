defmodule HomeworkWeb.Mutation.UserTest do
  use HomeworkWeb.ConnCase, async: true

  import Homework.Factory

  describe "user" do
    test "should create a new user" do
      user = build(:user)

      response =
        build_conn()
        |> post("graphql",
          query: """
          mutation CreateUser($input: CreateUserInput!) {
            createUser(input: $input) {
              id
              dob
              firstName
              lastName
            }
          }
          """,
          variables: %{
            input: %{
              "dob" => user.dob,
              "firstName" => user.first_name,
              "lastName" => user.last_name
            }
          }
        )
        |> json_response(200)

      %{
        "data" => %{
          "createUser" => created_user
        }
      } = response

      assert created_user["dob"] == user.dob
      assert created_user["firstName"] == user.first_name
      assert created_user["lastName"] == user.last_name
    end
  end

  test "should update a given user" do
    user = insert(:user)

    response =
      build_conn()
      |> post("graphql",
        query: """
        mutation UpdateUser($input: UpdateUserInput!) {
          updateUser(input: $input) {
            id
            dob
            firstName
            lastName
          }
        }
        """,
        variables: %{
          input: %{
            "id" => user.id,
            "firstName" => "Petzl"
          }
        }
      )
      |> json_response(200)

    %{
      "data" => %{
        "updateUser" => updated_user
      }
    } = response

    assert updated_user["firstName"] == "Petzl"
  end

  test "should delete a user" do
    user = insert(:user)

    response =
      build_conn()
      |> post("graphql",
        query: """
        mutation DeleteUser($id: ID!) {
          deleteUser(id: $id) {
            id
          }
        }
        """,
        variables: %{
          "id" => user.id
        }
      )
      |> json_response(200)

    %{
      "data" => %{
        "deleteUser" => %{
          "id" => id
        }
      }
    } = response

    assert id == user.id
  end
end
