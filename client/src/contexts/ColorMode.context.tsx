import { createContext, useState } from "react";

interface IColorModeContext {
  colorMode: 'light' | 'dark'
  setColorMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}

export const ColorModeContext = createContext({} as IColorModeContext);

export const ColorModeProvider = ({ children }: any) => {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  return (
    <ColorModeContext.Provider value={{colorMode, setColorMode}}>
      {children}
    </ColorModeContext.Provider>
  )
}