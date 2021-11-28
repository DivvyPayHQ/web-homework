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
alias Homework.Users
alias Homework.Merchants
alias Homework.Transactions


# Merchant Starting Data
{:ok, merchant1} =
  Merchants.create_merchant(%{
  description: "Get wholesale pricing on the industry's most comprehensive selection of professional-grade irrigation and landscape products.",
  name: "Horizon Distributors"
})

{:ok, merchant2} =
  Merchants.create_merchant(%{
    description: "Sherwin-Williams Company is an American Cleveland, Ohio–based company in the paint and coating manufacturing industry.",
    name: "Sherwin-Williams"
})


# Company Starting Data
{:ok, company1} =
  Companies.create_company(%{
    available_credit: 100000,
    credit_line: 100000,
    name: "Revive Cabintry"
})

{:ok, company2} =
  Companies.create_company(%{
    available_credit: 50000,
    credit_line: 80000,
    name: "BC Landscaping"
})

# User Starting Data
{:ok, user1} =
  Users.create_user(%{
    first_name: "Devan",
    last_name: "Craig",
    dob: "08/21/1998",
    company_id: company1.id
})

{:ok, user2} =
  Users.create_user(%{
    first_name: "Iris",
    last_name: "Duke",
    dob: "08/19/1953",
    company_id: company2.id
})

# Transaction Starting Data
{:ok, transaction1} =
  Transactions.create_transaction(%{
    amount: 10,
    credit: true,
    debit: false,
    description: "Sprinkler Nozzles",
    merchant_id: merchant1.id,
    user_id: user1.id,
    company_id: company1.id
})
Companies.update_company_credit(transaction1.company_id, transaction1.amount)

{:ok, transaction2} =
  Transactions.create_transaction(%{
    amount: 50,
    credit: false,
    debit: true,
    description: "Dark Oak Stain",
    merchant_id: merchant2.id,
    user_id: user2.id,
    company_id: company2.id
})
Companies.update_company_credit(transaction2.company_id, transaction2.amount)
