defmodule HomeworkWeb.UsersResolver do
  alias Homework.Users

  def users(_root, args, _info) do
    {:ok, Users.list_users(args)}
  end
end
