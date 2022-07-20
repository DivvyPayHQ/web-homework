defmodule HomeworkWeb.Schemas.Types do
  @moduledoc """
  Defines the types for the Schema to use.
  """
  use Absinthe.Schema.Notation

  import_types(Absinthe.Type.Custom)
  import_types(HomeworkWeb.Schemas.MerchantsSchema)
  import_types(HomeworkWeb.Schemas.TransactionsSchema)
  import_types(HomeworkWeb.Schemas.UsersSchema)
  import_types(HomeworkWeb.Schemas.CompaniesSchema)
end
