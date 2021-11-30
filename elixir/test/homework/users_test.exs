defmodule Homework.UsersTest do
  use Homework.DataCase

  alias Homework.Users
  alias Homework.Companies
  alias HomeworkWeb.Resolvers.UsersResolver
  alias HomeworkWeb.Schema

  describe "users" do
    alias Homework.Users.User

    setup do
      {:ok, company1} =
        Companies.create_company(%{
          available_credit: 50000,
          credit_line: 100_000,
          name: "some name"
        })

      {:ok, company2} =
        Companies.create_company(%{
          available_credit: 50000,
          credit_line: 80000,
          name: "some name"
        })

      valid_attrs = %{
        dob: "some dob",
        first_name: "some first_name",
        last_name: "some last_name",
        company_id: company1.id
      }

      update_attrs = %{
        dob: "some updated dob",
        first_name: "some updated first_name",
        last_name: "some updated last_name",
        company_id: company2.id
      }

      invalid_attrs = %{dob: nil, first_name: nil, last_name: nil, company_id: nil}

      {:ok,
       %{
         valid_attrs: valid_attrs,
         update_attrs: update_attrs,
         invalid_attrs: invalid_attrs,
         company1: company1,
         company2: company2
       }}
    end

    def user_fixture(valid_attrs, attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(valid_attrs)
        |> Users.create_user()

      user
    end

    test "list_users/1 returns all users", %{valid_attrs: valid_attrs} do
      user = user_fixture(valid_attrs)
      assert Users.list_users([]) == [user]
    end

    test "get_user!/1 returns the user with given id", %{valid_attrs: valid_attrs} do
      user = user_fixture(valid_attrs)
      assert Users.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user", %{
      valid_attrs: valid_attrs,
      company1: company1
    } do
      assert {:ok, %User{} = user} = Users.create_user(valid_attrs)
      assert user.dob == "some dob"
      assert user.first_name == "some first_name"
      assert user.last_name == "some last_name"
      assert user.company_id == company1.id
    end

    test "create_user/1 with invalid data returns error changeset", %{
      invalid_attrs: invalid_attrs
    } do
      assert {:error, %Ecto.Changeset{}} = Users.create_user(invalid_attrs)
    end

    test "update_user/2 with valid data updates the user", %{
      valid_attrs: valid_attrs,
      update_attrs: update_attrs,
      company2: company2
    } do
      user = user_fixture(valid_attrs)
      assert {:ok, %User{} = user} = Users.update_user(user, update_attrs)
      assert user.dob == "some updated dob"
      assert user.first_name == "some updated first_name"
      assert user.last_name == "some updated last_name"
      assert user.company_id == company2.id
    end

    test "update_user/2 with invalid data returns error changeset", %{
      valid_attrs: valid_attrs,
      invalid_attrs: invalid_attrs
    } do
      user = user_fixture(valid_attrs)
      assert {:error, %Ecto.Changeset{}} = Users.update_user(user, invalid_attrs)
      assert user == Users.get_user!(user.id)
    end

    test "delete_user/1 deletes the user", %{valid_attrs: valid_attrs} do
      user = user_fixture(valid_attrs)
      assert {:ok, %User{}} = Users.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Users.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset", %{valid_attrs: valid_attrs} do
      user = user_fixture(valid_attrs)
      assert %Ecto.Changeset{} = Users.change_user(user)
    end

    test "users/3 returns all users using the users resolver", %{valid_attrs: valid_attrs} do
      user = user_fixture(valid_attrs)
      result = UsersResolver.users(nil, User, %{})

      assert {:ok, [user]} == result
    end

    test "createUser/4 creates a new user using the resolver mutation", %{
      valid_attrs: valid_attrs
    } do
      mutation = """
      mutation createUser($companyId: ID!, $dob: String!, $firstName: String!, $lastName: String!) {
        createUser(companyId: $companyId, dob: $dob, firstName: $firstName, lastName: $lastName) {
          companyId
          dob
          firstName
          lastName
        }
      }
      """

      user = user_fixture(valid_attrs)

      variables = %{
        "companyId" => user.company_id,
        "dob" => "01/01/2000",
        "firstName" => "Name",
        "lastName" => "Name"
      }

      result = Absinthe.run(mutation, Schema, variables: variables)

      assert result ==
               {:ok, %{data: %{"createUser" => variables}}}
    end

    test "updateUser/5 creates an updated user using the resolver mutation", %{
      valid_attrs: valid_attrs
    } do
      mutation = """
      mutation updateUser($companyId: ID!, $dob: String!, $firstName: String!, $lastName: String!, $id: id!) {
        updateUser(companyId: $companyId, dob: $dob, firstName: $firstName, lastName: $lastName, id: $id) {
          companyId
          dob
          firstName
          lastName
          id
        }
      }
      """

      user = user_fixture(valid_attrs)

      variables = %{
        "companyId" => user.company_id,
        "dob" => "01/01/2000",
        "firstName" => "Name",
        "lastName" => "Name",
        "id" => user.id
      }

      result = Absinthe.run(mutation, Schema, variables: variables)

      assert result ==
               {:ok, %{data: %{"updateUser" => variables}}}
    end

    test "deleteUser/1 deletes an existing user using the resolver mutation", %{
      valid_attrs: valid_attrs
    } do
      mutation = """
      mutation deleteUser($id: id!) {
        deleteUser(id: $id) {
          id
        }
      }
      """

      user = user_fixture(valid_attrs)
      variables = %{"id" => user.id}

      result = Absinthe.run(mutation, Schema, variables: variables)

      assert result ==
               {:ok, %{data: %{"deleteUser" => variables}}}
    end
  end
end
