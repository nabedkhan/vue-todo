<template>
  <ul class="w-full border border-gray-600 divide-y divide-gray-600 rounded-lg">
    <li
      v-for="no in 5"
      :key="no"
      class="flex items-center justify-between gap-10 px-4 py-3"
    >
      <div class="flex-1 h-5 rounded-xl bg-slate-700"></div>

      <div class="flex items-center gap-3">
        <div class="w-6 h-6 rounded-full bg-slate-700"></div>
        <div class="w-6 h-6 rounded-full bg-slate-700"></div>
      </div>
    </li>
  </ul>
</template>
