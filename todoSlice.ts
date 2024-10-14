import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  todo: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    create: (state, action) => {
      state.todo.push(action.payload);
    },
    deleteTodo: (state, action) => {
      const todoFound = state.todo.find((t) => t.id === action.payload);
      todoFound ? state.todo.splice(state.todo.indexOf(todoFound), 1) : null;
    },
    updateTodo: (state, action) => {
      const { id, name, description } = action.payload;
      const todoFound = state.todo.find((t) => t.id === id);
      if (todoFound) {
        todoFound.name = name;
        todoFound.description = description;
      }
    },
  },
});

export const { create, deleteTodo, updateTodo } = todoSlice.actions;
export const selectTodo = (state)=>state.todoState.todo;
export default todoSlice.reducer;