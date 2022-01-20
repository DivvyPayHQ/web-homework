defmodule Homework.Users.UserTest do
  alias Homework.{Repo, Users}
  alias Homework.Users.User
  import Homework.Factory
  use Homework.DataCase

  describe "user" do
    @invalid_attrs %{dob: nil, first_name: nil, last_name: nil}

    setup do
      companies = Enum.map(0..2, fn _ -> insert!(:company) end)

      [
        companies: companies,
        user: insert!(:user, %{company: Enum.at(companies, 0)})
      ]
    end

    test "change_user/1 returns a user changeset", context do
      assert %Ecto.Changeset{} = Users.change_user(context.user)
    end

    test "create_user/1 with valid data creates a user", context do
      company = Enum.at(context.companies, 0)

      attrs = %{
        company_id: company.id,
        dob: "2005-02-06",
        first_name: "some first_name",
        last_name: "some last_name"
      }

      assert {:ok, %User{} = user} = Users.create_user(attrs)
      assert user.company_id == company.id
      assert user.dob == ~D[2005-02-06]
      assert user.first_name == "some first_name"
      assert user.last_name == "some last_name"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Users.create_user(@invalid_attrs)
    end

    test "delete_user/1 deletes the user", context do
      user = context.user
      assert {:ok, %User{}} = Users.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Users.get_user!(user.id) end
    end

    test "get_user!/1 returns the user with given id", context do
      user = context.user

      assert user ==
               user.id
               |> Users.get_user!()
               |> Repo.preload([:company])
    end

    test "get_user_by!/1 returns the user with given first name", context do
      user = context.user
      assert Users.get_user_by!(first_name: user.first_name).first_name == user.first_name
    end

    test "get_user_by!/1 returns error multiple results", context do
      user = context.user
      # create another user; same first name
      insert!(:user)

      assert_raise Ecto.MultipleResultsError, fn ->
        Users.get_user_by!(first_name: user.first_name)
      end
    end

    test "list_users/1 returns all users", context do
      user = context.user
      assert Users.list_users(%{preload: [:company]}) == [user]
    end

    test "update_user/2 with valid data updates the user", context do
      company_2 = Enum.at(context.companies, 1)
      user = context.user

      update_attrs = %{
        company_id: company_2.id,
        dob: "2010-11-01",
        first_name: "some updated first_name",
        last_name: "some updated last_name"
      }

      assert {:ok, %User{} = user} = Users.update_user(user, update_attrs)
      assert user.company_id == company_2.id
      assert user.dob == ~D[2010-11-01]
      assert user.first_name == "some updated first_name"
      assert user.last_name == "some updated last_name"
    end

    test "update_user/2 with invalid data returns error changeset", context do
      user = context.user
      assert {:error, %Ecto.Changeset{}} = Users.update_user(user, @invalid_attrs)

      assert user ==
               user.id
               |> Users.get_user!()
               |> Repo.preload([:company])
    end
  end
end
