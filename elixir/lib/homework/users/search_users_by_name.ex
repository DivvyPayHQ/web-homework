defmodule Homework.Users.SearchUsersByName do
  @moduledoc """
  Returns all Users whose name fuzzy match the provided `search_term`.
  - Can apply to either `first_name`,`last_name` or both of a User with the
    optional `search_by` parameter.

  Raises `Ecto.QueryError` if query validation fails.

  ## Examples

  iex> Users.search_users_by_name(%{search_by: [:first_name], search_term: "captain"})
  [%User{}, ...]
  """

  alias Homework.Users

  @spec call(params) :: {:ok, list(Users.t())} | {:ok, []} | {:error, any()}
        when params: %{
               optional(:search_by) => [:first_name | :last_name],
               :search_term => String.t()
             }
  def call(%{search_by: search_by, search_term: search_term}) do
    start_character =
      search_term
      |> String.slice(0..0)
      # adding % to start of string matches anywhere ToDo: ?
      |> (&"#{&1}%").()

    filters = %{
      fuzzy_name: %{
        search_by: search_by,
        search_term: search_term,
        start_character: start_character
      },
      order_by: :fuzzy_name
    }

    Users.filter_users(filters)
  end

  def call(%{search_term: _search_term} = params),
    do: call(Map.put(params, :search_by, [:first_name, :last_name]))

  def call(_params), do: {:ok, []}
end
