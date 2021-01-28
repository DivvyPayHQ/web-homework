defmodule HomeworkWeb.Schemas.TransactionsSchema do
  @moduledoc """
  Defines the graphql schema for transactions.
  """
  use Absinthe.Schema.Notation

  alias HomeworkWeb.Resolvers.TransactionsResolver

  object :transaction do
    field(:id, non_null(:id))
    field(:user_id, :id)
    field(:amount, :float)
    field(:is_debit, :boolean)
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
  end

  object :transaction_mutations do
    @desc "Create a new transaction"
    field :create_transaction, :transaction do
      arg(:user_id, non_null(:id))
      arg(:merchant_id, non_null(:id))
      @desc "amount is in dollars"
      arg(:amount, non_null(:float))
      arg(:is_debit, non_null(:boolean))
      arg(:description, non_null(:string))

      resolve(&TransactionsResolver.create_transaction/3)
    end

    @desc "Update a new transaction"
    field :update_transaction, :transaction do
      arg(:id, non_null(:id))
      arg(:user_id, non_null(:id))
      arg(:merchant_id, non_null(:id))
      @desc "amount is in dollars"
      arg(:amount, non_null(:float))
      arg(:is_debit, non_null(:boolean))
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
