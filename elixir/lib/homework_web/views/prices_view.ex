defmodule HomeworkWeb.PricesView do
  use HomeworkWeb, :view
  alias HomeworkWeb.PricesView

  def render("index.json", %{price: price}) do
    %{data: render_many(price, PricesView, "prices.json")}
  end

  def render("show.json", %{prices: prices}) do
    %{data: render_one(prices, PricesView, "prices.json")}
  end

  def render("prices.json", %{prices: prices}) do
    %{id: prices.id,
      amount: prices.amount,
      category: prices.category,
      type: prices.type}
  end
end
