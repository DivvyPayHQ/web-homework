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
merchant1 = Repo.insert!(
  %Merchant{
    name: "Divvy Mart",
    description: "Where shopping is an experience! *jazz hands*"
  }
)

merchant2 = Repo.insert!(
  %Merchant{
    name: "Divvy-fil-a",
    description: "We totally invented the chicken sandwich."
  }
)

merchant3 = Repo.insert!(
  %Merchant{
    name: "Divvy Divvi Divvé",
    description: "An American soul/R&B group from Oakland, California, popular during the late 1980s and early to mid-1990s."
  }
)

# User
user1 = Repo.insert!(
  %User{
    first_name: "Jeremy",
    last_name: "Brayton",
    dob: "12/27/1978",
  }
)

user2 = Repo.insert!(
  %User{
    first_name: "Miranda",
    last_name: "Brayton",
    dob: "10/16/1981",
  }
)

user3 = Repo.insert!(
  %User{
    first_name: "Clara",
    last_name: "Brayton",
    dob: "05/18/1981",
  }
)

user4 = Repo.insert!(
  %User{
    first_name: "Abigail",
    last_name: "Brayton",
    dob: "05/18/1981",
  }
)

# Transaction
Repo.insert!(
  %Transaction{
    user_id: user1.id,
    amount: 3958,
    debit: true,
    description: "Enfamil NeuroPro Baby Formula, Triple Prebiotic Immune Blend with 2'FL HMO & Expert Recommended Omega-3 DHA, Inspired by Breast Milk, Non-GMO, Refill Box, 31.4 Oz",
    merchant_id: merchant1.id,
  }
)

Repo.insert!(
  %Transaction{
    user_id: user2.id,
    amount: 3528,
    debit: true,
    description: "Huggies Snug & Dry Baby Diapers, Size 3, 144 Ct",
    merchant_id: merchant1.id,
  }
)

Repo.insert!(
  %Transaction{
    user_id: user1.id,
    amount: 1698,
    debit: true,
    description: "The Revival CD",
    merchant_id: merchant3.id,
  }
)

Repo.insert!(
  %Transaction{
    user_id: user2.id,
    amount: 1059,
    debit: true,
    description: "Chic-fil-a Sandwich Combo",
    merchant_id: merchant3.id,
  }
)

# Babies shouldn't be making transactions, unless poopy diapers count
