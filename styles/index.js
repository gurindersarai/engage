// DesignSystem.js

import React from 'react';

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
const button = {
 primary:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
 }
};

const commonColors = {
    white: '#ffffff',
    black: '#000000',
    black8: '#0d0400',
    darkGreen: '#002c41',
    primarymain:'#2938ae',
    primary:'#4454d0',
    secondary:'#461c94',
    secondarySec:'#919aa7',
}
const colors = {
  light: {
    current:'light',
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    error: '#dc3545',
    background: commonColors.white,
    text: commonColors.black,
    // Additional light theme colors...
  },
  dark: {
    current:'dark',
    primary: '#90caf9',
    secondary: '#bdbdbd',
    success: '#a5d6a7',
    error: '#ef9a9a',
    white: '#ffffff',
    black: '#000000',
    background: commonColors.black8,
    text: commonColors.white,
   
    // Additional dark theme colors...
  },
};

const typography = {
  fontFamily: {
    regular: 'Roboto-Regular',
    bold: 'Roboto-Bold',
    // Additional font families...
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    // Additional font sizes...
  },
  fontWeight: {
    regular: '400',
    bold: '700',
    // Additional font weights...
  },
};

export { spacing, colors, typography,button,commonColors };
