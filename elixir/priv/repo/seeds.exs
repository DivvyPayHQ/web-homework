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
# and so on) as they will fail if something goes wrong
require Integer
alias Homework.Users
alias Homework.Users.User
alias Homework.Merchants
alias Homework.Companies
alias Homework.Transactions

  # I will be using the internal functions (as opposed to bang functions) to seed the data.
  #  It feels 'safer' to me and is a somewhat easier way for
  #  the next dev to come along and catch on to the patterns.

  # I also could split these seeds into separate files and
  # reference them in here to keep it clean, but since I won't be seeding more than ~ 5
  # items per category I feel that a simple visual organization suffices.


  #  ========== BEGIN COMPANIES SEEDING =========
{:ok, %{id: king_id}} = Companies.create_company(%{
  name: "Ruler of the World, Inc.",
  credit_line: 40000
})

{:ok, %{id: wayne_id}} = Companies.create_company(%{
  name: "Wayne Enterprises",
  credit_line: 60000
})

{:ok, %{id: lucas_id}} = Companies.create_company(%{
  name: "LucasArts",
  credit_line: 80000
})

# ==========END COMPANIES SEEDING ===============

  # ============= USERS SEEDING ================


  users_seed = [
    %{
      dob: "01/01/1901",
      first_name: "Hunter",
      last_name: "Smith",
      company_id: king_id
    },
    %{
      dob: "01/01/1902",
      first_name: "Luke",
      last_name: "Skywalker",
      company_id: lucas_id

    },
    %{
      dob: "03/02/1900",
      first_name: "Bruce",
      last_name: "Wayne",
      company_id: wayne_id

    }
  ]

  users = Enum.map(users_seed, fn user ->
    user
    |> Users.create_user()
  end)

# ============== END USERS SEEDING =============


# ============== MERCHANTS SEEDING =============

merchants_seed = [
  %{
    description: "The magical warehouse which gets your mother addicted to shopping there by having samples and cheap lunches. Also, 5 dollar rotisserie chicken. What more could you want?",
    name: "Costco"
  },

  %{
    description: "This would be a happy place, except that the amount of coal manufactured here has been one of the main sources of global warming. The elves are ready for a warmer climate in the North",
    name: "Santa's Workshop"
  }
]



merchants = Enum.map(merchants_seed, fn merchant ->
  merchant
  |> Merchants.create_merchant()
  # need to make sure to grab the first element
  |> elem(1)
end)

#  =========== END MERCHANTS SEEDING ==========





# ==============TRANSACTIONS SEEDING============



# Go through each user created and determine

Enum.each(users, fn {_, user} ->
  # Give each transaction an amount. Could assign random later
  amount = Enum.random(1..10000)


  #  Destructured variable setting
  {merchant, credit, debit} = if Integer.is_even(amount) do
    {Enum.at(merchants, 0), true, false}
  else
    {Enum.at(merchants, 1), false, true}
  end

  Transactions.create_transaction(%{
    user_id: user.id,
    merchant_id: merchant.id,
    company_id: user.company_id,
    amount: amount,
    credit: credit,
    debit: debit,
    description: "#{user.first_name} made a purchase via #{merchant.name}"
  })
  Companies.subtract_credit(%{company_id: user.company_id, amount: amount})
end)
