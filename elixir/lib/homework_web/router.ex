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
    pipe_through :api

    forward("/graphiql", Absinthe.Plug.GraphiQL,
      schema: HomeworkWeb.Schema,
      interface: :simple,
      context: %{pubsub: HomeworkWeb.Endpoint}
    )
  end

  scope "/", HomeworkWeb do
    pipe_through :browser

    get "/", HomeworkController, :index
    get "/index", HomeworkController, :index
    get "/user_search", HomeworkController, :user_search
    get "/userdata", HomeworkController, :userdata
    get "/merchant_search", HomeworkController, :merchant_search
    get "/merchantdata", HomeworkController, :merchantdata
    
  end


  
end
