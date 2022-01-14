defmodule Homework.Users.FilterUsers do
  @moduledoc """
  Returns all Users.
  - Can filter out Users by passing in optional parameters.
  - Ideally all Users queries end by calling Users.filter_users/1.

  Raises `Ecto.QueryError` if query validation fails.

  ## Examples

  iex> Users.filter_users(%{:first_name: "captain"})
  [%User{}, ...]
  """

  alias Homework.Repo
  alias Homework.Users.User
  import Ecto.Query, warn: false

  @type dob_params :: %{
          :dob => String.t(),
          :include => atom()
        }

  @type fuzzy_name_params :: %{
          :search_by => list(),
          :search_term => String.t(),
          :start_character => String.t()
        }

  @spec call(params) :: [User.t()] | []
        when params: %{
               optional(:dob) => dob_params(),
               optional(:first_name) => String.t(),
               optional(:fuzzy_name) => fuzzy_name_params(),
               optional(:last_name) => String.t(),
               optional(:order_by) => :inserted_at_asc | :inserted_at_desc | :fuzzy_name,
               optional(:preload) => list()
             }
  def call(params),
    do:
      User
      |> where(^filter_where(params))
      |> order_by(^filter_order_by(params[:order_by], params))
      |> preload(^Map.get(params, :preload, []))
      |> Repo.all()

  defp filter_order_by(:inserted_at_asc, _),
    do: [asc: dynamic([u], u.inserted_at)]

  defp filter_order_by(:inserted_at_desc, _),
    do: [desc: dynamic([u], u.inserted_at)]

  defp filter_order_by(:fuzzy_name, params),
    do: handle_fuzzy_name_order_by(params)

  defp filter_order_by(_, _),
    do: []

  defp filter_where(params) do
    Enum.reduce(params, dynamic(true), fn
      {:dob, value}, _dynamic ->
        handle_dob_condition(value)

      {:first_name, value}, dynamic ->
        dynamic([u], ^dynamic and u.first_name == ^value)

      {:fuzzy_name, value}, _dynamic ->
        handle_fuzzy_name_condition(value)

      {:last_name, value}, dynamic ->
        dynamic([u], ^dynamic and u.last_name == ^value)

      _, dynamic ->
        dynamic
    end)
  end

  defp handle_dob_condition(%{
         dob: dob,
         include: include
       }) do
    case include do
      :after ->
        dynamic([u], u.dob >= ^dob)

      :before ->
        dynamic([u], u.dob <= ^dob)

      _ ->
        dynamic([u], u.dob == ^dob)
    end
  end

  defp handle_fuzzy_name_condition(%{
         search_by: search_by,
         search_term: search_term,
         start_character: start_character
       }) do
    cond do
      Enum.member?(search_by, :first_name) &&
          Enum.member?(search_by, :last_name) ->
        dynamic(
          [u],
          (ilike(u.first_name, ^start_character) and
             fragment("SIMILARITY(?,?) > 0", u.first_name, ^search_term)) or
            (ilike(u.last_name, ^start_character) and
               fragment("SIMILARITY(?,?) > 0", u.last_name, ^search_term))
        )

      Enum.member?(search_by, :first_name) ->
        dynamic(
          [u],
          ilike(u.first_name, ^start_character) and
            fragment("SIMILARITY(?,?) > 0", u.first_name, ^search_term)
        )

      Enum.member?(search_by, :last_name) ->
        dynamic(
          [u],
          ilike(u.last_name, ^start_character) and
            fragment("SIMILARITY(?,?) > 0", u.last_name, ^search_term)
        )
    end
  end

  # ordering by levenshtein distance. see: https://en.wikipedia.org/wiki/Levenshtein_distance
  defp handle_fuzzy_name_order_by(%{
         fuzzy_name: %{
           search_by: search_by,
           search_term: search_term
         }
       }) do
    cond do
      Enum.member?(search_by, :first_name) &&
          Enum.member?(search_by, :last_name) ->
        [
          asc:
            dynamic(
              [u],
              fragment(
                "LEVENSHTEIN(?,?)",
                fragment("CONCAT((?),' ',(?))", u.first_name, u.last_name),
                ^search_term
              )
            )
        ]

      Enum.member?(search_by, :first_name) ->
        [asc: dynamic([u], fragment("LEVENSHTEIN(?,?)", u.first_name, ^search_term))]

      Enum.member?(search_by, :last_name) ->
        [asc: dynamic([u], fragment("LEVENSHTEIN(?,?)", u.last_name, ^search_term))]
    end
  end
end
