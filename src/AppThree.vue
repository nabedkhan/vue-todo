<template>
  <section class="bg-gray-900 text-slate-100 h-screen grid place-items-center">
    <div class="max-w-sm m-auto w-full">
      <!-- TODO FORM -->
      <TodoCreateForm v-model="todoInput" @create="handleTodoCreate()" />

      <!-- TODO FILTER ACTION -->
      <TodoFilters v-model="filterValue" :todoLength="todoLength" />

      <!-- TODO LIST -->
      <TodoList :todoList="filteredTodoList" />
    </div>
  </section>
</template>

<script>
import { nanoid } from "nanoid";

import TodoList from "./components/for-app-3/TodoList.vue";
import TodoFilters from "./components/for-app-3/TodoFilters.vue";
import TodoCreateForm from "./components/for-app-3/TodoCreateForm.vue";

export default {
  components: {
    TodoList,
    TodoFilters,
    TodoCreateForm,
  },

  data() {
    return {
      todoInput: "",
      filterValue: "all",
      todoList: localStorage.getItem("todoList")
        ? JSON.parse(localStorage.getItem("todoList"))
        : [
            { id: 1, title: "Learn React", complete: false },
            { id: 2, title: "Learn Vue", complete: false },
            { id: 3, title: "Learn Angular", complete: false },
          ],
    };
  },

  methods: {
    handleDeleteTodo(todoId) {
      if (confirm("Are you sure want to delete?")) {
        this.todoList = this.todoList.filter((item) => item.id !== todoId);
      }
    },

    handleTodoCreate() {
      const todo = { id: nanoid(), complete: false, title: this.todoInput };

      this.todoList.unshift(todo);
      this.todoInput = "";
    },

    handleTodoComplete(todoId) {
      const findTodo = this.todoList.find((item) => item.id === todoId);
      findTodo.complete = !findTodo.complete;
    },
  },

  computed: {
    todoLength() {
      return {
        all: this.todoList.length,
        complete: this.todoList.filter((item) => item.complete).length,
        incomplete: this.todoList.filter((item) => !item.complete).length,
      };
    },

    filteredTodoList() {
      if (this.filterValue === "complete") {
        return this.todoList.filter((item) => item.complete);
      }
      if (this.filterValue === "incomplete") {
        return this.todoList.filter((item) => !item.complete);
      }
      return this.todoList;
    },
  },

  watch: {
    todoList: {
      handler: (newValue) => {
        localStorage.setItem("todoList", JSON.stringify(newValue));
      },
      deep: true,
    },
  },

  provide() {
    return {
      handleDeleteTodo: this.handleDeleteTodo,
      handleTodoComplete: this.handleTodoComplete,
    };
  },
};
</script>

<style></style>
