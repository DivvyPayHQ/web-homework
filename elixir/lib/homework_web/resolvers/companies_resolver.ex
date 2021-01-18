defmodule HomeworkWeb.Resolvers.CompaniesResolver do
  alias Homework.{Companies, Transactions}
  alias Homework.Companies.Company

  @doc """
  Get a list of companies
  """
  def companies(_root, _args, _info) do
    companies =
      Companies.list_companies()
      |> Enum.map(&add_available_credit/1)

    {:ok, companies}
  end

  defp add_available_credit(company) do
    # This is N+1, but lets get it working
    Map.put(
      company,
      :available_credit,
      company.credit_line - Transactions.total_amount_for_company(%Company{id: company.id})
    )
  end
end
