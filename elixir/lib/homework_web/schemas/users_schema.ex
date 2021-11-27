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


  object :user_page do
    field :users, :upage do
      arg(:limit, :integer, default_value: -1)
      arg(:offset, :integer, default_value: 0)
      resolve(&UsersResolver.users/3)
    end
  end

  object :upage do
    field :items, list_of(:user) do
      arg(:limit, :integer, default_value: -1)
      arg(:offset, :integer, default_value: 0)
      resolve(&UsersResolver.users/3)
    end

    field :total_rows, :integer do
      resolve(&UsersResolver.user_count/3)
    end
  end

  object :user_mutations do
    @desc "Create a new user"
    field :create_user, :user do
      arg(:dob, non_null(:string))
      arg(:first_name, non_null(:string))
      arg(:last_name, non_null(:string))

      resolve(&UsersResolver.create_user/3)
    end

    @desc "Update a new user"
    field :update_user, :user do
      arg(:id, non_null(:id))
      arg(:dob, non_null(:string))
      arg(:first_name, non_null(:string))
      arg(:last_name, non_null(:string))

      resolve(&UsersResolver.update_user/3)
    end

    @desc "delete an existing user"
    field :delete_user, :user do
      arg(:id, non_null(:id))

      resolve(&UsersResolver.delete_user/3)
    end
  end
end
