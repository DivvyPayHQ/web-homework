defmodule HomeworkWeb.Resolvers.CompaniesResolverTest do
  use Homework.DataCase, async: true
  alias Homework.Companies
  alias HomeworkWeb.Resolvers.CompaniesResolver

  @company_one_setup %{
    name: "Company one",
    credit_line: 100000
  }

  @company_two_setup %{
    name: "Company two",
    credit_line: 200000
  }

  @company_three_setup %{
    name: "Company Three",
    credit_line: 1000000
  }

  setup do
    company_one = create_company_through_context(@company_one_setup)
    company_two = create_company_through_context(@company_two_setup)
    %{
      company_one: company_one,
      company_two: company_two
    }
  end

  describe "@create_company" do
    test "tests create_company/3 in CompaniesResolver" do
      assert {:ok, company} = CompaniesResolver.create_company(nil, @company_three_setup, nil)
      companies = get_all_companies_through_context()
      assert Enum.find(companies, fn x -> company.id === x.id end)
    end
    
  end

  describe "@update_company" do
    test "tests update_company/3 in CompaniesResolver", state do
      updated_field = "a new value"
      assert {:ok, company} = CompaniesResolver.update_company(nil, %{id: state.company_two.id, name: updated_field}, nil)
      updated_company = get_company_through_context(company.id)
      assert updated_field === updated_company.name
    end
  end

  describe "@companies" do
    test "tests companies/3 in CompaniesResolver", state do
      assert {:ok, companies} = CompaniesResolver.companies(nil, %{}, nil)
      assert Enum.find(companies, fn x -> state.company_one.id === x.id end)
    end
  end

  describe "@delete_company" do
    test "tests delete_company/3 in CompaniesResolver", state do
      assert {:ok, _company} = CompaniesResolver.delete_company(nil, %{id: state.company_two.id}, nil)
      companies = get_all_companies_through_context()
      refute Enum.find(companies, fn x -> state.company_two.id === x.id end)
    end
  end

  defp create_company_through_context(company) do
    assert {:ok, company} = Companies.create_company(company)
    company
  end

  defp get_company_through_context(id) do
    Companies.get_company!(id)
  end

  defp get_all_companies_through_context() do
    Companies.list_companies(%{})
  end

end