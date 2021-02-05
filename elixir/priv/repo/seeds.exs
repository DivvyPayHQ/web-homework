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
import Homework.Repo

alias Homework.Users.User
alias Homework.Merchants.Merchant
alias Homework.Transactions.Transaction

first_name_pool = [
  "Liam",
  "Noah",
  "Oliver",
  "William",
  "Elijah",
  "Emma",
  "Olivia",
  "Ava",
  "Isabella",
  "Sophia"
]

last_name_pool = ["Smith", "Johnson", "Williams", "Brown", "Jones"]

generate_dob = fn ->
  ~D[1980-01-01]
  |> Date.add(:rand.uniform(3650))
  |> Date.to_string()
end

insert_user = fn ->
  insert!(%User{
    :first_name => first_name_pool |> Enum.random(),
    :last_name => last_name_pool |> Enum.random(),
    :dob => generate_dob.()
  })
end

users = 1..10 |> Enum.map(fn _ -> insert_user.() end)

merchants =
  ["Costco", "Harmons", "Chik-fil-a", "Target", "Apple", "Enterprise", "Hyatt"]
  |> Enum.map(fn merchant ->
    insert!(%Merchant{:name => merchant, :description => "Description of #{merchant}"})
  end)

1..100
|> Enum.each(fn _ ->
  merchant = merchants |> Enum.random()
  user = users |> Enum.random()

  insert!(%Transaction{
    :amount => :rand.uniform(100) * 100,
    :credit => true,
    :description => "Purchase from #{merchant.name}",
    :user_id => user.id,
    :merchant_id => merchant.id
  })
end)
