defmodule HomeworkWeb.Mutation.MerchantTest do
  use HomeworkWeb.ConnCase, async: true

  import Homework.Factory

  describe "merchant" do
    test "should create a new merchant" do
      merchant = build(:merchant)

      response =
        build_conn()
        |> post("graphql",
          query: """
          mutation CreateMerchant($input: CreateMerchantInput!) {
            createMerchant(input: $input) {
              id
              description
              name
            }
          }
          """,
          variables: %{
            input: %{
              "description" => merchant.description,
              "name" => merchant.name
            }
          }
        )
        |> json_response(200)

      %{
        "data" => %{
          "createMerchant" => created_merchant
        }
      } = response

      assert created_merchant["description"] == merchant.description
      assert created_merchant["name"] == merchant.name
    end

    test "should update a given merchant" do
      merchant = insert(:merchant)

      response =
        build_conn()
        |> post("graphql",
          query: """
          mutation UpdateMerchant($input: UpdateMerchantInput!) {
            updateMerchant(input: $input) {
              id
              description
              name
            }
          }
          """,
          variables: %{
            input: %{
              "id" => merchant.id,
              "name" => "Petzl"
            }
          }
        )
        |> json_response(200)

      %{
        "data" => %{
          "updateMerchant" => updated_merchant
        }
      } = response

      assert updated_merchant["name"] == "Petzl"
    end

    test "should delete a merchant" do
      merchant = insert(:merchant)

      response =
        build_conn()
        |> post("graphql",
          query: """
          mutation DeleteMerchant($id: ID!) {
            deleteMerchant(id: $id) {
              id
            }
          }
          """,
          variables: %{
            "id" => merchant.id
          }
        )
        |> json_response(200)

      %{
        "data" => %{
          "deleteMerchant" => %{
            "id" => id
          }
        }
      } = response

      assert id == merchant.id
    end
  end
end
