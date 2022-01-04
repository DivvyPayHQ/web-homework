defmodule HomeworkWeb.Resolvers.CompaniesResolver do
  alias Homework.Companies

  @spec companies(any, any, any) :: {:ok, list(%Companies.Company{})}
  @doc """
  Get a list of companies
  """
  def companies(_root, args, _info) do
    {:ok, Companies.list_companies(args) |> Enum.map(&to_dollars/1)}
  end

  @spec create_company(
          any,
          :invalid | %{optional(:__struct__) => none, optional(atom | binary) => any},
          any
        ) :: {:error, String.t()} | {:ok, %Companies.Company{}}
  @doc """
  Create a new company
  """
  def create_company(_root, args, _info) do
    case Companies.create_company(args |> to_cents) do
      {:ok, company} ->
        {:ok, company |> to_dollars}

      error ->
        {:error, "could not create company: #{inspect(error)}"}
    end
  end

  @spec update_company(
          any,
          %{:id => any, optional(:__struct__) => none, optional(atom | binary) => any},
          any
        ) :: {:error, String.t()} | {:ok, %Companies.Company{}}
  @doc """
  Updates a company for an id with args specified.
  """
  def update_company(_root, %{id: id} = args, _info) do
    company = Companies.get_company!(id)

    case Companies.update_company(company, args |> to_cents) do
      {:ok, company} ->
        {:ok, company |> to_dollars}

      error ->
        {:error, "could not update company: #{inspect(error)}"}
    end
  end

  @spec delete_company(any, %{:id => any, optional(any) => any}, any) ::
          {:error, String.t()} | {:ok, %Companies.Company{}}
  @doc """
  Deletes a company for an id
  """
  def delete_company(_root, %{id: id}, _info) do
    company = Companies.get_company!(id)

    case Companies.delete_company(company) do
      {:ok, company} ->
        {:ok, company |> to_dollars}

      error ->
        {:error, "could not update company: #{inspect(error)}"}
    end
  end

  @spec search_companies(any, %{:max_distance => any, :name => any, optional(any) => any}, any) ::
          {:ok, list(%Companies.Company{})}
  @doc """
  Fuzzy search for companies by name
  """
  def search_companies(_root, %{name: name, max_distance: max_distance}, _info) do
    {:ok, Companies.search_companies(name, max_distance) |> Enum.map(&to_dollars/1)}
  end

  defp to_dollars(cents) when is_integer(cents) do
    Decimal.div(cents, 100) |> Decimal.round(2)
  end

  defp to_dollars(%{credit_line: credit_cents, available_credit: nil} = company) do
    %{company | credit_line: credit_cents |> to_dollars}
  end

  defp to_dollars(%{credit_line: credit_cents, available_credit: available_cents} = company) do
    %{company | credit_line: credit_cents |> to_dollars, available_credit: available_cents |> to_dollars}
  end

  defp to_dollars(%{credit_line: cents} = company) do
    %{company | credit_line: cents |> to_dollars}
  end

  defp to_cents(%Decimal{} = dollars) do
    Decimal.round(dollars, 2) |> Decimal.mult(100) |> Decimal.to_integer()
  end

  defp to_cents(%{credit_line: credit_dollars, available_credit: available_dollars} = company) do
    %{company | credit_line: credit_dollars |> to_cents, available_credit: available_dollars |> to_cents}
  end

  defp to_cents(%{credit_line: dollars} = company) do
    %{company | credit_line: dollars |> to_cents}
  end
end
