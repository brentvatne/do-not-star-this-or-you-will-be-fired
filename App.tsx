import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Linking } from "expo";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";

const Tabs = createBottomTabNavigator();

function RootTabs() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="HomeTab" component={HomeStack} />
      <Tabs.Screen name="SettingsTab" component={HomeStack} />
    </Tabs.Navigator>
  );
}

const Stack = createStackNavigator<HomeStackParams>();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

export default function App() {
  const linking = {
    prefixes: [Linking.makeUrl("/")],
    config: {
      HomeTab: {
        initialRouteName: "Home",
        screens: {
          Home: "home",
          Details: {
            path: "home/:id",
            parse: {
              id: Number,
            },
          },
        },
      },
      SettingsTab: {
        initialRouteName: "Home",
        screens: {
          Home: "settings",
          Details: {
            path: "settings/:id",
            parse: {
              id: Number,
            },
          },
        },
      },
    },
  };

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading!</Text>}>
      <RootTabs />
    </NavigationContainer>
  );
}

function Home({
  navigation,
}: {
  navigation: StackNavigationProp<HomeStackParams, "Home">;
}) {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="Go to details"
        onPress={() => navigation.navigate("Details", { id: 5 })}
      />
    </View>
  );
}

type HomeStackParams = {
  Home: undefined;
  Details: { id: number };
};

function Details({
  navigation,
  route,
}: {
  navigation: StackNavigationProp<HomeStackParams, "Details">;
  route: RouteProp<HomeStackParams, "Details">;
}) {
  return (
    <View style={styles.container}>
      <Text>Details: {route.params.id}</Text>
      {navigation.canGoBack() ? (
        <Button title="Go back" onPress={() => navigation.goBack()} />
      ) : (
        <Button title="Go home" onPress={() => navigation.replace("Home")} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
