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


# user = %User{first_name: "Test", last_name: "Seeded", dob: "11/14/1992", company_id: company_id}
# Homework.Repo.insert!(user)


company = Homework.Repo.insert!(%Homework.Companies.Company{name: "Nvida", credit_line: 50000, available_credit: 50000})
company1 = Homework.Repo.insert!(%Homework.Companies.Company{name: "company1", credit_line: 10000, available_credit: 10000})
company2 = Homework.Repo.insert!(%Homework.Companies.Company{name: "company2", credit_line: 20000, available_credit: 20000})
company3 = Homework.Repo.insert!(%Homework.Companies.Company{name: "company3", credit_line: 30000, available_credit: 30000})
company4 = Homework.Repo.insert!(%Homework.Companies.Company{name: "company4", credit_line: 40000, available_credit: 40000})


user1 = Homework.Repo.insert!(%Homework.Users.User{first_name: "Randy", last_name: "Johnson", dob: "12/12/1212", company_id: company.id})
user2 = Homework.Repo.insert!(%Homework.Users.User{first_name: "Patrick", last_name: "Star", dob: "2/2/1212", company_id: company1.id})
user3 = Homework.Repo.insert!(%Homework.Users.User{first_name: "Rocket", last_name: "Power", dob: "1/1/1212", company_id: company2.id})
user4 = Homework.Repo.insert!(%Homework.Users.User{first_name: "Book", last_name: "Reader", dob: "3/12/1212", company_id: company3.id})
user5 = Homework.Repo.insert!(%Homework.Users.User{first_name: "Game", last_name: "Enthusiast", dob: "4/12/1212", company_id: company4.id})

merchant = Homework.Repo.insert!(%Homework.Merchants.Merchant{name: "Practice", description: "Makes Perfect!"})
merchant1 = Homework.Repo.insert!(%Homework.Merchants.Merchant{name: "Another", description: "One!"})
merchant2 = Homework.Repo.insert!(%Homework.Merchants.Merchant{name: "Almost", description: "Done!"})
merchant3 = Homework.Repo.insert!(%Homework.Merchants.Merchant{name: "Dream", description: "Job!"})
merchant4 = Homework.Repo.insert!(%Homework.Merchants.Merchant{name: "Last", description: "Time!"})


Homework.Repo.insert!(%Homework.Transactions.Transaction{
  amount: 1000, debit: false, credit: true, description: "large purchase", merchant_id: merchant.id, user_id: user1.id, company_id: company.id
})
Homework.Repo.insert!(%Homework.Transactions.Transaction{
  amount: 100, debit: true, credit: false, description: "decent purchase", merchant_id: merchant1.id, user_id: user2.id, company_id: company1.id
})
Homework.Repo.insert!(%Homework.Transactions.Transaction{
  amount: 10, debit: true, credit: false, description: "small purchase", merchant_id: merchant2.id, user_id: user3.id, company_id: company2.id
})
Homework.Repo.insert!(%Homework.Transactions.Transaction{
  amount: 1, debit: true, credit: false, description: "tiny purchase", merchant_id: merchant3.id, user_id: user4.id, company_id: company3.id
})
Homework.Repo.insert!(%Homework.Transactions.Transaction{
  amount: 2000, debit: false, credit: true, description: "huge purchase", merchant_id: merchant4.id, user_id: user5.id, company_id: company4.id
})
