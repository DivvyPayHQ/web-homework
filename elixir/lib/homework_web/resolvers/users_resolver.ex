defmodule HomeworkWeb.Resolvers.UsersResolver do
  alias Homework.Users
  alias Homework.Companies

  @spec users(any, any, any) :: {:ok, list(%Users.User{})}
  @doc """
  Get a list of users
  """
  def users(_root, args, _info) do
    {:ok, Users.list_users(args)}
  end

  @spec company(any, any, %{
          :source => %{:company_id => any, optional(any) => any},
          optional(any) => any
        }) :: {:ok, %Companies.Company{}}
  @doc """
  Get the company associated with a user
  """
  def company(_root, _args, %{source: %{company_id: company_id}}) do
    {:ok, Companies.get_company!(company_id)}
  end

  @spec create_user(
          any,
          :invalid | %{optional(:__struct__) => none, optional(atom | binary) => any},
          any
        ) :: {:error, String.t()} | {:ok, %Users.User{}}
  @doc """
  Creates a user
  """
  def create_user(_root, args, _info) do
    case Users.create_user(args) do
      {:ok, user} ->
        {:ok, user}

      error ->
        {:error, "could not create user: #{inspect(error)}"}
    end
  end

  @spec update_user(
          any,
          %{:id => any, optional(:__struct__) => none, optional(atom | binary) => any},
          any
        ) :: {:error, String.t()} | {:ok, %Users.User{}}
  @doc """
  Updates a user for an id with args specified.
  """
  def update_user(_root, %{id: id} = args, _info) do
    user = Users.get_user!(id)

    case Users.update_user(user, args) do
      {:ok, user} ->
        {:ok, user}

      error ->
        {:error, "could not update user: #{inspect(error)}"}
    end
  end

  @spec delete_user(any, %{:id => any, optional(any) => any}, any) ::
          {:error, String.t()} | {:ok, %Users.User{}}
  @doc """
  Deletes a user for an id
  """
  def delete_user(_root, %{id: id}, _info) do
    user = Users.get_user!(id)

    case Users.delete_user(user) do
      {:ok, user} ->
        {:ok, user}

      error ->
        {:error, "could not update user: #{inspect(error)}"}
    end
  end

  @spec search_users(
          any,
          %{:first_name => any, :last_name => any, :max_distance => any, optional(any) => any},
          any
        ) :: {:ok, list(%Users.User{})}
  @doc """
  Fuzzy search for users by first and last name
  """
  def search_users(_root, %{first_name: first_name, last_name: last_name, max_distance: max_distance}, _info) do
    {:ok, Users.search_users(first_name, last_name, max_distance)}
  end
end
