defmodule Homework.Companies.CompaniesTest do
  alias Homework.Companies
  alias Homework.Companies.Company
  import Homework.Factory
  use Homework.DataCase

  describe "companies" do
    @invalid_attrs %{available_credit: nil, credit_line: nil, name: "some name"}

    setup do: [company: insert!(:company)]

    test "change_company/1 returns a company changeset", context do
      assert %Ecto.Changeset{} = Companies.change_company(context.company)
    end

    test "create_company/1 with valid data creates a company" do
      attrs = %{available_credit: 1000, credit_line: 1000, name: "some name"}

      assert {:ok, %Company{} = company} = Companies.create_company(attrs)
      assert company.available_credit == 1000
      assert company.credit_line == 1000
      assert company.name == "some name"
    end

    test "create_company/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Companies.create_company(@invalid_attrs)
    end

    test "delete_company/1 deletes the company", context do
      company = context.company
      assert {:ok, %Company{}} = Companies.delete_company(company)
      assert_raise Ecto.NoResultsError, fn -> Companies.get_company!(company.id) end
    end

    test "get_company!/1 returns the company with given id", context do
      company = context.company
      assert Companies.get_company!(company.id) == company
    end

    test "get_company_by!/1 returns the company with given name", context do
      company = context.company

      assert Companies.get_company_by!(name: company.name).name ==
               company.name
    end

    test "get_company_by!/1 returns error multiple results", context do
      company = context.company
      # create another company; same name
      insert!(:company)

      assert_raise Ecto.MultipleResultsError, fn ->
        Companies.get_company_by!(name: company.name)
      end
    end

    test "list_companies/1 returns all companies", context do
      company = context.company
      assert Companies.list_companies() == [company]
    end

    test "update_company/2 with valid data updates the company", context do
      company = context.company

      update_attrs = %{
        name: "some updated name"
      }

      assert {:ok, %Company{} = company} = Companies.update_company(company, update_attrs)
      assert company.name == "some updated name"
    end

    test "update_company/2 with invalid data returns error changeset", context do
      company = context.company
      assert {:error, %Ecto.Changeset{}} = Companies.update_company(company, @invalid_attrs)
      assert company == Companies.get_company!(company.id)
    end
  end
end
