defmodule Homework.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

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
end
