<template>
  <form class="flex items-center w-full" @submit.prevent="handleSubmit">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="border border-gray-700 bg-transparent p-3 px-5 rounded-l-lg outline-none w-full"
      :class="{ 'border-red-500': todoInputFieldError }"
    />

    <input
      type="submit"
      value="Add"
      class="bg-gray-100 text-gray-800 p-3 px-6 rounded-r-lg tex-lg font-medium border border-gray-100 cursor-pointer"
      :class="{ 'border-red-500 bg-red-500': todoInputFieldError }"
    />
  </form>

  <span v-if="todoInputFieldError" class="text-red-500 mt-2 block">
    {{ todoInputFieldError }}
  </span>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },

  data() {
    return {
      todoInputFieldError: "",
    };
  },

  methods: {
    handleSubmit() {
      if (this.modelValue) {
        this.$emit("create");
        return;
      }

      this.todoInputFieldError = "Todo Title is required!";
    },
  },
};
</script>
