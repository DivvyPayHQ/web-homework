defmodule Homework.UsersTest do
  use Homework.DataCase

  import Homework.CompaniesFixtures, only: [company_fixture: 0]
  import Homework.UsersFixtures, only: [user_fixture: 0]

  alias Homework.Users

  describe "users" do
    alias Homework.Users.User

    @invalid_attrs %{dob: nil, first_name: nil, last_name: nil, company_id: nil}

    test "list_users/1 returns all users" do
      user = user_fixture()
      assert Users.list_users([]) == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Users.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      %{id: company_id} = company_fixture()

      assert {:ok, %User{} = user} =
               Users.create_user(%{
                 dob: "some dob",
                 first_name: "some first_name",
                 last_name: "some last_name",
                 company_id: company_id
               })

      assert user.dob == "some dob"
      assert user.first_name == "some first_name"
      assert user.last_name == "some last_name"
      assert user.company_id == company_id
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{errors: errors}} = Users.create_user(@invalid_attrs)
      assert {"can't be blank", _} = errors[:company_id]
    end

    test "create_user/1 with non-existant company returns error changeset" do
      non_persisted_id = Ecto.UUID.generate()

      assert {:error, %Ecto.Changeset{errors: errors}} =
               Users.create_user(%{
                 dob: "some dob",
                 first_name: "some first_name",
                 last_name: "some last_name",
                 company_id: non_persisted_id
               })

      assert {"does not exist", _} = errors[:company_id]
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      %{id: new_company_id} = company_fixture()

      assert {:ok, %User{} = user} =
               Users.update_user(
                 user,
                 %{
                   dob: "some updated dob",
                   first_name: "some updated first_name",
                   last_name: "some updated last_name",
                   company_id: new_company_id
                 }
               )

      assert user.dob == "some updated dob"
      assert user.first_name == "some updated first_name"
      assert user.last_name == "some updated last_name"
      assert user.company_id == new_company_id
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Users.update_user(user, @invalid_attrs)
      assert user == Users.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Users.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Users.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Users.change_user(user)
    end
  end
end
