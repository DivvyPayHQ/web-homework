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
      arg :min, :integer
      arg :max, :integer
      arg :limit, :integer
      arg :skip, :integer
      resolve(&TransactionsResolver.transactions/3)
    end

    @desc "Get all Users"
    field(:users, list_of(:user)) do
      arg :first_name, :string
      arg :last_name, :string
      arg :limit, :integer
      arg :skip, :integer
      resolve(&UsersResolver.users/3)
    end

    @desc "Get all Merchants"
    field(:merchants, list_of(:merchant)) do
      arg :name, :string
      arg :limit, :integer
      arg :skip, :integer
      resolve(&MerchantsResolver.merchants/3)
    end

    @desc "Get all Companies"
    field(:companies, list_of(:company)) do
      arg :limit, :integer
      arg :skip, :integer
      resolve(&CompaniesResolver.companies/3)
    end
  end

  def middleware(middleware, _field, %Absinthe.Type.Object{identifier: identifier}) when identifier in [:query] do
    middleware ++ [HomeworkWeb.Pagination]
  end
  def middleware(middleware, _field, _object) do
    middleware
  end

  mutation do
    import_fields(:transaction_mutations)
    import_fields(:user_mutations)
    import_fields(:merchant_mutations)
    import_fields(:company_mutations)
  end
end
