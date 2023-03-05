<script setup>
import { inject, watch, computed } from 'vue';

const paging = inject('paging')

const search = computed(() => paging.state.search)
watch(search, () => paging.onSearchChanged())
</script>
<style scoped>
form input {
  padding: 5px;
  border-radius: 5px;
  border: solid 2px #228223;
  transition: .1s;
}
</style>

<template>
  <form @submit.prevent="paging.filter()">
    <input v-model="paging.state.search" placeholder="Search for name..." />
  </form>
</template>