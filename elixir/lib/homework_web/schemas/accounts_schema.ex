defmodule HomeworkWeb.Schemas.AccountsSchema do
  @moduledoc """
  Defines the graphql schema for accounts.
  """
  use Absinthe.Schema.Notation

  alias HomeworkWeb.Resolvers.AccountsResolver

  object :company do
    field(:id, non_null(:id))
    field(:available_credit, :integer)
    field(:credit_line, :integer)
    field(:name, :string)
    field(:inserted_at, :naive_datetime)
    field(:updated_at, :naive_datetime)
  end

  object :company_mutations do
    @desc "Create a new company"
    field :create_company, :company do
      arg(:name, non_null(:string))
      arg(:credit_line, non_null(:integer))

      resolve(&AccountsResolver.create_company/3)
    end

    @desc "Update a company"
    field :update_company, :company do
      arg(:id, non_null(:id))
      arg(:name, non_null(:string))
      arg(:credit_line, non_null(:integer))

      resolve(&AccountsResolver.update_company/3)
    end

    @desc "delete an existing company"
    field :delete_company, :company do
      arg(:id, non_null(:id))

      resolve(&AccountsResolver.delete_company/3)
    end
  end
end
