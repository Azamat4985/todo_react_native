import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { THEME } from "../theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import CircularProgress from "react-native-circular-progress-indicator";

const TaskItem = ({ todo }) => {
  function shortenDescription(text) {
    if (text != undefined) {
      let splitted = text.split("");
      if (splitted.length >= 66) {
        splitted.splice(66, splitted.length - 65 - 1);
        splitted.push(".");
        splitted.push(".");
        splitted.push(".");
      }
      return splitted;
    } else {
      return '';
    }
  }

  function formatDate(date) {
    let dateFormat = new Date(date);
    let day = dateFormat.getDate();
    let month = dateFormat.getMonth() + 1;
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
    let weekDay = dateFormat.getDay();
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

    let dateString = `${weekDay}, ${day} ${month} ${dateFormat.getFullYear()}`;

    return dateString;
  }

  function formatTime(time) {
    const d = new Date(time);
    const dd = [d.getHours(), d.getMinutes()].map((a) => (a < 10 ? "0" + a : a));
    return dd.join(":");
  }

  function countProgress() {
    if (todo.tasks.length == 0) {
      return 100;
    } else {
      let doneTasks = todo.tasks.filter((item) => item.done);
      return Math.round((doneTasks.length / todo.tasks.length) * 100);
    }
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
          <View style={{ minWidth: 200, marginRight: 20 }}>
            <Text style={styles.title}>{todo.title}</Text>
            <Text style={{ opacity: 0.6 }}>{formatDate(todo.date)}</Text>
            <Text style={{ opacity: 0.6 }}>{formatTime(todo.time)}</Text>
          </View>

          <Ionicons
            name="person-circle"
            size={50}
            color={todo.color}
          />
        </View>

        <View style={styles.hr}></View>

        <Text style={{ opacity: 0.5, marginBottom: 10 }}>Описание: </Text>

        <Text style={{ marginBottom: 20 }}>{shortenDescription(todo.description)}</Text>

        <Text style={{ opacity: 0.5, marginBottom: 10 }}>Выполненные задачи :</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CircularProgress
            value={countProgress()}
            maxValue={100}
            activeStrokeWidth={5}
            inActiveStrokeWidth={5}
            inActiveStrokeColor={"#DADBDE"}
            activeStrokeColor="#86B991"
            radius={10}
            showProgressValue={false}
          />
          <Text style={{ marginLeft: 5, fontWeight: 500 }}>{countProgress()}%</Text>
        </View>
      </View>

      <View style={[styles.bottom, { backgroundColor: todo.color }]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    opacity: 0.2,
    marginBottom: 10,
  },
  bottom: {
    height: 5,
    opacity: 0.6,
    width: "100%",
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  container: {
    padding: 15,
  },
  wrapper: {
    backgroundColor: THEME.WHITE_COLOR,
    borderRadius: 8,
    maxWidth: Dimensions.get("window").width - 50,
    marginRight: 30,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default TaskItem;
