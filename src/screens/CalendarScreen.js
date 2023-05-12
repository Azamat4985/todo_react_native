import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { THEME } from "../theme/theme";
import { Calendar, Agenda, LocaleConfig } from "react-native-calendars";
import { useSelector } from "react-redux";
import CircularProgress from "react-native-circular-progress-indicator";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

LocaleConfig.locales["ru"] = {
  monthNames: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  monthNames: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  monthNamesShort: [
    "Янв.",
    "Фев.",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Авг.",
    "Сент.",
    "Окт.",
    "Ноя.",
    "Дек.",
  ],
  dayNames: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскересенье"],
  dayNamesShort: ["Пн.", "Вт.", "Ср.", "Чт.", "Пт.", "Сб.", "Вс."],
  today: "Сегодня",
};

LocaleConfig.defaultLocale = "ru";

const CalendarScreen = ({ navigation, route }) => {
  const [items, setItems] = useState({});

  const todos = useSelector((state) => state.todos.todos);

  const loadItems = (day) => {
    let calendarItems = {};

    for (const item of todos) {
      let strTime = timeToString(item.date);
      if (!calendarItems[strTime]) {
        calendarItems[strTime] = [];

        let todosThisDay = todos.filter((i) => {
          return timeToString(i.date) == timeToString(item.date);
        });

        for (const i of todosThisDay) {
          calendarItems[strTime].push({
            name: i.title,
            day: strTime,
            color: i.color,
            description: i.description,
            time: i.time,
            tasks: i.tasks,
            id: i.id,
            done: i.done,
          });
        }
      }
    }

    setItems(calendarItems);
  };

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

  function formatTime(time) {
    const d = new Date(time);
    const dd = [d.getHours(), d.getMinutes()].map((a) => (a < 10 ? "0" + a : a));
    return dd.join(":");
  }

  const renderItem = (item) => {
    function countProgress() {
      if (item.tasks.length == 0) {
        return 100;
      } else {
        let doneTasks = item.tasks.filter((item) => item.done);
        return Math.round((doneTasks.length / item.tasks.length) * 100);
      }
    }

    let todoItem = todos.find(i => i.id == item.id)

    return (
      <TouchableOpacity
        style={[styles.item, { backgroundColor: todoItem.color }]}
        onPress={() => {
          navigation.navigate("TaskScreen", {
            itemId: item.id,
          });
        }}
      >
        <View>
          <Text style={styles.agendaItem}>{todoItem.title}</Text>
          <Text style={{ color: "white", marginBottom: 5 }}>
            {shortenDescription(todoItem.description)}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CircularProgress
              value={countProgress()}
              maxValue={100}
              activeStrokeWidth={5}
              inActiveStrokeWidth={5}
              inActiveStrokeColor={"#DADBDE"}
              activeStrokeColor={THEME.PRIMARY_COLOR}
              radius={10}
              showProgressValue={false}
            />
            <Text style={{marginLeft: 10, color: 'white'}}>{countProgress()}%</Text>
          </View>
        </View>
        <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
          <Text style={{ color: "white", fontWeight: 600, fontSize: 20 }}>
            {formatTime(todoItem.time)}
          </Text>
          <Text style={{ color: "white" }}>{todoItem.done ? "Выполнено" : "В процессе"}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.BACKGROUND_COLOR }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
            padding: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Ionicons
              name="chevron-back-circle-outline"
              size={30}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Календарь</Text>
          <View style={{ width: 20, height: 20, borderRadius: 5 }}></View>
        </View>

        <View style={styles.hr}></View>

        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={timeToString(Date.now())}
          // refreshControl={null}
          // showClosingKnob={true}
          // refreshing={true}
          renderItem={renderItem}
          firstDay={1}
          theme={{
            backgroundColor: THEME.BACKGROUND_COLOR,
            calendarBackground: THEME.WHITE_COLOR,
            reservationsBackgroundColor: THEME.BACKGROUND_COLOR,
          }}
          renderEmptyData={() => {
            return (
              <View style={{ padding: 50, flexDirection: "row", justifyContent: "center" }}>
                <Text>На этот день задач нет</Text>
              </View>
            );
          }}
        />
        <StatusBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  agendaItem: {
    color: "white",
    fontWeight: 600,
    fontSize: 18,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: THEME.BACKGROUND_COLOR,
  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hr: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    opacity: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
  },
});

export default CalendarScreen;
