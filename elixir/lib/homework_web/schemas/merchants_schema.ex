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

  @desc "Input parameters for a new merchant"
  input_object(:create_merchant_input) do
    field(:name, non_null(:string))
    field(:description, non_null(:string))
  end

  @desc "Input parameters for a merchant"
  input_object(:update_merchant_input) do
    field(:id, non_null(:id))
    field(:name, :string)
    field(:description, :string)
  end

  object :merchant_mutations do
    @desc "Create a new merchant"
    field :create_merchant, :merchant do
      arg(:input, non_null(:create_merchant_input))

      resolve(&MerchantsResolver.create_merchant/3)
    end

    @desc "Update a given merchant"
    field :update_merchant, :merchant do
      arg(:input, non_null(:update_merchant_input))

      resolve(&MerchantsResolver.update_merchant/3)
    end

    @desc "Delete an existing merchant"
    field :delete_merchant, :merchant do
      arg(:id, non_null(:id))

      resolve(&MerchantsResolver.delete_merchant/3)
    end
  end
end
