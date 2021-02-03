defmodule HomeworkWeb.Router do
  use HomeworkWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])

    plug(CORSPlug,
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    )
  end

  scope "/" do
    pipe_through(:api)

    # not sure if this is the best way to do it, but I keep graphiql out of prod
    if "#{Mix.env}" === "dev" do
      forward("/graphiql", Absinthe.Plug.GraphiQL,
        schema: HomeworkWeb.Schema,
        interface: :simple,
        context: %{pubsub: HomeworkWeb.Endpoint}
      )
    end

    forward("/graphql", Absinthe.Plug,
      schema: HomeworkWeb.Schema,
      interface: :simple,
      context: %{pubsub: HomeworkWeb.Endpoint}
    )

  end
end
