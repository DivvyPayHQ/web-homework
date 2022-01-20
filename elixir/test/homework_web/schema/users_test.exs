defmodule HomeworkWeb.Schema.UsersTest do
  import Homework.Factory
  use HomeworkWeb.ConnCase, async: true

  @company """
    {
      available_credit
      credit_line
      id
      inserted_at
      name
      updated_at
    }
  """

  @user """
  {
    id
    company #{@company}
    companyId
    dob
    firstName
    lastName
    insertedAt
    updatedAt
  }
  """

  @users_query """
  query Users {
     users #{@user}
  }
  """

  @user_query """
  query User(
    $id: ID!
  ){
    user(
      id: $id
    ) #{@user}
  }
  """

  @create_user_query """
  mutation CreateUser(
    $companyId: ID!
    $dob: String!
    $firstName: String!
    $lastName: String!
  ){
    createUser(
      companyId: $companyId
      dob: $dob
      firstName: $firstName
      lastName: $lastName
    ) #{@user}
  }
  """

  @delete_user_query """
  mutation DeleteUser(
    $id: ID!
  ){
    deleteUser(
      id: $id
    ) #{@user}
  }
  """

  @search_users_query """
  mutation SearchUsersByName(
    $searchBy: [SearchBy]
    $searchTerm: String!
  ){
    searchUsersByName(
      searchBy: $searchBy
      searchTerm: $searchTerm
    ) #{@user}
  }
  """

  @update_user_query """
  mutation UpdateUser(
    $id: ID!
    $companyId: ID
    $dob: String
    $firstName: String
    $lastName: String
  ){
    updateUser(
      id: $id
      companyId: $companyId
      dob: $dob
      firstName: $firstName
      lastName: $lastName
    ) #{@user}
  }
  """

  defp graphql_host(conn, opts) do
    conn
    |> post("/graphiql", %{
      query: Keyword.get(opts, :query, ""),
      variables: Keyword.get(opts, :variables, %{})
    })
    |> json_response(200)
  end

  describe "users" do
    setup do
      users = Enum.map(0..5, fn _ -> insert!(:user) end)

      [users: users]
    end

    test "gets users", context do
      %{id: user_2_id, company: %{id: company_2_id}} = Enum.at(context.users, 0)
      %{id: user_3_id, company: %{id: company_3_id}} = Enum.at(context.users, 2)
      %{id: user_5_id, company: %{id: company_5_id}} = Enum.at(context.users, 4)

      conn = Map.get(context, :conn)
      body = graphql_host(conn, query: @users_query)
      refute body["errors"]
      users = body["data"]["users"]

      assert 6 = length(users)

      :ok =
        Enum.each(users, fn u ->
          assert Map.has_key?(u, "companyId")
          assert Map.has_key?(u, "dob")
          assert Map.has_key?(u, "firstName")
          assert Map.has_key?(u, "id")
          assert Map.has_key?(u, "lastName")
          assert Map.has_key?(u, "insertedAt")
          assert Map.has_key?(u, "updatedAt")

          case u["id"] do
            ^user_2_id ->
              assert company_2_id == u["company"]["id"]

            ^user_3_id ->
              assert company_3_id == u["company"]["id"]

            ^user_5_id ->
              assert company_5_id == u["company"]["id"]

            _ ->
              true
          end
        end)
    end

    test "gets a user", context do
      user =
        context
        |> Map.get(:users)
        |> Enum.at(0)

      variables = %{
        id: user.id
      }

      conn = Map.get(context, :conn)
      body = graphql_host(conn, query: @user_query, variables: variables)
      refute body["errors"]
      u = body["data"]["user"]

      assert Map.get(u, "id") == user.id
      assert Map.get(u, "dob") == Date.to_string(user.dob)
      assert Map.get(u, "firstName") == user.first_name
      assert Map.get(u, "lastName") == user.last_name

      assert Map.get(u, "insertedAt") ==
               user.inserted_at |> NaiveDateTime.to_string() |> String.replace(" ", "T")

      assert Map.get(u, "updatedAt") ==
               user.updated_at |> NaiveDateTime.to_string() |> String.replace(" ", "T")
    end

    test "gets a user: handles no result error gracefully", %{conn: conn} do
      variables = %{
        id: Ecto.UUID.generate()
      }

      body = graphql_host(conn, query: @user_query, variables: variables)
      assert body["errors"]
      [errors | _] = body["errors"]
      assert errors["message"] =~ "could not get user: no result"
    end

    test "creates a user", context do
      company_id =
        context
        |> Map.get(:users)
        |> Enum.at(0)
        |> Map.get(:company_id)

      variables = %{
        companyId: company_id,
        dob: "1999-11-01",
        firstName: "Nick",
        lastName: "Captain"
      }

      conn = Map.get(context, :conn)
      body = graphql_host(conn, query: @create_user_query, variables: variables)
      refute body["errors"]
      t = body["data"]["createUser"]

      assert Map.has_key?(t, "id")
      assert Map.has_key?(t, "insertedAt")
      assert Map.has_key?(t, "updatedAt")
      assert Map.get(t, "dob") == variables.dob
      assert Map.get(t, "firstName") == variables.firstName
      assert Map.get(t, "lastName") == variables.lastName
    end

    test "deletes a user", context do
      user =
        context
        |> Map.get(:users)
        |> Enum.at(0)

      variables = %{
        id: user.id
      }

      conn = Map.get(context, :conn)
      body = graphql_host(conn, query: @delete_user_query, variables: variables)
      refute body["errors"]

      # confirm actually deleted
      body = graphql_host(conn, query: @user_query, variables: variables)
      assert body["errors"]
      [errors | _] = body["errors"]
      assert errors["message"] =~ "could not get user: no result"
    end

    test "search existing users by provided search term", context do
      Enum.each(
        [
          %{first_name: "Dolittle", last_name: "Man"},
          %{first_name: "Iron", last_name: "Captain"},
          %{first_name: "Doctor", last_name: "Captain"},
          %{first_name: "Doctor", last_name: "Strange"},
          %{first_name: "Ant", last_name: "Doctor"},
          %{first_name: "ExDoctor", last_name: "Widow"}
        ],
        fn u -> insert!(:user, u) end
      )

      variables = %{
        searchBy: ["FIRST_NAME"],
        searchTerm: "dob"
      }

      conn = Map.get(context, :conn)
      body = graphql_host(conn, query: @search_users_query, variables: variables)
      refute body["errors"]
      users = body["data"]["searchUsersByName"]

      assert 3 = length(users)

      variables = %{
        searchBy: ["LAST_NAME"],
        searchTerm: "Ca"
      }

      conn = Map.get(context, :conn)
      body = graphql_host(conn, query: @search_users_query, variables: variables)
      refute body["errors"]
      users = body["data"]["searchUsersByName"]

      assert 2 = length(users)
    end

    test "updates a user", context do
      conn = Map.get(context, :conn)

      user =
        context
        |> Map.get(:users)
        |> Enum.at(0)

      variables = %{
        dob: "1999-11-01",
        firstName: "Nick",
        lastName: "Captain",
        id: user.id
      }

      assert user.dob != variables.dob
      assert user.first_name != variables.firstName
      assert user.last_name != variables.lastName
      assert user.id == variables.id

      body = graphql_host(conn, query: @update_user_query, variables: variables)
      refute body["errors"]
      t = body["data"]["updateUser"]

      assert Map.get(t, "dob") == variables.dob
      assert Map.get(t, "firstName") == variables.firstName
      assert Map.get(t, "lastName") == variables.lastName
      assert Map.get(t, "id") == user.id
    end
  end
end
