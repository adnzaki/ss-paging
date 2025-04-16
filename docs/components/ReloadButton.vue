<script setup>
import { usePagingStore } from '../../index';

const paging = usePagingStore()
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
  <button @click="paging.reloadData()">Reload Pagination!</button>
</template>