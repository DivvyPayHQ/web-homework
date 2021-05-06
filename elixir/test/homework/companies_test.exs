defmodule Homework.CompaniesTest do
  use Homework.DataCase

  alias Homework.Companies
  alias Homework.Merchants
  alias Homework.Transactions
  alias Homework.Users

  describe "companies" do
    alias Homework.Companies.Company

    @valid_attrs1 %{name: "Pfizer", credit_line: 100_000_00}
    @valid_attrs2 %{name: "Moderna", credit_line: 50_000_00}
    @valid_attrs3 %{name: "Johnson & Johnson", credit_line: 10_000_00}
    @all_valid_attrs [@valid_attrs1, @valid_attrs2, @valid_attrs3]
    @update_attrs %{name: "Pfizer 2", credit_line: 110_000_00}
    @invalid_attrs %{name: nil, credit_line: nil}

    def companies_fixture() do
      @all_valid_attrs
      |> Enum.map(fn attrs ->
        {:ok, %Company{} = company} = Companies.create_company(attrs)
        company
      end)
      # This is not awesome, but it seems to be the only way to get the
      # company updated *after* the database's pre-insert hooks run... hrm...
      |> Enum.map(fn company -> Companies.get_company!(company.id) end)
    end

    test "list_companies/1 returns all companies" do
      companies = companies_fixture()
      assert Companies.list_companies([]) == companies
    end

    test "list_companies/1 searches both first and last name" do
      [pfizer, moderna, _] = companies_fixture()
      assert Companies.list_companies(%{named_like: "Mod"}) == [moderna]
      assert Companies.list_companies(%{named_like: "Pfiz"}) == [pfizer]
    end

    test "get_company!/1 returns the company with given id" do
      [company | _] = companies_fixture()
      assert Companies.get_company!(company.id) == company
    end

    test "create_company/1 with valid data creates a company" do
      assert {:ok, %Company{} = company} = Companies.create_company(@valid_attrs1)
      assert company.name == "Pfizer"
      assert company.credit_line == 100_000_00

      # Consider this more as documentation than, like, the correct behavior.
      # For reasons I'm not clear on, the return value of the insert does not
      # include the result of our post-insert hooks, so we have to run a *second*
      # query to fetch thos.
      assert company.available_credit == nil
      assert Companies.get_company!(company.id).available_credit == company.credit_line
    end

    test "create_company/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Companies.create_company(@invalid_attrs)
    end

    test "update_company/2 with valid data updates the company" do
      [company | _] = companies_fixture()
      assert {:ok, %Company{} = company} = Companies.update_company(company, @update_attrs)
      assert company.name == "Pfizer 2"
      assert company.credit_line == 110_000_00

      # Sigh. Another instance of "documentation, not test." Like inserts,
      # the update does not include the results of post-update database hooks,
      # so we have to run a new query to see the updated available credit.
      assert company.available_credit == 100_000_00
      assert Companies.get_company!(company.id).available_credit == company.credit_line
    end

    test "update_company/2 with invalid data returns error changeset" do
      [company | _] = companies_fixture()
      assert {:error, %Ecto.Changeset{}} = Companies.update_company(company, @invalid_attrs)
      assert company == Companies.get_company!(company.id)
    end

    test "delete_company/1 deletes the company" do
      [company | _] = companies_fixture()
      assert {:ok, %Company{}} = Companies.delete_company(company)
      assert_raise Ecto.NoResultsError, fn -> Companies.get_company!(company.id) end
    end

    test "change_company/1 returns a company changeset" do
      [company | _] = companies_fixture()
      assert %Ecto.Changeset{} = Companies.change_company(company)
    end

    test "available_credit updates as transactions come in" do
      [company | _] = companies_fixture()
      debit = 999_99
      create_transaction(company.id, debit, true)
      credit = 100_00
      create_transaction(company.id, credit, false)
      updated_company = Companies.get_company!(company.id)
      assert updated_company.available_credit == company.available_credit - debit + credit
    end

    def create_transaction(company_id, amount, debit) do
      {:ok, merchant} =
        Merchants.create_merchant(%{name: "Google", description: "AltaVista competitor"})

      {:ok, user} =
        Users.create_user(%{
          dob: "some dob",
          first_name: "some first_name",
          last_name: "some last_name",
          company_id: company_id
        })

      {:ok, _transaction} =
        Transactions.create_transaction(%{
          amount: amount,
          credit: !debit,
          debit: debit,
          description: "Test debit",
          merchant_id: merchant.id,
          user_id: user.id,
          company_id: company_id
        })
    end
  end
end
