defmodule Homework.UtilsTest.Pagination do
  use Homework.DataCase

  alias Homework.Users
  alias Homework.Utils.Pagination

  describe "pagination" do
    test "tests pagination with users" do

      {:ok, firstUser} = Users.create_user(%{dob: "1991-01-01", first_name: "First", last_name: "User"})
      {:ok, secondUser} = Users.create_user(%{dob: "1991-01-01", first_name: "Second", last_name: "User"})
      {:ok, thirdUser} = Users.create_user(%{dob: "1991-01-01", first_name: "Third", last_name: "User"})

      firstSample = Users.User
      |> Pagination.skip_limit(%{pagination: %{skip: 0, limit: 3}})
      |> Repo.all()

      assert firstSample == [firstUser, secondUser, thirdUser]

      {:ok, fourthUser} = Users.create_user(%{dob: "1991-01-01", first_name: "Fourth", last_name: "User"})
      {:ok, fifthUser} = Users.create_user(%{dob: "1991-01-01", first_name: "Fifth", last_name: "User"})
      {:ok, sixthUser} = Users.create_user(%{dob: "1991-01-01", first_name: "Sixth", last_name: "User"})

      secondSample = Users.User
      |> Pagination.skip_limit(%{pagination: %{skip: 0, limit: 3}})
      |> Repo.all()

      assert secondSample == [firstUser, secondUser, thirdUser]

      thirdSample = Users.User
      |> Pagination.skip_limit(%{pagination: %{skip: 2, limit: 4}})
      |> Repo.all()

      assert thirdSample == [thirdUser, fourthUser, fifthUser, sixthUser]

    end
  end
end
