defmodule HomeworkWeb.Schemas.CompaniesSchema do
  @moduledoc """
  Defines the graphql schema for companies.
  """
  use Absinthe.Schema.Notation

  alias HomeworkWeb.Resolvers.CompaniesResolver

  object :company do
    field(:id, non_null(:id))
    field(:name, :string)
    field(:credit_line, :integer)
    field(:available_credit, :integer)
    field(:inserted_at, :naive_datetime)
    field(:updated_at, :naive_datetime)
  end

  object :company_queries do
    @desc "Get all Companies"
    field(:companies, list_of(:company)) do
      resolve(&CompaniesResolver.companies/3)
    end

    @desc "Find Companies by name"
    field(:find_companies, list_of(:company)) do
      arg(:name, non_null(:string))

      resolve(&CompaniesResolver.find_companies/3)
    end
  end

  object :company_mutations do
    @desc "Create a new company"
    field :create_company, :company do
      arg(:name, non_null(:string))
      arg(:credit_line, non_null(:integer))

      resolve(&CompaniesResolver.create_company/3)
    end

    @desc "Update a new company"
    field :update_company, :company do
      arg(:id, non_null(:id))
      arg(:name, non_null(:string))
      arg(:credit_line, non_null(:integer))

      resolve(&CompaniesResolver.update_company/3)
    end

    @desc "delete an existing company"
    field :delete_company, :company do
      arg(:id, non_null(:id))

      resolve(&CompaniesResolver.delete_company/3)
    end
  end
end
