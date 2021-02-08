defmodule HomeworkWeb.Schemas.TransactionsSchema do
  @moduledoc """
  Defines the graphql schema for transactions.
  """
  use Absinthe.Schema.Notation

  alias HomeworkWeb.Resolvers.TransactionsResolver

  object :transaction do
    field(:id, non_null(:id))
    field(:user_id, :id)
    field(:amount, :integer)
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
  end

  @desc "Input parameters for a new transaction"
  input_object(:create_transaction_input) do
    field(:user_id, non_null(:id))
    field(:merchant_id, non_null(:id))
    @desc "amount is in cents"
    field(:amount, non_null(:integer))
    field(:credit, non_null(:boolean))
    field(:debit, non_null(:boolean))
    field(:description, non_null(:string))
  end

  @desc "Input parameters to update a transaction"
  input_object(:update_transaction_input) do
    field(:id, non_null(:id))
    field(:user_id, non_null(:id))
    field(:merchant_id, non_null(:id))
    @desc "amount is in cents"
    field(:amount, :integer)
    field(:credit, :boolean)
    field(:debit, :boolean)
    field(:description, :string)
  end

  object :transaction_mutations do
    @desc "Create a new transaction"
    field :create_transaction, :transaction do
      arg(:input, non_null(:create_transaction_input))

      resolve(&TransactionsResolver.create_transaction/3)
    end

    @desc "Update a given transaction"
    field :update_transaction, :transaction do
      arg(:input, non_null(:update_transaction_input))

      resolve(&TransactionsResolver.update_transaction/3)
    end

    @desc "delete an existing transaction"
    field :delete_transaction, :transaction do
      arg(:id, non_null(:id))

      resolve(&TransactionsResolver.delete_transaction/3)
    end
  end
end
