# My Notes

To seed the database, install migrate-mongo
```
npm install -g migrate-mongo
```

Make sure your mongo DB is running.

Then, in the migrations folder in the project, run
```
migrate-mongo up 
```

I worked on the [Frontend instructions](webapp/README.md) and edited the node server.

# Divvy Homework Assignment

This repository provides a starting point for a basic React + GraphQL application.
All of the configuration boilerplate is complete so you can start by writing the code that you want us to see.

Please **fork** this repo to your GitHub account.


## Project Setup

This repository is split into a web app directory (eg `/webapp`) and two server directories (eg `/webserver` and `/elixir`).

The `/webserver` one includes a functional GraphQL server in NodeJS with MongoDB backing it.

The `/elixir` one includes a functional GraphQL server in Elixir with Postgresql backing it.

If you are applying for backend, you should use the elixir code.
If you are applying for frontend, feel free to use either.

This project is intentionally not utilizing 3rd party services or create-react-app to give you the opportunity to showcase your talents wherever they are, be it the front end or the back end.

**Node** version **12** is the safest NodeJS release to use.  You can try version 14, but there can be node-gyp/python issues on OSX.

## Instructions

See the [Frontend instructions](webapp/README.md) for frontend focused instructions.  If front end only, use the node server in `/webserver`.

See the [Backend instructions](backend.md) for backend focused instructions.


