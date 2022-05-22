Vue.createApp({
  data() {
    return {
      message: "My Todo App",
      todo: {todo: "", completed: false},
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },
  methods: {
    addTodo() {
      console.log(this.todo);
      this.todos.push({
        id: `${new Date().getTime()}-id-${Math.random()
          .toString(36)
          .substr(2)}`,
        todo: this.todo.todo,
        done: false,
      });
      this.writeToLocalStorage();
      this.todo = {todo: "", completed: false};
    },
    toggleTodo(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.done = !todo.done;
      this.writeToLocalStorage();
    },
    deleteTodo(id) {
      const index = this.todos.findIndex((todo) => todo.id === id);
      this.todos.splice(index, 1);
      this.writeToLocalStorage();
    },
    writeToLocalStorage() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    editTodo(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      this.todo = todo;
    },
    saveTodo(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.todo = this.todo.todo;
      this.writeToLocalStorage();
      this.todo = {todo: "", completed: false};
    },
    inputEnter(id) {
      if(id){
        this.saveTodo(id);
      }else{
        this.addTodo();
      }
    }

  },
}).mount("#app");
