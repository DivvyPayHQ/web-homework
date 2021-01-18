defmodule Homework.UsersFixtures do
  alias Homework.Users
  import Homework.CompaniesFixtures, only: [company_fixture: 0]

  @doc """
  Test helper function for generating a User
  """
  def user_fixture(attrs \\ %{}) do
    company_id = Map.get(attrs, :company_id) || company_fixture().id

    {:ok, user} =
      attrs
      |> Enum.into(%{
        dob: "some dob",
        first_name: "some first_name",
        last_name: "some last_name",
        company_id: company_id
      })
      |> Users.create_user()

    user
  end
end
