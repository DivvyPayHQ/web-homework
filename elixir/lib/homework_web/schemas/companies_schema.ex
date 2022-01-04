defmodule HomeworkWeb.Schemas.CompaniesSchema do
  @moduledoc """
  Defines the graphql schema for merchants.
  """
  use Absinthe.Schema.Notation

  alias HomeworkWeb.Resolvers.CompaniesResolver

  object :company do
    field(:id, non_null(:id))
    field(:name, :string)
    field(:credit_line, :decimal)
    field(:available_credit, :decimal)
    field(:inserted_at, :naive_datetime)
    field(:updated_at, :naive_datetime)
  end

  object :company_mutations do
    @desc "Create a new Company"
    field :create_company, :company do
      @desc "Name of the Company"
      arg(:name, non_null(:string))
      @desc "Credit Line is in dollars"
      arg(:credit_line, non_null(:decimal))

      resolve(&CompaniesResolver.create_company/3)
    end

    @desc "Update a new Company"
    field :update_company, :company do
      @desc "Record identifier"
      arg(:id, non_null(:id))
      @desc "Name of the Company"
      arg(:name, non_null(:string))
      @desc "Credit Line is in dollars"
      arg(:credit_line, non_null(:decimal))

      resolve(&CompaniesResolver.update_company/3)
    end

    @desc "Delete an existing Company"
    field :delete_company, :company do
      @desc "Record identifier"
      arg(:id, non_null(:id))

      resolve(&CompaniesResolver.delete_company/3)
    end
  end
end
