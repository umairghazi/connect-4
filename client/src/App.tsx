import "./app.css";
import { AppWrapper } from "./components/AppWrapper";
import { ColorModeProvider } from "./contexts/ColorModeContext";
import { AuthProvider } from "./contexts/AuthContext";

export const App = () => {
  return (
    <AuthProvider>
      <ColorModeProvider>
        <AppWrapper />
      </ColorModeProvider>
    </AuthProvider>
  );
};
