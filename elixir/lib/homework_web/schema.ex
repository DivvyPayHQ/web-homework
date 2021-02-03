defmodule HomeworkWeb.Schema do
  @moduledoc """
  Defines the graphql schema for this project.
  """
  use Absinthe.Schema

  alias HomeworkWeb.Resolvers.MerchantsResolver
  alias HomeworkWeb.Resolvers.TransactionsResolver
  alias HomeworkWeb.Resolvers.UsersResolver
  import_types(HomeworkWeb.Schemas.Types)

  input_object :pagination do
    field :skip, non_null(:integer)
    field :limit, non_null(:integer)
  end

  object :meta do
    field :total_rows, non_null(:integer)
    field :skip, non_null(:integer)
    field :limit, non_null(:integer)
  end


  query do
    @desc "Get all Transactions"
    field(:transactions, list_of(:transaction)) do
      arg(:pagination, :pagination)

      resolve(&TransactionsResolver.transactions/3)
    end

    @desc "Get all Users"
    field(:users, list_of(:user)) do
      resolve(&UsersResolver.users/3)
    end

    @desc "Get all Merchants"
    field(:merchants, list_of(:merchant)) do
      resolve(&MerchantsResolver.merchants/3)
    end
  end

  mutation do
    import_fields(:transaction_mutations)
    import_fields(:user_mutations)
    import_fields(:merchant_mutations)
  end
end
