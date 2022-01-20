defmodule Homework.Merchants.SearchMerchantsByName do
  @moduledoc """
  Returns all Merchants whose name fuzzy match the provided `search_term`.

  Raises `Ecto.QueryError` if query validation fails.

  ## Examples

  iex> Merchants.search_merchants_by_name(%{search_term: "captain"}))
  [%Merchants{}, ...]
  """

  alias Homework.Merchants

  @spec call(params) :: {:ok, list(Merchants.t())} | {:ok, []} | {:error, any()}
        when params: %{
               :search_term => String.t()
             }
  def call(%{search_term: search_term}) do
    start_character =
      search_term
      |> String.slice(0..0)
      # adding % to start of string matches anywhere ToDo: ?
      |> (&"#{&1}%").()

    filters = %{
      fuzzy_name: %{
        search_term: search_term,
        start_character: start_character
      },
      order_by: :fuzzy_name
    }

    Merchants.filter_merchants(filters)
  end

  def call(_params), do: {:ok, []}
end
