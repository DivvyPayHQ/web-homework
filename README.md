# Divvy Homework Assignment

### Chad Jemmett's Divvy Homework Project -- Updated Jan 9, 2022

To Divvy Devs,
Thank you for your feedback on my homework project. Kris Rickard sent me the feedback you gave on my work. I've copied
the pros and cons list here for your convenience.
To reiterate, this is the kind of work you can expect from me as a memeber of the Divvy team. I welcome feedback. I
research my mistakes and upate my work in a timely manner. I enjoy collaboration and being part of a team. I look
forward to doing an in-person code review with the Divvy Team.

> Pros:
> Company addition is clean and tests look good
> Seeds file is really robust… but it’s in python
> Cons:
> Definitely signs of a mid-level. Replaced default database creds instead of using system env, wrote a python seeds file instead of using elixir because it was more familiar.
> Questions:
> What is the risk/reward of adding python to an elixir project?
> How will you plan to learn elixir?

The following are my corrections listed under CONS.

I've written a [seed file in Elixir here.](https://github.com/ceejaay/web-homework/blob/master/elixir/priv/repo/seeds.exs)
This is written entirely in Elixir. I enumerate over a range of integers and lists of items retreived from the database
to insert Companies, Users, Merchants and Transactions into the database. I used the Faker module to write dummy data.

I solved the problem of altering the default database credentials. I did research on Elixir's `System` module. I
set my PostgreSQL username in my `.zshrc` file. It solved the problem and I restored the default variables in the
[config/dev.exs](https://github.com/ceejaay/web-homework/blob/master/elixir/config/dev.exs) and the [prod.secret.exs](https://github.com/ceejaay/web-homework/blob/master/elixir/config/prod.secret.exs) files.


### Answers to Questions

#### What is the risk/reward of adding Python to an Elixir project?

I would say the risks outweigh the rewards when adding Python to an Elixir application. I currently work on a Python and Django project with several apps. It’s beneficial to my team and I that we only have one language to manage when doing the majority of our work. Only a very serious problem would cause me to consider adding another language. And the solution to that problem would be something that *only* a new language could solve. I would first attempt to solve the problem using Python. If that didn’t work, I’d consider something else.


I think the most frustrating risk of adding Python to an Elixir app would be a workflow problem. I personally dislike stopping my work in Python and moving to another language in my process. It’s more efficient to stay working in one language and its related framework.


    
As far as rewards, any script or app written in Python would be easy to get up and running. For a short-term solution to a problem, Python is a good choice. Right now, [Python is the second most popular language on Github.](https://madnight.github.io/githut/#/pull_requests/2021/4) Many experienced developers would easily find the right Python library to solve the problem. You may not even need extra libraries. Python has many options right out of the box. And the popularity of Python means any future developer wouldn’t need much to write new features for the app.


Overall, It wouldn’t be my first choice to add Python to an Elixir app. But if I had to, Python wouldn’t be a bad choice.

#### How will you plan to learn Elixir?

This bit of pseudo-code illustrates my learning process.
```
while elixir_expert == False:
    study_elixir_topic()
    apply_knowledge_to_simple_project()
    ask_for_feedback_from_experienced_devs()

```

I’ve already started the feedback process. I’ve taken a Udemy course on Elixir. It’s a bit dated but I learned the
basics of the language. The tutorial builds two small programs. [The first is a basic program to shuffle and deal a
deck of cards.](https://github.com/ceejaay/elixir_card_shuffler) The second is far more interesting and fun. [It’s a script that generates identicon images.](https://github.com/ceejaay/elixir_project) Identicons are those random geometric images you see as profile pictures on some websites. 

As for questions and feedback. I’ve asked some questions in the Discord Elixir channel. The people there are very helpful. I look forward to working on the Divvy team and getting feedback from experienced developers.

Part of my strategy is looking for interesting problem when building a simple project.I really enjoyed the problems presented in writing the `seed.exs` file for the homework. I understood the basics of creating and inserting an item into the database. But I needed a lot of research on how to handle the relationships and inserting a large amount of data. 

This process has resulted in success for me. Doing hobby projects in Ruby laid the foundation for the work I would do in my bootcamp, and that success brought me to my current job. You’ll see that this process will make me an excellent addition to the Divvy team.


# Below is my original homework project you gave feedback on.


The first is in this repository. It demonstrates my abilities in Elixir, Ecto and Phoenix.
The second is here: [It is a demonstration of my ability to write an api in
Python.](https://github.com/ceejaay/transaction_tracker)

Please visit my other repository to review the project. It is an example of the kind of work I do at my current job.

### My work in this Elixir project. 
I made two accomplishments on this project.

1. I wrote a python script to seed the database.
2. I created the components of a new `Company` model.

The python script to seed the database is here: [Seed File.](https://github.com/ceejaay/web-homework/blob/master/seed.py)
At first I researched how to seed the database with the existing `seed` file included in the Homework app. I found the
learning curve to be steep, so I accomplished the task with the tools I am most familiar with. I used python and a
couple of libraries to seed the Postgres database.
You can read instructions to run the seed in the `seed.py` file.

For the `Company` model. I researched the Ecto documentation on their website. First I generated a context for the
Company model. I then manually created the relation among the `Company`, `User`, and `Transaction`.
I created the shchema and resolvers for the model.

Thank you for your consideration. I look forward to your feedback on my work in our future interview. 
Please contact me at your earliest convenience so we can talk about my work.

- Chad Jemmett
chad.jemmett@gmail.com
208-305-0359


*************************************************************************************************
This repository provides a starting point for a basic React + GraphQL application.
All of the configuration boilerplate is complete so you can start by writing the code that you want us to see.

Please **fork** this repo a **private repo** on your GitHub account.

Please share your finished project repo with @thawk55 and @jakerichan as part of your submission.

<br />


## Project Setup

This repository is split into a web app directory (eg `/webapp`) and two server directories (eg `/webserver` and `/elixir`).

The `/webserver` one includes a functional GraphQL server in NodeJS with MongoDB backing it.

The `/elixir` one includes a functional GraphQL server in Elixir with Postgresql backing it.

If you are applying for backend, you should use the elixir code.
If you are applying for frontend, feel free to use either.

This project is _intentionally not utilizing 3rd party services or create-react-app_ to give you the opportunity to showcase your talents wherever they are, be it the front end or the back end.

## Instructions

If you are pursuing a full stack or backend position, please include elixir code changes in your homework.

See the [Frontend instructions](webapp/README.md) for frontend focused instructions.  If front end only, use the node server in `/webserver`.

See the [Backend instructions](backend.md) for backend focused instructions.



