import React, { createContext, useContext, useRef, ReactNode } from 'react';
import { SushiSnackbarHostState } from 'design-system';

interface SnackbarContextType {
  snackbarHostState: SushiSnackbarHostState;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within SnackbarProvider');
  }
  return context.snackbarHostState;
};

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const snackbarHostStateRef = useRef(new SushiSnackbarHostState());

  return (
    <SnackbarContext.Provider value={{ snackbarHostState: snackbarHostStateRef.current }}>
      {children}
    </SnackbarContext.Provider>
  );
};
