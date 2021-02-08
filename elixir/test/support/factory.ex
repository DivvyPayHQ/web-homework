defmodule Homework.Factory do
  @moduledoc """
  Provides custom factories for testing
  """

  use ExMachina.Ecto, repo: Homework.Repo

  alias Homework.{Merchants, Transactions, Users}

  def user_factory do
    %Users.User{
      dob: Faker.Date.date_of_birth() |> Date.to_string(),
      first_name: Faker.Person.first_name(),
      last_name: Faker.Person.last_name()
    }
  end

  def merchant_factory do
    %Merchants.Merchant{
      description: Faker.Lorem.sentence(),
      name: Faker.Team.name()
    }
  end

  def transaction_factory(attrs) do
    %{user: user, merchant: merchant} = attrs

    %Transactions.Transaction{
      amount: Faker.Util.pick(1000..10000) * 100,
      credit: Faker.Util.pick([true, false]),
      debit: Faker.Util.pick([true, false]),
      description: Faker.Lorem.sentence(),
      merchant_id: merchant.id,
      user_id: user.id
    }
  end
end
