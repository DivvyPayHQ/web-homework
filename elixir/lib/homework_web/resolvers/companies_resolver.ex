defmodule HomeworkWeb.Resolvers.CompaniesResolver do
  alias Homework.Companies
  alias HomeworkWeb.Resolvers.Utils.MoneyTypeConverter

  @money_fields [:credit_line, :available_credit]

  @doc """
  Get a list of companies
  """
  def companies(_root, args, _info) do
    companies = Companies.list_companies(args) |> MoneyTypeConverter.convert_structs(@money_fields)
    {:ok, companies}
  end

  @doc """
  Create a new company
  """
  def create_company(_root, args, _info) do
    case Companies.create_company(args) do
      {:ok, company} ->
        {:ok, MoneyTypeConverter.convert_fields(company, @money_fields)}

      error ->
        {:error, "could not create company: #{inspect(error)}"}
    end
  end

  @doc """
  Updates a company for an id with args specified.
  """
  def update_company(_root, %{id: id} = args, _info) do
    converted_args = MoneyTypeConverter.convert_fields(args, @money_fields)

    company = Companies.get_company!(id)

    case Companies.update_company(company, converted_args) do
      {:ok, company} ->
        {:ok, MoneyTypeConverter.convert_fields(company, @money_fields)}

      error ->
        {:error, "could not update company: #{inspect(error)}"}
    end
  end

  @doc """
  Deletes a company for an id
  """
  def delete_company(_root, %{id: id}, _info) do
    company = Companies.get_company!(id)

    case Companies.delete_company(company) do
      {:ok, company} ->
        {:ok, MoneyTypeConverter.convert_fields(company, @money_fields)}

      error ->
        {:error, "could not update company: #{inspect(error)}"}
    end
  end
end
