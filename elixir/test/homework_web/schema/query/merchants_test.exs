defmodule HomeworkWeb.MerchantsTest do
  use HomeworkWeb.ConnCase, async: true

  import Homework.Factory

  describe "merchants" do
    @query """
    query ListMerchants {
      merchants {
        id
        name
        description
      }
    }
    """

    test "should return an empty list" do
      response =
        build_conn()
        |> get("graphql", query: @query)

      expected = %{
        "data" => %{
          "merchants" => []
        }
      }

      assert expected == json_response(response, 200)
    end

    test "should return a list of merchants" do
      [merchant1, merchant2] = insert_pair(:merchant)

      response =
        build_conn()
        |> get("graphql", query: @query)

      expected = %{
        "data" => %{
          "merchants" => [
            %{
              "id" => merchant1.id,
              "description" => merchant1.description,
              "name" => merchant1.name
            },
            %{
              "id" => merchant2.id,
              "description" => merchant2.description,
              "name" => merchant2.name
            }
          ]
        }
      }

      assert expected == json_response(response, 200)
    end
  end
end
