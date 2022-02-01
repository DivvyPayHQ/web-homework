defmodule Homework.Repo do
  @moduledoc """
    Includes and extends the basic functionality of an Ecto data repository (i.e. Ecto.Repo).
  """

  use Ecto.Repo,
    otp_app: :homework,
    adapter: Ecto.Adapters.Postgres

  import Ecto.Query

  @doc """
    Returns all records from a given table based on a given date range and column
  """
  @spec all_by_date_range(%{}, Ecto.Schema.schema(), atom) :: list(Ecto.Schema)
  def all_by_date_range(%{start_date: start_date, end_date: end_date}, table, column) do
    from(
      t in table,
      where:
        fragment("?::date", field(t, ^column)) >= ^start_date and
          fragment("?::date", field(t, ^column)) <= ^end_date
    )
    |> all()
  end

  @doc """
    Returns all records from a given table based on a fuzzy search of column-to-value mappings.
  """
  @spec all_by_fuzzy_strings(list(%{}), Ecto.Schema.schema()) :: list(Ecto.Schema)
  def all_by_fuzzy_strings(search_values, table) do
    from(t in table)
    |> extend_query(search_values)
    |> all()
  end

  # Recursively extends "where" and "order by" clauses to a given query for a list of column-to-value mappings.
  defp extend_query(query, [h | t]) do
    {column, search_phrase} = Map.to_list(h) |> List.first()

    from(
      q in query,
      where:
        ilike(field(q, ^column), ^"%#{search_phrase}%") and
          fragment("SIMILARITY(?, ?) > 0", field(q, ^column), ^search_phrase),
      order_by: fragment("LEVENSHTEIN(?, ?)", field(q, ^column), ^search_phrase)
    )
    |> extend_query(t)
  end

  # Recursion ends here
  defp extend_query(query, search_values) when length(search_values) == 0 do
    query
  end
end
