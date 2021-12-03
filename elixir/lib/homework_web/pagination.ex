defmodule HomeworkWeb.Pagination do
  @behaviour Absinthe.Middleware

  def call(resolution = %{arguments: %{limit: limit, skip: skip}, value: value}, _config) when is_list(value) do
    total_rows = length(value)
    value = value
    |> Enum.drop(skip)
    |> Enum.take(limit)
    
    %{resolution | value: value}
  end
  def call(resolution, _config) do
    resolution
  end
end