<template>
  <TransitionGroup
    name="list"
    tag="ul"
    v-if="todoList.length > 0"
    class="w-full rounded-lg border border-gray-600 divide-y divide-gray-600"
  >
    <TodoItem v-for="todo in todoList" :key="todo.id" :todo="todo" />
  </TransitionGroup>
</template>

<script>
import TodoItem from "./TodoItem.vue";

export default {
  components: {
    TodoItem,
  },
  props: {
    todoList: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
