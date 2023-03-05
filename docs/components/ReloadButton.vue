<script setup>
import { inject } from 'vue';

const paging = inject('paging')
</script>

<style scoped>
button {
	padding: 10px;
  margin-top: 10px;
	background: blueviolet;
	border-radius: 20px;
	font-weight: bold;
}
</style>

<template>
  <button @click="paging.runPaging()">Reload Pagination!</button>
</template>