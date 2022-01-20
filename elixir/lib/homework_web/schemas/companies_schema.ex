defmodule HomeworkWeb.Schemas.CompaniesSchema do
  @moduledoc """
  Defines the graphql schema for companies.
  """

  alias HomeworkWeb.Resolvers.CompaniesResolver
  use Absinthe.Schema.Notation

  ##########################################
  ### Types
  ##########################################
  object :company do
    field(:available_credit, :integer)
    field(:credit_line, :integer)
    field(:id, non_null(:id))
    field(:inserted_at, :naive_datetime)
    field(:name, :string)

    field :transactions, list_of(:transaction) do
      resolve(&CompaniesResolver.transactions/3)
    end

    field(:updated_at, :naive_datetime)

    field :users, list_of(:user) do
      resolve(&CompaniesResolver.users/3)
    end
  end

  ##########################################
  ### Queries
  ##########################################
  object :company_queries do
    @desc "Get all companies"
    field :companies, list_of(:company) do
      resolve(&CompaniesResolver.companies/3)
    end

    @desc "Get an existing company"
    field :company, :company do
      arg(:id, non_null(:id))
      resolve(&CompaniesResolver.company/3)
    end
  end

  ##########################################
  ### Mutations
  ##########################################
  object :company_mutations do
    @desc "Create a new company"
    field :create_company, :company do
      arg(:available_credit, non_null(:integer))
      arg(:credit_line, non_null(:integer))
      arg(:name, non_null(:string))

      resolve(&CompaniesResolver.create_company/3)
    end

    @desc "Delete an existing company"
    field :delete_company, :company do
      arg(:id, non_null(:id))

      resolve(&CompaniesResolver.delete_company/3)
    end

    @desc "Update an existing company"
    field :update_company, :company do
      arg(:credit_line, :integer)
      arg(:id, non_null(:id))
      arg(:name, :string)

      resolve(&CompaniesResolver.update_company/3)
    end
  end
end
