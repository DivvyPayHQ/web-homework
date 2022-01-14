defmodule HomeworkWeb.Schema do
  @moduledoc """
  Defines the graphql schema for this project.
  """
  use Absinthe.Schema

  import_types(HomeworkWeb.Schemas.Types)

  query do
    import_fields(:company_queries)
    import_fields(:transaction_queries)
    import_fields(:merchant_queries)
    import_fields(:user_queries)
  end

  mutation do
    import_fields(:company_mutations)
    import_fields(:transaction_mutations)
    import_fields(:merchant_mutations)
    import_fields(:user_mutations)
  end
end
