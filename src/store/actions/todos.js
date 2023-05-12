import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ADD_TODO,
  CHANGE_TASKS,
  EDIT_TODO,
  GET_TODO_BY_ID,
  LOAD_TODOS,
  MAKE_DONE,
  REMOVE_TODO,
  SET_TODOS,
} from "../types";

export const loadTodos = (todos) => {
  return {
    type: LOAD_TODOS,
    payload: todos,
  };
};

export const editTodo = (data) => {
  return {
    type: EDIT_TODO,
    payload: data,
  };
};

export const makeDone = (data) => {
  return {
    type: MAKE_DONE,
    payload: data,
  };
};

export const changeTasks = (data) => {
  return {
    type: CHANGE_TASKS,
    payload: data,
  };
};

export const addTodo = (data) => {
  return {
    type: ADD_TODO,
    payload: data,
  };
};

export const removeTodo = (data) => {
  return {
    type: REMOVE_TODO,
    payload: data,
  };
};
