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
alias Homework.Companies
alias Homework.Companies.Company
alias Homework.Merchants.Merchant
alias Homework.Users.User
alias Homework.Merchants
alias Homework.Repo

# Merchant Starting Data
merchant_data = [
  %{
    name: "Horizon Distributors",
    description: "Get wholesale pricing on the industry's most comprehensive selection of professional-grade irrigation and landscape products."
  },
  %{
    name: "Sherwin-Williams",
    description: "Sherwin-Williams Company is an American Cleveland, Ohio–based company in the paint and coating manufacturing industry."
  }
]

Enum.each(merchant_data, fn data ->
  Merchants.create_merchant(data)
end)

# Company Starting Data
company_data = [
  %{
    available_credit: 100000,
    credit_line: 100000,
    name: "Revive Cabintry",
  },
  %{
    available_credit: 100000,
    credit_line: 100000,
    name: "BC Landscaping",
  }
]

Enum.each(company_data, fn data ->
  Companies.create_company(data)
end)

# User Starting Data
user_data_1 = [
  %{
    first_name: "Devan",
    last_name: "Craig",
    dob: "08/21/1998"
  },
  %{
    first_name: "Iris",
    last_name: "Duke",
    dob: "08/19/1953"
  }
]
user_data_2 = [
  %{
    first_name: "Neo",
    last_name: "Rowland",
    dob: "02/08/1980"
  },
  %{
    first_name: "Lulu",
    last_name: "Barlow",
    dob: "04/01/1975"
  }
]

company_bc_landscaping = Repo.get_by Company, name: "BC Landscaping"
company_revive_cabintry = Repo.get_by Company, name: "Revive Cabintry"

Enum.each(user_data_1, fn data ->
  user_changeset = Ecto.build_assoc(company_bc_landscaping, :users, data)
  Repo.insert(user_changeset)
end)

Enum.each(user_data_2, fn data ->
  user_changeset = Ecto.build_assoc(company_revive_cabintry, :users, data)
  Repo.insert(user_changeset)
end)

# Transaction Starting Data
transaction_1 =
  %{
    amount: 10,
    credit: true,
    debit: false,
    description: "Sprinkler Nozzles"
  }

transaction_2 =
  %{
    amount: 50,
    credit: false,
    debit: true,
    description: "Dark oak stain"
  }

merchant_sherwin = Repo.get_by Merchant, name: "Sherwin-Williams"
merchant_horizon = Repo.get_by Merchant, name: "Horizon Distributors"
user_devan = Repo.get_by User, first_name: "Devan"

# First Transaction
merchant_horizon
  |> Ecto.build_assoc(:transactions, transaction_1)
  |> Ecto.Changeset.change()
  |> Ecto.Changeset.put_assoc(:user, user_devan)
  |> Ecto.Changeset.change()
  |> Ecto.Changeset.put_assoc(:company, company_bc_landscaping)
  |> Repo.insert()



# Second Transaction
merchant_sherwin
  |> Ecto.build_assoc(:transactions, transaction_2)
  |> Ecto.Changeset.change()
  |> Ecto.Changeset.put_assoc(:user, user_devan)
  |> Ecto.Changeset.change()
  |> Ecto.Changeset.put_assoc(:company, company_bc_landscaping)
  |> Repo.insert()
