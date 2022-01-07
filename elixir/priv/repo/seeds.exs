# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Homework.Repo.insert!(%Homework.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
#
#

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

  def insert_transaction(user, company, merchant) do
    Repo.insert! %Transaction{
      amount: :rand.uniform(100),
      credit: true,
      debit: false,
      description: Faker.Commerce.En.department(),
      merchant_id: merchant.id,
      user_id: user.id,
      company_id: company.id
    }
  end

  def generate_data_set() do 
    (1 .. 5) |> Enum.each(fn _ -> Homework.DatabaseSeeder.insert_company() end)
    
    c = Homework.Repo.all(Homework.Companies.Company)
    Enum.each(c, fn comp -> 
      (1 .. 10) |> Enum.each(
        fn _ -> Homework.DatabaseSeeder.insert_user(comp)
        end

      )
    end)
    #
    # Enum.each(p, fn (person) -> IO.puts Map.get(person, :id) end)
  end
end




    # Homework.DatabaseSeeder.generate_data_set()
# (1 .. 5) |> Enum.each(
#   fn _ -> Homework.DatabaseSeeder.generate_data_set()
#   end
# )
