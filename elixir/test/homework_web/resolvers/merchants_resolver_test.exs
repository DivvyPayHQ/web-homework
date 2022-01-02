defmodule Homework.MerchantsResolverTest do
  use HomeworkWeb.ConnCase
  import Homework.DataCase

  alias Homework.Merchants

  describe "merchants" do
    alias Homework.Merchants.Merchant

    @valid_attrs %{description: "some description", name: "some name"}
    @update_attrs %{
      id: nil,
      description: "some updated description",
      name: "some updated name"
    }
    @invalid_attrs %{description: nil, name: nil}

    def merchant_fixture(attrs \\ %{}) do
      {:ok, merchant} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Merchants.create_merchant()

      merchant
    end

    test "list returns all merchants", %{conn: conn} do
      merchant = merchant_fixture()

      list_query = """
      {
        merchants {
          id
          name
          description
        }
      }
      """

      conn = post(conn, "/api", %{
        "query" => list_query,
        "variables" => nil
      })

      assert json_response(conn, 200) == %{
        "data" => %{"merchants" => [%{"description" => merchant.description, "id" => merchant.id, "name" => merchant.name}]}
      }
    end

    test "create with valid data creates merchant", %{conn: conn} do
      create_query = """
      mutation {
        createMerchant(name: "some name", description: "some description") {
          name
          description
        }
      }
      """

      # IO.inspect(create_query)

      conn = post(conn, "/api", %{
        "query" => create_query,
        "variables" => @valid_attrs
      })

      # body = json_response(conn, 200)
      # IO.inspect(body)

      assert json_response(conn, 200) == %{
        "data" => %{"createMerchant" => %{"description" => "some description", "name" => "some name"}}
      }
    end

    test "update with valid data update merchant", %{conn: conn} do
      merchant = merchant_fixture()

      update_query = """
      mutation {
        updateMerchant(id: "#{merchant.id}", name: "some updated name", description: "some updated description") {
          id
          name
          description
        }
      }
      """

      conn = post(conn, "/api", %{
        "query" => update_query,
        "variables" => %{@update_attrs | id: merchant.id}
      })

      assert json_response(conn, 200) == %{
        "data" => %{"updateMerchant" => %{"description" => "some updated description", "id" => merchant.id, "name" => "some updated name"}}
      }
    end

    test "delete removes merchant", %{conn: conn} do
      merchant = merchant_fixture()

      delete_query = """
      mutation {
        deleteMerchant(id: "#{merchant.id}") {
          id
          name
          description
        }
      }
      """

      conn = post(conn, "/api", %{
        "query" => delete_query,
        "variables" => %{id: merchant.id}
      })

      assert json_response(conn, 200) == %{
        "data" => %{"deleteMerchant" => %{"description" => merchant.description, "id" => merchant.id, "name" => merchant.name}}
      }
    end

    test "search returns found merchants", %{conn: conn} do
      merchant = merchant_fixture()

      search_query = """
      {
        searchMerchants(name: "some gnome") {
          id
          name
          description
        }
      }
      """

      conn = post(conn, "/api", %{
        "query" => search_query,
        "variables" => %{name: "some"}
      })

      assert json_response(conn, 200) == %{
        "data" => %{"searchMerchants" => [%{"description" => merchant.description, "id" => merchant.id, "name" => merchant.name}]}
      }
    end

  end
end
