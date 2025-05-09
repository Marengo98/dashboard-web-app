'use client';

import {
  createContext,
  useContext,
  useState,
  useMemo,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';

type SidebarContextType = {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export default function SidebarProvider({ children }: { children: ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const value = useMemo(
    () => ({ showSidebar, setShowSidebar }),
    [showSidebar]
  );

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarContextType {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
