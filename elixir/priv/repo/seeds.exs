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



# Seed transaction database with dummy data, including merchants, users, and transactions

alias Homework.Repo
alias Homework.Merchants
alias Homework.Merchants.Merchant
alias Homework.Users
alias Homework.Users.User
alias Homework.Transactions
alias Homework.Transactions.Transaction

# Seed Merchant Data
Repo.insert!(%Merchant{name: "Borders Books", description: "Your Neighborhood bookstore."})
Repo.insert!(%Merchant{name: "Penguin Books", description: "Books for Penguins, by penguins."})
Repo.insert!(%Merchant{name: "MegaBooks", description: "Global Book Seller"})
Repo.insert!(%Merchant{name: "Tarnu's Trinkets", description: "Thrifts and Trinket Stop"})
Repo.insert!(%Merchant{name: "Paul's Pool Floats", description: "Pool Floats and life vests!"})
Repo.insert!(%Merchant{name: "Daniel's Donuts", description: "Donuts for all!"})
Repo.insert!(%Merchant{name: "Peter's Plants", description: "Plants and plant accessories"})


# Seed User data
Repo.insert!(%User{dob: "05081926", first_name: "David",last_name: "Attenborough"})
Repo.insert!(%User{dob: "10291942", first_name: "Robert",last_name: "Ross"})
Repo.insert!(%User{dob: "12251996", first_name: "Steven",last_name: "Stevenson"})
Repo.insert!(%User{dob: "04011975", first_name: "David",last_name: "Davidson"})
Repo.insert!(%User{dob: "02201983", first_name: "James",last_name: "Tarnu"})
Repo.insert!(%User{dob: "12251965", first_name: "Daniel",last_name: "Kim"})
Repo.insert!(%User{dob: "04121988", first_name: "Sun",last_name: "Tarnu"})
Repo.insert!(%User{dob: "02201990", first_name: "Michael",last_name: "Carr"})
Repo.insert!(%User{dob: "09221950", first_name: "Jimmy",last_name: "Westerberg"})

# Call functions that query database (need these for ids included in transactions)
donut_store = Merchants.get_merchant_by_name("Daniel's Donuts")
plant_store = Merchants.get_merchant_by_name("Peter's Plants")
trinket_store = Merchants.get_merchant_by_name("Tarnu's Trinkets")
book_store = Merchants.get_merchant_by_name("Borders Books")

david_attenborough = Users.get_users_by_dob_and_name("05081926","David","Attenborough")
bob_ross = Users.get_users_by_dob_and_name("10291942","Robert","Ross")
steve_stevenson = Users.get_users_by_dob_and_name("12251996","Steven","Stevenson")
sun_tarnu = Users.get_users_by_dob_and_name("02201983","James","Tarnu")

# Seed Transaction Data
Repo.insert!(%Transaction{amount: 12,credit: true,debit: false,description: "Donut purchase",merchant_id: donut_store.id,user_id: steve_stevenson.id})
Repo.insert!(%Transaction{amount: 321,credit: false,debit: true,description: "Ramen Noodles",merchant_id: trinket_store.id,user_id: bob_ross.id})
Repo.insert!(%Transaction{amount: 123,credit: true,debit: false,description: "Loaves of bread",merchant_id: donut_store.id,user_id: sun_tarnu.id})
Repo.insert!(%Transaction{amount: 645,credit: true,debit: false,description: "Pieces of Lumber",merchant_id: trinket_store.id,user_id: david_attenborough.id})
Repo.insert!(%Transaction{amount: 12,credit: true,debit: true,description: "Sunflower Purchase",merchant_id: plant_store.id,user_id: bob_ross.id})
Repo.insert!(%Transaction{amount: 12,credit: false,debit: false,description: "Dalia Bulbs",merchant_id: plant_store.id,user_id: david_attenborough.id})
Repo.insert!(%Transaction{amount: 12,credit: true,debit: true,description: "Bags of Compost",merchant_id: plant_store.id,user_id: steve_stevenson.id})
Repo.insert!(%Transaction{amount: 1,credit: true,debit: false,description: "Watering Can Purchase",merchant_id: trinket_store.id,user_id: sun_tarnu.id})
Repo.insert!(%Transaction{amount: 1,credit: false,debit: false,description: "Bamboo Plant",merchant_id: plant_store.id,user_id: bob_ross.id})
Repo.insert!(%Transaction{amount: 4,credit: true,debit: false,description: "Book purchase",merchant_id: book_store.id,user_id: steve_stevenson.id})
Repo.insert!(%Transaction{amount: 2,credit: false,debit: false,description: "Donut purchase",merchant_id: donut_store.id,user_id: david_attenborough.id})
Repo.insert!(%Transaction{amount: 1,credit: true,debit: true,description: "Book of Elephant Photos",merchant_id: book_store.id,user_id: bob_ross.id})
Repo.insert!(%Transaction{amount: 3,credit: true,debit: false,description: "Assorted Donut purchase",merchant_id: donut_store.id,user_id: sun_tarnu.id})
Repo.insert!(%Transaction{amount: 55,credit: true,debit: false,description: "Plant Pots",merchant_id: donut_store.id,user_id: steve_stevenson.id})
Repo.insert!(%Transaction{amount: 99,credit: false,debit: true,description: "Book purchase",merchant_id: book_store.id,user_id: david_attenborough.id})
