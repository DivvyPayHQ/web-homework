defmodule Homework.Paginator do
  import Ecto.Query, warn: false

  alias Homework.Repo

  def page(query, %{limit: limit, offset: offset}) do
    paginate(query, limit, offset)
    # |> total_rows()
  end

  def paginate(query, limit, offset) do
    query
    |> determine_limit(limit)
    |> offset(^offset)
    |> Repo.all
  end

  def total_rows(query) do
    query
    |> select([e], count(e.id))
    |> Repo.one
  end

  def determine_limit(query, number) when is_integer(number) and number < 0 do
    query
  end

  def determine_limit(query, number) when is_integer(number) and number >= 0 do
    query
    |> limit(^number)
  end

end
