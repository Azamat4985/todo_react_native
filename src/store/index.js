import { combineReducers, createStore } from "redux";
import { todosReducer } from "./reducers/todos";

const rootReducer = combineReducers({
    todos: todosReducer
})

export default createStore(rootReducer)