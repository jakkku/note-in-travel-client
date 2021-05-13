import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabBar from "../components/TabBar";
import HomeScreen from "../screens/HomeScreen";
import UserScreen from "../screens/UserScreen";
import CourseDetailScreen from "../screens/CourseDetailScreen";

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      tabBar={(navigation) => <TabBar navigation={navigation} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="User" component={UserScreen} />
      <Tab.Screen name="CourseDetail" component={CourseDetailScreen} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
