defmodule HomeworkWeb.Schemas.CompaniesSchema do
  @moduledoc """
  Defines the graphql schema for company.
  """
  use Absinthe.Schema.Notation

  alias HomeworkWeb.Resolvers.CompaniesResolver

  object :company do
    field(:id, non_null(:id))
    field(:name, :string)
    field(:credit_line, :integer)
    field(:availiable_credit, :integer)
  end

  object :company_page do
    field :companies, :cpage do
      arg(:limit, :integer, default_value: -1)
      arg(:offset, :integer, default_value: 0)
      resolve(&CompaniesResolver.companies/3)
    end
  end

  object :cpage do
    field :items, list_of(:company) do
      arg(:limit, :integer, default_value: -1)
      arg(:offset, :integer, default_value: 0)
      resolve(&CompaniesResolver.companies/3)
    end

    field :total_rows, :integer do
      resolve(&CompaniesResolver.company_count/3)
    end
  end

  object :company_mutations do
    @desc "Create a new company"
    field :create_company, :company do
      arg(:name, non_null(:string))
      arg(:credit_line, non_null(:integer))
      arg(:availiable_credit, non_null(:integer))

      resolve(&CompaniesResolver.create_company/3)
    end

    @desc "Update a new company"
    field :update_company, :company do
      arg(:id, non_null(:id))
      arg(:name, non_null(:string))
      arg(:credit_line, non_null(:integer))
      arg(:availiable_credit, non_null(:integer))

      resolve(&CompaniesResolver.update_company/3)
    end

    @desc "delete an existing company"
    field :delete_company, :company do
      arg(:id, non_null(:id))

      resolve(&CompaniesResolver.delete_company/3)
    end
  end
end
