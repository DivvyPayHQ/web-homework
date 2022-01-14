defmodule Homework.Merchants.FilterMerchants do
  @moduledoc """
  Returns all Merchants.
  - Can filter out Merchants by passing in optional parameters.
  - Ideally all Merchants queries end by calling Merchants.filter_merchants/1.

  Raises `Ecto.QueryError` if query validation fails.

  ## Examples

  iex> Merchants.filter_merchants(%{name: "captain"})
  [%Transaction{}, ...]
  """

  alias Homework.Merchants.Merchant
  alias Homework.Repo
  import Ecto.Query, warn: false

  @type fuzzy_name_params :: %{
          :search_term => String.t(),
          :start_character => String.t()
        }

  @spec call(params) :: [Transaction.t()] | []
        when params: %{
               optional(:fuzzy_name) => fuzzy_name_params(),
               optional(:name) => String.t(),
               optional(:order_by) => :inserted_at_asc | :inserted_at_desc,
               optional(:preload) => list()
             }
  def call(params),
    do:
      Merchant
      |> where(^filter_where(params))
      |> order_by(^filter_order_by(params[:order_by], params))
      |> preload(^Map.get(params, :preload, []))
      |> Repo.all()

  defp filter_order_by(:inserted_at_asc, _),
    do: [asc: dynamic([m], m.inserted_at)]

  defp filter_order_by(:inserted_at_desc, _),
    do: [desc: dynamic([m], m.inserted_at)]

  defp filter_order_by(_, _),
    do: []

  defp filter_where(params) do
    Enum.reduce(params, dynamic(true), fn
      {:fuzzy_name, value}, _dynamic ->
        handle_fuzzy_name_condition(value)

      {:name, value}, dynamic ->
        dynamic([m], ^dynamic and m.name == ^value)

      _, dynamic ->
        dynamic
    end)
  end

  defp handle_fuzzy_name_condition(%{
         search_term: search_term,
         start_character: start_character
       }),
       do:
         dynamic(
           [m],
           ilike(m.name, ^start_character) and
             fragment("SIMILARITY(?,?) > 0", m.name, ^search_term)
         )
end
