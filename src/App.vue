<template>
  <section class="bg-gray-900 text-slate-100 h-screen grid place-items-center">
    <div class="max-w-sm m-auto w-full">
      <!-- TODO LIST -->
      <ul
        v-if="filteredTodoList.length > 0"
        class="w-full rounded-lg border border-gray-600 divide-y divide-gray-600"
      >
        <li
          v-for="todo in filteredTodoList"
          :key="todo.id"
          class="px-4 py-2 flex items-center justify-between"
        >
          <p
            class="text-lg font-medium"
            :class="{
              'line-through': todo.complete,
            }"
          >
            {{ todo.title }}
          </p>

          <div class="flex gap-3 items-baseline">
            <input
              type="checkbox"
              class="hover:cursor-pointer"
              v-model="todo.complete"
            />

            <button
              class="text-xl font-medium leading-none"
              @click="handleDeleteTodo(todo.id)"
            >
              &times;
            </button>
          </div>
        </li>
      </ul>

      <!-- TODO FILTER ACTION -->
      <div
        class="flex items-center gap-4 w-full my-6"
        v-if="todoList.length > 0"
      >
        <button
          class="border border-gray-100 py-1 px-2 rounded-lg text-xs font-medium uppercase"
          @click="filter = ''"
          :class="{
            'bg-slate-700 border-slate-400': filter === '',
          }"
        >
          All - ({{ totalTodoLength }})
        </button>
        <button
          class="border border-gray-100 py-1 px-2 rounded-lg text-xs font-medium uppercase"
          @click="filter = 'complete'"
          :class="{
            'bg-slate-700 border-slate-400': filter === 'complete',
          }"
        >
          Complete - ({{ completedTodoLength }})
        </button>
        <button
          class="border border-gray-100 py-1 px-2 rounded-lg text-xs font-medium uppercase"
          @click="filter = 'incomplete'"
          :class="{
            'bg-slate-700 border-slate-400': filter === 'incomplete',
          }"
        >
          Incomplete - ({{ inCompletedTodoLength }})
        </button>
      </div>

      <!-- TODO FORM -->
      <form
        @submit.prevent="handleTodoCreate()"
        class="flex items-center w-full"
      >
        <input
          type="text"
          class="border border-gray-700 bg-transparent p-3 px-5 rounded-l-lg outline-none w-full"
          v-model="todoInput"
        />

        <input
          type="submit"
          value="Add"
          class="bg-gray-100 text-gray-800 p-3 px-6 rounded-r-lg tex-lg font-medium border border-gray-100"
        />
      </form>
    </div>
  </section>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  data() {
    return {
      todoList: [
        { id: 1, title: "Learn React", complete: false },
        { id: 2, title: "Learn Vue", complete: false },
        { id: 3, title: "Learn Angular", complete: false },
      ],

      todoInput: "",
      filter: "",
    };
  },

  methods: {
    handleDeleteTodo(todoId) {
      console.log("hello 1");

      this.todoList = this.todoList.filter((item) => item.id !== todoId);
    },

    handleTodoCreate() {
      console.log("hello 2");

      const todo = {
        id: nanoid(),
        title: this.todoInput,
        complete: false,
      };

      this.todoList.unshift(todo);
      this.todoInput = "";
    },

    handleCompleteTodLength() {
      console.log("hello 3");
      return this.todoList.length;
    },
  },

  computed: {
    totalTodoLength() {
      return this.todoList.length;
    },
    completedTodoLength() {
      return this.todoList.filter((item) => item.complete).length;
    },
    inCompletedTodoLength() {
      return this.todoList.filter((item) => !item.complete).length;
    },

    filteredTodoList() {
      if (this.filter === "complete") {
        return this.todoList.filter((item) => item.complete);
      }

      if (this.filter === "incomplete") {
        return this.todoList.filter((item) => !item.complete);
      }

      return this.todoList;
    },
  },
};
</script>

<style></style>
