const startTodo = [
  {
    id: 1,
    text: "Welcome, this is a todo app designed by frontendmentor.io",
    checked: false,
  },
  {
    id: 2,
    text: "<--- Use this checkbox for sign as completed",
    checked: false,
  },
  {
    id: 3,
    text: "Use the X button for delete the todo --->",
    checked: false,
  },
  {
    id: 4,
    text: "You can sort the list with the buttons below",
    checked: false,
  },
];

export const state = {
  todoList: [],
  darkTheme: true,
};

export const checkUserLocalStorage = () => {
  if (sessionStorage.getItem("ftdmtr_todo_2c")) {
    const data = JSON.parse(sessionStorage.getItem("ftdmtr_todo_2c")) || [];
    console.log('STORAGE', data);
    state.todoList = data.todoList;
    state.darkTheme = data.darkTheme;
    console.log("STORAGE", state.todoList);
  } else {
    state.todoList = startTodo;
    let data = JSON.stringify(state);
    sessionStorage.setItem("ftdmtr_todo_2c", data);
  }
};

export const updateUserLocalStorage = () => {
  if (sessionStorage.getItem("ftdmtr_todo_2c")) {
    let data = JSON.stringify(state);
    sessionStorage.setItem("ftdmtr_todo_2c", data);
  }
};

export const addTodo = (value) => {
  const id = new Date().getUTCMilliseconds();
  const todo = {
    id: id,
    text: value,
    checked: false,
  };
  state.todoList.unshift(todo);
  return todo;
};

export const deleteTodo = (id) => {
  const todo = state.todoList.find((el) => el.id == id);
  const num = state.todoList.indexOf(todo);
  state.todoList.splice(num, 1);
};

export const toggleActive = (obj) => {
  console.log('CCC', obj);
  for (let i = 0; i < state.todoList.length; i++) {
    if (state.todoList[i].id == obj.id) {
      state.todoList[i].checked = obj.state;
      console.log(state);
      break;
    }
  }
  console.log(state);
};

export const checkUserTheme = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    state.darkTheme = true;
  } else {
    state.darkTheme = false;
  }
}

export const clearCompleteTodo = () => {
  const newArr = state.todoList.filter(todo => !todo.checked);
  console.log(newArr);
  state.todoList = newArr;
}

export const filterTodoList = (filter) => {
  let newList;
  if (filter === "all") {
    return state.todoList;
  } else if (filter === "active") {
    newList = state.todoList.filter((todo) => !todo.checked);
  } else if (filter === "completed") {
    newList = state.todoList.filter((todo) => todo.checked);
  }
  return newList;
}

export const counterNum = () => {
  const newArr = state.todoList.filter((todo) => !todo.checked);
  return newArr.length;
}

export const moveTodo = (moved, to) => {
  const movedIndex = state.todoList.findIndex(todo => todo.id == moved);

  let item = state.todoList.splice(movedIndex, 1);

  if(to === 'last') {
    state.todoList.push(item[0]);
  } else {
    const moveToIndex = state.todoList.findIndex((todo) => todo.id == to);
    state.todoList.splice(moveToIndex, 0, item[0]);
  }

  console.table("LIST 2", state.todoList);
  updateUserLocalStorage()
}






//var sandwiches = ['ham', 'tuna', 'turkey', 'pb&j'];
// var moveInArray = function (arr, from, to) {
//   // Make sure a valid array is provided
//   if (Object.prototype.toString.call(arr) !== "[object Array]") {
//     throw new Error("Please provide a valid array");
//   }

//   // Delete the item from it's current position
//   var item = arr.splice(from, 1);

//   // Make sure there's an item to move
//   if (!item.length) {
//     throw new Error("There is no item in the array at index " + from);
//   }

//   // Move the item to its new position
//   arr.splice(to, 0, item[0]);
// };
//moveInArray(sandwiches, 2, 0); serve a muovere 'turkey' al primo posto nell'array