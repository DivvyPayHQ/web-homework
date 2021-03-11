defmodule HomeworkWeb.Schemas.CategoriesSchema do
  @moduledoc """
  Defines the graphql schema for categories.
  """
  use Absinthe.Schema.Notation

  alias HomeworkWeb.Resolvers.CategoriesResolver

  object :category do
    field(:id, non_null(:id))
    field(:name, :string)
    field(:inserted_at, :naive_datetime)
    field(:updated_at, :naive_datetime)
  end

  object :category_mutations do
    @desc "Create a new category"
    field :create_category, :category do
      arg(:name, non_null(:string))

      resolve(&CategoriesResolver.create_category/3)
    end

    @desc "Update an existing category"
    field :update_category, :category do
      arg(:id, non_null(:id))
      arg(:name, non_null(:string))

      resolve(&CategoriesResolver.update_category/3)
    end

    @desc "delete an existing category"
    field :delete_category, :category do
      arg(:id, non_null(:id))

      resolve(&CategoriesResolver.delete_category/3)
    end
  end
end
