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


  def insert_company do
    Repo.insert! %Company{
      available_credit: 99,
      credit_line: 1000,
      name: Faker.Company.name()
    }
  end

  def print_the_name(company) do
    IO.puts company.name
  end


end

(1 .. 5) |> Enum.each(fn _ -> Homework.DatabaseSeeder.insert_company |> Homework.DatabaseSeeder.print_the_name() end)
