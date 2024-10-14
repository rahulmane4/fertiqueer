 // ThemeContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

// Define the structure of the theme
interface Theme {
  dark: boolean;
  
  colors: {
    background: string;
    text: string;
  };
  statusBarStyle: string,
}

// Define the structure of the context value
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => Promise<void>;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightTheme: Theme = {
  dark: false,
  colors: {
    background: '#F5FCFF',
    text: 'red',
  },

  statusBarStyle: 'dark-content',
};

const darkTheme: Theme = {
  dark: true,
  statusBarStyle: 'light-content',
  colors: {
    background: '#000000',
    text: '#ffffff',
  },
 
};

// Define the props for the ThemeProvider
interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme === 'dark' ? darkTheme : lightTheme);
      } else {
        const systemTheme = Appearance.getColorScheme();
console.log(systemTheme); // 'light' or 'dark'
        setTheme(systemTheme === 'dark' ? darkTheme : lightTheme);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme.dark ? lightTheme : darkTheme;
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme.dark ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
