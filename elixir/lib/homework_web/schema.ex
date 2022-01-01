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
      resolve(&TransactionsResolver.transactions/3)
    end

    @desc "Search Transactions between min and max"
    field(:search_transactions, list_of(:transaction)) do
      arg :min, :decimal, default_value: "0.00"
      arg :max, non_null(:decimal)
      resolve(&TransactionsResolver.search_transactions/3)
    end

    @desc "Get all Users"
    field(:users, list_of(:user)) do
      resolve(&UsersResolver.users/3)
    end

    @desc "Search Users by first_name and last_name"
    field(:search_users, list_of(:user)) do
      arg :first_name, non_null(:string)
      arg :last_name, non_null(:string)
      arg :max_distance, :integer, default_value: 3
      resolve(&UsersResolver.search_users/3)
    end

    @desc "Get all Merchants"
    field(:merchants, list_of(:merchant)) do
      resolve(&MerchantsResolver.merchants/3)
    end

    @desc "Search Merchants by name"
    field(:search_merchants, list_of(:merchant)) do
      arg :name, non_null(:string)
      arg :max_distance, :integer, default_value: 3
      resolve(&MerchantsResolver.search_merchants/3)
    end
  end

  mutation do
    import_fields(:transaction_mutations)
    import_fields(:user_mutations)
    import_fields(:merchant_mutations)
  end
end
