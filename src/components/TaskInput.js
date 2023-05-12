import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Button, KeyboardAvoidingView } from "react-native";
import { THEME } from "../theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

const TaskInput = ({ tasks, index, setTasks }) => {
  const item = tasks[index];
  const [done, setDone] = useState(item.done);
  const [text, setText] = useState(item.title);

  function deleteTask(){
    let tempTasks = [...tasks]
    tempTasks.splice(index, 1)
    setTasks(tempTasks)
  }

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        flex: 1,
        width: "100%",
        marginBottom: 10,
      }}
    >
      {item.done ? (
        <Ionicons
          name="checkmark-circle"
          size={25}
          color={THEME.PRIMARY_COLOR}
          style={{ marginRight: 5 }}
          onPress={() => {
            tasks[index].done = false;
            setDone(false);
          }}
        />
      ) : (
        <TouchableOpacity
          style={{
            width: 25,
            height: 25,
            borderColor: THEME.INPUT_COLOR,
            borderWidth: 1,
            borderRadius: 50,
            marginRight: 5,
          }}
          onPress={() => {
            tasks[index].done = true;
            setDone(true);
          }}
        ></TouchableOpacity>
      )}
      <TextInput
        style={styles.taskInput}
        value={item.title}
        maxLength={30}
        onChangeText={(text) => {
          tasks[index].title = text;
          setText(text);
        }}
      />
      <TouchableOpacity activeOpacity={.7}>
        <Ionicons name="trash-bin" size={20} color={THEME.DISCARD_COLOR} onPress={deleteTask}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskInput: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderColor: THEME.INPUT_COLOR,
    width: "80%",
  },
});

export default TaskInput;
