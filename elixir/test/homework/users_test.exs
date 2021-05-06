defmodule Homework.UsersTest do
  use Homework.DataCase

  alias Homework.Companies
  alias Homework.Users

  describe "users" do
    alias Homework.Users.User

    setup do
      {:ok, company1} = Companies.create_company(%{name: "Pfizer", credit_line: 100_000_00})
      {:ok, company2} = Companies.create_company(%{name: "Moderna", credit_line: 100_000_00})

      {:ok, company3} =
        Companies.create_company(%{name: "Johnson & Johnson", credit_line: 100_000_00})

      valid_attrs1 = %{
        dob: "some dob",
        first_name: "some first_name",
        last_name: "some last_name",
        company_id: company1.id
      }

      valid_attrs2 = %{
        dob: "1980-01-01",
        first_name: "Jane",
        last_name: "Doe",
        company_id: company2.id
      }

      valid_attrs3 = %{
        dob: "1900-12-31",
        first_name: "John",
        last_name: "Doe",
        company_id: company3.id
      }

      {:ok,
       %{
         all_valid_attrs: [valid_attrs1, valid_attrs2, valid_attrs3],
         valid_attrs1: valid_attrs1,
         valid_attrs2: valid_attrs2,
         valid_attrs3: valid_attrs3,
         company1: company1,
         company2: company2,
         company3: company3
       }}
    end

    @update_attrs %{
      dob: "some updated dob",
      first_name: "some updated first_name",
      last_name: "some updated last_name"
    }
    @invalid_attrs %{dob: nil, first_name: nil, last_name: nil}

    def users_fixture(valid_attrs_list) do
      Enum.map(valid_attrs_list, fn attrs ->
        {:ok, %User{} = user} = Users.create_user(attrs)
        user
      end)
    end

    test "list_users/1 returns all users", %{all_valid_attrs: all_valid_attrs} do
      users = users_fixture(all_valid_attrs)
      assert Users.list_users([]) == users
    end

    test "list_users/1 searches both first and last name", %{all_valid_attrs: all_valid_attrs} do
      [_, jane, john] = users_fixture(all_valid_attrs)
      assert Users.list_users(%{named_like: "Jane"}) == [jane, john]
      assert Users.list_users(%{named_like: "Doe"}) == [jane, john]
      assert Users.list_users(%{named_like: "Doe, Jo"}) == [john, jane]
    end

    test "get_user!/1 returns the user with given id", %{valid_attrs1: valid_attrs1} do
      [user] = users_fixture([valid_attrs1])
      assert Users.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user", %{valid_attrs1: valid_attrs1} do
      assert {:ok, %User{} = user} = Users.create_user(valid_attrs1)
      assert user.dob == "some dob"
      assert user.first_name == "some first_name"
      assert user.last_name == "some last_name"
    end

    test "create_user/1 without a company returns an error", %{valid_attrs1: valid_attrs1} do
      missing_company = Map.delete(valid_attrs1, :company_id)
      assert {:error, %Ecto.Changeset{}} = Users.create_user(missing_company)
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Users.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user", %{valid_attrs1: valid_attrs1} do
      [user] = users_fixture([valid_attrs1])
      assert {:ok, %User{} = user} = Users.update_user(user, @update_attrs)
      assert user.dob == "some updated dob"
      assert user.first_name == "some updated first_name"
      assert user.last_name == "some updated last_name"
    end

    test "update_user/2 with invalid data returns error changeset", %{valid_attrs1: valid_attrs1} do
      [user] = users_fixture([valid_attrs1])
      assert {:error, %Ecto.Changeset{}} = Users.update_user(user, @invalid_attrs)
      assert user == Users.get_user!(user.id)
    end

    test "delete_user/1 deletes the user", %{valid_attrs1: valid_attrs1} do
      [user] = users_fixture([valid_attrs1])
      assert {:ok, %User{}} = Users.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Users.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset", %{valid_attrs1: valid_attrs1} do
      [user] = users_fixture([valid_attrs1])
      assert %Ecto.Changeset{} = Users.change_user(user)
    end
  end
end
