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
    @desc "Create a new merchant"
    field :create_merchant, :merchant do
      arg(:name, non_null(:string))
      arg(:description, non_null(:string))

      resolve(&MerchantsResolver.create_merchant/3)
    end
  end
end
