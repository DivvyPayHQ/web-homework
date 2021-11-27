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

  object :merchant_page do
    field :merchants, :mpage do
      arg(:limit, :integer, default_value: -1)
      arg(:offset, :integer, default_value: 0)
      resolve(&MerchantsResolver.merchants/3)
    end
  end

  object :mpage do
    field :items, list_of(:merchant) do
      arg(:limit, :integer, default_value: -1)
      arg(:offset, :integer, default_value: 0)
      resolve(&MerchantsResolver.merchants/3)
    end

    field :total_rows, :integer do
      resolve(&MerchantsResolver.merchant_count/3)
    end
  end

  object :merchant_mutations do
    @desc "Create a new merchant"
    field :create_merchant, :merchant do
      arg(:name, non_null(:string))
      arg(:description, non_null(:string))

      resolve(&MerchantsResolver.create_merchant/3)
    end

    @desc "Update a new merchant"
    field :update_merchant, :merchant do
      arg(:id, non_null(:id))
      arg(:name, non_null(:string))
      arg(:description, non_null(:string))

      resolve(&MerchantsResolver.update_merchant/3)
    end

    @desc "delete an existing merchant"
    field :delete_merchant, :merchant do
      arg(:id, non_null(:id))

      resolve(&MerchantsResolver.delete_merchant/3)
    end
  end
end
