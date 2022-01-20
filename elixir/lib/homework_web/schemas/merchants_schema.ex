defmodule HomeworkWeb.Schemas.MerchantsSchema do
  @moduledoc """
  Defines the graphql schema for merchants.
  """

  alias HomeworkWeb.Resolvers.MerchantsResolver
  use Absinthe.Schema.Notation

  ##########################################
  ### Types
  ##########################################
  object :merchant do
    field(:description, :string)
    field(:id, non_null(:id))
    field(:inserted_at, :naive_datetime)
    field(:name, :string)
    field(:updated_at, :naive_datetime)
  end

  ##########################################
  ### Queries
  ##########################################
  object :merchant_queries do
    @desc "Get all merchants"
    field(:merchants, list_of(:merchant)) do
      resolve(&MerchantsResolver.merchants/3)
    end

    @desc "Get an existing merchant"
    field :merchant, :merchant do
      arg(:id, non_null(:id))
      resolve(&MerchantsResolver.merchant/3)
    end
  end

  ##########################################
  ### Mutations
  ##########################################
  object :merchant_mutations do
    @desc "Create a new merchant"
    field :create_merchant, :merchant do
      arg(:description, non_null(:string))
      arg(:name, non_null(:string))

      resolve(&MerchantsResolver.create_merchant/3)
    end

    @desc "Delete an existing merchant"
    field :delete_merchant, :merchant do
      arg(:id, non_null(:id))

      resolve(&MerchantsResolver.delete_merchant/3)
    end

    @desc "Search existing merchants by the provided search term"
    field :search_merchants_by_name, list_of(:merchant) do
      arg(:search_term, non_null(:string))

      resolve(&MerchantsResolver.search_merchants_by_name/3)
    end

    @desc "Update a new merchant"
    field :update_merchant, :merchant do
      arg(:description, :string)
      arg(:id, non_null(:id))
      arg(:name, :string)

      resolve(&MerchantsResolver.update_merchant/3)
    end
  end
end
