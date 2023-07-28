<template>
  <form class="flex items-center w-full" @submit.prevent="$emit('create')">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="border border-gray-700 bg-transparent p-3 px-5 rounded-l-lg outline-none w-full"
    />

    <input
      type="submit"
      value="Add"
      class="bg-gray-100 text-gray-800 p-3 px-6 rounded-r-lg tex-lg font-medium border border-gray-100"
    />
  </form>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
};
</script>
