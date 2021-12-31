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
alias Homework.Users.User
alias Homework.Transactions.Transaction

# Purge data before (re)seeding
Repo.delete_all(Transaction)
Repo.delete_all(Merchant)
Repo.delete_all(User)

# Merchant
Repo.insert!(
  %Merchant{
    name: "Divvy Mart",
    description: "Where shopping is an experience! *jazz hands*"
  }
)

Repo.insert!(
  %Merchant{
    name: "Divvy-fil-a",
    description: "We totally invented the chicken sandwich."
  }
)

Repo.insert!(
  %Merchant{
    name: "Divvy Divvi Divvé",
    description: "An American soul/R&B group from Oakland, California, popular during the late 1980s and early to mid-1990s."
  }
)

# User
Repo.insert!(
  %User{
    first_name: "Jeremy",
    last_name: "Brayton",
    dob: "12/27/1978",
  }
)

Repo.insert!(
  %User{
    first_name: "Miranda",
    last_name: "Brayton",
    dob: "10/16/1981",
  }
)

Repo.insert!(
  %User{
    first_name: "Clara",
    last_name: "Brayton",
    dob: "05/18/1981",
  }
)

Repo.insert!(
  %User{
    first_name: "Abigail",
    last_name: "Brayton",
    dob: "05/18/1981",
  }
)

# Transaction
