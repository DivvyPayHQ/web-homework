# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Homework.Repo.insert!(%Homework.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Homework.Companies.Company
alias Homework.Merchants.Merchant
alias Homework.Repo
alias Homework.Transactions.Transaction
alias Homework.Users.User

defmodule Seeds do

  @moduledoc false

  @doc """
    Safely inserts records into the database (noisy failing)
  """
  def safe_insert_many([]) do
    []
  end

  def safe_insert_many([h | t]) do
    result = Repo.insert!(h)
    [ result | safe_insert_many(t) ]
  end

  @doc """
    Adds foreign key values to given list of entities
  """
  def add_foreign_keys_to_entities([], _foreign_key_mappings) do
    []
  end

  def add_foreign_keys_to_entities([h | t], foreign_key_mappings) do
      transaction = add_foreign_keys_to_entity(h, foreign_key_mappings)
      [ transaction | add_foreign_keys_to_entities(t, foreign_key_mappings) ]
  end

  @doc """
    Adds foreign key values to given entity
  """
  def add_foreign_keys_to_entity(entity, []) do
    entity
  end

  def add_foreign_keys_to_entity(entity, [h | t]) do
    #    IO.puts("HERE: #{h}")
    { column, value } = Map.to_list(h) |> List.first()
    entity
    |> Map.put(column, value)
    |> add_foreign_keys_to_entity(t)
  end
end

companies = [
  %Company{
    name: "Divvy",
    credit_line: 10000,
  },
  %Company{
    name: "Some LLC",
    credit_line: 100000000,
  },
]

merchants = [
  %Merchant{
    name: "Walmart",
    description: "retail"
  },
  %Merchant{
    name: "Apple",
    description: "tech"
  },
  %Merchant{
    name: "Appliance Store",
    description: "household appliances"
  },
  %Merchant{
    name: "App Store",
    description: "software"
  },
  %Merchant{
    name: "Joe's Apple Farm'",
    description: "produce supplier"
  },
  %Merchant{
    name: "Apex Sky-Diving",
    description: "recreation"
  },
  %Merchant{
    name: "Applebee's",
    description: "restaurant"
  },
  %Merchant{
    name: "Torchy's Tacos",
    description: "restaurant"
  }
]

users = [
  %User{
    first_name: "Dan",
    last_name: "Rix",
    dob: "1989-07-15"
  },
  %User{
    first_name: "Dani",
    last_name: "Rixxy",
    dob: "1955-11-12"
  },
  %User{
    first_name: "Dane",
    last_name: "Rix",
    dob: "1955-11-12"
  },
  %User{
    first_name: "Danny",
    last_name: "Ricks",
    dob: "1955-11-12"
  },
  %User{
    first_name: "Daniel",
    last_name: "Rixitron",
    dob: "1955-11-12"
  },
  %User{
    first_name: "Dave",
    last_name: "Ricks",
    dob: "1955-11-12"
  },
  %User{
    first_name: "Rich",
    last_name: "Rix",
    dob: "1955-11-12"
  },
  %User{
    first_name: "Jesse",
    last_name: "Rixxy",
    dob: "2015-08-21"
  },
  %User{
    first_name: "Jess",
    last_name: "Rix",
    dob: "2015-08-21"
  },
  %User{
    first_name: "Jessie",
    last_name: "Ricks",
    dob: "2015-08-21"
  },
  %User{
    first_name: "Ricky",
    last_name: "Rixitron",
    dob: "1985-08-26"
  },
  %User{
    first_name: "Janet",
    last_name: "Ricks",
    dob: "2015-08-21"
  },
  %User{
    first_name: "Dan",
    last_name: "Smith",
    dob: "1985-08-26"
  },
  %User{
    first_name: "Jess",
    last_name: "Smith",
    dob: "2015-08-21"
  }
]

transactions = [
  %Transaction{
    amount: 123,
    credit: false,
    debit: true,
    description: "Cherry Coke",
    inserted_at: NaiveDateTime.from_iso8601!("2022-01-31 00:00:00Z")
  },
  %Transaction{
    amount: 456,
    credit: false,
    debit: true,
    description: "Circus Animal Cookies",
    inserted_at: NaiveDateTime.from_iso8601!("2022-02-01 00:00:00Z")
  },
  %Transaction{
    amount: 789,
    credit: false,
    debit: true,
    description: "T-shirt",
    inserted_at: NaiveDateTime.from_iso8601!("2022-02-01 00:00:00Z")
  },
  %Transaction{
    amount: 5274,
    credit: false,
    debit: true,
    description: "The Legend of Zelda: Breath of the Wild",
    inserted_at: NaiveDateTime.from_iso8601!("2022-02-02 00:00:00Z")
  },
]

# First clean-up the database
Repo.delete_all(Transaction)
Repo.delete_all(User)
Repo.delete_all(Merchant)
Repo.delete_all(Company)

# Seed companies and merchants, getting the first of each to satisfy foreign key constraints
[first_company | _ ] = Seeds.safe_insert_many(companies)
[first_merchant | _ ] = Seeds.safe_insert_many(merchants)

# Seed users with the the first company, getting the first to satisfy foreign key constraints
[first_user | _ ] = Seeds.add_foreign_keys_to_entities(users, [%{company_id: first_company.id}]) |> Seeds.safe_insert_many()

# Seed transactions with first merchant and user
Seeds.add_foreign_keys_to_entities(transactions, [%{merchant_id: first_merchant.id}, %{user_id: first_user.id}])
|> Seeds.safe_insert_many()