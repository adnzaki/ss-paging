<script setup>
import { usePaging, usePagingStore } from '../../../index';
import { onMounted, ref } from 'vue';

const paging = usePaging()
const pagingStore = usePagingStore()

const limit = 2
pagingStore.state.rows = limit

const current = ref(1)

onMounted(() => {
  pagingStore.getData({
    lang: 'english',
    limit,
    offset: current.value - 1,
    orderBy: 'institution_name',
    searchBy: 'institution_name',
    sort: 'ASC',
    search: '',
    url: `https://yesstudyabroad.actudent.com/admin/institute/get-data/all/all/none/none/null/`,
    autoReset: {
      active: true,
      timeout: 500
    },
    linkNum: 3,
    activeClass: 'active',
    useAuth: false,
    beforeRequest: () => {
      console.log(pagingStore.state)
    },
    afterRequest: () => {
      console.log(pagingStore.state)
    }
  })
})

</script>

<template>
  <div style="width: 250px; box-sizing: border-box;">
    <sp-select :selected="limit" row-label="baris" :paging="pagingStore"></sp-select>
    <p></p>
    <sp-searchbox placeholder="Search for institution name..." 
      :paging="pagingStore"
      v-model="pagingStore.state.search">
    </sp-searchbox>
  </div>
  <sp-navigation
    :paging="pagingStore" v-model="current"
    >
  </sp-navigation>  

  <!-- result example -->
  <p>Current active page: {{ pagingStore.activePage }}</p>
  <ul>
    <li v-for="(item, index) in pagingStore.state.data" :key="index">{{ item.name }}</li>
  </ul>
</template>