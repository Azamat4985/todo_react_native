import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { THEME } from "../theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import TaskInput from "../components/TaskInput";
import DateTimePicker, { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addTodo, editTodo } from "../store/actions/todos";
import { useDispatch } from "react-redux";

const CreateTaskScreen = ({ route }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [color, setColor] = useState(THEME.TASK_COLORS[0]);

  const [titleCount, setTitleCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);

  const navigation = useNavigation();
  const { todos, onAddTodo, isEdit } = route.params;

  useEffect(() => {
    const { isEdit } = route.params;

    if (isEdit) {
      const { thisTodo, onEdit } = route.params;
      setTitle(thisTodo.title);
      setDescription(thisTodo.description);
      setTasks(thisTodo.tasks);
      setDate(new Date(thisTodo.date));
      setTime(new Date(thisTodo.time));
      setColor(thisTodo.color);
    }
  }, []);

  function symbolCount(text, type) {
    if (type == "title") {
      setTitle(text);
      setTitleCount(text.split("").length);
    } else if (type == "desc") {
      setDescription(text);
      setDescriptionCount(text.split("").length);
    }
  }

  function addTask() {
    setTasks([...tasks, { title: "", done: false }]);
    console.log(tasks);
  }

  const dispatch = useDispatch();

  async function saveTask() {
    if(title == undefined){
      Alert.alert('Введите название задачи')
      return;
    }
    for (let i = 0; i < tasks.length; i++) {
      if(tasks[i].title == undefined){
        console.log('empty task', tasks[0]);
        tasks.slice(1, i)
      }
    }
    if (!isEdit) {
      dispatch(
        addTodo({
          title: title,
          description: description,
          tasks: tasks,
          date: date,
          time: time,
          done: false,
          color: color,
          id: Math.floor(Date.now() + Math.random()),
        })
      );
      navigation.goBack();
    } else {
      const { onEdit, thisTodo } = route.params;
      dispatch(
        editTodo({
          title: title,
          description: description,
          tasks: tasks,
          date: date,
          time: time,
          done: false,
          color: color,
          id: thisTodo.id,
        })
      );
      navigation.goBack();
    }
  }

  function changeColor(number) {
    console.log(number);
    setColor(THEME.TASK_COLORS[number]);
  }

  function getTime(time) {
    const d = new Date(time);
    const dd = [d.getHours(), d.getMinutes()].map((a) => (a < 10 ? "0" + a : a));
    return dd.join(":");
  }

  function openDatePicker() {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (event, date) => {
        setDate(new Date(date));
      },
      mode: "date",
    });
  }

  function openTimePicker() {
    DateTimePickerAndroid.open({
      value: time,
      onChange: (event, date) => {
        setTime(new Date(date));
      },
      mode: "time",
      is24Hour: true
    });
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView >
        <ScrollView>
          <View style={styles.content}>
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 20,
                paddingTop: 20
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
                  size={20}
                />
              </TouchableOpacity>
              {!isEdit ? (
                <Text style={styles.screenTitle}>Создать новую задачу</Text>
              ) : (
                <Text style={styles.screenTitle}>Редактировать задачу</Text>
              )}

              <View style={{ width: 25 }}></View>
            </View>

            <View style={styles.hr}></View>

            <Text style={styles.inputTitle}>Название задачи</Text>
            <View style={{ position: "relative", marginBottom: 20 }}>
              <TextInput
                style={styles.input}
                placeholder="Введите название задачи..."
                maxLength={30}
                onChangeText={(text) => symbolCount(text, "title")}
                value={title}
              />
              <View style={styles.titleCountWrapper}>
                <Text style={styles.titleCount}>{titleCount} / 30</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.inputTitle}>Описание</Text>
              <Text style={styles.titleCount}>{descriptionCount} / 300</Text>
            </View>
            <View
              style={{
                backgroundColor: THEME.INPUT_COLOR,
                // paddingVertical: 15,
                borderRadius: 10,
                marginBottom: 20,
              }}
            >
              <TextInput
                style={styles.description}
                placeholder="Введите описание задачи..."
                maxLength={300}
                multiline={true}
                textAlignVertical="top"
                value={description}
                onChangeText={(text) => symbolCount(text, "desc")}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              <Text style={[styles.inputTitle, { marginRight: 5, marginBottom: 0 }]}>Задачи</Text>
              <Text style={{ opacity: 0.5 }}>({tasks.length})</Text>
            </View>

            {/* <FlatList
            data={tasks}
            renderItem={({ item, index }) => (
              <TaskInput
                tasks={tasks}
                index={index}
                setTasks={setTasks}
              />
            )}
          /> */}
            {tasks.map((item, index) => (
              <TaskInput
                tasks={tasks}
                index={index}
                setTasks={setTasks}
                key={index}
              />
            ))}

            <TouchableOpacity
              style={styles.addTaskBtn}
              activeOpacity={0.7}
              onPress={addTask}
            >
              <Ionicons
                name="add-circle"
                size={18}
                style={{ marginRight: 5 }}
                color={THEME.PRIMARY_COLOR}
              />
              <Text style={{ fontWeight: 600, color: THEME.PRIMARY_COLOR }}>Новая задача</Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <View>
                <Text style={styles.inputTitle}>Дата:</Text>
                <TouchableOpacity
                  style={styles.dateTimeBtn}
                  onPress={() => {
                    openDatePicker();
                  }}
                >
                  <Text style={{ color: THEME.PRIMARY_COLOR }}>{new Date(date).toLocaleDateString('ru')}</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.inputTitle}>Время:</Text>
              <TouchableOpacity
                  style={styles.dateTimeBtn}
                  onPress={() => {
                    openTimePicker();
                  }}
                >
                  <Text style={{ color: THEME.PRIMARY_COLOR }}>{getTime(time)}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.inputTitle}>Цвет:</Text>
            <View style={{ flexDirection: "row", marginBottom: 20, alignItems: "center" }}>
              <TouchableOpacity
                style={[styles.colorBtn, { backgroundColor: THEME.TASK_COLORS[0] }]}
                onPress={() => {
                  changeColor(0);
                }}
              >
                {color == THEME.TASK_COLORS[0] ? (
                  <Ionicons
                    name="checkmark-circle"
                    color={THEME.DONE_COLOR}
                    size={20}
                  />
                ) : (
                  <View></View>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.colorBtn, { backgroundColor: THEME.TASK_COLORS[1] }]}
                onPress={() => {
                  changeColor(1);
                }}
              >
                {color == THEME.TASK_COLORS[1] ? (
                  <Ionicons
                    name="checkmark-circle"
                    color={THEME.DONE_COLOR}
                    size={20}
                  />
                ) : (
                  <View></View>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.colorBtn, { backgroundColor: THEME.TASK_COLORS[2] }]}
                onPress={() => {
                  changeColor(2);
                }}
              >
                {color == THEME.TASK_COLORS[2] ? (
                  <Ionicons
                    name="checkmark-circle"
                    color={THEME.DONE_COLOR}
                    size={20}
                  />
                ) : (
                  <View></View>
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={saveTask}
            >
              <Text style={{ fontWeight: 600, color: "#fff" }}>Сохранить</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dateTimeBtn: {
    backgroundColor: THEME.INPUT_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  colorBtn: {
    width: 30,
    height: 30,
    backgroundColor: THEME.TASK_COLORS[0],
    borderRadius: 10,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtn: {
    width: "100%",
    backgroundColor: THEME.PRIMARY_COLOR,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
  },
  addTaskBtn: {
    backgroundColor: THEME.INPUT_COLOR,
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  titleCount: {
    fontSize: 12,
    opacity: 0.5,
  },
  titleCountWrapper: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    top: 0,
    bottom: 0,
    right: 20,
  },
  inputTitle: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 500,
  },
  description: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: THEME.INPUT_COLOR,
    borderRadius: 10,
    height: 150,
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: THEME.INPUT_COLOR,
    borderRadius: 10,
  },
  wrapper: {
    backgroundColor: THEME.BACKGROUND_COLOR,
    flex: 1,
  },
  content: {
    padding: 20,
  },
  screenTitle: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 18,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    opacity: 0.2,
    marginBottom: 20,
  },
});

export default CreateTaskScreen;
