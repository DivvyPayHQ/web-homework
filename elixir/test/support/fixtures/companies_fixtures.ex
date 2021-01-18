defmodule Homework.CompaniesFixtures do
  alias Homework.Companies

  @doc """
  Test helper function for generating a Company
  """
  def company_fixture(attrs \\ %{}) do
    {:ok, company} =
      attrs
      |> Enum.into(%{
        credit_line: 42,
        name: "Company #{System.unique_integer([:positive])}"
      })
      |> Companies.create_company()

    company
  end
end
