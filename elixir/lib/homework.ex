defmodule Homework do
  @moduledoc """
  Homework keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """
  use Phoenix.Pagination, per_page: 15

end
