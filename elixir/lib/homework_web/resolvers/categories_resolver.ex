defmodule HomeworkWeb.Resolvers.CategoriesResolver do
  alias Homework.Categories

  @doc """
  Get a list of categories
  """
  def categories(_root, args, _info) do
    {:ok, Categories.list_categories(args)}
  end

  @doc """
  Create a new category
  """
  def create_category(_root, args, _info) do
    case Categories.create_category(args) do
      {:ok, category} ->
        {:ok, category}

      error ->
        {:error, "could not create category: #{inspect(error)}"}
    end
  end

  @doc """
  Updates a category for an id with args specified.
  """
  def update_category(_root, %{id: id} = args, _info) do
    category = Categories.get_category!(id)

    case Categories.update_category(category, args) do
      {:ok, category} ->
        {:ok, category}

      error ->
        {:error, "could not update category: #{inspect(error)}"}
    end
  end

  @doc """
  Deletes a category for an id
  """
  def delete_category(_root, %{id: id}, _info) do
    category = Categories.get_category!(id)

    case Categories.delete_category(category) do
      {:ok, category} ->
        {:ok, category}

      error ->
        {:error, "could not delete category: #{inspect(error)}"}
    end
  end
end
