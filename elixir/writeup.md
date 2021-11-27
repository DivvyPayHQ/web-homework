## Objectives Completed
- Fuzzy search for merchant name
- New schema, queries, and mutations for company
- Seeded database for all models including company
- Added pagination layer to all models including company
- Added mutations to handle decimal -> int and queries to handle int -> demical for transactions

## Objective Breakdown
 __Fuzzy Search__ - There were a few different options here. I just went for a basic *like* statement that will take the merchants name and find a like here. Something that I was looking into but didn't pursue was Postgres allows `Soundex`. If I had more time, I would have gone that route and made searching case insensitive.

 __Add Company__ - This was pretty straight forward. Add in boilderplate similar to how other models were and the associated migration that created table and tied transactions to companies. The hard part with this was updating a companies availiable credit on mutations. I started with using `Multi` but couldn't quite get the resolver to handle everything correctly so I opted for just updating company based on transaction then appropriate crud to transactions.

 __Seed DB__ - Created basic seed for models. Just looked up how Elixir seeds databases and followed syntax. Adding in Faker and `Enum.each(0..x, ..)` would dramatically improve scale and quality for seeding. 

 __Pagination Layer__ - By far the hardest and lenghty task. Breaking out pagination into a reusable state took a bit of patience. The hardest thing for me with this was getting `total_rows` to return into a dataset that absinthe would give back to graphql. I could talk about this one for a LONG time. I had to change the return structure to what made more sense to me: 
 ```
 query {
   model {
     items (limit?: 0, offset?: 0) {
       model.field
     }
     totalRows
   }
 }
```

__Decimal Transaction__ - This one was a bit rough for me. This was one of the first tasks I did early on. I wanted to allow the user to still input an integer but also allow a decimal. This is when I was figuring out guards, pattern matching, and unique functions. Not sure if I needed to do the harder decimal way but is just the way I started and finished with. Testing this is when I found the transaction bug where credit was never being cast and therefore not set.

__Miscellaneous__ - When running `mix ecto.setup`, would get an error when trying towards the end of the script. Stack trace and some info about bumping the appropriate dependency and why is in `randoms.md`.

## Summary
I spent a fair bit of time on this project, ~20-25 hours. The amount of time I spent was just understanding the technology and paradigms in it. Before starting this project, I had no experience with Elixir, Ecto, Abinsthe, GraphQL, and Pheonix and a lot of the time was just trying to find out what I don't know. 