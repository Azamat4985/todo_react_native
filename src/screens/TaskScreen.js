import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { THEME } from "../theme/theme";
import { useDispatch, useSelector } from "react-redux";
import { changeTasks, editTodo, makeDone, removeTodo } from "../store/actions/todos";

const TaskScreen = ({ route, navigation }) => {
  const {itemId} = route.params;
  
  const todos = useSelector(state => state.todos.todos);
  const todo = todos.find(item => item.id == itemId)

  const dispatch = useDispatch();

  const TaskItem = ({ item, todo, index }) => {
    const [done, setDone] = useState(item.done);

    return (
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        {done ? (
          <Ionicons
            name="checkmark-circle"
            size={25}
            color={THEME.PRIMARY_COLOR}
            style={{ marginRight: 5 }}
            onPress={() => {
              setDone(false);
              dispatch(changeTasks({ id: todo.id, index: index, done: false }));
            }}
          />
        ) : (
          <TouchableOpacity
            style={{
              width: 25,
              height: 25,
              borderColor: "#000",
              borderRadius: 50,
              borderWidth: 1,
              opacity: 0.2,
              marginRight: 5,
            }}
            onPress={() => {
              setDone(true);
              dispatch(changeTasks({ id: todo.id, index: index, done: true }));
            }}
          ></TouchableOpacity>
        )}
        <Text style={{ fontSize: 16 }}>{item.title}</Text>
      </View>
    );
  };

  function getTime(time) {
    const d = new Date(time);
    const dd = [d.getHours(), d.getMinutes()].map((a) => (a < 10 ? "0" + a : a));
    return dd.join(":");
  }

  function deleteItem(){
    Alert.alert(
      'Удаление задачи',
      'Вы уверены что хотите удалить задачу?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => 
          {
            navigation.goBack();
            dispatch(removeTodo({id: todo.id}));
          },
          style: 'destructive',
        },
      ],
    );
  }

  function makeDoneFun() {
    if (todo.done) {
      dispatch(makeDone({ id: todo.id, done: false }));
    } else {
      dispatch(makeDone({ id: todo.id, done: true }));
    }
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
            paddingTop: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="chevron-back-circle-outline"
              size={30}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{todo.title}</Text>
          <View
            style={{ width: 20, height: 20, borderRadius: 5, backgroundColor: todo.color }}
          ></View>
        </View>

        <View style={styles.hr}></View>

        <Text style={styles.subtitle}>Описание: </Text>
        <Text style={styles.text}>
          {todo.description == "" ? "Описание отсутствует..." : todo.description}
        </Text>

        <Text style={styles.subtitle}>Задачи: </Text>

        <View style={{ marginBottom: 10 }}>
          {todo.tasks.map((item, index) => (
            <TaskItem
              item={item}
              key={index}
              index={index}
              todo={todo}
            />
          ))}
        </View>

        <Text style={styles.subtitle}>Время: </Text>
        <Text style={[styles.text, { marginBottom: 5 }]}>
          {new Date(todo.date).toLocaleDateString("ru")}
        </Text>
        <Text style={styles.text}>{getTime(todo.time)}</Text>
      </View>

      <View style={styles.btnBox}>
        <TouchableOpacity
          style={{
            borderColor: THEME.DISCARD_COLOR,
            borderWidth: 2,
            padding: 9,
            borderRadius: 10,
            marginRight: 10,
          }}
          activeOpacity={0.7}
          onPress={() => {
           deleteItem()
          }}
        >
          <Ionicons
            name="trash-bin"
            size={30}
            color={THEME.DISCARD_COLOR}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderColor: THEME.PRIMARY_COLOR,
            borderWidth: 2,
            padding: 9,
            borderRadius: 10,
            marginRight: 10,
          }}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("CreateTask", {
              todos: todos,
              isEdit: true,
              thisTodo: todo,
            });
          }}
        >
          <Ionicons
            name="create-outline"
            size={30}
            color={THEME.PRIMARY_COLOR}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: THEME.PRIMARY_COLOR,
            padding: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
          activeOpacity={0.7}
          onPress={() => {
            makeDoneFun();
          }}
        >
          <Text style={{ color: "#fff", fontWeight: 600, fontSize: 18, marginRight: 5 }}>
            {!todo.done ? "Завершить" : "Вернуть"}
          </Text>
          <Ionicons
            name={!todo.done ? "checkmark" : "refresh-outline"}
            size={30}
            color={"#fff"}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnBox: {
    position: "absolute",
    bottom: 40,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 600,
  },
  hr: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    opacity: 0.2,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
  },
  container: {
    padding: 20,
  },
});

export default TaskScreen;
