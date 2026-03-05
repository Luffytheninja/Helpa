import { createContext, type ReactNode, useState, useEffect, useContext } from 'react';

type Theme = 'light' | 'dark' | 'system';
type Role = 'customer' | 'helper' | null;
type AuthState = 'splash' | 'phone' | 'otp' | 'setup' | 'onboard-customer' | 'onboard-helper' | 'app';

interface AppContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  isDark: boolean;

  authState: AuthState;
  setAuthState: (s: AuthState) => void;

  role: Role;
  setRole: (r: Role) => void;

  activeMode: 'hire' | 'earn';
  setActiveMode: (m: 'hire' | 'earn') => void;

  userName: string;
  setUserName: (n: string) => void;

  onlineStatus: boolean;
  setOnlineStatus: (v: boolean) => void;

  notifCount: number;

  // greeting
  greeting: string;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('helpa-theme') as Theme | null;
    return saved ?? 'light';
  });
  const [isDark, setIsDark] = useState(false);
  const [authState, setAuthState] = useState<AuthState>('splash');
  const [role, setRole] = useState<Role>(null);
  const [activeMode, setActiveMode] = useState<'hire' | 'earn'>('hire');
  const [userName, setUserName] = useState('Ayomide');
  const [onlineStatus, setOnlineStatus] = useState(true);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' :
    hour < 17 ? 'Good afternoon' :
    'Good evening';

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('helpa-theme', t);
  };

  useEffect(() => {
    const applyDark = (dark: boolean) => {
      setIsDark(dark);
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    };

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      applyDark(mq.matches);
      const handler = (e: MediaQueryListEvent) => applyDark(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    } else {
      applyDark(theme === 'dark');
    }
  }, [theme]);

  return (
    <AppContext.Provider value={{
      theme, setTheme, isDark,
      authState, setAuthState,
      role, setRole,
      activeMode, setActiveMode,
      userName, setUserName,
      onlineStatus, setOnlineStatus,
      notifCount: 3,
      greeting,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
