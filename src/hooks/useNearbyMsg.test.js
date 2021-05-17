import React from "react";
import { create, act } from "react-test-renderer";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import UserScreen from "../screens/UserScreen";
import useNearbyMsg from "./useNearbyMsg";

const Stack = createStackNavigator();
const MockedNavigator = ({ component, params = {} }) => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="MockedScreen"
        component={component}
        initialParams={params}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

xdescribe(">>> HOOK --- USE NEARBY MSG", () => {
  const mockRegion = {
    latitude: 5,
    longitude: 5,
    latitudeDelta: 10,
    longitudeDelta: 10,
  };
  const mockMsgs = [
    {
      location: {
        latitude: 0.5,
        longitude: 0.5,
      },
    },
    {
      location: {
        latitude: 0.5,
        longitude: 0.5,
      },
    },
    {
      location: {
        latitude: 1.5,
        longitude: 1.5,
      },
    },
  ];

  function setup(...args) {
    const returnVal = {};

    function TestComponent() {
      Object.assign(returnVal, useNearbyMsg(...args));
      return null;
    }

    create(<MockedNavigator component={TestComponent} />);
    return returnVal;
  }

  it("+++ ", () => {
    const location1 = { latitude: 1.5, longitude: 1.5 };
    const location2 = { latitude: 2.5, longitude: 2.5 };
    let nearbyMsgData;

    act(() => {
      nearbyMsgData = setup(mockRegion, mockMsgs, location1);
    });

    expect(nearbyMsgData.nearbyMessages.length).toBe(3);
  });
});
