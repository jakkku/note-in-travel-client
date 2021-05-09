import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import MainScreen from "../screens/MainScreen";

const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="welcome">
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen name="main" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
