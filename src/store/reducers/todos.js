import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CHANGE_TASKS,
  EDIT_TODO,
  ADD_TODO,
  LOAD_TODOS,
  MAKE_DONE,
  SET_TODOS,
  REMOVE_TODO,
} from "../types";

const initialState = {
  todos: [],
};

async function saveTodos(data) {
  let isEmpty = false;
  if (data.todos) {
    if (data.todos.length == 0) {
      isEmpty = true;
    }
  }
  if (!isEmpty) {
    let strData = JSON.stringify(data);
    await AsyncStorage.setItem("todos", strData);
    console.log('saved');
  } else {
    await AsyncStorage.clear();
  }
}

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TODOS:
      return { ...state, todos: action.payload };
      break;

    case ADD_TODO:
      let addedTodos = [{ ...action.payload }, ...state.todos];
      console.log(action.payload);
      saveTodos(addedTodos);
      return { ...state, todos: addedTodos };

    case EDIT_TODO:
      let editedTodo = state.todos.map((item) => {
        if (item.id == action.payload.id) {
          return { ...item, ...action.payload };
        } else {
          return item;
        }
      });
      saveTodos(editedTodo);
      return { ...state, todos: editedTodo };
      break;

    case MAKE_DONE:
      let data = action.payload;
      let temp = state.todos.map((item) => {
        if (item.id == data.id) {
          return { ...item, done: data.done };
        } else {
          return item;
        }
      });
      console.log(temp);

      saveTodos(temp);
      return { ...state, todos: temp };

    case CHANGE_TASKS:
      let changedTodo = state.todos.map((item) => {
        if (item.id == action.payload.id) {
          let changedTasks = item.tasks.map((taskItem, index) => {
            if (index == action.payload.index) {
              return { ...taskItem, done: action.payload.done };
            } else {
              return taskItem;
            }
          });
          return { ...item, tasks: changedTasks };
        } else {
          return item;
        }
      });
      saveTodos(changedTodo);
      return { ...state, todos: changedTodo };

    case REMOVE_TODO:
      console.log(state);
      saveTodos({ ...state, todos: state.todos.filter((i) => i.id != action.payload.id) });
      return { ...state, todos: state.todos.filter((i) => i.id != action.payload.id) };

    default:
      return state;
  }
};
