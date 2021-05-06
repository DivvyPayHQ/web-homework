defmodule Homework.Users do
  @moduledoc """
  The Users context.
  """

  import Ecto.Query, warn: false
  alias Homework.Repo

  alias Homework.Users.User

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users([])
      [%User{}, ...]

  """
  def list_users(args)

  # Fuzzy search users by first & last name.
  # Unlike searching merchants, does not require a matching initial character
  # on either name (since you might want to search something like "Sidow, Max"
  # to find "Max von Sidow").x
  # Orders results by Levenshtein distance.
  def list_users(%{named_like: search_name})
      when is_binary(search_name) and search_name != "" do
    # Note: if users are primarily searching by *last* name rather than full name,
    # we might want to swap the CONCAT() order below.
    from(
      u in User,
      where:
        fragment(
          "SIMILARITY(CONCAT((?), ' ', (?)), ?) > 0",
          u.first_name,
          u.last_name,
          ^search_name
        ),
      order_by:
        fragment("LEVENSHTEIN(CONCAT((?), ' ', (?)), ?)", u.first_name, u.last_name, ^search_name)
    )
    |> Repo.all()
  end

  def list_users(_args) do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{data: %User{}}

  """
  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end
end
