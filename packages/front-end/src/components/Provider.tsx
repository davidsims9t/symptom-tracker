import { ReactNode, useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { useAuth } from "@clerk/clerk-react";

export default function Provider({
  children,
}: { children: ReactNode }) {
  const { getToken } = useAuth();

  const client = useMemo(() => {
    const authLink = setContext(async (_, { headers }) => {
      const token = await getToken();

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    });

    const httpLink = createHttpLink({
      uri: import.meta.env.VITE_GQL_API,
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, []);

  return (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  );
};