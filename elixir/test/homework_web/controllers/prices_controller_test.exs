defmodule HomeworkWeb.PricesControllerTest do
  use HomeworkWeb.ConnCase

  alias Homework.Shiren
  alias Homework.Shiren.Prices

  @create_attrs %{
    amount: 42,
    category: "some category",
    type: "some type"
  }
  @update_attrs %{
    amount: 43,
    category: "some updated category",
    type: "some updated type"
  }
  @invalid_attrs %{amount: nil, category: nil, type: nil}

  def fixture(:prices) do
    {:ok, prices} = Shiren.create_prices(@create_attrs)
    prices
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all price", %{conn: conn} do
      conn = get(conn, Routes.prices_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create prices" do
    test "renders prices when data is valid", %{conn: conn} do
      conn = post(conn, Routes.prices_path(conn, :create), prices: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.prices_path(conn, :show, id))

      assert %{
               "id" => id,
               "amount" => 42,
               "category" => "some category",
               "type" => "some type"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.prices_path(conn, :create), prices: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update prices" do
    setup [:create_prices]

    test "renders prices when data is valid", %{conn: conn, prices: %Prices{id: id} = prices} do
      conn = put(conn, Routes.prices_path(conn, :update, prices), prices: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.prices_path(conn, :show, id))

      assert %{
               "id" => id,
               "amount" => 43,
               "category" => "some updated category",
               "type" => "some updated type"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, prices: prices} do
      conn = put(conn, Routes.prices_path(conn, :update, prices), prices: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete prices" do
    setup [:create_prices]

    test "deletes chosen prices", %{conn: conn, prices: prices} do
      conn = delete(conn, Routes.prices_path(conn, :delete, prices))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.prices_path(conn, :show, prices))
      end
    end
  end

  defp create_prices(_) do
    prices = fixture(:prices)
    %{prices: prices}
  end
end
