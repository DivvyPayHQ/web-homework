defmodule Homework.Companies.SearchCompaniesByNameTest do
  alias Homework.Companies
  import Homework.Factory
  use Homework.DataCase

  describe "search_companies_by_name/1" do
    @company_names [
      %{name: "Iron"},
      %{name: "Dolittle"},
      %{name: "Captain"},
      %{name: "Black"},
      %{name: "Black"},
      %{name: "Doctor"},
      %{name: "Ant"},
      %{name: "War"},
      %{name: "Nick"},
      %{name: "Iron"},
      %{name: "Doctor"},
      %{name: "Ant"},
      %{name: "ExDoctor"}
    ]

    setup do: [companies: Enum.map(@company_names, fn c -> insert!(:company, c) end)]

    test "success: ascending list of companies whose name closest to starting with 'dob'",
         _context do
      companies = Companies.search_companies_by_name(%{search_term: "dob"})
      assert 3 = length(companies)
      # requires 4 changes
      assert Enum.at(companies, 0).name === "Doctor"
      # requires 6 changes
      assert Enum.at(companies, 2).name === "Dolittle"
    end

    test "success: ascending list of companies whose first name closest to starting with 'docitle'",
         _context do
      companies = Companies.search_companies_by_name(%{search_term: "docitle"})

      assert 3 = length(companies)
      # requires 2 changes
      assert Enum.at(companies, 0).name === "Dolittle"
      # requires 4 changes
      assert Enum.at(companies, 2).name === "Doctor"
    end
  end
end
