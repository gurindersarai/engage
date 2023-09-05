import React, { useEffect, useState } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import {colors} from '../styles/index.js';
const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
    const getThemeColors = (colorScheme) => {
        return colors[colorScheme];
      };
  const colorScheme = useColorScheme();
  const [themeColors, setThemeColors] = useState(getThemeColors(colorScheme));
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeColors(getThemeColors(colorScheme));
    });
    return () => {
      subscription.remove();
    };
  }, []);



  return (
      <ThemeContext.Provider value={themeColors}>
        {children}
      </ThemeContext.Provider>
  );
};

export {ThemeProvider,ThemeContext};
