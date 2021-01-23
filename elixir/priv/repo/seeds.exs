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
alias Homework.Users
alias Homework.Companies
alias Homework.Merchants
alias Homework.Transactions

num_merchants = 6
num_companies = 5
num_users = 100
num_transactions = 10000

merchant_list = Enum.to_list(1..num_merchants)
merchants = Enum.map(merchant_list, fn(index) ->
  Merchants.create_merchant( %{name: "company-name-#{index}",
    description: "merchant description #{index}" })
end)

company_list = Enum.to_list(1..num_companies)
companies = Enum.map(company_list, fn(index) ->
  Companies.create_company( %{name: "company-name-#{index}",
    credit_line: index * 500000 })
end)

user_list = Enum.to_list(1..num_users)
users = Enum.map(user_list, fn(index) ->
  {:ok, company} = (Enum.at(companies, rem(index, num_companies)))
  result = Users.create_user( %{first_name: "name-#{index}",
    last_name: "ends-#{index}",
    dob: "dob-#{index}",
    company_id: company.id } )
end)

transaction_list = Enum.to_list(1..num_transactions)
Enum.each(transaction_list, fn(index) ->
    {:ok, selected_merchant} = (Enum.at(merchants, rem(index, num_merchants)))
    {:ok, selected_company} = (Enum.at(companies, rem(index, num_companies)))
    {:ok, selected_user} = (Enum.at(users, rem(index, num_users)))
    Transactions.create_transaction( %{ amount: 10 * index,
                                        credit: (if rem(index, 2) == 0, do: true, else: false),
                                        debit: (if rem(index, 2) != 0, do: true, else: false),
                                        description: "spending money like it's going out of style #{index}",
                                        merchant_id: selected_merchant.id,
                                        company_id: selected_company.id,
                                        user_id: selected_user.id } )
end)


