<template>
  <div class="flex items-center gap-4 w-full my-6">
    <button
      v-for="action in actions"
      :key="action"
      class="border border-gray-600 py-1 px-2 rounded-lg text-xs font-medium uppercase flex-1"
      @click="$emit('filter', action)"
      :class="{
        'bg-slate-700 border-slate-500': filterValue === action.toLowerCase(),
      }"
    >
      {{ action }} - ({{ todoLength[action.toLowerCase()] }})
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      actions: ["All", "Complete", "Incomplete"],
    };
  },

  props: {
    filterValue: String,
    todoLength: Object,
  },
};
</script>
