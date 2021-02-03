defmodule Homework.UsersTest do
  use Homework.DataCase

  alias Homework.Users

  import ExUnit.Assertions

  describe "users" do
    alias Homework.Users.User

    @valid_attrs %{dob: "1990-01-01", first_name: "some first_name", last_name: "some last_name"}

    @update_attrs %{
      dob: "1990-01-02",
      first_name: "some updated first_name",
      last_name: "some updated last_name"
    }
    @nil_attrs %{dob: nil, first_name: nil, last_name: nil}
    @invalid_attrs_dob %{dob: "1990-1", first_name: "some first_name", last_name: "some last_name"}
    @invalid_attrs_too_young %{dob: "2020-01-01", first_name: "some first_name", last_name: "some last_name"}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Users.create_user()

      user
    end

    test "list_users/1 returns all users" do
      user = user_fixture()
      assert Users.list_users([]) == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Users.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Users.create_user(@valid_attrs)
      assert user.dob == "1990-01-01"
      assert user.first_name == "some first_name"
      assert user.last_name == "some last_name"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Users.create_user(@nil_attrs)
    end

    test "create_user/1 with duplicate data returns error" do
      Users.create_user(@valid_attrs)
      assert_raise Ecto.ConstraintError, fn -> Users.create_user(@valid_attrs) end
    end

    test "create_user/1 with invalid dob returns error" do
      # I don't like this one.  It's because I wrote a quick and dirty to_iso on the date to save time.
      # But it works for the sake of demonstration
      assert_raise ArgumentError, fn -> Users.create_user(@invalid_attrs_dob) end
    end

    test "create_user/1 with too early of birthday error" do
      assert {:error, %Ecto.Changeset{}} = Users.create_user(@invalid_attrs_too_young)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, %User{} = user} = Users.update_user(user, @update_attrs)
      assert user.dob == "1990-01-02"
      assert user.first_name == "some updated first_name"
      assert user.last_name == "some updated last_name"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Users.update_user(user, @nil_attrs)
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
