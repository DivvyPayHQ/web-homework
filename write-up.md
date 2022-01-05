# Write up

Please include a write up of what objectives you accomplished and how long it took you over all. This will be the chance to explain why you did what
you did, or why you didn't go down a path that you spent time on.

## Objectives

1. [x] Seed the database ([#1](#1)).
2. [x] Write filtering options for transactions, users, and/or merchants ([#2](#2)).
3. [x] Allow the mutations to handle a decimal amount for transactions (the database stores it as cents) ([#3](#3)).
4. [x] Write a new schema, queries, and mutations to add companies to the app ([#4](#4)).
5. [x] Write tests for the resolvers & mutations ([#5](#5)).
6. [ ] Add a pagination layer to the queries ([#6](#6)).
7. [x] Bonus ([#7](#7)).
   1. [x] Fix transaction bug.
   2. [ ] Fix the security issue.
   3. [x] Add/improve the docs and `@spec` to functions.

### Summaries

#### Overview

Since I felt like I owned this repository versus other assignments, I utilized GitHub issues and pull requests against the `develop` branch. I've
used Gitflow in the past so it felt like a relatively similar fit.

While this took longer than I expected, my approach was to cover the Elixir version first and cover the version in a language I'm familiar with later.
Given how long this took and how long it would've taken to get up to speed in converting just the boilerplate to Laravel, abandoning a PHP version seems
like a solid choice. I also took 10 days off over the holiday break as my schedule at home and work was a little overwhelming.

I'm a fan of this type of assignment because there's enough boilerplate to understand some direction while still having room to be unique. More than
one objective could benefit from further discussions so it feels more collaborative right out of the gate.

#### Seed the database

This was relatively straightforward though in the end I used the context `create_company` function to also populate the `available_credit` on create.
I made this choice much later in the lifecycle but I can see the benefit of using either that or `Repo.insert`.

#### Write filtering options

Researching lead me to the `fuzzystrmatch` Postgres extension and gotchas between the different algorithms. Assuming that Divvy had international
customers, `soundex` didn't seem like a good choice. It seems `Levenshtein` is expensive but there are techniques to mitigate that. I hadn't used
fragments in Ecto queries before and now that I have, I see how useful they can be. I'm also a huge fan of built-in keywords like `BETWEEN` over
`x >= min AND x <= max`.

#### Allow mutations to handle decimal amounts

I kept the conversions at the GraphQL layer due to the key word `mutations` though I could see benefit of having conversions happen in the context
functions. Context functions make a lot of sense when using multiple presentation layers like the web and a CLI but I'm a big fan of YAGNI. It took
waaaay too long to figure out I could use the default value as `default_value: Decimal.from_float(0.00)`. I'm not used to those type of declarations
in JSON-like syntax. I saw nothing substantial on Google so I possibly wasn't searching for the right terms.

#### Add Company entity

Much of this objective was relatively straightforward given the existing coverage of the other types. While the documentation didn't specifically
specify this, I added the `belongs_to` relationship for a transaction to a company as a foreign key. I can see where that value should be historical
if users can move between companies. For calculating the `available_credit`, I tackled that after merging as I left it for last and promptly forgot
to cover it.

My approach was to copy the `credit_line` field on creation to store our initial state. From there, an update to a `credit_line` would either grow
or shrink the `available_credit` based on the difference. This could be problematic as the approach allows for negative numbers but I would only
guard against that if the concept of overdrafts aren't allowed. To calculate the running `available_credit`, each transaction adjusts the value
based on the `amount` in the form of a credit (add) or debit (subtract). For transaction `amount` updates, we credit or debit the difference similar
to company updates. Instead of passing the `credit` or `debit` to do the addition or subtraction, we add either a positive or negative value
to accomplish the same thing.

This approach has numerous dragons but calculating a sum of transaction records gets problematic at the hundreds of thousands or millions of rows
level. Another approach could possibly be with database triggers or through background processes but just about everything may have to contend
with possible race conditions. I'd love to know how Divvy addresses this problem.

#### Write tests for resolvers and mutations

This took a minute to get started as someone incredibly new to Absinthe. I stumbled a little getting the `/api` route setup, though the REST client
Insomnia helped tremendously. I knew once I could make queries outside of GraphiQL that I had a great starting point for tests. These tests were
absolutely instrumental in uncovering a number of bugs I introduced. I'm also a fan of testing the full request and response over something like
`Absinthe.run/3` that would've possibly been equally sufficient. I try to make it a point to have similar integration testing when writing REST APIs,
so I felt right at home working on this.

#### Pagination

I skipped this for time but I intend to come back to it on my own later to get an understanding of how to leverage this with GraphQL. I have some
existing exposure to pagination techniques but nothing with Elixir specifically.

#### Bonus items

Fixing the transaction bug seemed simple enough when `mix test` complains loudly.

I couldn't quite pinpoint the security bug so I left that one alone. APIs like this likely should have both authentication or authorization
but when I see the words "fix the bug" I have to assume it's a problem with the boilerplate we start with. I thought that perhaps maybe it's that
transactions can `belong_to` a user when those values are more for historical purposes but will a transaction really move between users or merchants?

I think the generated docs are often sufficient but I went about tackling the GraphQL layer specifically, describing fields and unifying words and
capitalization. Breaks in consistency really stand out so it was nice to tighten that up a little bit. For the `@spec` declarations, I rely heavily
on the ElixirLS plugin for VSCode. There were quite a few specs it generated that needed to be altered but it was often a great starting point.

## Time Breakdown

1. 12/30/21 30m -> Fork project in private repository and get my bearings.
2. 12/30/21 1h -> Create issues with rudimentary research for fuzzy searching, Absinthe documentation and tutorial.
3. 12/30/21 1h 9:45pm - 10:45pm -> Database seeding and research on differing techniques.
4. 12/31/21 1h 1:30pm - 2:30pm -> Filtering options user name search
5. 12/31/21 30m 2:30pm - 3:00pm -> Filtering options merchant name search
6. 12/31/21 30m 3:00pm - 3:30pm -> Filtering options transaction amount search
7. 12/31/21 2.5h 3:45pm - 7:00pm -> Transactions in decimals, dinner, breaks and lots of research on figuring out the default_value problem.
8. 12/31/21 3h 9:00pm - 12:00am -> Transactions in decimals default_value completion.
9. 1/1/22 15m 3:45pm - 4:00pm -> Transaction in decimals merged.
10. 1/1/22 45m 4:15pm - 5:00pm -> Company entity scaffolding completed.
11. 1/1/22 2h 5:00pm - 8:00pm -> Company entity graphql layer completed with dinner.
12. 1/1/22 30m 8:00pm - 9:00pm -> Company entity relationships completed with putting the girls to bed.
13. 1/1/22 30m 9:00pm - 9:30pm -> Company entity merged.
14. 1/1/22 15m 10:15pm - 10:30pm -> Fix transaction bug.
15. 1/1/22 30m 11:00pm - 11:30pm -> Phoenix endpoint and router configured for `/api` endpoint for testing.
16. 1/2/22 1h 11:30pm - 11:45pm | 1:45am - 2:30am -> Merchants resolver testing: list, create, update, delete, and search.
17. 1/2/22 15m 4:45pm - 5:00pm -> Test resolvers and mutations for merchants complete.
18. 1/2/22 1.25h 5:00pm - 6:45pm -> Test resolvers and mutations for companies complete. Included decimal conversions. Break to feed Abigail.
19. 1/2/22 1h 6:45pm - 7:45pm -> Test resolvers and mutations for users complete. Fix bug where companyID wasn't in the user creation mutation.
20. 1/3/22 1h 12:30am - 1:30am -> Test resolvers and mutations for transactions complete.
21. 1/3/22 1.5h 1:00pm - 2:30pm -> Fix company available_credit company and transaction create and updated
22. 1/3/22 2.5h 5:00pm - 6:30pm | 9:15pm - 10:15pm -> Fix company available_credit update difference adjustments. Dinner, showering, putting the girls down takes place all around this time.
23. 1/4/22 30m 1:45am - 2:15am -> Fix company available_credit completed
24. 1/4/22 1.5h 2:45pm - 4:15pm -> Add/improve the docs and `@spec` to functions

Total: 25.25h
