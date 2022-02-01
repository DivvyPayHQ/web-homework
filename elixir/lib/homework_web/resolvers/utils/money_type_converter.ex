defmodule HomeworkWeb.Resolvers.Utils.MoneyTypeConverter do
  @moduledoc """
    Utility for converting money values.
  """

  @doc """
    Converts the data types of money value fields on a list of given struct.
  """
  def convert_structs([] = structs, _fields) do
    []
  end

  def convert_structs([h | t] = _structs, fields) do
    [convert_fields(h, fields) | convert_structs(t, fields)]
  end

  @doc """
    Converts the data types of money value fields on a given struct.
  """
  def convert_fields(struct, [] = _fields) do
    struct
  end

  def convert_fields(struct, [h | t] = _fields) do
    struct
    |> Map.update!(h,  &convert(&1))
    |> convert_fields(t)
  end

  @doc """
    Converts a given money value's data type into a another data type (e.g. integer to float, float to integer, etc.)
  """
  def convert(money) when is_integer(money) do
    money / 100
  end

  def convert(money) when is_float(money)do
    Float.round(money, 2) * 100 |> trunc()
  end

end
