defmodule Homework.Users.SearchUsersByNameTest do
  alias Homework.Users
  import Homework.Factory
  use Homework.DataCase

  describe "search_users_by_name/1" do
    @first_last_names [
      %{first_name: "Iron", last_name: "Man"},
      %{first_name: "Dolittle", last_name: "Man"},
      %{first_name: "Captain", last_name: "America"},
      %{first_name: "Black", last_name: "Widow"},
      %{first_name: "Black", last_name: "Panther"},
      %{first_name: "Doctor", last_name: "Strange"},
      %{first_name: "Ant", last_name: "Man"},
      %{first_name: "War", last_name: "Machine"},
      %{first_name: "Nick", last_name: "Fury"},
      %{first_name: "Iron", last_name: "Captain"},
      %{first_name: "Doctor", last_name: "Captain"},
      %{first_name: "Ant", last_name: "Doctor"},
      %{first_name: "ExDoctor", last_name: "Widow"}
    ]

    setup do: [users: Enum.map(@first_last_names, fn u -> insert!(:user, u) end)]

    test "success: ascending list of users whose first name closest to starting with 'dob'",
         _context do
      users = Users.search_users_by_name(%{search_by: [:first_name], search_term: "dob"})
      assert 3 = length(users)
      # requires 4 changes
      assert Enum.at(users, 0).first_name === "Doctor"
      # requires 6 changes
      assert Enum.at(users, 2).first_name === "Dolittle"
    end

    test "success: ascending list of users whose first name closest to starting with 'docitle'",
         _context do
      users = Users.search_users_by_name(%{search_by: [:first_name], search_term: "docitle"})
      assert 3 = length(users)
      # requires 2 changes
      assert Enum.at(users, 0).first_name === "Dolittle"
      # requires 4 changes
      assert Enum.at(users, 2).first_name === "Doctor"
    end

    test "success: ascending list of users whose last name closest to starting with 'max'",
         _context do
      users = Users.search_users_by_name(%{search_by: [:last_name], search_term: "max"})
      assert 4 = length(users)
      # requires 1 changes
      assert Enum.at(users, 0).last_name === "Man"
      # requires 5 changes
      assert Enum.at(users, 3).last_name === "Machine"
    end
  end
end
