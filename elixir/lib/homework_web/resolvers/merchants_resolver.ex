defmodule HomeworkWeb.Resolvers.MerchantsResolver do
  alias Homework.Merchants

  @doc """
  Get a list of merchants
  """
  def merchants(_root, args, _info) do
    {:ok, Merchants.list_merchants(args)}
  end

  @doc """
  Get an existing merchant
  """
  def merchant(_root, %{id: id}, _info) do
    try do
      {:ok, Merchants.get_merchant!(id)}
    rescue
      Ecto.NoResultsError -> {:error, "could not get merchant: no result"}
    end
  end

  @doc """
  Create a new merchant
  """
  def create_merchant(_root, args, _info) do
    case Merchants.create_merchant(args) do
      {:ok, merchant} ->
        {:ok, merchant}

      error ->
        {:error, "could not create merchant: #{inspect(error)}"}
    end
  end

  @doc """
  Deletes a merchant for an id
  """
  def delete_merchant(_root, args, _info) do
    with {:ok, merchant} <- merchant(%{}, args, %{}),
         {:ok, _merchant} = res <- Merchants.delete_merchant(merchant) do
      res
    else
      error ->
        {:error, "could not delete merchant: #{inspect(error)}"}
    end
  end

  @doc """
  Search existing merchants by the provided search term
  """
  def search_merchants_by_name(_root, args, _info) do
    case Merchants.search_merchants_by_name(args) do
      resp when is_list(resp) ->
        {:ok, resp}

      error ->
        {:error, "could not search merchants by name: #{inspect(error)}"}
    end
  end

  @doc """
  Updates a merchant for an id with args specified.
  """
  def update_merchant(_root, args, _info) do
    with {:ok, merchant} <- merchant(%{}, args, %{}),
         {:ok, _merchant} = res <- Merchants.update_merchant(merchant, args) do
      res
    else
      error ->
        {:error, "could not update merchant: #{inspect(error)}"}
    end
  end
end
