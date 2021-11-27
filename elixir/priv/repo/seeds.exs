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


alias Homework.Transactions.Transaction
alias Homework.Merchants.Merchant
alias Homework.Users.User
alias Homework.Companies.Company

# could use something like faker to seed large data set going forward...

user_1 = Homework.Repo.insert!(%User{
  dob: "08-17-1995",
  first_name: "John",
  last_name: "Hutchins"
})

user_2 = Homework.Repo.insert!(%User{
  dob: "03-7-2511",
  first_name: "John",
  last_name: "117"
})

merchant_1 = Homework.Repo.insert!(%Merchant{
  name: "Smith's Marketplace",
  description: "Your grocery plaza"
})

merchant_2 = Homework.Repo.insert!(%Merchant{
  name: "Covenent Arms and Ammo",
  description: "ARRRUUUUUUUHHHHHGGGGRURUUU"
})

company_2 = Homework.Repo.insert!(%Company{
  name: "Galatic Arms INC.",
  credit_line: 5000,
  availiable_credit: 5000
})

company_1 = Homework.Repo.insert!(%Company{
  name: "Eitan Incorporated",
  credit_line: 10000,
  availiable_credit: 10000
})

transaction_1 = Homework.Repo.insert!(%Transaction{
  amount: 95,
  debit: true,
  description: "To give the covenant back their bomb.",
  user: user_1,
  merchant: merchant_1,
  company: company_1
})

transaction_2 = Homework.Repo.insert!(%Transaction{
  amount: 15394,
  credit: true,
  description: "Nothing like a plasma pistol",
  user: user_2,
  merchant: merchant_2,
  company: company_2
})
