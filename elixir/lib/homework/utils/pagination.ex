defmodule Homework.Utils.Pagination do

  import Ecto.Query

  def skip_limit(query, args) do
    case args do
      %{ pagination: %{ skip: s, limit: l } } -> query |> order_by(:inserted_at) |> offset(^s) |> limit(^l)
      _ -> query
    end
  end
end
