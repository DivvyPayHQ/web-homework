# Divvy Backend Homework Instructions

This repository provides a starting point for a basic React + GraphQL application.
All of the configuration boilerplate is complete so you can start by writing the code that you want us to see.

Please **fork** this repo to your GitHub account.

You do not need to complete the frontend assignments if you are planning to apply specifically for a backend role.

## Instructions

You do not have to complete all of these objectives, but do as many as you can without wasting your time.

The completed homework assignment must have a usable interface that loads dynamically and is interactive.

For **senior engineers**, complete enough of the project to demonstrate your abilities as a senior.  This should be more than 3 objectives.  You can modify anything you need to with this project, so kick the tires and show us what you can do.

For **mid-level engineers**, complete any 3 objectives.

For **junior engineers** complete any 1 of these objectives and include a basic test or two.  These tasks are possible with limited or no prior knowledge of Elixir within a very short amount of time.

## Objectives

 * Write filtering options for transactions, users, and/or merchants. This could include:
   * fuzzy searching for a user by first and last name
   * fuzzy searching for a merchant by name
   * getting back transactions with an amount between `min` and `max` arguments

 * Write a new schema, queries, and mutations to add companies to the app
   * users should belong to a company and we should require transactions to pass in a company_id
   * company should have a `name`, `credit_line`, and `available_credit` which would be the `credit_line` minus the total amount of `transactions` for the company

 * Seed the database.  Possible solutions include:
   * Implement provided `seeds.ex` file
   * Write a `.sql` file that can be ingested by the database

 * Write tests for the resolvers & mutations.
   * Testing that you can get information from the resolver queries
   * Testing that you can get create/update/delete from the resolver mutations

 * Add a pagination layer to the queries
   * should include a `limit` (how many rows to return) and `skip` (how many rows to skip) options
   * should return a `total_rows` (how many total rows exist)
   * Bonus: Make it a wrapper that all the schemas can tap into.

 * Allow the mutations to handle a decimal amount for transactions (the database stores it as cents)
   * Mutations need to convert the Decimal amount to an Integer e.g. 24.68 becomes 2468
   * The queries should convert the Integer amount to a Decimal e.g. 2468 becomes 24.68

## Bonus points
 * Find the bug with transactions
 * Find the security issue
 * Add/improve the docs and @spec to functions
