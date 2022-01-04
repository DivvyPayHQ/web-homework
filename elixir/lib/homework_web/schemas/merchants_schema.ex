defmodule HomeworkWeb.Schemas.MerchantsSchema do
  @moduledoc """
  Defines the graphql schema for merchants.
  """
  use Absinthe.Schema.Notation

  alias HomeworkWeb.Resolvers.MerchantsResolver

  object :merchant do
    field(:id, non_null(:id))
    field(:name, :string)
    field(:description, :string)
    field(:inserted_at, :naive_datetime)
    field(:updated_at, :naive_datetime)
  end

  object :merchant_mutations do
    @desc "Create a new Merchant"
    field :create_merchant, :merchant do
      @desc "Name of the Merchant"
      arg(:name, non_null(:string))
      @desc "Description of the Merchant"
      arg(:description, non_null(:string))

      resolve(&MerchantsResolver.create_merchant/3)
    end

    @desc "Update a new Merchant"
    field :update_merchant, :merchant do
      @desc "Record identifier"
      arg(:id, non_null(:id))
      @desc "Name of the Merchant"
      arg(:name, non_null(:string))
      @desc "Description of the Merchant"
      arg(:description, non_null(:string))

      resolve(&MerchantsResolver.update_merchant/3)
    end

    @desc "Delete an existing Merchant"
    field :delete_merchant, :merchant do
      @desc "Record identifier"
      arg(:id, non_null(:id))

      resolve(&MerchantsResolver.delete_merchant/3)
    end
  end
end
