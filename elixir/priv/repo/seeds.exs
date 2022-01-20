defmodule Homework.Seeding do
  @moduledoc """
  Script for populating the database. You can run it as:

     mix run priv/repo/seeds.exs
     mix run priv/repo/seeds.exs --delete-all

  """
  alias Homework.Companies.Company
  alias Homework.Merchants.Merchant
  alias Homework.{Repo, Transactions}
  alias Homework.Transactions.Transaction
  alias Homework.Users.User
  require Logger

  @company_names [
    name: "Alchemax",
    name: "Baintronics",
    name: "Hammer Industries",
    name: "Kronas Corporation",
    name: "Serval Industries",
    name: "Worthington Industries"
  ]

  @desc_action [
    "bought",
    "enjoyed",
    "had",
    "held",
    "inherited",
    "kept",
    "retained"
  ]

  @desc_adjs [
    "adorable",
    "adventurous",
    "aggressive",
    "agreeable",
    "alert",
    "alive",
    "amused",
    "angry",
    "annoyed",
    "arrogant"
  ]

  @desc_amount [
    "blob",
    "bunch",
    "cluster",
    "dozen",
    "handful",
    "lot",
    "pack",
    "scoop",
    "set"
  ]

  @desc_nouns [
    "Actor",
    "Gold",
    "Painting",
    "Advertisement",
    "Grass",
    "Parrot",
    "Afternoon",
    "Greece",
    "Pencil",
    "Airport",
    "Guitar",
    "Piano"
  ]

  @desc_product [
    "Air purifier",
    "Air conditioner",
    "Alarm clock",
    "Backup charger",
    "Bread maker",
    "Banknote counter",
    "Blender",
    "Bluetooth speaker",
    "Bulb",
    "Calculator",
    "Car toy",
    "Ceiling fan",
    "Chandelier",
    "Clock",
    "Clothes dryer"
  ]
  @merchant_names [
    name: "Law Offices Of Nelson And Murdock",
    name: "Oscorp",
    name: "Parker Industries",
    name: "Pym Technologies",
    name: "Rand Corporation",
    name: "Roxxon Energy Corporation",
    name: "Stark Industries",
    name: "The Daily Bugle",
    name: "The Life Foundation",
    name: "Weapon Plus"
  ]

  @user_first_last_names [
    %{first_name: "Iron", last_name: "Man"},
    %{first_name: "Dolittle", last_name: "Man"},
    %{first_name: "Captain", last_name: "America"},
    %{first_name: "Black", last_name: "Widow"},
    %{first_name: "Black", last_name: "Panther"},
    %{first_name: "Doctor", last_name: "Strange"},
    %{first_name: "Ant", last_name: "Man"},
    %{first_name: "War", last_name: "Machine"},
    %{first_name: "Nick", last_name: "Fury"},
    %{first_name: "Iron", last_name: "Captain"}
  ]

  @spec call(list()) :: :ok
  def call(["--delete-all"]), do: delete_seeds()
  def call(_), do: create_seeds(Mix.env())

  defp create_seeds(:prod), do: Logger.info("Don't seed the prod database!")

  defp create_seeds(_) do
    Logger.info("Seeding database...")

    @company_names
    |> create_companies()
    |> create_users(@user_first_last_names)
    |> create_merchants(@merchant_names)
    |> create_transactions()
  end

  defp delete_seeds() do
    Repo.delete_all(Transaction)
    Repo.delete_all(Merchant)
    Repo.delete_all(User)
    Repo.delete_all(Company)
  end

  defp create_companies(company_names) do
    Logger.info("Creating #{length(company_names)} companies...")

    companies =
      Enum.map(company_names, fn {:name, c_n} ->
        amount = Enum.random(5..10) * 100_000

        Repo.insert!(%Company{
          available_credit: amount,
          credit_line: amount,
          name: c_n
        })
      end)

    %{companies: companies}
  end

  defp create_users(params, user_names) do
    users =
      Enum.reduce(params.companies, [], fn c, users ->
        count = Enum.random(10..15)
        Logger.info("Creating #{count} users for company #{c.id}")

        users ++
          Enum.map(0..count, fn _ ->
            %{first_name: first_name} = Enum.random(user_names)
            %{last_name: last_name} = Enum.random(user_names)

            Repo.insert!(%User{
              company_id: c.id,
              dob: random_dob(),
              first_name: first_name,
              last_name: last_name
            })
          end)
      end)

    Map.put(params, :users, users)
  end

  defp create_merchants(params, merchants_names) do
    Logger.info("Creating #{length(merchants_names)} merchants...")

    merchants =
      Enum.map(merchants_names, fn {:name, m_n} ->
        Repo.insert!(%Merchant{description: random_description(:merchants), name: m_n})
      end)

    Map.put(params, :merchants, merchants)
  end

  defp create_transactions(params) do
    Enum.map(params.users, fn u ->
      count = Enum.random(1..5)
      merchant = Enum.random(params.merchants)
      Logger.info("Creating #{count} transactions for user #{u.id}")

      Enum.map(0..count, fn _ ->
        Transactions.create_transaction(%{
          amount: Enum.random(100..1000),
          company_id: u.company_id,
          credit: Enum.random(0..1) == 0,
          debit: Enum.random(0..1) == 0,
          description: random_description(:transaction),
          merchant_id: merchant.id,
          user_id: u.id
        })
      end)
    end)

    params
  end

  defp random_description(type) do
    case type do
      :transaction ->
        "#{Enum.random(@desc_action)} a #{Enum.random(@desc_amount)} of #{
          Enum.random(@desc_product)
        }s"

      _ ->
        "The #{Enum.random(@desc_adjs)} #{Enum.random(@desc_nouns)}"
    end
  end

  defp random_dob(),
    do: %Date{
      year: Enum.random(1920..2021),
      month: Enum.random(1..12),
      day: Enum.random(1..27)
    }

  ###
  # instead of using Transactions.create_invoice;
  # could do Repo.insert!() and update Companies available_credit at end of pipe . . .
  # reduces load, but :shrug
  ###
  # defp update_companies_available_credit(%{companies: companies}) do
  #  Enum.map(companies, fn company ->
  #    %{
  #      credit_line: credit_line,
  #      transactions_count: transactions_count,
  #      transactions_sum: transactions_sum
  #    } =
  #      Company
  #      |> join(:left, [c], t in assoc(c, :transactions))
  #      |> where([c], c.id == ^company.id)
  #      |> group_by([c], c.id)
  #      |> select([c, t], %{
  #        credit_line: c.credit_line,
  #        transactions_count: count(t.id),
  #        transactions_sum: sum(t.amount)
  #      })
  #      |> Repo.one()
  #
  #    transactions_sum =
  #      if is_nil(transactions_sum) && transactions_count == 0, do: 0, else: transactions_sum
  #
  #    available_credit = credit_line - transactions_sum
  #
  #    Repo.update!(%{available_credit: available_credit})
  #  end)
  # end
end

Homework.Seeding.call(System.argv())
