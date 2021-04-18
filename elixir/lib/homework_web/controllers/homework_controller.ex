defmodule HomeworkWeb.HomeworkController do
    use HomeworkWeb, :controller 

    alias Homework.Users

    def index(conn, _params) do
        render conn, "index.html"
    end
  
  def user_search(conn, _params) do
      render conn, "user_search.html"
  end

  def userdata(conn, %{"name" => name} = params) do
        
      name = Homework.Users.get_user_by_name!(name)
      |> IO.inspect()
      |> render("userdata.html", name: name)
      #name = Users.get_user_by_name!(name)
      #|> IO.inspect()
      #changeset = Users.User.changeset(%Users.User{}, name)
      #data = struct(Homework.Users.User, name)
      #render conn, "userdata.html", userdata: name
  end


  def merchant_search(conn, _params) do
    render conn, "merchant_search.html"
  end

  def merchantdata(conn, %{"name" => name} = params) do
    name = Homework.Merchants.get_merchant_by_name!(name)
    |> IO.inspect()
    |> render("merchantdata.html", name: name)
  end

end 
