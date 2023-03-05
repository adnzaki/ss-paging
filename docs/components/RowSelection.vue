<script setup>
import { inject } from 'vue';

const paging = inject('paging')
</script>
<style scoped>
select {
  padding: 10px 50px;
}
</style>
<template>
  <select v-model="paging.state.rows" @change="paging.showPerPage()">
    <option value="10">10 rows</option>
    <option value="25">25 rows</option>
    <option value="50">50 rows</option>
    <option value="100">100 rows</option>
    <option value="250">250 rows</option>
  </select>
</template>
