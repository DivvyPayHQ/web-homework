defmodule Homework.TransactionsFixtures do
  alias Homework.Transactions
  import Homework.CompaniesFixtures, only: [company_fixture: 0]
  import Homework.UsersFixtures, only: [user_fixture: 1]

  @doc """
  Test helper function for generating a Transaction
  """
  def transaction_fixture(attrs \\ %{}) do
    company_id = Map.get(attrs, :company_id) || company_fixture().id

    {:ok, transaction} =
      attrs
      |> Enum.into(%{
        amount: 42,
        credit: true,
        debit: true,
        description: "some description",
        merchant_id: default_merchant_id(),
        user_id: user_fixture(%{company_id: company_id}).id,
        company_id: company_id
      })
      |> Transactions.create_transaction()

    transaction
  end

  defp default_merchant_id do
    {:ok, merchant} =
      Homework.Merchants.create_merchant(%{description: "some description", name: "some name"})

    merchant.id
  end
end
