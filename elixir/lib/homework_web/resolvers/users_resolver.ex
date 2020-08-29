defmodule HomeworkWeb.Resolvers.UsersResolver do
  alias Homework.Users

  def users(_root, args, _info) do
    {:ok, Users.list_users(args)}
  end

  def create_user(_root, args, _info) do
    case Users.create_user(args) do
      {:ok, user} ->
        {:ok, user}

      error ->
        {:error, "could not create user: #{inspect(error)}"}
    end
  end
end
