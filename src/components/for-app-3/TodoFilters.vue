<template>
  <div class="flex items-center gap-4 w-full my-6">
    <button
      v-for="action in actions"
      :key="action"
      class="border border-gray-600 py-1 px-2 rounded-lg text-xs font-medium uppercase flex-1"
      @click="$emit('update:modelValue', action)"
      :class="{ 'bg-slate-700 border-slate-500': modelValue === action }"
    >
      {{ action }} - ({{ todoLength[action] }})
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actions: ["all", "complete", "incomplete"],
    };
  },

  props: {
    todoLength: Object,
    modelValue: String,
  },
};
</script>
