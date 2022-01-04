defmodule HomeworkWeb.Schemas.UsersSchema do
  @moduledoc """
  Defines the graphql schema for user.
  """
  use Absinthe.Schema.Notation

  alias HomeworkWeb.Resolvers.UsersResolver

  object :user do
    field(:id, non_null(:id))
    field(:company_id, :id)
    field(:dob, :string)
    field(:first_name, :string)
    field(:last_name, :string)
    field(:inserted_at, :naive_datetime)
    field(:updated_at, :naive_datetime)

    field(:company, :company) do
      resolve(&UsersResolver.company/3)
    end
  end

  object :user_mutations do
    @desc "Create a new User"
    field :create_user, :user do
      @desc "Company identifier the User belongs to"
      arg(:company_id, non_null(:id))
      @desc "Date of Birth of the User"
      arg(:dob, non_null(:string))
      @desc "First Name of the User"
      arg(:first_name, non_null(:string))
      @desc "Last Name of the User"
      arg(:last_name, non_null(:string))

      resolve(&UsersResolver.create_user/3)
    end

    @desc "Update a new User"
    field :update_user, :user do
      @desc "Record identifier"
      arg(:id, non_null(:id))
      @desc "Company identifier the User belongs to"
      arg(:company_id, :id)
      @desc "Date of Birth of the User"
      arg(:dob, non_null(:string))
      @desc "First Name of the User"
      arg(:first_name, non_null(:string))
      @desc "Last Name of the User"
      arg(:last_name, non_null(:string))

      resolve(&UsersResolver.update_user/3)
    end

    @desc "Delete an existing User"
    field :delete_user, :user do
      @desc "Record identifier"
      arg(:id, non_null(:id))

      resolve(&UsersResolver.delete_user/3)
    end
  end
end
