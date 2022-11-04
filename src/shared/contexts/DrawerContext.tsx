import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
}

const DrawerContext = createContext({} as IDrawerContextData)

export const useDrawerContext = () => {
  return useContext(DrawerContext);
}

interface IDrawerProvider {
  children: React.ReactNode
}

export const DrawerProvider: React.FC<IDrawerProvider> = ({ children }) => {
  const [isDrowerOpen, setIsDrowerOpen] = useState<boolean>(false);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrowerOpen(oldDrowerOpen => !oldDrowerOpen)
  }, [])

  return (
    <DrawerContext.Provider value={{isDrawerOpen: isDrowerOpen, toggleDrawerOpen }}>
      { children }
    </DrawerContext.Provider>
  )
}