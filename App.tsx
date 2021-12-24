import React, { useEffect } from 'react';
import {Dashboard} from './src/screens/Dashboard';
import {ThemeProvider} from 'styled-components';
import theme from './src/global/styles/theme';
import SplashScreen from 'react-native-splash-screen';
export default function App() {

  useEffect(() => {
    SplashScreen.hide();
  } , []);
  
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}
