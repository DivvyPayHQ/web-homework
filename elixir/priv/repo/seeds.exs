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

transaction_1 = Homework.Repo.insert!(%Transaction{
  amount: 95,
  debit: true,
  description: "Bought a whole bunch of crap",
  user: user_1,
  merchant: merchant_1
})


transaction_2 = Homework.Repo.insert!(%Transaction{
  amount: 15394,
  credit: true,
  description: "Nothing like a plasma pistol",
  user: user_2,
  merchant: merchant_2
})
