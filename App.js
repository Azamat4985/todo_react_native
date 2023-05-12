import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import CreateTaskScreen from "./src/screens/CreateTaskScreen";
import TaskScreen from "./src/screens/TaskScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import { Provider } from "react-redux";
import store from "./src/store";
import PendingTasksScreen from "./src/screens/PendingTasksScreen";
import DoneTasksScreen from './src/screens/DoneTasksScreen'

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="CreateTask"
            component={CreateTaskScreen}
          />
          <Stack.Screen
            name="TaskScreen"
            component={TaskScreen}
          />
          <Stack.Screen
            name="CalendarScreen"
            component={CalendarScreen}
          />
          <Stack.Screen name="PendingTasks" component={PendingTasksScreen} />
          <Stack.Screen name="DoneTasks" component={DoneTasksScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
