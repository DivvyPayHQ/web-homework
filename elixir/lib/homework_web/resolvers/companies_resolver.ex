defmodule HomeworkWeb.Resolvers.CompaniesResolver do
    alias Homework.Companies

    @doc """
    Get a list of companies
    """
    def companies(_root, args, _info) do
        {:ok, Enum.map(Companies.list_companies(args), &convert_to_decimal/1)}
    end

    @doc """
    Create a new company
    """
    def create_company(_root, args, _info) do
        case Companies.create_company(convert_to_cents(args)) do
            {:ok, company} ->
                {:ok, company}

            error ->
                {:error, "could not create company: #{inspect(error)}"}
        end
    end

    @doc """
    Update the Company
    """
    def update_company(_root, %{id: id} = args, _info) do
        company = Companies.get_company!(id)

        case Companies.update_company(company, convert_to_cents(args)) do
            {:ok, company} ->
                {:ok, company}

            error ->
                {:error, "could not update company: #{inspect(error)}"}
        end
    end

    @doc """
    Delete a company
    """
    def delete_company(_root, %{id: id}, _info) do
        company = Companies.get_company!(id)

        case Companies.delete_company(company) do
            {:ok, company} ->
                {:ok, company}

            error ->
                {:error, "could not delete company: #{inspect(error)}"}
        end
    end

    @doc """
    Converts the credit_line and available_balance values to a decimal
    """
    def convert_to_decimal(company) do
        %{company | credit_line: company.credit_line / 100, available_credit: company.available_credit / 100}
      end

    @doc """
    Converts the credit_line and available_balance values to an integer
    """
      def convert_to_cents(company) do
        %{company | credit_line: round(company.credit_line * 100), available_credit: round(company.available_credit * 100)}
      end
end
