defmodule HomeworkWeb.Schema.TransactionsTest do
  import Homework.Factory
  use HomeworkWeb.ConnCase, async: true

  @company """
    {
      available_credit
      credit_line
      id
      inserted_at
      name
      updated_at
    }
  """

  @merchant """
  {
    description
    id
    inserted_at
    name
    updated_at
  }
  """

  @user """
  {
    id
    dob
    firstName
    lastName
    insertedAt
    updatedAt
  }

  """
  @transaction """
  {
    amount
    company #{@company}
    companyId
    credit
    debit
    description
    id
    insertedAt
    merchantId
    merchant #{@merchant}
    updatedAt
    userId
    user #{@user}
  }
  """

  @transactions_query """
  query Transactions {
     transactions #{@transaction}
  }
  """

  @transaction_query """
  query Transaction(
    $id: ID!
  ){
    transaction(
      id: $id
    ) #{@transaction}
  }
  """

  @create_transaction_query """
  mutation CreateTransaction(
    $amount: Amount!
    $credit: Boolean!
    $companyId: ID!
    $debit: Boolean!
    $description: String!
    $merchantId: ID!
    $userId: ID!
  ){
    createTransaction(
      amount: $amount
      credit: $credit
      companyId: $companyId
      debit: $debit
      description: $description
      merchantId: $merchantId
      userId: $userId
    ) #{@transaction}
  }
  """

  @delete_transaction_query """
  mutation DeleteTransaction(
    $id: ID!
  ){
    deleteTransaction(
      id: $id
    ) #{@transaction}
  }
  """

  @search_transactions_query """
  mutation SearchTransactionsByMaxMin(
    $max: Amount!
    $min: Amount!
  ){
    searchTransactionsByMaxMin(
      max: $max
      min: $min
    ) #{@transaction}
  }
  """

  @update_transaction_query """
  mutation UpdateTransaction(
    $id: ID!
    $amount: Amount
    $credit: Boolean
    $debit: Boolean
    $description: String
    $merchantId: ID
    $userId: ID
  ){
    updateTransaction(
      id: $id
      amount: $amount
      credit: $credit
      debit: $debit
      description: $description
      merchantId: $merchantId
      userId: $userId
    ) #{@transaction}
  }
  """

  defp graphql_host(conn, opts) do
    conn
    |> post("/graphiql", %{
      query: Keyword.get(opts, :query, ""),
      variables: Keyword.get(opts, :variables, %{})
    })
    |> json_response(200)
  end

  describe "transactions" do
    setup do: [transactions: Enum.map(0..5, fn _ -> insert!(:transaction) end)]

    test "gets transactions", context do
      %{
        id: transaction_2_id,
        company: %{id: company_2_id} = company_2,
        merchant: %{id: merchant_2_id},
        user: %{id: user_2_id}
      } = Enum.at(context.transactions, 2)

      %{
        id: transaction_3_id,
        company: %{id: company_3_id} = company_3,
        merchant: %{id: merchant_3_id},
        user: %{id: user_3_id}
      } = Enum.at(context.transactions, 3)

      %{
        id: transaction_5_id,
        company: %{id: company_5_id} = company_5,
        merchant: %{id: merchant_5_id},
        user: %{id: user_5_id}
      } = Enum.at(context.transactions, 5)

      # company_2: give 5 more transactions
      Enum.each(0..4, fn _ -> insert!(:transaction, %{company: company_2}) end)

      # company_5: give 2 transactions
      Enum.each(0..2, fn _ -> insert!(:transaction, %{company: company_5}) end)

      conn = Map.get(context, :conn)
      body = graphql_host(conn, query: @transactions_query)
      refute body["errors"]
      transactions = body["data"]["transactions"]

      assert 14 = length(transactions)

      :ok =
        Enum.each(transactions, fn t ->
          assert Map.has_key?(t, "amount")
          assert Map.has_key?(t, "credit")
          assert Map.has_key?(t, "companyId")
          assert Map.has_key?(t, "debit")
          assert Map.has_key?(t, "id")
          assert Map.has_key?(t, "description")
          assert Map.has_key?(t, "merchantId")
          assert Map.has_key?(t, "userId")
          assert Map.has_key?(t, "insertedAt")
          assert Map.has_key?(t, "updatedAt")

          case t["id"] do
            ^transaction_2_id ->
              assert company_2_id == t["company"]["id"]
              assert merchant_2_id == t["merchant"]["id"]
              assert user_2_id == t["user"]["id"]

            ^transaction_3_id ->
              assert company_3_id == t["company"]["id"]
              assert merchant_3_id == t["merchant"]["id"]
              assert user_3_id == t["user"]["id"]

            ^transaction_5_id ->
              assert company_5_id == t["company"]["id"]
              assert merchant_5_id == t["merchant"]["id"]
              assert user_5_id == t["user"]["id"]

            _ ->
              true
          end
        end)

      assert 6 == Enum.count(transactions, fn t -> t["companyId"] == company_2.id end)
      assert 1 == Enum.count(transactions, fn t -> t["companyId"] == company_3.id end)
      assert 4 == Enum.count(transactions, fn t -> t["companyId"] == company_5.id end)
    end

    test "gets a transaction", context do
      conn = Map.get(context, :conn)

      transaction =
        context
        |> Map.get(:transactions)
        |> Enum.at(0)

      variables = %{
        id: transaction.id
      }

      body = graphql_host(conn, query: @transaction_query, variables: variables)
      refute body["errors"]
      t = body["data"]["transaction"]

      assert Map.get(t, "id") == transaction.id
      # stored as integer in database, received as decimal/float
      assert Map.get(t, "amount") == transaction.amount / 100
      assert Map.get(t, "credit") == transaction.credit
      assert Map.get(t, "companyId") == transaction.company_id
      assert Map.get(t, "debit") == transaction.debit
      assert Map.get(t, "description") == transaction.description
      assert Map.get(t, "merchantId") == transaction.merchant_id
      assert Map.get(t, "userId") == transaction.user_id

      assert Map.get(t, "insertedAt") ==
               transaction.inserted_at |> NaiveDateTime.to_string() |> String.replace(" ", "T")

      assert Map.get(t, "updatedAt") ==
               transaction.updated_at |> NaiveDateTime.to_string() |> String.replace(" ", "T")
    end

    test "gets a transaction: handles no result error gracefully", %{conn: conn} do
      variables = %{
        id: Ecto.UUID.generate()
      }

      body = graphql_host(conn, query: @transaction_query, variables: variables)
      assert body["errors"]
      [errors | _] = body["errors"]
      assert errors["message"] =~ "could not get transaction: no result"
    end

    test "creates a transaction with float amount", context do
      transaction = Enum.at(context.transactions, 0)

      variables = %{
        # amount as decimal/float
        amount: 10.05,
        credit: true,
        # use existing company
        companyId: transaction.company_id,
        debit: false,
        description: "bought a lot of Bluetooth speakers",
        # use existing merchant
        merchantId: transaction.merchant_id,
        # use existing user
        userId: transaction.user_id
      }

      conn = Map.get(context, :conn)
      body = graphql_host(conn, query: @create_transaction_query, variables: variables)
      refute body["errors"]
      t = body["data"]["createTransaction"]

      assert Map.has_key?(t, "id")
      assert Map.has_key?(t, "insertedAt")
      assert Map.has_key?(t, "updatedAt")
      assert Map.get(t, "amount") == variables.amount
      assert Map.get(t, "credit") == variables.credit
      assert Map.get(t, "companyId") == variables.companyId
      assert Map.get(t, "debit") == variables.debit
      assert Map.get(t, "description") == variables.description
      assert Map.get(t, "merchantId") == variables.merchantId
      assert Map.get(t, "userId") == variables.userId
    end

    test "creates a transaction with integer amount", context do
      transaction = Enum.at(context.transactions, 0)

      variables = %{
        # amount as integer
        amount: 1390,
        companyId: transaction.company_id,
        credit: true,
        debit: false,
        description: "bought a lot of Bluetooth speakers",
        merchantId: transaction.merchant_id,
        userId: transaction.user_id
      }

      conn = Map.get(context, :conn)
      body = graphql_host(conn, query: @create_transaction_query, variables: variables)
      refute body["errors"]
      t = body["data"]["createTransaction"]

      # confirm received amount is variable amount in decimal/float form
      assert Map.get(t, "amount") == variables.amount / 100
    end

    test "deletes a transaction", context do
      conn = Map.get(context, :conn)

      transaction =
        context
        |> Map.get(:transactions)
        |> Enum.at(0)

      variables = %{
        id: transaction.id
      }

      body = graphql_host(conn, query: @delete_transaction_query, variables: variables)
      refute body["errors"]

      # confirm actually deleted
      body = graphql_host(conn, query: @transaction_query, variables: variables)
      assert body["errors"]
      [errors | _] = body["errors"]
      assert errors["message"] =~ "could not get transaction: no result"
    end

    test "search existing transactions by provided max min", context do
      Enum.each(
        [
          amount: 1234,
          amount: 12_345,
          amount: 12_347,
          amount: 124,
          amount: 134,
          amount: 15_345,
          amount: 3
        ],
        fn {:amount, amount} -> insert!(:transaction, %{amount: amount}) end
      )

      # decimal support
      variables = %{
        max: 123.50,
        min: 123.00
      }

      conn = Map.get(context, :conn)
      body = graphql_host(conn, query: @search_transactions_query, variables: variables)
      refute body["errors"]
      users = body["data"]["searchTransactionsByMaxMin"]

      assert 2 = length(users)

      # integer support
      variables = %{
        max: 12_350,
        min: 12_300
      }

      conn = Map.get(context, :conn)
      body = graphql_host(conn, query: @search_transactions_query, variables: variables)
      refute body["errors"]
      users = body["data"]["searchTransactionsByMaxMin"]

      assert 2 = length(users)
    end

    test "updates a transaction", context do
      conn = Map.get(context, :conn)

      transaction =
        context
        |> Map.get(:transactions)
        |> Enum.at(0)

      variables = %{
        amount: 10.05,
        credit: false,
        debit: false,
        description: "bought a lot of Bluetooth speakers",
        id: transaction.id
      }

      # stored as integer in database, amount variable can be integer or decimal/float
      assert transaction.amount / 100 != variables.amount
      assert transaction.credit != variables.credit
      assert transaction.debit != variables.debit
      assert transaction.description != variables.description
      assert transaction.id == variables.id

      body = graphql_host(conn, query: @update_transaction_query, variables: variables)
      refute body["errors"]
      t = body["data"]["updateTransaction"]

      assert Map.get(t, "amount") == variables.amount
      assert Map.get(t, "credit") == variables.credit
      assert Map.get(t, "debit") == variables.debit
      assert Map.get(t, "description") == variables.description
      assert Map.get(t, "id") == transaction.id

      assert Map.get(t, "companyId") == transaction.company_id
      assert Map.get(t, "merchantId") == transaction.merchant_id
      assert Map.get(t, "userId") == transaction.user_id
    end
  end
end
