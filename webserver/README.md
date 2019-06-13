# Server Portion

## Setup

1. Install MongoDB (Community Edition)

2. Run `yarn` in /webserver (this directory)

3. Run `yarn start` in /webserver

You can also install **nodemon** globally for hot reloading

    sudo yarn add --global nodemon --prefix=/usr/local

To run this server application with **nodemon** run 

    nodemon ./bin/app


## What is this


A [node-express](https://expressjs.com/) application with [express-graphql](https://github.com/graphql/express-graphql) installed with a basic [GraphQL](https://graphql.org/) schema that is already hooked into [MongoDB](https://docs.mongodb.com/) through [Mongoose](https://mongoosejs.com/).  While this isn't a production ready application, it is an easy tool for rapid development.

The default port to connect to this webserver is `8000`.

If you would like to use GraphQL tools (eg Graphiql), the default graphql endpoint is `/graphql`.

The web path to Graphiql is `/graphql/graphiql`.


## So what

You should have a good starting point when beginning your Divvy homework assignment.


