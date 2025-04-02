import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { characterVar, filterVar } from "./reactiveVars"; // Importa las variables reactivas

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        characterVar: {
          read() {
            return characterVar();
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
