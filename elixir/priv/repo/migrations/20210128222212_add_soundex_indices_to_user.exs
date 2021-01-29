defmodule Homework.Repo.Migrations.AddSoundexIndicesToUser do
  use Ecto.Migration

  def change do
    create(
      index(
        :users,
        ["SOUNDEX(first_name)", "SOUNDEX(last_name)"],
        name: :name_soundex_index,
        using: "btree"
      )
    )
  end
end
