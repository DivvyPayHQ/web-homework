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

users = [
  %User{
    dob: "8/4/1961",
    first_name: "Barack",
    last_name: "Obama"
  },
  %User{
    dob: "7/6/1946",
    first_name: "George",
    last_name: "Bush"
  },
  %User{
    dob: "8/19/1946",
    first_name: "Bill",
    last_name: "Clinton"
  }
]

user_ids = Enum.map(users, fn data ->
  result = Repo.insert!(data)
  result.id
end)

merchants = [
  %Merchant{
    description: "Soo many fees",
    name: "Ebay"
  },
  %Merchant{
    description: "This id dangerous",
    name: "Craigslist"
  },
  %Merchant{
    description: "Ooo, Fancy",
    name: "Etsy"
  }
]

merchant_ids = Enum.map(merchants, fn data ->
  result = Repo.insert!(data)
  result.id
end)


bands = ["Nsync", "Boyz II Men", "98 Degrees", "New Kids on the Block", "Backstreet Boys"]

descriptions = Enum.reduce(bands, [], fn(band, acc) ->
  [
    band <> " - signed poster",
    band <> " - clothing",
    band <> " - snow globe",
    band <> " - life size figurine"
  ] ++ acc
end)

dates = [~D[2021-01-01], ~D[2021-02-01]]

# Lets create a lot of transactions

Enum.each(0..100, fn row ->
  credit = Enum.random([true, false]) 
  debit = !credit

  transaction = %Transaction{
    amount: :rand.uniform() * Enum.random(0..100) |> Float.round(2),
    credit: credit,
    date: Enum.random(dates),
    debit: debit,
    description: Enum.random(descriptions),
    user_id: Enum.random(user_ids),
    merchant_id: Enum.random(merchant_ids)
  }

  Repo.insert!(transaction)
end)
