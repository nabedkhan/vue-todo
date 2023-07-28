<template>
  <ul
    v-if="todoList.length > 0"
    class="w-full rounded-lg border border-gray-600 divide-y divide-gray-600"
  >
    <TodoItem
      v-for="todo in todoList"
      :key="todo.id"
      :todo="todo"
      @delete="handleDelete($event)"
      :handleTodoComplete="handleTodoComplete"
    />
  </ul>
</template>

<script>
import TodoItem from "./TodoItem.vue";

export default {
  components: {
    TodoItem,
  },

  props: {
    todoList: Array,
    handleTodoComplete: Function,
  },

  methods: {
    handleDelete(e) {
      this.$emit("delete", e);
    },
  },
};
</script>
