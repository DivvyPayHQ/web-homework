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
  name: "Sean Company",
  credit_line: 100000
}

company2 = Repo.insert! %Company{
  name: "Edgar Company",
  credit_line: 2000000
}

merchant1 = Repo.insert! %Merchant{
  name: "Sean Merchant",
  description: "this is Sean merchant"
}

merchant2 = Repo.insert! %Merchant{
  name: "Edgar Merchant",
  description: "this is Edgar merchant"
}

user1 = Repo.insert! %User{
  first_name: "Sean",
  last_name: "Siggard",
  company_id: company1.id,
  dob: "2/12/1980"
}

user2 = Repo.insert! %User{
  first_name: "Edgar",
  last_name: "Chenney",
  company_id: company2.id,
  dob: "7/01/1989"
}

transaction1 = Repo.insert! %Transaction{
  amount: 1000,
  user_id: user1.id,
  company_id: user1.company_id,
  debit: false,
  credit: true,
  merchant_id: merchant2.id,
  description: "the first transaction"
}

transaction2 = Repo.insert! %Transaction{
  amount: 30000,
  user_id: user2.id,
  company_id: user2.company_id,
  debit: false,
  credit: true,
  merchant_id: merchant2.id,
  description: "the second transaction"
}
