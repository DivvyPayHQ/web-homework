## Overview:
For this exercise I worked on the backend objects; creating new schemas, queries and mutations for a company. I then seeded the database with the elixir seeds.ex file, pushing myself to write new tests for resolvers and mutations. Lastly allowing the mutations to handle decimal amounts for transactions.

* Total time spent: 25 Hours
* 4 Objectives Complete
* 1 Bug found

## Approach
1. Read through objectives and code base.
2. Read up on Elixir, Phoenix, and Graphql.
3. Build a couple Elixir test applications.
4. Build out ER Diagram for the database.
5. Start work on objectives. 

## Write a new schema, queries, and mutations to add companies to the app
To start this change I ran the mix phx.gen.context command to give me some boiler plate code for the company's schema, queries, and mutations. Once that was created I matched how the schema, queries, and mutations were done for transactions.This ended up not being my only change. I figured out after building the ER diagram that I would need the users table to
have a foriegn key with a company_id. This would allow me to pull a user and what company they belong to. Lastly, I decided it would be best to update a company's available credit on the mutations. Doing this would allow the create_transaction function to have a single responsibility. 

## Seed the database.
For this objective I contemplated which file to use before beginning. I knew if I went the .sql file route that I could quickly get something working. However, I haven't used much elixir up until this point and felt like it'd be good to push myself to learn something new. In reflection I wish I would have done a few things differently. First, I think it would have been best if I completed the .sql file then worked on the seeds.ex file. This would have let me set a time limit on how long I worked on the seeds.ex file. I most likely could have worked on another objective or two if I went that route. Second, looking at the other files in the code base before deep diving into the seeds.ex file would have been helpful. I ended up finding my final solution by looking at how the foriegn ids were being done in the transaction_test file. I built out a working elixir seed file before this, but it was using build_assoc and put_assoc which became fairly unreadable. My final solution felt more reliable and scalable by using structs and passing ids from previous creations. In reflection I could have done this differently and perhaps better initially, but I wouldn't have gained the knowledge that I did If I went a different route.

![image](https://user-images.githubusercontent.com/46794273/144009695-f96aca92-d044-4fd8-81d8-928ffeb90e97.png)

## Write tests for the resolvers & mutations
I choose this objective to push myself since I don't do much TDD or tests in my program currently. However, I quickly saw the value in having them and writing them as you go. I learned this quickly as I didn't run the test on the first two objectives. This led me to have quite a few failing tests. If I had tested as I went it would have saved me time with debugging and refactoring. Once I cleaned up the failed tests, I started working on testing the resolvers. This was an easier test to write since it was similar to how the all records function was being tested in the data layer schema. The mutation piece did come with it's own challenges. Luckily the hex documentation for the resolvers and mutations allowed these tests to be written quickly. The only struggles that came with testing the mutations was passing in the proper schema and making sure the data being passed into the variables was in the correct order. In conclusion, I found testing in Phoenix to be very intuitive and easy to use.

## Allow the mutations to handle a decimal amount for transactions (the database stores it as cents)
This was the last objective I worked on and I felt like I was starting to get the hang of the lists and structs within elixir. However, I did run into a few snags when creating the function for converting Decimal to Integer and vice versa. The function I wrote initially seemed to work just fine but was messy and not readable. I figured there was probably a better way and a library that I could bring in. That is when I found the Money library and the hex documentation for what the Money module could do. This had simple conversion tools that allowed for cleaner and more readable code. I did struggle when listing the converted Integers to Decimal. The solution came when creating the tuple correctly and altering the amount. The enum.map function became helpful in this case because I needed to convert all amounts coming back from the list.  

## Find the bug with transactions
I found a bug in the transaction when running the transactions_test file. The failure came with the two structs being different, the right side on create_transacation was missing the credit column. After further investigation into the transaction schema in the data layer I found that we were not casting or validating the credit column. Once the column was added, all of the tests passed. 
