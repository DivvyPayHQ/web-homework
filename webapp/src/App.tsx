import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import AppRouter from "./routes";
import { AppContext, LangEnum } from "./AppContext";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  headers: {
    "client-name": "Divvy HW [web]",
  },
  uri: "http://localhost:3000/graphql",
});

function App(): JSX.Element {
  const [lang, setLang] = React.useState<LangEnum>(LangEnum.English);

  return (
    <ApolloProvider client={client}>
      <AppContext.Provider
        value={{
          lang: lang,
          setLang: setLang,
        }}>
        <div>
          <button
            onClick={() => {
              if (lang === LangEnum.English) {
                setLang(LangEnum.Spanish);
              } else {
                setLang(LangEnum.English);
              }
            }}>
            {lang === LangEnum.English ? LangEnum.Spanish : LangEnum.English}
          </button>
        </div>
        <AppRouter />
      </AppContext.Provider>
    </ApolloProvider>
  );
}

export default App;
