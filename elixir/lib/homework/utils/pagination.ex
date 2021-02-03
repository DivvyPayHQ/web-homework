defmodule Homework.Utils.Pagination do

  import Ecto.Query
  alias Homework.Repo

  def skip_limit(query, args) do

    # not sure how to pass this along to the query...
    _total_rows = query |> select(fragment("count(*)")) |> Repo.one()

    case args do
      %{ pagination: %{ skip: s, limit: l } } -> query |> order_by(:inserted_at) |> offset(^s) |> limit(^l)
      _ -> query
    end
  end
end
