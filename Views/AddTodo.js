class AddTodo {
    get SELECTORS() {
        return {
          form: ".add-todo",
          input: ".add-todo__input",
        };
    }

    handleAddTodo(handler) {
        document.querySelector(this.SELECTORS.form).addEventListener('submit', e => {
            e.preventDefault();
            const todoValue = document.querySelector(this.SELECTORS.input).value;
            handler(todoValue);
            document.querySelector(this.SELECTORS.input).value = '';
        })
    }

    renderNewTodo(value) {
        const markup = ``
    }
}

export default new AddTodo