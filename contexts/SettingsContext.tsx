import React, { createContext, useContext, useEffect, useState } from 'react';

export type CardSize = 'sm' | 'md' | 'lg' | 'xl';

interface SettingsContextValue {
  cardSize: CardSize;
  setCardSize: (size: CardSize) => void;
}

const LOCAL_KEY = 'modernnav:cardSize';

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cardSize, setCardSizeState] = useState<CardSize>('lg');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (raw) {
        const parsed = raw as CardSize;
        setCardSizeState(parsed);
      }
    } catch (e) {
      // ignore storage errors
    }
  }, []);

  const setCardSize = (size: CardSize) => {
    setCardSizeState(size);
    try {
      localStorage.setItem(LOCAL_KEY, size);
    } catch (e) {
      // ignore
    }
  };

  return (
    <SettingsContext.Provider value={{ cardSize, setCardSize }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextValue => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return ctx;
};
