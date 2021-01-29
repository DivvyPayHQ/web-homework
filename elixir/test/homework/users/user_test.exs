defmodule Homework.Users.UserTest do
  use Homework.DataCase

  alias Homework.Users
  alias Homework.Users.User

  @valid_attrs %{dob: "some dob", first_name: "some first_name", last_name: "some last_name"}

  def user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(@valid_attrs)
      |> Users.create_user()

    user
  end

  def tids(nil), do: raise("expected a queryable, got nil")

  def tids(results) do
    results
    |> Enum.map(fn result -> result.tid end)
  end

  describe "for_fuzzy_first_and_last_name" do
    test "returns perfect matches of first and last name" do
      user_fixture(first_name: "alice", last_name: "allen", tid: "alice")
      user_fixture(first_name: "bobby", last_name: "baker", tid: "bobby")
      user_fixture(first_name: "conor", last_name: "clark", tid: "conor")

      assert User.for_fuzzy_first_and_last_name("bobby", "baker")
             |> Repo.all()
             |> tids() == ~w{bobby}
    end

    test "returns fuzzy matches on first and last name" do
      user_fixture(first_name: "alice", last_name: "allen", tid: "alice")
      user_fixture(first_name: "bobby", last_name: "baker", tid: "bobby")
      user_fixture(first_name: "conor", last_name: "clark", tid: "conor")

      assert User.for_fuzzy_first_and_last_name("bobbie", "becker")
             |> Repo.all()
             |> tids() == ~w{bobby}
    end
  end
end
