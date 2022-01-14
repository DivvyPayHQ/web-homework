defmodule HomeworkWeb.Schemas.TransactionsSchema do
  @moduledoc """
  Defines the graphql schema for transactions.
  """

  alias HomeworkWeb.Resolvers.TransactionsResolver
  use Absinthe.Schema.Notation

  ##########################################
  ### Types
  ##########################################
  object :transaction do
    field(:amount, :integer)

    field(:company, :company) do
      resolve(&TransactionsResolver.company/3)
    end

    field(:company_id, :id)

    field(:credit, :boolean)
    field(:debit, :boolean)
    field(:description, :string)
    field(:id, non_null(:id))
    field(:inserted_at, :naive_datetime)

    field(:merchant, :merchant) do
      resolve(&TransactionsResolver.merchant/3)
    end

    field(:merchant_id, :id)
    field(:updated_at, :naive_datetime)

    field(:user, :user) do
      resolve(&TransactionsResolver.user/3)
    end

    field(:user_id, :id)
  end

  ##########################################
  ### Queries
  ##########################################
  object :transaction_queries do
    @desc "Get all transactions"
    field(:transactions, list_of(:transaction)) do
      resolve(&TransactionsResolver.transactions/3)
    end

    @desc "Get an existing transaction"
    field :transaction, :transaction do
      arg(:id, non_null(:id))
      resolve(&TransactionsResolver.transaction/3)
    end
  end

  ##########################################
  ### Mutations
  ##########################################
  object :transaction_mutations do
    @desc "Create a new transaction"
    field :create_transaction, :transaction do
      @desc "amount is in cents"
      arg(:amount, non_null(:integer))
      arg(:credit, non_null(:boolean))
      arg(:company_id, non_null(:id))
      arg(:debit, non_null(:boolean))
      arg(:description, non_null(:string))
      arg(:merchant_id, non_null(:id))
      arg(:user_id, non_null(:id))

      resolve(&TransactionsResolver.create_transaction/3)
    end

    @desc "Delete an existing transaction"
    field :delete_transaction, :transaction do
      arg(:id, non_null(:id))

      resolve(&TransactionsResolver.delete_transaction/3)
    end

    @desc "Search existing users by the provided search term"
    field :search_transactions_by_max_min, list_of(:transaction) do
      arg(:max, non_null(:integer))
      arg(:min, non_null(:integer))

      resolve(&TransactionsResolver.search_transactions_by_max_min/3)
    end

    @desc "Update a transaction"
    field :update_transaction, :transaction do
      arg(:id, non_null(:id))
      @desc "amount is in cents"
      arg(:amount, :integer)
      arg(:credit, :boolean)
      arg(:debit, :boolean)
      arg(:description, :string)
      arg(:merchant_id, :id)
      arg(:user_id, :id)

      resolve(&TransactionsResolver.update_transaction/3)
    end
  end
end
