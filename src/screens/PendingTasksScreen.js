import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import TaskItem from "../components/TaskItem";

const timeToString = (time) => {
  const date = new Date(time);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  switch (month) {
    case 1:
      month = "Январь";
      break;
    case 2:
      month = "Февраль";
      break;
    case 3:
      month = "Март";
      break;
    case 4:
      month = "Апрель";
      break;
    case 5:
      month = "Май";
      break;
    case 6:
      month = "Июнь";
      break;
    case 7:
      month = "Июль";
      break;
    case 8:
      month = "Август";
      break;
    case 9:
      month = "Сентябрь";
      break;
    case 10:
      month = "Октябрь";
      break;
    case 11:
      month = "Ноябрь";
      break;
    case 12:
      month = "Декабрь";
      break;

    default:
      break;
  }
  let weekDay = date.getDay();
  switch (weekDay) {
    case 0:
      weekDay = "Воскресенье";
      break;
    case 1:
      weekDay = "Понедельник";
      break;
    case 2:
      weekDay = "Вторник";
      break;
    case 3:
      weekDay = "Среда";
      break;
    case 4:
      weekDay = "Четверг";
      break;
    case 5:
      weekDay = "Пятница";
      break;
    case 6:
      weekDay = "Суббота";
      break;

    default:
      break;
  }

  let dateString = `${weekDay}, ${day} ${month} ${date.getFullYear()}`;

  return dateString;
};

const PendingTasksScreen = ({ navigation }) => {
  let todos = useSelector((state) => state.todos.todos);
  todos = todos.filter(item => item.done == false)
  
  const [dates, setDates] = useState([]);

  useEffect(() => {
    let temp = [];
    for (const item of todos) {
      if (!temp.includes(timeToString(item.date))) {
        temp.push(timeToString(item.date));
      }
    }

    setDates(temp);
  }, []);

  useEffect(() => {
    console.log(dates);
  }, [dates]);

  const Item = ({ item }) => {
    const [todosThisDay, setTodosThisDay] = useState([]);

    useEffect(() => {
      const todosToSort = todos.slice(0);
      todosToSort.sort((a, b) => new Date(b) - new Date(a));

      const temp = todosToSort.filter((i) => {
        if (timeToString(i.date) == item) {
          return i;
        }
      });
      setTodosThisDay(temp);
    }, []);

    return (
      <View>
        <Text style={{ marginBottom: 20, fontSize: 20, fontWeight: 600, opacity: 0.7 }}>
          {item}
        </Text>
        <FlatList
          data={todosThisDay}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate("TaskScreen", {
                  itemId: item.id,
                });
              }}
            >
              <TaskItem todo={item} />
            </TouchableOpacity>
          )}
          keyExtractor={({ item, index }) => index}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
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
          <Text style={styles.title}>Предстоящие задачи</Text>
          <View style={{ width: 20, height: 20 }}></View>
        </View>

        <View style={styles.hr}></View>

        <FlatList
          data={dates}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item, index) => index}
          style={{ height: "100%" }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
});

export default PendingTasksScreen;
