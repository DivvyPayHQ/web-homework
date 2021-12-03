defmodule HomeworkWeb.Resolvers.UsersResolverTest do
  use Homework.DataCase, async: true
  alias Homework.Users
  alias Homework.Companies
  alias HomeworkWeb.Resolvers.UsersResolver
  @company_one_setup %{
    name: "Company one",
    credit_line: 100000
  }

  @user_one_setup %{
    first_name: "Laura",
    last_name: "Smith",
    dob: "dob 1"
  }

  @user_two_setup %{
    first_name: "Name",
    last_name: "Last",
    dob: "dob 2"
  }

  @user_three_setup %{
    first_name: "Name1",
    last_name: "Last1",
    dob: "dob 3"
  }

  setup do
    company_one = create_company_through_context(@company_one_setup)
    user_one = create_user_through_context(Map.put(@user_one_setup, :company_id, company_one.id))
    user_two = create_user_through_context(Map.put(@user_two_setup, :company_id, company_one.id))
    %{
      company_one: company_one,
      user_one: user_one,
      user_two: user_two
    }
  end

  describe "@create_user" do
    test "tests create_user/3 in UsersResolver", state do
      user_three = Map.put(@user_three_setup, :company_id, state.company_one.id)
      assert {:ok, user} = UsersResolver.create_user(nil, user_three, nil)
      users = get_all_users_through_context()
      assert Enum.find(users, fn x -> user.id === x.id end)
    end
    
  end

  describe "@update_user" do
    test "tests update_user/3 in UsersResolver", state do
      updated_field = "a new value"
      assert {:ok, user} = UsersResolver.update_user(nil, %{id: state.user_two.id, first_name: updated_field}, nil)
      updated_user = get_user_through_context(user.id)
      assert updated_user.first_name === updated_field
    end
  end

  describe "@users" do
    test "tests users/3 in UsersResolver", state do
      assert {:ok, users} = UsersResolver.users(nil, %{}, nil)
      assert Enum.find(users, fn x -> state.user_one.id === x.id end)
    end
  end

  describe "@delete_user" do
    test "tests delete_user/3 in UsersResolver", state do
      assert {:ok, _user} = UsersResolver.delete_user(nil, %{id: state.user_two.id}, nil)
      users = get_all_users_through_context()
      refute Enum.find(users, fn x -> state.user_two.id === x.id end)
    end
  end

  defp create_company_through_context(company) do
    assert {:ok, company} = Companies.create_company(company)
    company
  end

  defp create_user_through_context(user) do
    assert {:ok, user} = Users.create_user(user)
    user
  end

  defp get_user_through_context(id) do
    Users.get_user!(id)
  end

  defp get_all_users_through_context() do
    Users.list_users(%{})
  end

end