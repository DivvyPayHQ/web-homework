# Divvy Backend Homework Instructions

### Chad Jemmett Divvy Homework Project

Greetings Divvy Devs. 
I have completed the homework in the application process to a Backend Developer at Divvy.
This is a strong example of the work you can expect from me when I start at Divvy. You will give me a project, I will
read and understand the documentation. Then I will implement the feature. 
I work idependently, but I always know when to ask the right questions about the process. I enjoy collaboration and code
reviews.

Please review the following two projects.


The first is in this repository. It demonstrates my abilities in Elixir, Ecto and Phoenix.
The second is here: [It is a demonstration of my ability to write an api in Python]()https://github.com/ceejaay/transaction_tracker

Please visit my other repository to review my work as a current backend developer in Python.

### My work in this project. 
I made two accomplishments on this project.

1. I wrote a python script to seed the database.
2. I created the components of a new `Company` model.

The python script to seed the database is here: [Seed File](https://github.com/ceejaay/web-homework/blob/master/seed.py)
At first I researched how to seed the database with the existing `seed` file included in the Homework app. I found the
learning curve to be steep, so I accomplished the task with the tools I am most familiar with. So I used python and a
couple of libraries to seed the Postgres database.
You can read instructions to run the seed in the `seed.py` file.

For the `Company` model. I researched the Ecto documentation on their website. First I generated a context for the
Company model. I then manually created the relation among the `Company`, `User`, and `Transaction`

During the procject I solved a number of problems. The most complex of which was using the wrong setting for the UUID ID
number on the `Company` model. I solved the problem by setting the UUID to `:binary_id`. Through experimentation and
research I was able to sucessfully use the models and their functions on the command line.

I did complete several steps. There are a few things I am excited to ask you about in our future interview. 

Please contact me at your earliest convenience so we can talk about my work.


This repository provides a starting point for a basic React + GraphQL application.
All of the configuration boilerplate is complete so you can start by writing the code that you want us to see.

Please **fork** this repo to your GitHub account.

You do not need to complete the frontend assignments if you are planning to apply specifically for a backend role.

See the [README](https://github.com/DivvyPayHQ/web-homework/blob/master/elixir/README.md) for how to get elixir up and running. 

## Instructions

You do not have to complete all of these objectives, but do as many as you can without wasting your time.

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
