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
require Integer

alias Homework.Repo
alias Homework.Merchants
alias Homework.Transactions
alias Homework.Users
alias Homework.Companies

Repo.delete_all Transactions.Transaction
Repo.delete_all Merchants.Merchant
Repo.delete_all Users.User
Repo.delete_all Companies.Company

{:ok, %{id: atreides_id}} = Companies.create_company(%{
  name: "Atreides 'r' us",
  credit_line: 10000000
})

{:ok, %{id: hark_id}} = Companies.create_company(%{
  name: "Vlad is 2 bad",
  credit_line: 101010
})

merchant_seed = [
  %{
    name: "Arrakeen Spice",
    description: "Your one stop shop for spice — straight from Arrakis!"
  },
  %{
    name: "Bene Gesserit Robes",
    description: "Robes that are certified space-nun fresh!"
  }
]

user_seed = [
  %{
    first_name: "Paul",
    last_name: "Atreides",
    dob: "03/7/10175",
    company_id: atreides_id
  },
  %{
    first_name: "Leto",
    last_name: "Atreides",
    dob: "09/13/10140",
    company_id: atreides_id
  },
  %{
    first_name: "Chani",
    last_name: "Kynes",
    dob: "01/10/10177",
    company_id: atreides_id
  },
  %{
    first_name: "Vladimir",
    last_name: "Harkonnen",
    dob: "08/22/10110",
    company_id: hark_id
  },
  %{
    first_name: "Testy",
    last_name: "Test",
    dob: "01/17/2002",
    company_id: atreides_id
  }
]

users = Enum.map(user_seed, fn user ->
  user
    |> Users.create_user()
end)

merchants = Enum.map(merchant_seed, fn merchant ->
  merchant
    |> Merchants.create_merchant()
    |> elem(1)
end)

Enum.each(users, fn {_, user} ->
  amount = Enum.random(1..10000)

  {merchant, credit, debit} = if Integer.is_even(amount) do
    {Enum.at(merchants, 0), true, false}
  else
    {Enum.at(merchants, 1), false, true}
  end

  Transactions.create_transaction(%{
      user_id: user.id,
      merchant_id: merchant.id,
      company_id: user.company_id,
      amount: amount,
      credit: credit,
      debit: debit,
      description: "#{user.first_name} made a fantastic purchase at #{merchant.name}"
  })

  Companies.reduce_credit(%{company_id: user.company_id, amount: amount})
end)
