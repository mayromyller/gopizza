import React from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import AppLoading from 'expo-app-loading'

import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans'
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display'

import { ThemeProvider } from 'styled-components/native'
import theme from '@src/global/theme'

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
