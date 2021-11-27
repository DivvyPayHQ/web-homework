defmodule HomeworkWeb.Schemas.TransactionsSchema do
  @moduledoc """
  Defines the graphql schema for transactions.
  """
  use Absinthe.Schema.Notation

  alias HomeworkWeb.Resolvers.TransactionsResolver

  object :transaction do
    field(:id, non_null(:id))
    field(:user_id, :id)
    field(:amount, :decimal)
    field(:credit, :boolean)
    field(:debit, :boolean)
    field(:description, :string)
    field(:merchant_id, :id)
    field(:inserted_at, :naive_datetime)
    field(:updated_at, :naive_datetime)

    field(:user, :user) do
      resolve(&TransactionsResolver.user/3)
    end

    field(:merchant, :merchant) do
      resolve(&TransactionsResolver.merchant/3)
    end

    field(:company, :company) do
      resolve(&TransactionsResolver.company/3)
    end
  end

  object :transaction_page do
    field :transactions, :tpage do
      arg(:limit, :integer, default_value: -1)
      arg(:offset, :integer, default_value: 0)
      resolve(&TransactionsResolver.transactions/3)
    end
  end

  object :tpage do
    field :items, list_of(:transaction) do
      arg(:limit, :integer, default_value: -1)
      arg(:offset, :integer, default_value: 0)
      resolve(&TransactionsResolver.transactions/3)
    end

    field :total_rows, :integer do
      resolve(&TransactionsResolver.transaction_count/3)
    end
  end


  object :transaction_mutations do
    @desc "Create a new transaction"
    field :create_transaction, :transaction do
      arg(:user_id, non_null(:id))
      arg(:merchant_id, non_null(:id))
      arg(:company_id, non_null(:id))
      @desc "amount is in cents"
      arg(:amount, non_null(:decimal))
      arg(:credit, non_null(:boolean))
      arg(:debit, non_null(:boolean))
      arg(:description, non_null(:string))

      resolve(&TransactionsResolver.create_transaction/3)
    end

    @desc "Update a new transaction"
    field :update_transaction, :transaction do
      arg(:id, non_null(:id))
      arg(:user_id, non_null(:id))
      arg(:merchant_id, non_null(:id))
      arg(:company_id, non_null(:id))
      @desc "amount is in cents"
      arg(:amount, non_null(:decimal))
      arg(:credit, non_null(:boolean))
      arg(:debit, non_null(:boolean))
      arg(:description, non_null(:string))

      resolve(&TransactionsResolver.update_transaction/3)
    end

    @desc "delete an existing transaction"
    field :delete_transaction, :transaction do
      arg(:id, non_null(:id))

      resolve(&TransactionsResolver.delete_transaction/3)
    end
  end
end
