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

1
{:ok, merchant1} =
        Homework.Merchants.create_merchant(%{description: "Super Villian Front company", name: "Globex"})

      {:ok, merchant2} =
        Homework.Merchants.create_merchant(%{
          description: "Portable Quantum Tunneling Devices",
          name: "Aperture Science"
        })

        {:ok, merchant3} =
        Homework.Merchants.create_merchant(%{
          description: "Everything you could want - by mail order",
          name: "ACME"
        })

        {:ok, merchant4} =
        Homework.Merchants.create_merchant(%{
          description: "Imports and Exports",
          name: "Vandelay Industries"
        })

      {:ok, user1} =
        Homework.Users.create_user(%{
          dob: "19610401",
          first_name: "Hank",
          last_name: "Scorpio"
        })

      {:ok, user2} =
        Homework.Users.create_user(%{
          dob: "19641115",
          first_name: "Doug",
          last_name: "Rattmann"
        })

        {:ok, user3} =
        Homework.Users.create_user(%{
          dob: "19490101",
          first_name: "Wylie",
          last_name: "Coyote"
        })

        {:ok, user4} =
        Homework.Users.create_user(%{
          dob: "19660821",
          first_name: "George",
          last_name: "Costanza"
        })

      valid_attrs = %{
        amount: 500.23,
        credit: true,
        debit: true,
        description: "death ray parts",
        merchant_id: merchant1.id,
        user_id: user1.id
      }

      valid_attrs2 = %{
        amount: 10000,
        credit: false,
        debit: false,
        description: "quantum CPU",
        merchant_id: merchant2.id,
        user_id: user2.id
      }
      valid_attrs3 = %{
        amount: 150,
        credit: false,
        debit: false,
        description: "misc. parts",
        merchant_id: merchant3.id,
        user_id: user3.id
      }
      valid_attrs4 = %{
        amount: 1000,
        credit: false,
        debit: false,
        description: "latex",
        merchant_id: merchant4.id,
        user_id: user4.id
      }

      {:ok,
       %{
         valid_attrs: valid_attrs,
         valid_attrs2: valid_attrs2,
         valid_attrs3: valid_attrs3,
         valid_attrs4: valid_attrs4,
         merchant1: merchant1,
         merchant2: merchant2,
         merchant3: merchant3,
         merchant4: merchant4,
         user1: user1,
         user2: user2,
         user3: user3,
         user4: user4
       }}

    {:ok, %Homework.Transactions.Transaction{} = transaction} = Homework.Transactions.create_transaction(valid_attrs)
    {:ok, %Homework.Transactions.Transaction{} = transaction} = Homework.Transactions.create_transaction(valid_attrs2)
    {:ok, %Homework.Transactions.Transaction{} = transaction} = Homework.Transactions.create_transaction(valid_attrs3)
    {:ok, %Homework.Transactions.Transaction{} = transaction} = Homework.Transactions.create_transaction(valid_attrs4)

