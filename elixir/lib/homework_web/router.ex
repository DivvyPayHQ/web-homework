defmodule HomeworkWeb.Router do

  use HomeworkWeb, :router


  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/api/" do
    pipe_through(:api)
    resources "/price", HomeworkWeb.PricesController, except: [:edit]

    forward("/graphiql", Absinthe.Plug.GraphiQL,
      schema: HomeworkWeb.Schema,
      interface: :simple,
      context: %{pubsub: HomeworkWeb.Endpoint}
    )
  end
end
