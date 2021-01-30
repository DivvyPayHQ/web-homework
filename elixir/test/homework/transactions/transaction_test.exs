defmodule Homework.Transactions.TransactionTest do
  use Homework.DataCase

  alias Homework.Transactions.Transaction

  @required_attrs ~w{ amount company_id description merchant_id user_id }a

  describe "validations" do
    setup do
      company = insert(:company)
      merchant = insert(:merchant)
      user = insert(:user, company: company)

      [
        valid_attrs: %{
          amount: 42,
          company_id: company.id,
          credit: true,
          debit: true,
          description: "some description",
          merchant_id: merchant.id,
          user_id: user.id
        }
      ]
    end

    test "is valid with valid values", %{valid_attrs: valid_attrs} do
      assert Transaction.changeset(%Transaction{}, valid_attrs).valid?
    end

    Enum.each(@required_attrs, fn attr ->
      @attr attr
      test("validates presence of #{attr}", %{valid_attrs: valid_attrs}) do
        err_msg = %{@attr => ["can't be blank"]}

        assert err_msg ==
                 errors_on(
                   Transaction.changeset(%Transaction{}, valid_attrs |> Map.delete(@attr))
                 )
      end
    end)
  end
end
