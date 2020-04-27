import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Linking } from "expo";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";

function Home({
  navigation,
}: {
  navigation: StackNavigationProp<RootStackParams, "Home">;
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

type RootStackParams = {
  Home: undefined;
  Details: { id: number };
};

function Details({
  navigation,
  route,
}: {
  navigation: StackNavigationProp<RootStackParams, "Details">;
  route: RouteProp<RootStackParams, "Details">;
}) {
  return (
    <View style={styles.container}>
      <Text>Details: {route.params.id}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator<RootStackParams>();

export default function App() {
  const linking = {
    prefixes: [Linking.makeUrl("/")],
  };

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading!</Text>}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
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
