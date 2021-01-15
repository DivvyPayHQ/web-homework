# Server Portion

## Setup

1. Install MongoDB (Community Edition)

2. Run `yarn` in /webserver (this directory)

3. Run `yarn start` in /webserver

You can also install **nodemon** globally for hot reloading

    sudo yarn global add nodemon --prefix=/usr/local

To run this server application with **nodemon** run 

    nodemon ./bin/app


## What is this


A 
[node-express](https://expressjs.com/) application with 
[express-graphql](https://github.com/graphql/express-graphql) installed with a basic 
[GraphQL](https://graphql.org/) schema that is already hooked into 
[MongoDB](https://docs.mongodb.com/) through 
[Mongoose](https://mongoosejs.com/).

While this isn't a production ready application, it is an easy tool for this assignment.

* Default port `8000`
* GraphQL endpoint: `/graphql`
* Graphiql: `/graphql/graphiql`


<br />

This is good starting point to begin your Divvy homework assignment.


