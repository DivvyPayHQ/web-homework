defmodule Homework.Middlewares.Pagination do
  @behaviour Absinthe.Middleware
  def call(resolution = %{value: value, arguments: _args = %{limit: limit, skip: skip}}, _) do
    new_value = value
      |> Enum.drop(skip)
      |> Enum.slice(0..limit - 1)

      %{resolution | value: new_value}
  end
  def call(resolution, _), do: resolution
end
