import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabBar from "../components/TabBar";
import HomeScreen from "../screens/HomeScreen";
import UserScreen from "../screens/UserScreen";

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      tabBar={(navigation) => <TabBar navigation={navigation} />}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="user" component={UserScreen} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
