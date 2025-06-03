import { createContext, useMemo, useState } from "react";

interface IColorModeContext {
  colorMode: 'light' | 'dark'
  setColorMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}

export const ColorModeContext = createContext({} as IColorModeContext);

export const ColorModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  const value = useMemo(() => ({ colorMode, setColorMode }), [colorMode, setColorMode]);

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  )
}