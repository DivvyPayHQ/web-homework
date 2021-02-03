defmodule Homework.ResolversTest.User do
  use Homework.DataCase

  alias Homework.Users

  @valid_attrs %{dob: "1990-01-01", first_name: "Test", last_name: "Person"}

  def user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(@valid_attrs)
      |> Users.create_user()

    user
  end

  describe "user" do
    test "creates user with valid parameters" do
      mutation_create_user = """
        mutation createUser($dob: String!, $firstName:String!, $lastName:String!) {
          createUser(dob:$dob, firstName:$firstName, lastName:$lastName) {
            dob
            firstName
            lastName
          }
        }
      """
      input = %{"dob" => "1950-01-01", "firstName" => "test user firstname", "lastName" => "test user lastname"}
      response = Absinthe.run(mutation_create_user, HomeworkWeb.Schema, variables: input)

      # the output should match the input, so we can reuse it in the assert
      assert response == {:ok, %{data: %{"createUser" => input}}}
    end

    test "updates user with valid parameters" do
      user = user_fixture()
      mutation_update_user = """
        mutation updateUser($id:ID!, $dob:String!, $firstName:String!, $lastName:String!) {
          updateUser(id:$id, dob:$dob, firstName:$firstName, lastName:$lastName) {
            id
            dob
            firstName
            lastName
          }
        }
      """
      input = %{"id" => user.id, "dob" => "1990-01-01", "firstName" => "updated test user firstname", "lastName" => "updated test user lastname"}
      response = Absinthe.run(mutation_update_user, HomeworkWeb.Schema, variables: input)

      # the output should match the input, so we can reuse it in the assert
      assert response == {:ok, %{data: %{"updateUser" => input}}}
    end

    test "deletes user" do
      user = user_fixture()
      mutation_delete_user = """
        mutation deleteUser($id:ID!) {
          deleteUser(id:$id) {
            id
          }
        }
      """
      input = %{"id" => user.id}
      response = Absinthe.run(mutation_delete_user, HomeworkWeb.Schema, variables: input)

      # the output should match the input, so we can reuse it in the assert
      assert response == {:ok, %{data: %{"deleteUser" => input}}}
      assert_raise Ecto.NoResultsError, fn -> Users.get_user!(user.id) end
    end
  end
end
