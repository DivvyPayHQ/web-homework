defmodule HomeworkWeb.Resolvers.UsersResolver do
  alias Absinthe.Resolution.Helpers
  alias Homework.{Companies, Users}

  @doc """
  Get a list of users
  """
  def users(_root, args, _info), do: {:ok, Users.list_users(args)}

  @doc """
  Get an existing user
  """
  def user(_root, %{id: id}, _info) do
    try do
      {:ok, Users.get_user!(id)}
    rescue
      Ecto.NoResultsError -> {:error, "could not get user: no result"}
    end
  end

  @doc """
  Get the company associated with a user
  """
  def company(user, _args, _info),
    do:
      Helpers.batch(
        {__MODULE__, :batch_user_company},
        user.company_id,
        fn batch_results ->
          batch_results
          |> Map.get(user.company_id)
          |> Enum.at(0)
          |> (&{:ok, &1}).()
        end
      )

  def batch_user_company(_, company_ids) do
    company_ids
    |> Enum.uniq()
    |> Companies.where_id_in()
  end

  @doc """
  Create a new user
  """
  def create_user(_root, args, _info) do
    case Users.create_user(args) do
      {:ok, user} ->
        {:ok, user}

      error ->
        {:error, "could not create user: #{inspect(error)}"}
    end
  end

  @doc """
  Deletes a user for an id
  """
  def delete_user(_root, args, _info) do
    with {:ok, user} <- user(%{}, args, %{}),
         {:ok, _user} = res <- Users.delete_user(user) do
      res
    else
      error ->
        {:error, "could not delete user: #{inspect(error)}"}
    end
  end

  @doc """
  Search existing users by the provided search term
  """
  def search_users_by_name(_root, args, _info) do
    case Users.search_users_by_name(args) do
      resp when is_list(resp) ->
        {:ok, resp}

      error ->
        {:error, "could not search users by name: #{inspect(error)}"}
    end
  end

  @doc """
  Updates a user for an id with args specified.
  """
  def update_user(_root, args, _info) do
    with {:ok, user} <- user(%{}, args, %{}),
         {:ok, _user} = res <- Users.update_user(user, args) do
      res
    else
      error ->
        {:error, "could not update user: #{inspect(error)}"}
    end
  end
end
