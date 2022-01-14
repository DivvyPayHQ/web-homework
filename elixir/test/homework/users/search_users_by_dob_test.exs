defmodule Homework.Users.SearchUsersByDobTest do
  alias Homework.Users
  import Homework.Factory
  use Homework.DataCase

  describe "search_users_by_dob/1" do
    @dob_to_search "1995-01-02"
    @user_dobs [
      %{dob: ~D[2000-01-02]},
      %{dob: ~D[2012-01-02]},
      %{dob: ~D[2010-10-02]},
      %{dob: ~D[2021-01-02]},
      %{dob: ~D[1999-01-02]},
      %{dob: ~D[1995-01-02]},
      %{dob: ~D[1995-01-02]},
      %{dob: ~D[1992-01-02]},
      %{dob: ~D[1991-01-02]},
      %{dob: ~D[1988-01-02]}
    ]

    setup do: [users: Enum.map(@user_dobs, fn u -> insert!(:user, u) end)]

    test "count of users whose dob is #{@dob_to_search}",
         _context do
      assert 2 ===
               %{dob: @dob_to_search}
               |> Users.search_users_by_dob()
               |> length()
    end

    test "count of users whose dob is #{@dob_to_search} or after #{@dob_to_search}",
         _context do
      assert 7 ===
               %{dob: @dob_to_search, include: :after}
               |> Users.search_users_by_dob()
               |> length()
    end

    test "count of users whose dob is #{@dob_to_search} or before #{@dob_to_search}",
         _context do
      assert 5 ===
               %{dob: @dob_to_search, include: :before}
               |> Users.search_users_by_dob()
               |> length()
    end
  end
end
