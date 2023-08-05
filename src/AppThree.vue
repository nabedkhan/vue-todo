<template>
  <section class="grid h-screen bg-gray-900 text-slate-100 place-items-center">
    <div class="w-full max-w-sm m-auto">
      <!-- TODO FORM -->
      <TodoCreateForm v-model="todoInput" @create="handleTodoCreate()" />

      <!-- TODO FILTER ACTION -->
      <TodoFilters v-model="filterValue" :todoLength="todoLength" />

      <!-- TODO LIST -->
      <Skeleton v-if="loading" />
      <TodoList :todoList="filteredTodoList" v-else />
    </div>
  </section>
</template>

<script>
import { nanoid } from "nanoid";
import Swal from "sweetalert2";

import axios from "./utils/axios";
import TodoList from "./components/for-app-3/TodoList.vue";
import TodoFilters from "./components/for-app-3/TodoFilters.vue";
import TodoCreateForm from "./components/for-app-3/TodoCreateForm.vue";
import Skeleton from "./components/Skeleton.vue";

export default {
  components: {
    TodoList,
    Skeleton,
    TodoFilters,
    TodoCreateForm,
  },

  data() {
    return {
      todoList: [],
      todoInput: "",
      filterValue: "all",
      loading: false,
    };
  },

  methods: {
    async handleDeleteTodo(todoId) {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure want to delete?",
        showCancelButton: true,
        confirmButtonText: "Delete",
        icon: "info",

        customClass: {
          popup: "rounded-xl bg-gray-800 text-gray-200",
          container: "backdrop-opacity-10",
          title: "text-3xl",
          confirmButton: "bg-red-500 focus:shadow-none",
          cancelButton: "bg-gray-700 focus:shadow-none",
          icon: "text-red-500 border-red-500",
        },
      });

      if (isConfirmed) {
        this.todoList = this.todoList.filter((item) => item.id !== todoId);
        const { data } = await axios.put("/", this.todoList);
        this.todoList = data.record;
      }
    },

    async handleTodoCreate() {
      const todo = { id: nanoid(), complete: false, title: this.todoInput };

      this.todoList.unshift(todo);
      this.todoInput = "";

      try {
        const { data } = await axios.put("/", this.todoList);
        this.todoList = data.record;
      } catch (error) {
        console.log(error);
      }
    },

    async handleTodoComplete(todoId) {
      const findTodo = this.todoList.find((item) => item.id === todoId);
      findTodo.complete = !findTodo.complete;

      try {
        const { data } = await axios.put("/", this.todoList);
        this.todoList = data.record;
      } catch (error) {
        console.log(error);
      }
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

  async created() {
    this.loading = true;

    try {
      const { data } = await axios.get("/latest");
      this.todoList = data.record;
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  },
};
</script>
