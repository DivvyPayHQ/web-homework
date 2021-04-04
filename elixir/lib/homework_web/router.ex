defmodule HomeworkWeb.Router do
  use HomeworkWeb, :router


  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug(:accepts, ["json"])
    
  end

  scope "/" do
    pipe_through :browser

    forward("/graphiql", Absinthe.Plug.GraphiQL,
      schema: HomeworkWeb.Schema,
      interface: :simple,
      context: %{pubsub: HomeworkWeb.Endpoint}
    )

  end

  scope "/", HomeworkWeb do
    pipe_through :browser

    get "/homeworkweb", HomeworkController, :show
  end

  scope "/", HomeworkWeb do
    pipe_through :browser

    get "/", HomeworkController, :show
  end
end
