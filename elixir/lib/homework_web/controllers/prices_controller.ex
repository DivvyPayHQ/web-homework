defmodule HomeworkWeb.PricesController do
  use HomeworkWeb, :controller

  alias Homework.Shiren
  alias Homework.Shiren.Prices

  action_fallback HomeworkWeb.FallbackController

  def index(conn, _params) do
    price = Shiren.list_price()
    render(conn, "index.json", price: price)
  end

  def create(conn, %{"prices" => prices_params}) do
    with {:ok, %Prices{} = prices} <- Shiren.create_prices(prices_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.prices_path(conn, :show, prices))
      |> render("show.json", prices: prices)
    end
  end


  def show(conn, %{"id" => id}) do
    prices = Shiren.get_prices!(id)
    render(conn, "show.json", prices: prices)
  end

  def update(conn, %{"id" => id, "prices" => prices_params}) do
    prices = Shiren.get_prices!(id)

    with {:ok, %Prices{} = prices} <- Shiren.update_prices(prices, prices_params) do
      render(conn, "show.json", prices: prices)
    end
  end

  def delete(conn, %{"id" => id}) do
    prices = Shiren.get_prices!(id)

    with {:ok, %Prices{}} <- Shiren.delete_prices(prices) do
      send_resp(conn, :no_content, "")
    end
  end
end
