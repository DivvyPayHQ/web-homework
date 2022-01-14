defmodule Homework.Users.User do
  alias Homework.Companies.Company
  import Ecto.Changeset
  use Ecto.Schema

  @fields [:company_id, :dob, :first_name, :last_name]
  @primary_key {:id, :binary_id, autogenerate: true}
  @required_fields @fields
  @type t :: %__MODULE__{}

  schema "users" do
    field(:dob, :date)
    field(:first_name, :string)
    field(:last_name, :string)

    belongs_to(:company, Company, type: :binary_id, foreign_key: :company_id)

    timestamps()
  end

  @doc false
  @spec changeset(__MODULE__.t(), map()) :: Ecto.Changeset.t()
  def changeset(user, attrs) do
    user
    |> cast(attrs, @fields)
    |> validate_required(@required_fields)
  end
end
