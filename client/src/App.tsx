import { ApolloProvider } from "@apollo/client";

import { AppWrapper } from './components';
import { ColorModeProvider, LocalAuthProvider } from "./contexts";
import { client } from "./utils/Apollo";

import './global.css';

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <LocalAuthProvider>
        <ColorModeProvider>
          <AppWrapper />
        </ColorModeProvider>
      </LocalAuthProvider>
    </ApolloProvider>
  );
}

