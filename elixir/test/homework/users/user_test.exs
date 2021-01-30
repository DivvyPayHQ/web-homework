defmodule Homework.Users.UserTest do
  use Homework.DataCase

  alias Homework.Users.User

  def tids(nil), do: raise("expected a queryable, got nil")

  def tids(results) do
    results
    |> Enum.map(fn result -> result.tid end)
  end

  describe "validations" do
    setup do
      company = insert(:company)

      [
        valid_attrs: %{
          company_id: company.id,
          dob: "1998-01-30",
          first_name: "alice",
          last_name: "aardvark"
        }
      ]
    end

    test "is valid with valid values", %{valid_attrs: valid_attrs} do
      assert User.changeset(%User{}, valid_attrs).valid?
    end

    Enum.each(~w{ company_id dob first_name last_name }a, fn attr ->
      @attr attr
      test("validates presence of #{attr}", %{valid_attrs: valid_attrs}) do
        err_msg = %{@attr => ["can't be blank"]}

        assert err_msg == errors_on(User.changeset(%User{}, valid_attrs |> Map.delete(@attr)))
      end
    end)
  end

  describe "for_fuzzy_first_and_last_name" do
    test "returns perfect matches of first and last name" do
      insert(:user, first_name: "alice", last_name: "allen", tid: "alice")
      insert(:user, first_name: "bobby", last_name: "baker", tid: "bobby")
      insert(:user, first_name: "conor", last_name: "clark", tid: "conor")

      assert User.for_fuzzy_first_and_last_name("bobby", "baker")
             |> Repo.all()
             |> tids() == ~w{bobby}
    end

    test "returns fuzzy matches on first and last name" do
      insert(:user, first_name: "alice", last_name: "allen", tid: "alice")
      insert(:user, first_name: "bobby", last_name: "baker", tid: "bobby")
      insert(:user, first_name: "conor", last_name: "clark", tid: "conor")

      assert User.for_fuzzy_first_and_last_name("bobbie", "becker")
             |> Repo.all()
             |> tids() == ~w{bobby}
    end
  end
end
