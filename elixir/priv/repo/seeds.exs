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

alias Homework.Merchants.Merchant
alias Homework.Transactions.Transaction
alias Homework.Users.User

# seed data for local development.
# to get a clean database set, run `mix ecto.reset`

# create some users
users = [
  %User{
    dob: "1/1/1900",
    first_name: "zach",
    last_name: "toolson"
  },
  %User{
    dob: "3/15/1980",
    first_name: "michael",
    last_name: "scott"
  },
  %User{
    dob: "3/5/1963",
    first_name: "joseph allen",
    last_name: "schreibvogel"
  }
]

user_ids =
  Enum.map(users, fn data ->
    result = Repo.insert!(data)
    result.id
  end)

# create some merchants
merchants = [
  %Merchant{
    description: "Exoctic Animal Zoo",
    name: "Greater Wynnewood Exotic Animal Park"
  },
  %Merchant{
    description: "The finest paper products",
    name: "Dunder Mifflin"
  }
]

merchant_ids =
  Enum.map(merchants, fn data ->
    result = Repo.insert!(data)
    result.id
  end)

# create some transactions on every user
transactions = [
  %Transaction{
    amount: 1111,
    credit: true,
    debit: false,
    description: "test transaction 1"
  },
  %Transaction{
    amount: 2222,
    credit: true,
    debit: false,
    description: "test transaction 2"
  },
  %Transaction{
    amount: 3333,
    credit: true,
    debit: false,
    description: "test transaction 3"
  }
]

Enum.each(user_ids, fn user_id ->
  Enum.each(merchant_ids, fn merchant_id ->
    Enum.each(transactions, fn transaction ->
      transaction = Map.put(transaction, :user_id, user_id)
      transaction = Map.put(transaction, :merchant_id, merchant_id)

      Repo.insert!(transaction)
    end)
  end)
end)
