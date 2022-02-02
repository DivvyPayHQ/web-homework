defmodule HomeworkWeb.Schemas.CompaniesSchema do
  @moduledoc """
  Defines the graphql schema for company.
  """
  use Absinthe.Schema.Notation

  alias HomeworkWeb.Resolvers.CompaniesResolver

  object :company do
    field(:id, non_null(:id))
    field(:name, :string)
    field(:credit_line, :float)
    field(:available_credit, :float)
  end

  object :company_mutations do
    @desc "Create a company"
    field :create_company, :company do
      arg(:name, non_null(:string))
      arg(:credit_line, non_null(:float))

      resolve(&CompaniesResolver.create_company/3)
    end

    @desc "Update a company"
    field :update_company, :company do
      arg(:id, non_null(:id))
      arg(:name, non_null(:string))
      arg(:credit_line, non_null(:float))

      resolve(&CompaniesResolver.update_company/3)
    end

    @desc "Delete an existing company"
    field :delete_company, :company do
      arg(:id, non_null(:id))

      resolve(&CompaniesResolver.delete_company/3)
    end
  end
end
