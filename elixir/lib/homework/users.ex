defmodule Homework.Users do
  @moduledoc """
  The Users context.
  """

  alias Homework.Repo
  alias Homework.Users.{FilterUsers, SearchUsersByDob, SearchUsersByName, User}
  import Ecto.Query, warn: false

  ##########################################
  ### Batching for nested graphql schemas
  ##########################################
  def batch_transaction_user(user_ids) do
    User
    |> where([u], u.id in ^user_ids)
    |> Repo.all()
    |> Enum.group_by(& &1.id, & &1)
  end

  ##########################################
  ### Users queries
  ##########################################
  defdelegate filter_users(params), to: FilterUsers, as: :call

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  @spec list_users(map()) :: [User.t()]
  def list_users(params \\ %{}), do: filter_users(params)
  defdelegate search_users_by_dob(params), to: SearchUsersByDob, as: :call
  defdelegate search_users_by_name(params), to: SearchUsersByName, as: :call

  def batch_company_users(company_ids) do
    User
    |> where([u], u.company_id in ^company_ids)
    |> Repo.all()
    |> Enum.group_by(& &1.company_id, & &1)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{data: %User{}}

  """
  @spec change_user(User.t(), map()) :: Ecto.Changeset.t()
  def change_user(%User{} = user, attrs \\ %{}), do: User.changeset(user, attrs)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @spec create_user(map()) :: {:ok, User.t()} | {:error, Ecto.Changeset.t()}
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  @spec delete_user(User.t()) :: {:ok, User.t()} | {:error, Ecto.Changeset.t()}
  def delete_user(%User{} = user), do: Repo.delete(user)

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  @spec get_user!(String.t()) :: User.t()
  def get_user!(id), do: get_user_by!(id: id)

  @doc """
  Gets a single user by the provided attribute(s).

  Raises `Ecto.NoResultsError` if the User does not exist.
  Raises `Ecto.MultipleResultsError` if more than one entry.

  ## Examples

      iex> get_user_by!(id: 123)
      %User{}

      iex> get_user_by!(id: 456)
      ** (Ecto.NoResultsError)

  """
  @spec get_user_by!(Keyword.t()) :: User.t()
  def get_user_by!(opts), do: Repo.get_by!(User, opts)

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @spec update_user(User.t(), map()) :: {:ok, User.t()} | {:error, Ecto.Changeset.t()}
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end
end
