<template>
  <form class="flex items-center w-full" @submit.prevent="handleSubmit">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full p-3 px-5 bg-transparent border border-gray-700 rounded-l-lg outline-none"
      :class="{ 'border-red-500': todoInputFieldError }"
    />

    <input
      type="submit"
      value="Add"
      class="p-3 px-6 font-medium text-gray-800 bg-gray-100 border border-gray-100 rounded-r-lg cursor-pointer tex-lg"
      :class="{ 'border-red-500 bg-red-500': todoInputFieldError }"
    />
  </form>

  <span v-if="todoInputFieldError" class="block mt-2 text-red-500">
    {{ todoInputFieldError }}
  </span>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    modelValue: String,
    required: true,
    default: "",
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
