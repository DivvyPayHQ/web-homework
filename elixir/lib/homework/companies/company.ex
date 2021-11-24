defmodule Homework.Companies.Company do
  use Ecto.Schema
  import Ecto.Changeset
  alias Homework.Users.User


  @primary_key {:id, :binary_id, autogenerate: true}
  schema "companies" do
    field :available_credit, :float
    field :credit_line, :integer
    field :name, :string

    belongs_to(:user, User, type: :binary_id, foreign_key: :user_id)
    timestamps()
  end

  @doc false
  def changeset(company, attrs) do
    company
    |> cast(attrs, [:user_id, :name, :credit_line, :available_credit])
    |> validate_required([:user_id, :name, :credit_line, :available_credit])
  end
end
