import { createBrowserHistory } from "history"

import { AuthWrapper, ApolloWrapper, AppWrapper } from './components';
import { ColorModeProvider } from "./contexts";

import './global.css';

const history = createBrowserHistory()

export const App = () => {
  return (
    <AuthWrapper history={history}>
      <ApolloWrapper>
        <ColorModeProvider>
          <AppWrapper />
        </ColorModeProvider>
      </ApolloWrapper>
    </AuthWrapper>
  );
}

