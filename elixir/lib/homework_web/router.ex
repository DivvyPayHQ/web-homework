defmodule HomeworkWeb.Router do
  use HomeworkWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/graphql" do
    forward("/", Absinthe.Plug,
      schema: HomeworkWeb.Schema,
      interface: :simple,
      context: %{pubsub: HomeworkWeb.Endpoint}
    )
  end

  scope "/" do
    pipe_through(:api)

    forward("/graphiql", Absinthe.Plug.GraphiQL,
      schema: HomeworkWeb.Schema,
      interface: :simple,
      context: %{pubsub: HomeworkWeb.Endpoint}
    )
  end
end
