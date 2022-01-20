defmodule HomeworkWeb.Schema.MerchantsTest do
  import Homework.Factory
  use HomeworkWeb.ConnCase, async: true

  @merchant """
  {
    description
    id
    inserted_at
    name
    updated_at
  }
  """

  @merchants_query """
  query Merchants {
     merchants #{@merchant}
  }
  """

  @merchant_query """
  query Merchant(
    $id: ID!
  ){
    merchant(
      id: $id
    ) #{@merchant}
  }
  """

  @create_merchant_query """
  mutation CreateMerchant(
    $description: String!
    $name: String!
  ){
    createMerchant(
      description: $description
      name: $name
    ) #{@merchant}
  }
  """

  @delete_merchant_query """
  mutation DeleteMerchant(
    $id: ID!
  ){
    deleteMerchant(
      id: $id
    ) #{@merchant}
  }
  """

  @search_merchants_query """
  mutation SearchMerchantsByName(
    $searchTerm: String!
  ){
    searchMerchantsByName(
      searchTerm: $searchTerm
    ) #{@merchant}
  }
  """

  @update_merchant_query """
  mutation UpdateMerchant(
    $description: String
    $id: ID!
    $name: String
  ){
    updateMerchant(
      description: $description
      id: $id
      name: $name
    ) #{@merchant}
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

  describe "merchants" do
    setup do: [merchants: Enum.map(0..5, fn _ -> insert!(:merchant) end)]

    test "gets merchants", %{conn: conn} do
      body = graphql_host(conn, query: @merchants_query)
      refute body["errors"]
      merchants = body["data"]["merchants"]

      assert 6 = length(merchants)

      :ok =
        Enum.each(merchants, fn m ->
          assert Map.has_key?(m, "description")
          assert Map.has_key?(m, "id")
          assert Map.has_key?(m, "inserted_at")
          assert Map.has_key?(m, "name")
          assert Map.has_key?(m, "updated_at")
        end)
    end

    test "gets a merchant", context do
      %{id: merchant_id, description: merchant_description, name: merchant_name} =
        merchant = Enum.at(context.merchants, 0)

      variables = %{
        id: merchant_id
      }

      conn = Map.get(context, :conn)
      body = graphql_host(conn, query: @merchant_query, variables: variables)
      refute body["errors"]
      m = body["data"]["merchant"]

      assert Map.get(m, "description") == merchant_description
      assert Map.get(m, "id") == merchant_id

      assert Map.get(m, "inserted_at") ==
               merchant.inserted_at |> NaiveDateTime.to_string() |> String.replace(" ", "T")

      assert Map.get(m, "name") == merchant_name

      assert Map.get(m, "updated_at") ==
               merchant.updated_at |> NaiveDateTime.to_string() |> String.replace(" ", "T")
    end

    test "gets a merchant: handles no result error gracefully", %{conn: conn} do
      variables = %{
        id: Ecto.UUID.generate()
      }

      body = graphql_host(conn, query: @merchant_query, variables: variables)
      assert body["errors"]
      [errors | _] = body["errors"]
      assert errors["message"] =~ "could not get merchant: no result"
    end

    test "creates a merchant", %{conn: conn} do
      variables = %{
        description: "The adventurous Painting",
        name: "Worthington Industries"
      }

      body = graphql_host(conn, query: @create_merchant_query, variables: variables)
      refute body["errors"]
      m = body["data"]["createMerchant"]

      assert Map.get(m, "description") == variables.description
      assert Map.has_key?(m, "id")
      assert Map.has_key?(m, "inserted_at")
      assert Map.get(m, "name") == variables.name
      assert Map.has_key?(m, "updated_at")
    end

    test "deletes a merchant", context do
      conn = Map.get(context, :conn)

      merchant =
        context
        |> Map.get(:merchants)
        |> Enum.at(0)

      variables = %{
        id: merchant.id()
      }

      body = graphql_host(conn, query: @delete_merchant_query, variables: variables)
      refute body["errors"]

      # confirm actually deleted
      body = graphql_host(conn, query: @merchant_query, variables: variables)
      assert body["errors"]
      [errors | _] = body["errors"]
      assert errors["message"] =~ "could not get merchant: no result"
    end

    test "search existing merchants by provided search term", context do
      Enum.each(
        [
          name: "Law Offices Of Nelson And Murdock",
          name: "Oscorp",
          name: "Parker Industries",
          name: "Pym Technologies",
          name: "Rand Corporation",
          name: "Roxxon Energy Corporation",
          name: "Stark Industries",
          name: "The Daily Bugle",
          name: "The Life Foundation",
          name: "Weapon Plus"
        ],
        fn {:name, name} -> insert!(:merchant, %{name: name}) end
      )

      variables = %{
        searchTerm: "The"
      }

      conn = Map.get(context, :conn)
      body = graphql_host(conn, query: @search_merchants_query, variables: variables)
      refute body["errors"]
      merchants = body["data"]["searchMerchantsByName"]

      assert 2 = length(merchants)
    end

    test "updates a merchant", context do
      conn = Map.get(context, :conn)

      merchant =
        context
        |> Map.get(:merchants)
        |> Enum.at(0)

      variables = %{
        description: "The adventurous Airport",
        id: merchant.id,
        name: "The Daily Bugle"
      }

      assert merchant.description != variables.description
      assert merchant.id == variables.id
      assert merchant.name != variables.name

      body = graphql_host(conn, query: @update_merchant_query, variables: variables)
      refute body["errors"]
      c = body["data"]["updateMerchant"]

      assert Map.get(c, "description") == variables.description
      assert Map.get(c, "id") == variables.id
      assert Map.get(c, "name") == variables.name
    end
  end
end
