defmodule HomeworkWeb.MerchantsSchemaTest do
  use HomeworkWeb.ConnCase, async: true
  alias Homework.Merchants

  setup do
    {:ok, merchant1} = Merchants.create_merchant(%{name: "one", description: "desc1"})
    {:ok, merchant2} = Merchants.create_merchant(%{name: "two", description: "desc2"})
    {:ok, merchant3} = Merchants.create_merchant(%{name: "three", description: "desc3"})

    {:ok,
     %{
       merchant1: merchant1,
       merchant2: merchant2,
       merchant3: merchant3
     }}
  end

  test "resolves lookups" do
    query = """
      {
        merchants {
          name
          description
        }
      }
    """

    assert {:ok, %{data: data}} = Absinthe.run(query, HomeworkWeb.Schema, context: %{})

    assert MapSet.new(data["merchants"]) ==
             MapSet.new([
               %{"name" => "one", "description" => "desc1"},
               %{"name" => "two", "description" => "desc2"},
               %{"name" => "three", "description" => "desc3"}
             ])
  end

  test "resolves queries filtering on name" do
    query = """
      {
        merchants(namedLike: "thre") {
          name
        }
      }
    """

    assert {:ok, %{data: data}} = Absinthe.run(query, HomeworkWeb.Schema, context: %{})
    assert data["merchants"] == [%{"name" => "three"}, %{"name" => "two"}]
  end

  test "creates merchants" do
    mutation = """
      mutation($name: String!, $description: String!) {
        createMerchant(name: $name, description: $description) {
          id
          name
        }
      }
    """

    args = %{
      "name" => "four",
      "description" => "desc4"
    }

    assert {:ok, %{data: %{"createMerchant" => result}}} =
             Absinthe.run(mutation, HomeworkWeb.Schema, variables: args)

    assert Map.get(result, "name") == "four"
    assert is_binary(Map.get(result, "id"))
  end

  test "updates merchants", %{merchant1: merchant} do
    mutation = """
      mutation($id: ID!, $name: String!, $description: String!) {
        updateMerchant(id: $id, name: $name, description: $description) {
          id
          name
          description
        }
      }
    """

    args = %{
      "id" => merchant.id,
      "name" => "modified",
      "description" => "modifiedDesc"
    }

    assert {:ok, %{data: %{"updateMerchant" => result}}} =
             Absinthe.run(mutation, HomeworkWeb.Schema, variables: args)

    assert Map.get(result, "name") == "modified"
    assert Map.get(result, "description") == "modifiedDesc"
    assert Map.get(result, "id") == merchant.id
  end

  test "deletes merchants", %{merchant1: merchant} do
    mutation = """
      mutation($id: ID!) {
        deleteMerchant(id: $id) {
          id
        }
      }
    """

    args = %{
      "id" => merchant.id
    }

    assert {:ok, %{data: _}} = Absinthe.run(mutation, HomeworkWeb.Schema, variables: args)

    query = """
      {
        merchants(namedLike: "one") {
          name
        }
      }
    """

    assert {:ok, %{data: data}} = Absinthe.run(query, HomeworkWeb.Schema, context: %{})
    assert data["merchants"] == []
  end
end
