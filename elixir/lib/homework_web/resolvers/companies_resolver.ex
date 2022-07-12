defmodule HomeworkWeb.Resolvers.CompaniesResolver do
  alias Homework.Companies
  alias HomeworkWeb.Resolvers.Utils.MoneyTypeConverter

  @viewable_money_fields [:credit_line, :available_credit]
  @updatable_money_fields [:credit_line]

  @doc """
  Get a list of companies
  """
  def companies(_root, args, _info) do
    {:ok, Companies.list_companies(args) |> Companies.get_available_credit() |> MoneyTypeConverter.convert_structs(@viewable_money_fields)}
  end

  @doc """
  Create a new company
  """
  def create_company(_root, args, _info) do
    case Companies.create_company(args) do
      {:ok, company} ->
        {:ok, company |> Companies.get_available_credit() |> MoneyTypeConverter.convert_fields(@viewable_money_fields)}

      error ->
        {:error, "could not create company: #{inspect(error)}"}
    end
  end

  @doc """
  Updates a company for an id with args specified.
  """
  def update_company(_root, %{id: id} = args, _info) do
    converted_args = MoneyTypeConverter.convert_fields(args, @updatable_money_fields)

    company = Companies.get_company!(id)

    case Companies.update_company(company, converted_args) do
      {:ok, company} ->
        {:ok, company |> Companies.get_available_credit() |> MoneyTypeConverter.convert_fields(@viewable_money_fields)}

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
        {:ok, company |> MoneyTypeConverter.convert_fields(@viewable_money_fields)}

      error ->
        {:error, "could not update company: #{inspect(error)}"}
    end
  end
end
