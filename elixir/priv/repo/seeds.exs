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

alias Homework.Repo
alias Homework.Companies.Company
alias Homework.Merchants.Merchant
alias Homework.Transactions.Transaction
alias Homework.Users.User

company1 = Repo.insert! %Company{
  name: "Company1",
  credit_line: 1000000
}

company2 = Repo.insert! %Company{
  name: "Company2",
  credit_line: 2000000
}

company3 = Repo.insert! %Company{
  name: "Company3",
  credit_line: 3000000
}

merchant1 = Repo.insert! %Merchant{
  name: "Merchant1",
  description: "The first Merchant"
}

merchant2 = Repo.insert! %Merchant{
  name: "Merchant2",
  description: "The second Merchant"
}

user1 = Repo.insert! %User{
  first_name: "Alex",
  last_name: "Smith",
  company_id: company1.id,
  dob: "1/23/1967"
}

user2 = Repo.insert! %User{
  first_name: "John",
  last_name: "Adams",
  company_id: company2.id,
  dob: "3/21/1975"
}

transaction1 = Repo.insert! %Transaction{
  amount: 10000,
  user_id: user1.id,
  company_id: user1.company_id,
  debit: false,
  credit: true,
  merchant_id: merchant2.id,
  description: "the first transaction"
}

transaction2 = Repo.insert! %Transaction{
  amount: 20000,
  user_id: user2.id,
  company_id: user2.company_id,
  debit: false,
  credit: true,
  merchant_id: merchant2.id,
  description: "the second transaction"
}

transaction3 = Repo.insert! %Transaction{
  amount: 30000,
  user_id: user2.id,
  company_id: user2.company_id,
  debit: false,
  credit: true,
  merchant_id: merchant1.id,
  description: "the third transaction"
}