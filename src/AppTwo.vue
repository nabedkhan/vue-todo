<template>
  <section class="bg-gray-900 text-slate-100 h-screen grid place-items-center">
    <div class="max-w-sm m-auto w-full">
      <!-- TODO LIST -->
      <TodoList
        :todoList="filteredTodoList"
        @delete="handleDeleteTodo($event)"
        :handleTodoComplete="handleTodoComplete"
      />

      <!-- TODO FILTER ACTION -->
      <TodoFilters
        :todoLength="todoLength"
        :filterValue="filterValue"
        @filter="handleFilterTodo($event)"
      />

      <!-- TODO FORM -->
      <TodoCreateForm v-model="todoInput" @create="handleTodoCreate()" />
    </div>
  </section>
</template>

<script>
import { nanoid } from "nanoid";

import TodoList from "./components/TodoList.vue";
import TodoFilters from "./components/TodoFilters.vue";
import TodoCreateForm from "./components/TodoCreateForm.vue";

export default {
  components: {
    TodoList,
    TodoFilters,
    TodoCreateForm,
  },

  data() {
    return {
      todoList: [
        { id: 1, title: "Learn React", complete: false },
        { id: 2, title: "Learn Vue", complete: false },
        { id: 3, title: "Learn Angular", complete: false },
      ],

      todoInput: "",
      filterValue: "all",
    };
  },

  methods: {
    handleDeleteTodo(todoId) {
      if (confirm("Are you sure want to delete?")) {
        this.todoList = this.todoList.filter((item) => item.id !== todoId);
      }
    },

    handleTodoCreate() {
      const todo = {
        id: nanoid(),
        complete: false,
        title: this.todoInput,
      };

      this.todoList.unshift(todo);
      this.todoInput = "";
    },

    handleTodoComplete(todoId) {
      const findTodo = this.todoList.find((item) => item.id === todoId);
      findTodo.complete = !findTodo.complete;
    },

    handleFilterTodo(action) {
      this.filterValue = action.toLowerCase();
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
};
</script>

<style></style>
