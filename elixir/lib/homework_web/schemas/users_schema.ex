defmodule HomeworkWeb.Schemas.UsersSchema do
  @moduledoc """
  Defines the graphql schema for user.
  """

  alias HomeworkWeb.Resolvers.UsersResolver
  use Absinthe.Schema.Notation

  ##########################################
  ### Types
  ##########################################
  @desc "Search by FIRST_NAME or LAST_NAME"
  enum :search_by do
    value(:first_name, as: :first_name)
    value(:last_name, as: :last_name)
  end

  object :user do
    field(:company, :company) do
      resolve(&UsersResolver.company/3)
    end

    field(:company_id, :id)

    field(:dob, :string)
    field(:first_name, :string)
    field(:id, non_null(:id))
    field(:inserted_at, :naive_datetime)
    field(:last_name, :string)
    field(:updated_at, :naive_datetime)
  end

  ##########################################
  ### Queries
  ##########################################
  object :user_queries do
    @desc "Get all users"
    field(:users, list_of(:user)) do
      resolve(&UsersResolver.users/3)
    end

    @desc "Get an existing user"
    field :user, :user do
      arg(:id, non_null(:id))
      resolve(&UsersResolver.user/3)
    end
  end

  ##########################################
  ### Mutations
  ##########################################
  object :user_mutations do
    @desc "Create a new user"
    field :create_user, :user do
      arg(:company_id, non_null(:id))
      arg(:dob, non_null(:string))
      arg(:first_name, non_null(:string))
      arg(:last_name, non_null(:string))

      resolve(&UsersResolver.create_user/3)
    end

    @desc "Delete an existing user"
    field :delete_user, :user do
      arg(:id, non_null(:id))

      resolve(&UsersResolver.delete_user/3)
    end

    @desc "Search existing users by the provided search term"
    field :search_users_by_name, list_of(:user) do
      arg(:search_by, list_of(:search_by))
      arg(:search_term, non_null(:string))

      resolve(&UsersResolver.search_users_by_name/3)
    end

    @desc "Update a new user"
    field :update_user, :user do
      arg(:id, non_null(:id))
      arg(:company_id, :id)
      arg(:dob, :string)
      arg(:first_name, :string)
      arg(:last_name, :string)

      resolve(&UsersResolver.update_user/3)
    end
  end
end
