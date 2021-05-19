class TodoList {
  constructor() {
    this.dragged = '';
  }

  get SELECTORS() {
    return {
      todoList: ".todo-list",
      clearCompleteBtn: ".clear-complete",
      filter: ".filters",
      todoCounter: ".counter",
    };
  }

  handleDragAndDrop(handler) {
    document
      .querySelector(this.SELECTORS.todoList)
      .addEventListener("dragstart", (e) => {
        if (e.target.closest("li")) {
          // e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("todo/fm", e.target.outerHTML);
          this.dragged = e.target.closest("li").dataset.id;
        }
      });

    document
      .querySelector(this.SELECTORS.todoList)
      .addEventListener("dragenter", (e) => {
        e.preventDefault();
        //e.dataTransfer.dropEffect = "move";
        if (e.target.closest("li")) {
          if (document.querySelector(".drop-item-sign"))
            document.querySelector(".drop-item-sign").remove();
          console.log("OVER", e.target);
          let markup = `<div class="drop-item-sign"></div>`;
          e.target.closest("li").insertAdjacentHTML("beforebegin", markup);
        }

        if (e.target.matches('ul')) {
          if (document.querySelector(".drop-item-sign"))
            document.querySelector(".drop-item-sign").remove();
          let markup = `<div class="drop-item-sign"></div>`;
          e.target.insertAdjacentHTML("beforeend", markup);
        }
      });

    document
      .querySelector(this.SELECTORS.todoList)
      .addEventListener("dragover", (e) => {
        e.preventDefault();
      });
    document
      .querySelector(this.SELECTORS.todoList)
      .addEventListener("dragleave", (e) => {
        e.preventDefault();
      });

    document
      .querySelector(this.SELECTORS.todoList)
      .addEventListener("drop", (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("todo/fm");
        document.querySelector(`li[data-id='${this.dragged}']`).remove();

        if (e.target.closest("li")) {
          e.target.closest("li").insertAdjacentHTML("beforebegin", data);
          handler(this.dragged, e.target.closest("li").dataset.id);
        }

        if (e.target.matches("ul")) {
          e.target.insertAdjacentHTML("beforeend", data);
          handler(this.dragged, 'last');
        }
        
        document.querySelector(".drop-item-sign").remove();
      });
  }

  handleChangeTodo(handler) {
    document
      .querySelector(this.SELECTORS.todoList)
      .addEventListener("change", (e) => {
        const todoState = e.target.checked;
        const todo = e.target.closest(".todo-wrapper");
        console.log("todostate", todoState);
        handler({ state: todoState, id: todo.dataset.id });
        todoState ? todo.classList.add("done") : todo.classList.remove("done");
      });
  }

  handleDeleteTodo(handler) {
    document
      .querySelector(this.SELECTORS.todoList)
      .addEventListener("click", (e) => {
        if (e.target.closest(".todo-wrapper") && e.target.closest(".delete")) {
          const todo = e.target.closest(".todo-wrapper");
          handler(todo.dataset.id);
        }
      });
  }

  handleClearComplete(handler) {
    document
      .querySelector(this.SELECTORS.clearCompleteBtn)
      .addEventListener("click", handler);
  }

  handleFilterTodo(handler) {
    document.querySelectorAll(this.SELECTORS.filter).forEach((el) =>
      el.addEventListener("click", (e) => {
        if (e.target.closest("button")) {
          let btn = e.target;
          [...btn.parentElement.children].forEach((button) =>
            button.classList.remove("active")
          );
          btn.classList.add("active");
          handler(btn.dataset.filter);
        }
      })
    );
  }

  updateTodoCounter(counterFunc) {
    let num = counterFunc();
    console.log("TEST", document.querySelector(this.todoCounter));
    document.querySelector(
      this.SELECTORS.todoCounter
    ).textContent = `${num} items left`;
  }

  renderTodoList(list) {
    console.log("LIST", list);
    document.querySelector(this.SELECTORS.todoList).innerHTML = "";
    list.forEach((el) => {
      this.renderNewTodo(el, "beforeend");
    });
  }

  renderNewTodo(todo, location = "afterbegin") {
    const markup = `<li data-id="${todo.id}" class="todo-wrapper ${
      todo.checked ? "done" : ""
    }" draggable="true">
      <div class="checkbox-wrapper">
              <input
                class="checkbox"
                type="checkbox"
                aria-label="Add todo"
                id="checkbox-${todo.id}"
                ${todo.checked ? "checked" : ""}
              />
              <span></span>
              <label for="checkbox-${todo.id}" class="checkmark"></label>
            </div>
      <p>${todo.text}</p>
      <button class="delete" title="delete todo"><img src="./images/icon-cross.svg" alt="Icon cancel"></button>
    </li>`;

    document
      .querySelector(this.SELECTORS.todoList)
      .insertAdjacentHTML(location, markup);
  }
}

export default new TodoList();
