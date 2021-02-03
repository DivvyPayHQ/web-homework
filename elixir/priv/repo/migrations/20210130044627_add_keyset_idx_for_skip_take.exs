defmodule Homework.Repo.Migrations.AddKeysetIdxForSkipTake do
  use Ecto.Migration

  def up do
    execute(
      "CREATE INDEX transaction_pagination_idx ON transactions USING btree (id)"
    )
    execute(
      "CREATE INDEX user_pagination_idx ON users USING btree (id)"
    )
    execute(
      "CREATE INDEX merchant_pagination_idx ON merchants USING btree (id)"
    )
  end

  def down do
    execute(
      "DROP INDEX transaction_pagination_idx"
    )
    execute(
      "DROP INDEX user_pagination_idx"
    )
    execute(
      "DROP INDEX merchant_pagination_idx"
    )
  end
end
