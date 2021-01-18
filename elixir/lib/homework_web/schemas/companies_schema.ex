defmodule HomeworkWeb.Schemas.CompaniesSchema do
  @moduledoc """
  The graphql schema for company.
  """
  use Absinthe.Schema.Notation

  object :company do
    field(:id, non_null(:id))
    field(:name, :string)
    field(:credit_line, :integer)
    field(:available_credit, :integer)
  end
end
