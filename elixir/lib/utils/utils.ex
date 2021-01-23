defmodule Homework.Utils do
  @moduledoc """
  The Utils Module.
  """

  import Ecto.Query, warn: false

  def paginate_query(query, _args \\ %{}) do
    new_query = if _args[:skip], do: (from u in query, offset: ^floor_val(_args[:skip])), else: query
    new_query = if _args[:limit], do: (from u in new_query, limit: ^floor_val(_args[:limit])), else: new_query
  end

  def floor_val(val) do
    if not is_nil(val) and val < 0, do: 0, else: val
  end

end
