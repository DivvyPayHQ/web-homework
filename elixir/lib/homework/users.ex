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
  @spec list_users(List.t) :: List.t
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
  @spec get_user!(:binary_id) :: User.t
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @spec create_user(Map.t) :: Map.t
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
  @spec update_user(User.t, Map.t) :: Map.t
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
  @spec delete_user(User.t) :: Map.t
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{data: %User{}}

  """
  @spec change_user(User, Map.t) :: Map.t
  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end

  @doc """
  Returns the user that match this first, last, and dob combination

  """
  @spec get_users_by_dob_and_name(String.t, String.t, String.t) :: List.t
  def get_users_by_dob_and_name(date_of_birth,first_name,last_name) do
    Repo.one(from u in User, where: u.first_name == ^first_name, where: u.last_name == ^last_name, where: u.dob == ^date_of_birth)
  end


  @doc """
  Fuzzy Search by first and last name and return all Users that partially or totally match these

  """
  @spec get_user_by_fuzzy(String.t, String.t) :: List.t
  def get_user_by_fuzzy(first_name,last_name) do
    first_name = "%" <> first_name <> "%"
    last_name = "%"  <> last_name <> "%"
    Repo.all(from u in User,
     where: like(u.first_name, ^first_name),
     where: like(u.last_name, ^last_name))
  end
end
