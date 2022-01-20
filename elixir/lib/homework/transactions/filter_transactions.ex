defmodule Homework.Transactions.FilterTransactions do
  @moduledoc """
  Returns all Transactions.
  - Can filter out Transactions by passing in optional parameters.
  - Ideally all Transactions queries end by calling Transactions.filter_transactions/1.

  Raises `Ecto.QueryError` if query validation fails.

  ## Examples

  iex> Transactions.filter_transactions(%{:first_name: "captain"})
  [%Transaction{}, ...]
  """

  alias Homework.Repo
  alias Homework.Transactions.Transaction
  import Ecto.Query, warn: false

  @type amount_params :: %{
          :amount => number(),
          :between => map(),
          :include => atom()
        }

  @spec call(params) :: [Transaction.t()] | []
        when params: %{
               optional(:amount) => amount_params(),
               optional(:company_id) => atom(),
               optional(:order_by) => :inserted_at_asc | :inserted_at_desc,
               optional(:preload) => list()
             }
  def call(params),
    do:
      Transaction
      |> where(^filter_where(params))
      |> order_by(^filter_order_by(params[:order_by], params))
      |> preload(^Map.get(params, :preload, []))
      |> Repo.all()

  defp filter_order_by(:inserted_at_asc, _),
    do: [asc: dynamic([t], t.inserted_at)]

  defp filter_order_by(:inserted_at_desc, _),
    do: [desc: dynamic([t], t.inserted_at)]

  defp filter_order_by(_, _),
    do: []

  defp filter_where(params) do
    Enum.reduce(params, dynamic(true), fn
      {:amount, value}, _dynamic ->
        handle_amount_condition(value)

      {:company_id, value}, dynamic ->
        dynamic([t], ^dynamic and t.company_id == ^value)

      _, dynamic ->
        dynamic
    end)
  end

  defp handle_amount_condition(
         %{
           amount: _amount,
           between: _between,
           include: _include
         } = params
       ) do
    case params do
      %{amount: amount, between: nil, include: nil} ->
        dynamic([t], t.amount == ^amount)

      %{amount: amount, between: nil, include: include} ->
        case include do
          :less_than ->
            dynamic([t], t.amount <= ^amount)

          :greater_than ->
            dynamic([t], t.amount >= ^amount)
        end

      %{amount: nil, between: %{max: max, min: min}, include: nil} ->
        dynamic([t], t.amount < ^max and t.amount > ^min)
    end
  end
end
