defmodule Homework.Companies.SearchCompaniesByName do
  @moduledoc """
  Returns all Companies whose name fuzzy match the provided `search_term`.

  Raises `Ecto.QueryError` if query validation fails.

  ## Examples

  iex> Companies.search_companies_by_name(%{search_term: "captain"}))
  [%Companies{}, ...]
  """

  alias Homework.Companies

  @spec call(params) :: {:ok, list(Companies.t())} | {:ok, []} | {:error, any()}
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

    Companies.filter_companies(filters)
  end

  def call(_params), do: {:ok, []}
end
