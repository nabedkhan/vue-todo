<template>
  <li class="px-4 py-2 flex items-center justify-between">
    <p class="text-lg font-medium" :class="{ 'line-through': todo.complete }">
      {{ todo.title }}
    </p>

    <div class="flex gap-3 items-center">
      <label :for="todo.id">
        <input
          :id="todo.id"
          type="checkbox"
          class="hover:cursor-pointer hidden"
          :checked="todo.complete"
          @input="handleTodoComplete(todo.id)"
        />

        <svg
          v-if="todo.complete"
          fill="none"
          viewBox="0 0 24 24"
          class="w-5 h-5 fill-white text-white cursor-pointer"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
            fill="currentColor"
          />

          <circle cx="12" cy="12" r="5.25" fill="currentColor" />
        </svg>

        <svg
          v-else
          id="todoToggle"
          viewBox="0 0 512 512"
          class="stroke-white stroke-[3rem] fill-none w-5 h-5 cursor-pointer"
        >
          <path
            d="M448,256c0-106-86-192-192-192S64,150,64,256s86,192,192,192S448,362,448,256Z"
          />
        </svg>
      </label>

      <!-- TODO DELETE BUTTON -->
      <button
        class="text-xl font-medium leading-none"
        @click="$emit('delete', todo.id)"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          class="stroke-white stroke-[2px] fill-none w-5 h-5"
        >
          <path d="M4 7H20" stroke-linecap="round" stroke-linejoin="round" />
          <path
            d="M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    todo: Object,
    handleTodoComplete: Function,
  },
};
</script>
