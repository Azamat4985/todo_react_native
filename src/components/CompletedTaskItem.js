import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { THEME } from "../theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

const CompletedTaskItem = ({ todo, onCancel }) => {
  function shortenText(text) {
    if(text != undefined){
      let splitted = text.split(" ");
      splitted.splice(3, splitted.length - 1 - 1);
      if (splitted.length > 3) {
        splitted.push("...");
      }
      return splitted.join(" ");
    } else {
      return ''
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
        weekDay = "Понедельник";
        break;
      case 1:
        weekDay = "Вторник";
        break;
      case 2:
        weekDay = "Среда";
        break;
      case 3:
        weekDay = "Четверг";
        break;
      case 4:
        weekDay = "Пятница";
        break;
      case 5:
        weekDay = "Суббота";
        break;
      case 6:
        weekDay = "Воскресенье";
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

  return (
    <View style={styles.wrapper}>
      <View style={[styles.left,{backgroundColor: todo.color}]}></View>

      <View style={styles.content}>
        <View
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
        >
          <View>
            <Text style={styles.title}>{todo.title}</Text>
            <Text style={styles.description}>{shortenText(todo.description)}</Text>
          </View>

          <Ionicons
            name="checkmark-circle"
            size={30}
            color={THEME.PRIMARY_COLOR}
            onPress={() => {}}
          />
        </View>
        <View style={styles.hr}></View>

        <Text style={[styles.description, { marginBottom: 0 }]}>
          {formatDate(todo.date)} | {formatTime(todo.time)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
  },
  left: {
    width: 8,
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  content: {
    padding: 15,
    backgroundColor: THEME.WHITE_COLOR,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    width: "100%",
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
    textDecorationLine: "line-through",
    marginBottom: 10,
  },
  description: {
    fontSize: 12,
    opacity: 0.5,
    marginBottom: 10,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    opacity: 0.2,
    marginBottom: 10,
  },
});

export default CompletedTaskItem;
