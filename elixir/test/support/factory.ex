defmodule Homework.Factory do
  use ExMachina.Ecto, repo: Homework.Repo

  def transaction_factory do
    credit = Enum.random([true, false])
    debit = !credit
    merchant = build(:merchant)
    user = build(:user)
    company = build(:company)

    %Homework.Transactions.Transaction{
      amount: Enum.random(1..10_000) * 100,
      company: company,
      credit: credit,
      debit: debit,
      description: Faker.Lorem.sentence(),
      merchant: merchant,
      user: user
    }
  end

  def company_factory do
    credit_line = Enum.random(1..1_000) * 1_000
    available_credit = credit_line - Enum.random(0..credit_line) * 500

    %Homework.Accounts.Company{
      available_credit: available_credit,
      credit_line: credit_line,
      name: Faker.Company.name()
    }
  end

  def merchant_factory do
    %Homework.Merchants.Merchant{
      description: Faker.Lorem.sentence(),
      name: Faker.Company.name()
    }
  end

  def user_factory do
    %Homework.Users.User{
      company: build(:company),
      dob: Date.to_string(Faker.Date.date_of_birth()),
      first_name: Faker.Person.first_name(),
      last_name: Faker.Person.last_name()
    }
  end
end
