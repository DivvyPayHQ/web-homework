defmodule Homework.CompaniesTest do
  use Homework.DataCase

  alias Homework.Companies

  describe "companies" do
    alias Homework.Companies.Company

    @valid_attrs %{credit_line: 42, name: "some name"}
    @update_attrs %{credit_line: 43, name: "some updated name"}
    @invalid_attrs %{credit_line: nil, name: nil}

    def company_fixture(attrs \\ %{}) do
      {:ok, company} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Companies.create_company()

      company
    end

    test "list_companies/0 returns all companies" do
      company = company_fixture()
      assert Companies.list_companies() == [company]
    end

    test "get_company!/1 returns the company with given id" do
      company = company_fixture()
      assert Companies.get_company!(company.id) == company
    end

    test "create_company/1 with valid data creates a company" do
      assert {:ok, %Company{} = company} = Companies.create_company(@valid_attrs)
      assert company.credit_line == 42
      assert company.name == "some name"
    end

    test "create_company/1 validates presence of name" do
      assert {:error, %Ecto.Changeset{errors: errors}} = Companies.create_company(@invalid_attrs)

      assert {"can't be blank", _} = errors[:name]
    end

    test "create_company/1 validates uniqueness of name" do
      %Company{name: existing_company_name} = company_fixture()

      assert {:error, %Ecto.Changeset{errors: errors}} =
               Companies.create_company(%{@valid_attrs | name: existing_company_name})

      assert {"has already been taken", _} = errors[:name]
    end

    test "update_company/2 with valid data updates the company" do
      company = company_fixture()
      assert {:ok, %Company{} = company} = Companies.update_company(company, @update_attrs)
      assert company.credit_line == 43
      assert company.name == "some updated name"
    end

    test "update_company/2 validates presence of name" do
      company = company_fixture()

      assert {:error, %Ecto.Changeset{errors: errors}} =
               Companies.update_company(company, %{@valid_attrs | name: nil})

      assert {"can't be blank", _} = errors[:name]
      assert company == Companies.get_company!(company.id)
    end

    test "update_company/2 validates uniqueness of name" do
      %Company{name: existing_company_name} = company_fixture(%{name: "Existing Company"})
      company = company_fixture()

      assert {:error, %Ecto.Changeset{errors: errors}} =
               Companies.update_company(company, %{@valid_attrs | name: existing_company_name})

      assert {"has already been taken", _} = errors[:name]
      assert company == Companies.get_company!(company.id)
    end

    test "delete_company/1 deletes the company" do
      company = company_fixture()
      assert {:ok, %Company{}} = Companies.delete_company(company)
      assert_raise Ecto.NoResultsError, fn -> Companies.get_company!(company.id) end
    end

    test "change_company/1 returns a company changeset" do
      company = company_fixture()
      assert %Ecto.Changeset{} = Companies.change_company(company)
    end
  end
end
