defmodule Homework.Companies.FilterCompanies do
  @moduledoc """
  Returns all Companies.
  - Can filter out Companies by passing in optional parameters.
  - Ideally all Companies queries end by calling Companies.filter_companies/1.

  Raises `Ecto.QueryError` if query validation fails.

  ## Examples

  iex> Companies.filter_companies(%{name: "captain"})
  [%Transaction{}, ...]
  """

  alias Homework.Companies.Company
  alias Homework.Repo
  import Ecto.Query, warn: false

  @type fuzzy_name_params :: %{
          :search_term => String.t(),
          :start_character => String.t()
        }

  @spec call(params) :: [Transaction.t()] | []
        when params: %{
               optional(:id_in) => list(),
               optional(:fuzzy_name) => fuzzy_name_params(),
               optional(:name) => String.t(),
               optional(:order_by) => :inserted_at_asc | :inserted_at_desc | :fuzzy_name,
               optional(:preload) => list()
             }
  def call(params),
    do:
      Company
      |> where(^filter_where(params))
      |> order_by(^filter_order_by(params[:order_by], params))
      |> preload(^Map.get(params, :preload, []))
      |> Repo.all()

  defp filter_order_by(:inserted_at_asc, _),
    do: [asc: dynamic([c], c.inserted_at)]

  defp filter_order_by(:inserted_at_desc, _),
    do: [desc: dynamic([c], c.inserted_at)]

  defp filter_order_by(:fuzzy_name, %{fuzzy_name: %{search_term: search_term}}),
    do: [asc: dynamic([c], fragment("LEVENSHTEIN(?,?)", c.name, ^search_term))]

  defp filter_order_by(_, _),
    do: []

  defp filter_where(params) do
    Enum.reduce(params, dynamic(true), fn
      {:id_in, value}, _dynamic ->
        dynamic([c], c.id in ^value)

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
