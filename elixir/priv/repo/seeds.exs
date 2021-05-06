# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs

alias Homework.Repo
alias Homework.Merchants
alias Homework.Merchants.Merchant
alias Homework.Companies
alias Homework.Companies.Company
alias Homework.Transactions
alias Homework.Transactions.Transaction
alias Homework.Users
alias Homework.Users.User

Repo.delete_all(Transaction)
Repo.delete_all(Merchant)
Repo.delete_all(User)
Repo.delete_all(Company)

safe_insert_all = fn attr_sets, inserter ->
  Enum.map(attr_sets, fn attrs ->
    {:ok, result} = inserter.(attrs)
    result
  end)
end

merchant_specs = [
  %{name: "Facebook", description: "Up & coming social networking company"},
  %{name: "Amazon", description: "Book seller"},
  %{name: "Apple", description: "Isaac Newton's muse"},
  %{name: "Netflix", description: "DVD rentals through the mail"},
  %{name: "Google", description: "AltaVista competitor"}
]

merchants = safe_insert_all.(merchant_specs, &Merchants.create_merchant/1)

company_specs = [
  %{name: "Pfizer", description: "Medical", credit_line: 100_000_00},
  %{name: "Moderna", description: "Also medical", credit_line: 50_000_00},
  %{name: "Johnson & Johnson", description: "Also also medical", credit_line: 10_000_00}
]

[company_pfizer, company_moderna, company_jj] =
  safe_insert_all.(company_specs, &Companies.create_company/1)

user_specs = [
  %{dob: "1963-02-17", first_name: "Michael", last_name: "Jordan", company_id: company_pfizer.id},
  %{dob: "1917-05-29", first_name: "John", last_name: "Kennedy", company_id: company_pfizer.id},
  %{dob: "1994-03-01", first_name: "Justin", last_name: "Bieber", company_id: company_moderna.id},
  %{dob: "1724-04-22", first_name: "Immanuel", last_name: "Kant", company_id: company_moderna.id},
  %{dob: "1996-02-29", first_name: "Leap", last_name: "Day", company_id: company_jj.id}
]

users = safe_insert_all.(user_specs, &Users.create_user/1)

transaction_specs =
  Enum.flat_map(users, fn user ->
    Enum.flat_map(merchants, fn merchant ->
      transaction_count = Enum.random(0..4)

      Enum.map(0..transaction_count, fn _ ->
        cents = Enum.random(99..1_000_00)
        # credit at 1/4 the rate of debits
        credit = Enum.random([false, false, false, true])

        %{
          user_id: user.id,
          merchant_id: merchant.id,
          company_id: user.company_id,
          amount: cents,
          credit: credit,
          debit: !credit,
          description: "Purchase from #{merchant.description}"
        }
      end)
    end)
  end)
  |> Enum.shuffle()

_ = safe_insert_all.(transaction_specs, &Transactions.create_transaction/1)
