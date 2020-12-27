# Edited by Joe Narus 
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
alias Homework.Users.User
alias Homework.Merchants.Merchant
alias Homework.Transactions.Transaction

user_data = [
    %{
        id: "127233f3-f07c-4ae8-ae1b-cd9cfb0cebc9",
        dob: "1995-06-04",
        first_name: "Joe",
        last_name: "Narus"
    },
    %{
        id: "831c49c2-dc45-4267-940f-b350e3ccdeda",
        dob: "1995-05-03",
        first_name: "Test",
        last_name: "User"
    },
    %{
        id: "e225e3b7-db69-40ff-bbb3-b29b20eacdf2",
        dob: "1995-04-02",
        first_name: "Test2",
        last_name: "User2"
    },
    %{
        id: "70788e81-124b-4c1d-ae1f-4007d646ed1b",
        dob: "1995-03-01",
        first_name: "Test3",
        last_name: "User3"
    }
];

merchant_data = [
    %{
        id: "5fbbe294-1d59-4f5b-864a-6fd08f7656cb",
        description: "Amazon's showroom",
        name: "Best Buy"
    },
    %{
        id: "dd141601-6627-4e40-8b63-3727d18d1f0c",
        description: "Mega Store",
        name: "Target"
    },
    %{
        id: "f1b218c1-35fc-49c2-9e5d-9966f80617ee",
        description: "Other Mega Store",
        name: "Walmart"
    }
];

transaction_data = [
    %{
        id: "6ad67dea-0ca8-4b75-84e0-0ce702a7e611",
        amount: 1234,
        credit: true,
        debit: false,
        description: "Return of product",
        merchant_id: "5fbbe294-1d59-4f5b-864a-6fd08f7656cb",
        user_id: "127233f3-f07c-4ae8-ae1b-cd9cfb0cebc9"
    },
    %{
        id: "40754a8d-be15-4c43-85d4-eb8157c109b4",
        amount: 25000,
        credit: false,
        debit: true,
        description: "Groceries",
        merchant_id: "dd141601-6627-4e40-8b63-3727d18d1f0c",
        user_id: "831c49c2-dc45-4267-940f-b350e3ccdeda"
    }
];

Enum.each(user_data, fn(data) -> 
    Homework.Repo.insert!(%User{id: data.id, dob: data.dob, first_name: data.first_name, last_name: data.last_name},
    on_conflict: :nothing)
end)

Enum.each(merchant_data, fn(data) -> 
    Homework.Repo.insert!(%Merchant{id: data.id, name: data.name, description: data.description},
    on_conflict: :nothing)
end)

Enum.each(transaction_data, fn(data) -> 
    Homework.Repo.insert!(%Transaction{id: data.id, amount: data.amount, debit: data.debit, credit: data.credit, description: data.description, merchant_id: data.merchant_id, user_id: data.user_id},
    on_conflict: :nothing)
end)
