defmodule Homework.Transactions.SearchTransactionsByMaxMin do
  @moduledoc """
  Returns all Transactions whose amount is between the provided `max` and `min`.

  Raises `Ecto.QueryError` if query validation fails.

  ## Examples

  iex> Transactions.search_transactions_by_max_min(%{ max: 500, min: 100})
  [%Transaction{}, ...]
  """

  alias Homework.Transactions

  @spec call(params) :: {:ok, list(Users.t())} | {:ok, []} | {:error, any()}
        when params: %{
               :max => number(),
               :min => number()
             }
  def call(%{max: _max, min: _min} = params),
    do: Transactions.filter_transactions(%{amount: %{amount: nil, between: params, include: nil}})

  def call(_params), do: {:ok, []}
end
