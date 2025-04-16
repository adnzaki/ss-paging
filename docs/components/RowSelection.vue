<script setup>
import { usePagingStore } from '../../index';

const paging = usePagingStore()
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
