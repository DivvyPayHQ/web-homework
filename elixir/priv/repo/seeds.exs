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
alias Homework.Accounts.Company
alias Homework.Repo

%Company{credit_line: 10_000_00, name: "ACME"} |> Repo.insert!()
%Company{credit_line: 10_000_00, name: "Walmart"} |> Repo.insert!()
