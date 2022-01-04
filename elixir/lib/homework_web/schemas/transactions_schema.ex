defmodule HomeworkWeb.Schemas.TransactionsSchema do
  @moduledoc """
  Defines the graphql schema for transactions.
  """
  use Absinthe.Schema.Notation

  alias HomeworkWeb.Resolvers.TransactionsResolver

  object :transaction do
    field(:id, non_null(:id))
    field(:user_id, :id)
    field(:company_id, :id)
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

    field(:company, :company) do
      resolve(&TransactionsResolver.company/3)
    end

    field(:merchant, :merchant) do
      resolve(&TransactionsResolver.merchant/3)
    end
  end

  object :transaction_mutations do
    @desc "Create a new Transaction"
    field :create_transaction, :transaction do
      @desc "User identifier the Transaction belongs to"
      arg(:user_id, non_null(:id))
      @desc "Company identifier the Transaction belongs to"
      arg(:company_id, non_null(:id))
      @desc "Merchant identifier the Transaction belongs to"
      arg(:merchant_id, non_null(:id))
      @desc "Amount is in dollars"
      arg(:amount, non_null(:decimal))
      @desc "Amount is credited"
      arg(:credit, non_null(:boolean))
      @desc "Amount is debited"
      arg(:debit, non_null(:boolean))
      @desc "Description of the Transaction"
      arg(:description, non_null(:string))

      resolve(&TransactionsResolver.create_transaction/3)
    end

    @desc "Update a new Transaction"
    field :update_transaction, :transaction do
      @desc "Record identifier"
      arg(:id, non_null(:id))
      @desc "User identifier the Transaction belongs to"
      arg(:user_id, non_null(:id))
      @desc "Company identifier the Transaction belongs to"
      arg(:company_id, non_null(:id))
      @desc "Merchant identifier the Transaction belongs to"
      arg(:merchant_id, non_null(:id))
      @desc "Amount is in dollars"
      arg(:amount, non_null(:decimal))
      @desc "Amount is credited to the account"
      arg(:credit, non_null(:boolean))
      @desc "Amount is debited from the account"
      arg(:debit, non_null(:boolean))
      @desc "Description of the Transaction"
      arg(:description, non_null(:string))

      resolve(&TransactionsResolver.update_transaction/3)
    end

    @desc "Delete an existing Transaction"
    field :delete_transaction, :transaction do
      @desc "Record identifier"
      arg(:id, non_null(:id))

      resolve(&TransactionsResolver.delete_transaction/3)
    end
  end
end
