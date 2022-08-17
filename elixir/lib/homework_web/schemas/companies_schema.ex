defmodule HomeworkWeb.Schemas.CompaniesSchema do
  @moduledoc """
  Defines the graphql schema for user.
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

  object :company_mutations do
    @desc "Create a new Company"
    field :create_company, :company do
      arg(:name, non_null(:string))
      arg(:credit_line, non_null(:integer))
      arg(:available_credit, non_null(:integer))

      resolve(&CompaniesResolver.create_company/3)
    end

    @desc "Update a new user"
    field :update_company, :user do
      arg(:name, non_null(:string))
      arg(:credit_line, non_null(:integer))
      arg(:available_credit, non_null(:integer))
      arg(:id, non_null(:id))

      resolve(&CompaniesResolver.update_company/3)
    end

    @desc "delete an existing company"
    field :delete_company, :company do
      arg(:id, non_null(:id))

      resolve(&CompaniesResolver.delete_company/3)
    end
  end
end
