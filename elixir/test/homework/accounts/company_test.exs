defmodule Homework.Accounts.CompanyTest do
  use Homework.DataCase

  alias Homework.Accounts.Company

  @required_attrs ~w{ available_credit credit_line name }a

  describe "validations" do
    setup do
      [
        valid_attrs: %{
          available_credit: 10_000_00,
          credit_line: 10_000_00,
          name: "company name"
        }
      ]
    end

    test "is valid with valid values", %{valid_attrs: valid_attrs} do
      assert Company.changeset(%Company{}, valid_attrs).valid?
    end

    Enum.each(@required_attrs, fn attr ->
      @attr attr
      test("validates presence of #{attr}", %{valid_attrs: valid_attrs}) do
        err_msg = %{@attr => ["can't be blank"]}

        assert err_msg ==
                 errors_on(Company.changeset(%Company{}, valid_attrs |> Map.delete(@attr)))
      end
    end)
  end
end
