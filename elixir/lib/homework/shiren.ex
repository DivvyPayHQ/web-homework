defmodule Homework.Shiren do
  @moduledoc """
  The Shiren context.
  """

  import Ecto.Query, warn: false
  alias Homework.Repo

  alias Homework.Shiren.Prices

  @doc """
  Returns the list of price.

  ## Examples

      iex> list_price()
      [%Prices{}, ...]

  """
  def list_price do
    Repo.all(Prices)
  end

  @doc """
  Gets a single prices.

  Raises `Ecto.NoResultsError` if the Prices does not exist.

  ## Examples

      iex> get_prices!(123)
      %Prices{}

      iex> get_prices!(456)
      ** (Ecto.NoResultsError)

  """
  def get_prices!(id), do: Repo.get!(Prices, id)

  @doc """
  Creates a prices.

  ## Examples

      iex> create_prices(%{field: value})
      {:ok, %Prices{}}

      iex> create_prices(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_prices(attrs \\ %{}) do
    %Prices{}
    |> Prices.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a prices.

  ## Examples

      iex> update_prices(prices, %{field: new_value})
      {:ok, %Prices{}}

      iex> update_prices(prices, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_prices(%Prices{} = prices, attrs) do
    prices
    |> Prices.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a prices.

  ## Examples

      iex> delete_prices(prices)
      {:ok, %Prices{}}

      iex> delete_prices(prices)
      {:error, %Ecto.Changeset{}}

  """
  def delete_prices(%Prices{} = prices) do
    Repo.delete(prices)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking prices changes.

  ## Examples

      iex> change_prices(prices)
      %Ecto.Changeset{data: %Prices{}}

  """
  def change_prices(%Prices{} = prices, attrs \\ %{}) do
    Prices.changeset(prices, attrs)
  end
end
