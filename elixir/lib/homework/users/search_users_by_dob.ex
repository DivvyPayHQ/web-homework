defmodule Homework.Users.SearchUsersByDob do
  @moduledoc """
  Returns all Users whose dob match the provided `dob`.
  - Can pass optional `include` parameter; also returning dob `after` or `before`.

  Raises `Ecto.QueryError` if query validation fails.

  ## Examples

  iex> Users.search_users_by_dob(%{dob: "2010-11-01"})
  [%User{}, ...]

  iex> Users.search_users_by_dob(%{dob: "2010-11-01", include: :after})
  [%User{}, ...]

  """

  alias Homework.Users

  @spec call(params) :: {:ok, list(Users.t())} | {:ok, []} | {:error, any()}
        when params: %{
               :dob => String.t(),
               optional(:include) => :after | :before
             }
  def call(%{dob: _dob, include: _include} = params), do: Users.filter_users(%{dob: params})

  def call(%{dob: _dob} = params),
    do: call(Map.put(params, :include, nil))

  def call(_params), do: {:ok, []}
end
