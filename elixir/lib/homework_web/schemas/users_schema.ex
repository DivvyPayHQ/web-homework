defmodule HomeworkWeb.Schemas.UsersSchema do
  @moduledoc """
  Defines the graphql schema for user.
  """
  use Absinthe.Schema.Notation

  alias HomeworkWeb.Resolvers.UsersResolver

  object :user do
    field(:id, non_null(:id))
    field(:dob, :string)
    field(:first_name, :string)
    field(:last_name, :string)
    field(:inserted_at, :naive_datetime)
    field(:updated_at, :naive_datetime)
  end

  @desc "Input parameters for a new user"
  input_object(:create_user_input) do
    field(:dob, non_null(:string))
    field(:first_name, non_null(:string))
    field(:last_name, non_null(:string))
  end

  @desc "Input parameters to update a user"
  input_object(:update_user_input) do
    field(:id, non_null(:id))
    field(:dob, :string)
    field(:first_name, :string)
    field(:last_name, :string)
  end

  object :user_mutations do
    @desc "Create a new user"
    field :create_user, :user do
      arg(:input, non_null(:create_user_input))

      resolve(&UsersResolver.create_user/3)
    end

    @desc "Update a given user"
    field :update_user, :user do
      arg(:input, non_null(:update_user_input))

      resolve(&UsersResolver.update_user/3)
    end

    @desc "Delete an existing user"
    field :delete_user, :user do
      arg(:id, non_null(:id))

      resolve(&UsersResolver.delete_user/3)
    end
  end
end
