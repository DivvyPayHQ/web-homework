defmodule HomeworkWeb.Schema do
  @moduledoc """
  Defines the graphql schema for this project.
  """
  use Absinthe.Schema

  alias HomeworkWeb.Resolvers.MerchantsResolver
  alias HomeworkWeb.Resolvers.TransactionsResolver
  alias HomeworkWeb.Resolvers.UsersResolver
  alias HomeworkWeb.Resolvers.CompaniesResolver
  import_types(HomeworkWeb.Schemas.Types)

  query do
    @desc "Get all Transactions"
    field(:transactions, list_of(:transaction)) do
      resolve(&TransactionsResolver.transactions/3)
    end

    @desc "Search Transactions between min and max"
    field(:search_transactions, list_of(:transaction)) do
      @desc "Minimum amount in dollars"
      arg :min, :decimal, default_value: Decimal.from_float(0.00)
      @desc "Maximum amount in dollars"
      arg :max, non_null(:decimal)
      resolve(&TransactionsResolver.search_transactions/3)
    end

    @desc "Get all Users"
    field(:users, list_of(:user)) do
      resolve(&UsersResolver.users/3)
    end

    @desc "Search Users by first_name and last_name using the Levenshtein algorithm"
    field(:search_users, list_of(:user)) do
      @desc "First Name of the User"
      arg :first_name, non_null(:string)
      @desc "Last Name of the User"
      arg :last_name, non_null(:string)
      @desc "Maximum Levenshtein distance"
      arg :max_distance, :integer, default_value: 3
      resolve(&UsersResolver.search_users/3)
    end

    @desc "Get all Merchants"
    field(:merchants, list_of(:merchant)) do
      resolve(&MerchantsResolver.merchants/3)
    end

    @desc "Search Merchants by name using the Levenshtein algorithm"
    field(:search_merchants, list_of(:merchant)) do
      @desc "Name of the Merchant"
      arg :name, non_null(:string)
      @desc "Maximum Levenshtein distance"
      arg :max_distance, :integer, default_value: 3
      resolve(&MerchantsResolver.search_merchants/3)
    end

    @desc "Get all Companies"
    field(:companies, list_of(:company)) do
      resolve(&CompaniesResolver.companies/3)
    end

    @desc "Search Companies by name using the Levenshtein algorithm"
    field(:search_companies, list_of(:company)) do
      @desc "Name of the Company"
      arg :name, non_null(:string)
      @desc "Maximum Levenshtein distance"
      arg :max_distance, :integer, default_value: 3
      resolve(&CompaniesResolver.search_companies/3)
    end
  end

  mutation do
    import_fields(:transaction_mutations)
    import_fields(:user_mutations)
    import_fields(:merchant_mutations)
    import_fields(:company_mutations)
  end
end
