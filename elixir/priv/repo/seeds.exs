defmodule Homework.DatabaseSeeder do
  alias Homework.Companies.Company
  alias Homework.Repo
  alias Homework.Users.User
  alias Homework.Merchants.Merchant
  alias Homework.Transactions.Transaction

  def insert_company do
    Repo.insert! %Company{
      available_credit: 99,
      credit_line: 1000,
      name: Faker.Company.name()
    }
  end

  def insert_user(company) do
        Repo.insert! %User{
        first_name: Faker.Person.first_name(),
        last_name: Faker.Person.last_name(),
        dob: Date.to_string(Faker.Date.date_of_birth(1970 .. 1990)),
        company_id: Map.get(company, :id) 
      }
  end

  def insert_merchant do
    Repo.insert! %Merchant{
      description: Faker.Lorem.sentence(6 .. 10),
      name: Faker.Commerce.En.department()
    }
  end

  def insert_transaction(user, merchant) do
    Repo.insert! %Transaction{
      amount: :rand.uniform(100),
      credit: true,
      debit: false,
      description: Faker.Commerce.En.department(),
      merchant_id: Map.get(merchant, :id),
      user_id: Map.get(user, :id),
      company_id: Map.get(user, :company_id)
    }
  end

  def generate_data_set() do 
    # create companies and merchants
    (1 .. 10) |> Enum.each(fn _ -> Homework.DatabaseSeeder.insert_merchant() end)
    (1 .. 5) |> Enum.each(fn _ -> Homework.DatabaseSeeder.insert_company() end)
    # get companaies and merchants in a list
    c = Homework.Repo.all(Homework.Companies.Company)
    m = Homework.Repo.all(Homework.Merchants.Merchant)
    # create users beloning to companies
    Enum.each(c, fn comp -> (1 .. 10) |> Enum.each(fn _ -> Homework.DatabaseSeeder.insert_user(comp)end)end)

    u = Homework.Repo.all(Homework.Users.User)
    # loop through merchants, loop through users. Create tranactions assign transaction to user, company and merchant
    Enum.each(m, fn (merch) -> 
      Enum.each(u, fn (usr) -> 
        (1 .. 10) |> Enum.each(fn _ -> Homework.DatabaseSeeder.insert_transaction(usr, merch) end)
      end)

    end)

  end
end




# Homework.DatabaseSeeder.generate_data_set()
