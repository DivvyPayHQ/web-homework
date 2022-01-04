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
alias Homework.Users
alias Homework.Merchants
alias Homework.Transactions
alias Homework.Companies

# This is so we  don't continually add data to the repo
Repo.delete_all(Transactions.Transaction)
Repo.delete_all(Users.User)
Repo.delete_all(Companies.Company)
Repo.delete_all(Merchants.Merchant)

# Populate some company data
company_data = [
    %{
        name: "NewCompany",
        credit_line: 123000,
        available_credit: 123000
    },
    %{
        name: "OldCompany",
        credit_line: 12000,
        available_credit: 12000
    }
]

Enum.each(company_data, fn(data) ->
    Companies.create_company(data)
end)

company_list = Companies.list_companies(nil)

# Populate some User Data
#Users.create_user(%{first_name: "Jane", last_name: "Whithers", dob: "01/01/1990"})
#company = Companies.create_company(%{name: "Company", credit_line: 123000, available_credit: 123000})
user_data = [
    %{
        first_name: "Tom",
        last_name: "Stone",
        dob: "01/01/1980",
        company_id: Enum.find_value(company_list, fn company -> if company.name == "NewCompany", do: company.id end)
    },
    %{
        first_name: "Jane",
        last_name: "Whithers",
        dob: "01/01/1990",
        company_id: Enum.find_value(company_list, fn company -> if company.name == "OldCompany", do: company.id end)
    },
    %{
        first_name: "Mark",
        last_name: "Matthews",
        dob: "01/01/1995",
        company_id: Enum.find_value(company_list, fn company -> if company.name == "NewCompany", do: company.id end)
    },
    %{
        first_name: "Austin",
        last_name: "Cord",
        dob: "01/01/1950",
        company_id: Enum.find_value(company_list, fn company -> if company.name == "NewCompany", do: company.id end)
    },
    %{
        first_name: "Rachel",
        last_name: "Knight",
        dob: "01/01/1965",
        company_id: Enum.find_value(company_list, fn company -> if company.name == "NewCompany", do: company.id end)
    },
    %{
        first_name: "John",
        last_name: "Test",
        dob: "01/01/1975",
        company_id: Enum.find_value(company_list, fn company -> if company.name == "OldCompany", do: company.id end)
    }
]

Enum.each(user_data, fn(data) ->
    Users.create_user(data)
end)

#Populate the Merchant Data
merchant_data = [
    %{
        name: "Hardy's Hardware",
        description: "Hardware Store"
    },
    %{
        name: "Astrospect",
        description: "Astrology Store"
    },
    %{
        name: "Foogle",
        description: "Search and Rescue Department"
    },
    %{
        name: "Macrosoft",
        description: "Software for Large-scale companies"
    },
    %{
        name: "SpaceWhy",
        description: "Pondering the questions of Space"
    },
]

Enum.each(merchant_data, fn(data) ->
    Merchants.create_merchant(data)
end)

#Populate the Transaction Data
user_list = Users.list_users(nil)
merchant_list = Merchants.list_merchants(nil)

transaction_data = [
    %{
        user_id: Enum.find_value(user_list, fn user -> if user.first_name == "Tom", do: user.id end),
        company_id: Enum.find_value(user_list, fn user -> if user.first_name == "Tom", do: user.company_id end),
        amount: 1265,
        debit: true,
        description: "Small item purchase",
        merchant_id: Enum.find_value(merchant_list, fn merchant -> if merchant.name == "Hardy's Hardware", do: merchant.id end)
    },
    %{
        user_id: Enum.find_value(user_list, fn user -> if user.first_name == "Jane", do: user.id end),
        company_id: Enum.find_value(user_list, fn user -> if user.first_name == "Jane", do: user.company_id end),
        amount: 2045,
        debit: true,
        description: "Item purchase",
        merchant_id: Enum.find_value(merchant_list, fn merchant -> if merchant.name == "Astrospect", do: merchant.id end)
    },
    %{
        user_id: Enum.find_value(user_list, fn user -> if user.first_name == "Mark", do: user.id end),
        company_id: Enum.find_value(user_list, fn user -> if user.first_name == "Mark", do: user.company_id end),
        amount: 19412,
        debit: true,
        description: "Item purchase",
        merchant_id: Enum.find_value(merchant_list, fn merchant -> if merchant.name == "Astrospect", do: merchant.id end)
    },
    %{
        user_id: Enum.find_value(user_list, fn user -> if user.first_name == "Austin", do: user.id end),
        company_id: Enum.find_value(user_list, fn user -> if user.first_name == "Austin", do: user.company_id end),
        amount: 3245,
        debit: true,
        description: "Item purchase",
        merchant_id: Enum.find_value(merchant_list, fn merchant -> if merchant.name == "Foogle", do: merchant.id end)
    },
    %{
        user_id: Enum.find_value(user_list, fn user -> if user.first_name == "Rachel", do: user.id end),
        company_id: Enum.find_value(user_list, fn user -> if user.first_name == "Rachel", do: user.company_id end),
        amount: 113405,
        debit: true,
        description: "Company Integration",
        merchant_id: Enum.find_value(merchant_list, fn merchant -> if merchant.name == "Macrosoft", do: merchant.id end)
    },
    %{
        user_id: Enum.find_value(user_list, fn user -> if user.first_name == "John", do: user.id end),
        company_id: Enum.find_value(user_list, fn user -> if user.first_name == "John", do: user.company_id end),
        amount: 212045,
        debit: true,
        description: "Funding",
        merchant_id: Enum.find_value(merchant_list, fn merchant -> if merchant.name == "SpaceWhy", do: merchant.id end)
    }
]

Enum.each(transaction_data, fn(data)->
   Transactions.create_transaction(data)
end)
