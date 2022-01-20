defmodule Homework.Repo.Migrations.AddFuzzyExtensions do
  use Ecto.Migration

   def up do
     execute "CREATE EXTENSION fuzzystrmatch"
     execute "CREATE EXTENSION pg_trgm"
   end

   def down do
     execute "DROP EXTENSION fuzzystrmatch"
     execute "DROP EXTENSION pg_trgm"
   end
 end
