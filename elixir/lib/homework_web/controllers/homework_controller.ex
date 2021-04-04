defmodule HomeworkWeb.HomeworkController do
    use HomeworkWeb, :controller
  
    def show(conn, _params) do
      text(conn, "Divvy homework page for Chris Simons.")
    end
  end