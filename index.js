import bgDeskDark from "./images/bg-desktop-dark.jpg";
import bgMobDark from "./images/bg-mobile-dark.jpg";
import bgDeskLight from "./images/bg-desktop-light.jpg";
import bgMobLight from "./images/bg-mobile-light.jpg";
import iconCheck from "./images/icon-check.svg";
import iconCross from "./images/icon-cross.svg";
import iconMoon from "./images/icon-moon.svg";
import iconSun from "./images/icon-sun.svg";

import "./sass/main.scss";

import AddTodoView from "./Views/AddTodo";
import TodoListView from "./Views/TodoList";
import ChangeTheme from "./Views/ChangeTheme";

import * as model from "./model";

const addTodoController = function (value) {
  console.log("ADD", value);
  const newTodo = model.addTodo(value);
  TodoListView.renderNewTodo(newTodo);
  console.log("ADD", model.state.todoList);
  model.updateUserLocalStorage();
  TodoListView.updateTodoCounter(model.counterNum);
};

const deleteTodoController = function (id) {
  console.log("DEL", id);
  model.deleteTodo(id);
  TodoListView.renderTodoList(model.state.todoList);
  console.log("DEL", model.state.todoList);
  model.updateUserLocalStorage();
  TodoListView.updateTodoCounter(model.counterNum);
};

const changeTodoController = function (obj) {
  console.log("CHANGE", obj.id);
  model.toggleActive(obj);
  model.updateUserLocalStorage();
  TodoListView.updateTodoCounter(model.counterNum);
};

const clearCompleteTodoController = function () {
  console.log("CLEAR");
  model.clearCompleteTodo();
  model.updateUserLocalStorage();
  TodoListView.renderTodoList(model.state.todoList);
};

const filterTodoController = function (filter) {
  console.log("FILTER", filter);
  const list = model.filterTodoList(filter);
  TodoListView.renderTodoList(list);
};

const init = function () {
  console.log("START");
  model.checkUserLocalStorage();
  TodoListView.renderTodoList(model.state.todoList);
  TodoListView.updateTodoCounter(model.counterNum);
  AddTodoView.handleAddTodo(addTodoController);
  TodoListView.handleDeleteTodo(deleteTodoController);
  TodoListView.handleChangeTodo(changeTodoController);
  TodoListView.handleClearComplete(clearCompleteTodoController);
  TodoListView.handleFilterTodo(filterTodoController);
  TodoListView.handleDragAndDrop(model.moveTodo);
  ChangeTheme.handleChangeTheme();
};

init();
