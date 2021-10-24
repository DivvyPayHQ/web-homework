defmodule HomeworkWeb.Schema do
  @moduledoc """
  Defines the graphql schema for this project.
  """
  use Absinthe.Schema

  alias HomeworkWeb.Resolvers.MerchantsResolver
  alias HomeworkWeb.Resolvers.TransactionsResolver
  alias HomeworkWeb.Resolvers.UsersResolver
  import_types(HomeworkWeb.Schemas.Types)

  query do
    @desc "Get all Transactions"
    field(:transactions, list_of(:transaction)) do
      arg(:min, :integer)
      arg(:max, :integer)
      arg(:limit, :integer)
      arg(:skip, :integer)
      resolve(&TransactionsResolver.transactions/3)
      middleware Homework.Middlewares.Pagination
    end

    @desc "Get all Users"
    field(:users, list_of(:user)) do
      arg(:limit, :integer)
      arg(:skip, :integer)
      resolve(&UsersResolver.users/3)
      middleware Homework.Middlewares.Pagination
    end

    @desc "Get all Merchants"
    field(:merchants, list_of(:merchant)) do
      arg(:limit, :integer)
      arg(:skip, :integer)
      arg(:name, :string)
      resolve(&MerchantsResolver.merchants/3)
      middleware Homework.Middlewares.Pagination
    end
  end

  mutation do
    import_fields(:transaction_mutations)
    import_fields(:user_mutations)
    import_fields(:merchant_mutations)
  end
end
