### Postgrex stack trace ### 
Problem breakdown [here](https://elixirforum.com/t/undefinedfunctionerror-function-crypto-hmac-3-is-undefined-or-private/40060/7)
```
18:06:33.290 [error] GenServer #PID<0.2371.0> terminating
** (UndefinedFunctionError) function :crypto.hmac/3 is undefined or private
    (crypto 5.0.4) :crypto.hmac(:sha256, "postgres", <<169, 250, 82, 54, 62, 64, 252, 63, 125, 105, 190, 24, 182, 237, 106, 138, 0, 0, 0, 1>>)
    (postgrex 0.15.5) lib/postgrex/scram.ex:52: Postgrex.SCRAM.hash_password/6
    (postgrex 0.15.5) lib/postgrex/scram.ex:26: Postgrex.SCRAM.verify/2
    (postgrex 0.15.5) lib/postgrex/protocol.ex:734: Postgrex.Protocol.auth_cont/4
    (postgrex 0.15.5) lib/postgrex/protocol.ex:579: Postgrex.Protocol.handshake/2
    (db_connection 2.2.2) lib/db_connection/connection.ex:69: DBConnection.Connection.connect/2
    (connection 1.0.4) lib/connection.ex:622: Connection.enter_connect/5
    (stdlib 3.16.1) proc_lib.erl:226: :proc_lib.init_p_do_apply/3
Last message: nil
State: Postgrex.Protocol
** (Mix) The database for Homework.Repo couldn't be created: killed

```

Solution was to update Postgrex to a newer version that used `plug_crypt` version >= `1.1.2` (:crypto.hmac/3 compat. issue w/ OTP v24) <br/>

Command to fix was:
```
mix deps.update postgrex
``` 

But I think forcing a newer version that supported it would fix it right out of the box on setup.
