defmodule HomeworkWeb.UsersSchemaTest do
  use HomeworkWeb.ConnCase, async: true
  alias Homework.Companies
  alias Homework.Users

  setup do
    {:ok, company} = Companies.create_company(%{name: "Pfizer", credit_line: 100})

    {:ok, user1} =
      Users.create_user(%{
        first_name: "one",
        last_name: "one-last",
        dob: "one-dob",
        company_id: company.id
      })

    {:ok, user2} =
      Users.create_user(%{
        first_name: "two",
        last_name: "two-last",
        dob: "two-dob",
        company_id: company.id
      })

    {:ok, user3} =
      Users.create_user(%{
        first_name: "three",
        last_name: "three-last",
        dob: "three-dob",
        company_id: company.id
      })

    {:ok,
     %{
       user1: user1,
       user2: user2,
       user3: user3,
       company: company
     }}
  end

  test "resolves lookups", %{company: company} do
    query = """
      {
        users {
          first_name
          last_name
          dob
          company {
            id
            name
          }
        }
      }
    """

    assert {:ok, %{data: data}} = Absinthe.run(query, HomeworkWeb.Schema, context: %{})

    company_fields = %{"id" => company.id, "name" => company.name}

    assert MapSet.new(data["users"]) ==
             MapSet.new([
               %{
                 "first_name" => "one",
                 "last_name" => "one-last",
                 "dob" => "one-dob",
                 "company" => company_fields
               },
               %{
                 "first_name" => "two",
                 "last_name" => "two-last",
                 "dob" => "two-dob",
                 "company" => company_fields
               },
               %{
                 "first_name" => "three",
                 "last_name" => "three-last",
                 "dob" => "three-dob",
                 "company" => company_fields
               }
             ])
  end

  test "creates users", %{company: company} do
    mutation = """
      mutation($first_name: String!, $last_name: String!, $dob: String!, $company_id: ID!) {
        createUser(first_name: $first_name, last_name: $last_name, dob: $dob, company_id: $company_id) {
          id
          first_name
          last_name
          dob
          company {
            name
          }
        }
      }
    """

    args = %{
      "first_name" => "four",
      "last_name" => "four-last",
      "dob" => "four-dob",
      "company_id" => company.id
    }

    assert {:ok, %{data: %{"createUser" => result}}} =
             Absinthe.run(mutation, HomeworkWeb.Schema, variables: args)

    assert Map.delete(result, "id") == %{
             "first_name" => "four",
             "last_name" => "four-last",
             "dob" => "four-dob",
             "company" => %{"name" => company.name}
           }

    assert is_binary(Map.get(result, "id"))
  end

  test "updates users", %{user1: user, company: company} do
    mutation = """
      mutation($id: ID!, $first_name: String!, $last_name: String!, $dob: String!, $company_id: ID!) {
        updateUser(id: $id, first_name: $first_name, last_name: $last_name, dob: $dob, company_id: $company_id) {
          id
          first_name
          last_name
          dob
          company {
            name
          }
        }
      }
    """

    args = %{
      "id" => user.id,
      "first_name" => "modified",
      "last_name" => "modified-last",
      "dob" => "modified-dob",
      "company_id" => company.id
    }

    assert {:ok, %{data: %{"updateUser" => result}}} =
             Absinthe.run(mutation, HomeworkWeb.Schema, variables: args)

    assert result == %{
             "id" => user.id,
             "first_name" => "modified",
             "last_name" => "modified-last",
             "dob" => "modified-dob",
             "company" => %{"name" => company.name}
           }
  end

  test "deletes users", %{user1: user} do
    mutation = """
      mutation($id: ID!) {
        deleteUser(id: $id) {
          id
        }
      }
    """

    args = %{
      "id" => user.id
    }

    assert {:ok, %{data: _}} = Absinthe.run(mutation, HomeworkWeb.Schema, variables: args)

    query = """
      {
        users {
          id
        }
      }
    """

    assert {:ok, %{data: %{"users" => users}}} =
             Absinthe.run(query, HomeworkWeb.Schema, context: %{})

    assert Enum.all?(users, &(&1["id"] != user.id))
  end
end
