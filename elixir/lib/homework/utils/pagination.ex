defmodule Homework.Utils.Pagination do

  import Ecto.Query

  def skip_limit(query, args) do
    case args do
      %{ pagination: %{ skip: s, limit: l } } -> query |> offset(^s) |> limit(^l)
      _ -> query
    end
  end
end
