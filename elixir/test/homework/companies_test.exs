defmodule Homework.CompaniesTest do
  use Homework.DataCase

  alias Homework.Companies
  alias Homework.Transactions
  alias Homework.Merchants
  alias Homework.Users

  describe "company" do
    alias Homework.Companies.Company

    setup do
      valid_attrs = %{available_credit: 42, credit_line: 42, name: "some name"}
      update_attrs = %{available_credit: 43, credit_line: 43, name: "some updated name"}
      invalid_attrs =  %{available_credit: nil, credit_line: nil, name: nil}

      {:ok, company1} = Companies.create_company(%{
        available_credit: 100,
        credit_line: 300,
        name: "Company One"
      })
 
      {:ok, merchant} =
        Merchants.create_merchant(%{
          description: "some updated description",
          name: "some updated name"
        })

      {:ok, user} =
        Users.create_user(%{
          dob: "some dob",
          first_name: "some first_name",
          company_id: company1.id,
          last_name: "some last_name",
        })

      {:ok, %{
        valid_attrs: valid_attrs,
        update_attrs: update_attrs,
        invalid_attrs: invalid_attrs,
        merchant: merchant,
        user: user,
        company1: company1
      }}
    end


    def company_fixture(valid_attrs, attrs \\ %{}) do
      {:ok, company} =
        attrs
        |> Enum.into(valid_attrs)
        |> Companies.create_company()

      company
    end

    test "list_company/0 returns all company", %{valid_attrs: valid_attrs} do
      company = company_fixture(valid_attrs)
      assert Companies.list_company([]) == [company]
    end

    test "get_company!/1 returns the company with given id", %{valid_attrs: valid_attrs} do
      company = company_fixture(valid_attrs)
      assert Companies.get_company!(company.id) == company
    end

    test "create_company/1 with valid data creates a company", %{valid_attrs: valid_attrs} do
      assert {:ok, %Company{} = company} = Companies.create_company(valid_attrs)
      assert company.available_credit == 42
      assert company.credit_line == 42
      assert company.name == "some name"
    end

    test "create_company/1 with invalid data returns error changeset", %{invalid_attrs: invalid_attrs} do
      assert {:error, %Ecto.Changeset{}} = Companies.create_company(invalid_attrs)
    end

    test "update_company/2 with valid data updates the company", %{
      update_attrs: update_attrs,
      valid_attrs: valid_attrs

    } do
      company = company_fixture(valid_attrs)
      assert {:ok, %Company{} = company} = Companies.update_company(company, update_attrs)
      assert company.available_credit == 43
      assert company.credit_line == 43
      assert company.name == "some updated name"
    end

    test "update_company/2 with invalid data returns error changeset", %{
      invalid_attrs: invalid_attrs,
      valid_attrs: valid_attrs
    } do
      company = company_fixture(valid_attrs)
      assert {:error, %Ecto.Changeset{}} = Companies.update_company(company, invalid_attrs)
      assert company == Companies.get_company!(company.id)
    end

    test "delete_company/1 deletes the company", %{valid_attrs: valid_attrs} do
      company = company_fixture(valid_attrs)
      assert {:ok, %Company{}} = Companies.delete_company(company)
      assert_raise Ecto.NoResultsError, fn -> Companies.get_company!(company.id) end
    end

    test "change_company/1 returns a company changeset", %{
      valid_attrs: valid_attrs,
    }
    do
      company = company_fixture(valid_attrs)
      assert %Ecto.Changeset{} = Companies.change_company(company)
    end

    test "chanage_company/1 updates avaialble credit after transaction", %{
      user: user1,
      merchant: merchant,
      company1: company1
    }do

      {:ok, transaction} = Transactions.create_transaction(%{
        amount: 100,
        credit: true,
        debit: false,
        description: "some description",
        company_id: company1.id,
        user_id: user1.id,
        merchant_id: merchant.id
      })
      co = Companies.get_company!(company1.id)


      assert transaction.amount == 100
      assert co.available_credit == 0


    end
  end
end
