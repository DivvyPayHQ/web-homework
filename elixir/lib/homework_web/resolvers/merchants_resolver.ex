defmodule HomeworkWeb.Resolvers.MerchantsResolver do
  alias Homework.Merchants

  @spec merchants(any, any, any) :: {:ok, list(%Merchants.Merchant{})}
  @doc """
  Get a list of merchants
  """
  def merchants(_root, args, _info) do
    {:ok, Merchants.list_merchants(args)}
  end

  @spec create_merchant(
          any,
          :invalid | %{optional(:__struct__) => none, optional(atom | binary) => any},
          any
        ) :: {:error, String.t()} | {:ok, %Merchants.Merchant{}}
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

  @spec update_merchant(
          any,
          %{:id => any, optional(:__struct__) => none, optional(atom | binary) => any},
          any
        ) :: {:error, String.t()} | {:ok, %Merchants.Merchant{}}
  @doc """
  Updates a merchant for an id with args specified.
  """
  def update_merchant(_root, %{id: id} = args, _info) do
    merchant = Merchants.get_merchant!(id)

    case Merchants.update_merchant(merchant, args) do
      {:ok, merchant} ->
        {:ok, merchant}

      error ->
        {:error, "could not update merchant: #{inspect(error)}"}
    end
  end

  @spec delete_merchant(any, %{:id => any, optional(any) => any}, any) ::
          {:error, String.t()} | {:ok, %Merchants.Merchant{}}
  @doc """
  Deletes a merchant for an id
  """
  def delete_merchant(_root, %{id: id}, _info) do
    merchant = Merchants.get_merchant!(id)

    case Merchants.delete_merchant(merchant) do
      {:ok, merchant} ->
        {:ok, merchant}

      error ->
        {:error, "could not update merchant: #{inspect(error)}"}
    end
  end

  @spec search_merchants(any, %{:max_distance => any, :name => any, optional(any) => any}, any) ::
          {:ok, list(%Merchants.Merchant{})}
  @doc """
  Fuzzy search for merchants by name
  """
  def search_merchants(_root, %{name: name, max_distance: max_distance}, _info) do
    {:ok, Merchants.search_merchants(name, max_distance)}
  end
end
