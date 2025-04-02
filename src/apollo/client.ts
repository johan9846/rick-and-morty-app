import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { allCharacterVar, filterVar } from "./reactiveVars"; // Importa las variables reactivas

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allCharacterVar: {
          read() {
            return allCharacterVar();
          },
        },
        filterVar: {
          read() {
            return filterVar();
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  connectToDevTools: true,
  cache,
  link: new HttpLink({
    uri: import.meta.env.VITE_URL_RICK_AND_MORTY,
  }),
});
