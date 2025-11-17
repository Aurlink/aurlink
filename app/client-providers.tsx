// app/client-providers.tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{}}>
      {children}
    </ThemeContext.Provider>
  );
}