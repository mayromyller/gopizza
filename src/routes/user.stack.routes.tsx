import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home, Product } from '@screens/exports'

const { Navigator, Screen } = createNativeStackNavigator()

export function UserStackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="product" component={Product} />
    </Navigator>
  )
}
