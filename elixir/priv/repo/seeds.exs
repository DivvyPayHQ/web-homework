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

require Ecto.Migration

alias Homework.Users.User
alias Homework.Transactions.Transaction
alias Homework.Merchants.Merchant

alias Homework.Repo


# Remove this before deploying to prod.  This is only for rapid testing
Repo.delete_all(Transaction)
Repo.delete_all(User)
Repo.delete_all(Merchant)

###
# USERS
###

userA = %User{
  id: "480ccace-7b86-46aa-ba8b-4f599fdb66b8",
  dob: "19900101",
  first_name: "Joe",
  last_name: "Schmoe",
}

userB = %User{
  id: "8d871376-6113-11eb-86b4-f2189869d436",
  dob: "19721017",
  first_name: "Marshal",
  last_name: "Mathers",
}

Repo.insert! userA
Repo.insert! userB


###
# MERCHANT
###

merchantA = %Merchant{
  id: "2b8c5c5c-6114-11eb-9d6b-f2189869d436",
  name: "Merchant A",
  description: "Description A"
}

merchantB = %Merchant{
  id: "3203784a-6114-11eb-9f2d-f2189869d436",
  name: "Merchant B",
  description: "Description B"
}

Repo.insert! merchantA
Repo.insert! merchantB


###
# TRANSACTION
###

transactionA = %Transaction{
  id: "a9bdeb36-6114-11eb-a9b4-f2189869d436",
  amount: 12345,
  debit: false,
  credit: true,
  description: "User A Bought item from Merchant B with Credit",
  merchant_id: merchantB.id,
  user_id: userA.id
}

transactionB = %Transaction{
  id: "d8db7fc8-6114-11eb-99ab-f2189869d436",
  amount: 4567890,
  debit: true,
  credit: false,
  description: "User B Bought item from Merchant A with Debit",
  merchant_id: merchantA.id,
  user_id: userB.id
}

Repo.insert! transactionA
Repo.insert! transactionB
