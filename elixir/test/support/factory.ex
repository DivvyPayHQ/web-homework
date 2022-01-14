defmodule Homework.Factory do
  @moduledoc """
  Factory to create new data for testing.
  """

  alias Homework.Companies.Company
  alias Homework.Merchants.Merchant
  alias Homework.Repo
  alias Homework.Transactions.Transaction
  alias Homework.Users.User

  def build(:company) do
    %Company{
      available_credit: 10_000,
      credit_line: 10_000,
      name: "some name"
    }
  end

  def build(:merchant) do
    %Merchant{
      description: "some description",
      name: "some name"
    }
  end

  def build(:transaction) do
    %Transaction{
      amount: 42,
      credit: true,
      company: build(:company),
      debit: true,
      description: "some description",
      merchant: build(:merchant),
      user: build(:user)
    }
  end

  def build(:user) do
    %User{
      company: build(:company),
      dob: ~D[2000-01-01],
      first_name: "some first_name",
      last_name: "some last_name"
    }
  end

  def build(factory_name, attributes) do
    factory_name |> build() |> struct!(attributes)
  end

  def insert!(factory_name, attributes \\ []) do
    factory_name |> build(attributes) |> Repo.insert!()
  end
end
