defmodule Homework.Users.User do
  use Ecto.Schema
  import Ecto.Changeset
  import Ecto.Query, only: [from: 2]

  alias Homework.Users.User

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "users" do
    field(:dob, :string)
    field(:first_name, :string)
    field(:last_name, :string)
    field(:tid, :string)

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:first_name, :last_name, :dob, :tid])
    |> validate_required([:first_name, :last_name, :dob])
  end

  #############
  ## queries ##
  #############

  def for_fuzzy_first_and_last_name(queryable \\ User, first_name, last_name) do
    from(q in queryable,
      where:
        fragment("soundex(?) = soundex(?)", q.first_name, ^first_name) and
          fragment("soundex(?) = soundex(?)", q.last_name, ^last_name)
    )
  end
end
