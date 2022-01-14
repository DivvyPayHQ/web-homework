defmodule Homework.Repo.Migrations.AlterUsersDobToDate do
  use Ecto.Migration

# realize if prod; this change would first need to have new field created
# then backfill/cast old field to new using mix task
# update schema references to new datatype and new field
# finally; remove old field from DB

  def up do
    alter table("users") do
      #modify :dob, :date : not working :thinking
      remove :dob
      add :dob, :date
    end
  end

  def down do
    alter table("users") do
      remove :dob
      add :dob, :string
    end
  end
end
