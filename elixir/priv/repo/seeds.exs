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
alias Homework.Users.User
user_data = [
    %{
        dob: "1995-06-04",
        first_name: "Joe",
        last_name: "Narus"
    },
    %{
        dob: "1995-05-03",
        first_name: "Test",
        last_name: "User"
    },
    %{
        dob: "1995-04-02",
        first_name: "Test2",
        last_name: "User2"
    },
    ,
    %{
        dob: "1995-03-01",
        first_name: "Test3",
        last_name: "User3"
    }
];

Enum.each(user_data, fn(data) -> 
    Homework.Repo.insert!(%User{dob: data.dob, first_name: data.first_name, last_name: data.last_name})
end)
