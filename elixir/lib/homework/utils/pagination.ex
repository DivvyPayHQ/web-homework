defmodule Homework.Utils.Pagination do

  import Ecto.Query

  def skip_limit(query, args) do
    case args do
      # by ordering off of id, we get a postgres keyset pagination
      %{ pagination: %{ skip: s, limit: l } } -> query |> order_by(:id) |> offset(^s) |> limit(^l)
      _ -> query
    end
  end
end
