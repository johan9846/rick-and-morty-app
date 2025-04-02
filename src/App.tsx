import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";
import RouterApp from "./router/RouterApp";

function App() {
  return (
    <ApolloProvider client={client}>
     <RouterApp/>
    </ApolloProvider>
  );
}

export default App;
