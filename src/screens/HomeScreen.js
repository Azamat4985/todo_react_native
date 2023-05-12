import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView, FlatList } from "react-native";
import { THEME } from "../theme/theme";
import { TouchableOpacity } from "react-native";
import TaskItem from "../components/TaskItem";
import CompletedTaskItem from "../components/CompletedTaskItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { loadTodos } from "../store/actions/todos";

const HomeScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [processTodos, setProcessTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function loadData() {
      // await AsyncStorage.clear()
      let asyncStorageItems = await AsyncStorage.getItem("todos");
      if (asyncStorageItems != null) {
        let parsedItems = JSON.parse(asyncStorageItems);
        if(parsedItems.todos)
        dispatch(loadTodos(JSON.parse(asyncStorageItems)));
      } else {
        dispatch(loadTodos([]));
      }
    }
    loadData().then(() => {
      setReady(true);
    });
  }, [dispatch]);

  let todos = useSelector((state) => state.todos.todos);

  useEffect(() => {
    if (todos) {
      let temp = todos.filter((item) => {
        return !item.done;
      });
      setProcessTodos(temp);
      let temp1 = todos.filter((item) => {
        return item.done;
      });
      setDoneTodos(temp1);
    }
  }, [todos]);

  function reverseProcessTodos() {
    let temp = processTodos.slice(0);
    return temp.reverse();
  }

  function reverseDoneTodos() {
    let temp = doneTodos.slice(0);
    return temp.reverse();
  }

  return (
    // <View></View>
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.BACKGROUND_COLOR }}>
      {!ready ? (
        <View></View>
      ) : (
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate("CalendarScreen");
              }}
            >
              <View style={styles.calendarWrapper}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={"#000"}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text style={styles.title}>
              Предстоящие задачи <Text style={{ opacity: 0.4 }}>({processTodos.length})</Text>{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("PendingTasks")}>
              <Text style={{ color: THEME.PRIMARY_COLOR }}>Все</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 30 }}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={reverseProcessTodos()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate("TaskScreen", {
                      itemId: item.id,
                    });
                  }}
                >
                  <TaskItem
                    todo={item}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text style={styles.title}>
              Выполнено <Text style={{ opacity: 0.4 }}>({doneTodos.length})</Text>{" "}
            </Text>
            <TouchableOpacity onPress={() => {navigation.navigate('DoneTasks')}}>
              <Text style={{ color: THEME.PRIMARY_COLOR }}>Все</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={reverseDoneTodos()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate("TaskScreen", {
                    itemId: item.id,
                  });
                }}
              >
                <CompletedTaskItem todo={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index}
          />

          <View style={styles.createBtnWrap}>
            <TouchableOpacity
              style={styles.createBtn}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate("CreateTask", {
                  todos: todos,
                  isEdit: false,
                });
              }}
            >
              <Text style={{ color: "#fff", fontWeight: 600, fontSize: 18 }}>+ Создать задачу</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  calendarWrapper: {
    width: 40,
    height: 40,
    borderColor: "#ECF1F8",
    borderWidth: 1,
    borderRadius: 50,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  createBtn: {
    width: "100%",
    paddingVertical: 20,
    backgroundColor: THEME.PRIMARY_COLOR,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
  },
  createBtnWrap: {
    position: "absolute",
    bottom: 20,
    left: 20,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  container: {
    padding: 20,
    paddingVertical: 40,
    flex: 1,
  },
  title: {
    fontWeight: 500,
    fontSize: 18,
  },
});

export default HomeScreen;
