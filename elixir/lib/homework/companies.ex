defmodule Homework.Companies do
    @moduledoc """
    The Companies context.
    """

    import Ecto.Query, warn: false
    alias Homework.Repo

    alias Homework.Companies.Company

    @doc """
    Returns the list of companies.
    """
    def list_companies(_args) do
        Repo.all(Company)
    end

    @doc """
    Gets a single company by the ID
    """
    def get_company!(id), do: Repo.get!(Merchant, id)

    @doc """
    Create a new company
    """
    def create_company(attrs \\ %{}) do
        %Company{}
        |> Company.changeset(attrs)
        |> Repo.insert()
    end

    @doc """
    Updates a specified company with the given values
    """
    def update_company(%Company{} = company, attrs) do
        company
        |> Company.changeset(attrs)
        |> Repo.update()
    end

    @doc """
    Deletes a company
    """
    def delete_company(%Company{} = company) do
        Repo.delete(company)
    end

    def change_company(%Company{} = company, attrs \\ %{}) do
        Company.changeset(company, attrs)
    end

end
