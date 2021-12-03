defmodule Homework.Users.User do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "users" do
    field(:dob, :string)
    field(:first_name, :string)
    field(:last_name, :string)

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:first_name, :last_name, :dob])
    |> validate_required([:first_name, :last_name, :dob])
  end

  def fuzzy_first_name_filter(query \\ Homework.Users.User, first_name) do
    where(query, [u], fragment("? % ?", u.first_name, ^first_name))
  end

  def fuzzy_last_name_filter(query \\ Homework.Users.User, last_name) do
    where(query, [u], fragment("? % ?", u.last_name, ^last_name))
  end
end