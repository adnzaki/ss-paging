<script setup>
import { usePagingStore } from '../../../index';
import { onMounted, ref } from 'vue';

const paging = usePagingStore()

const limit = 2
paging.state.rows = limit

const current = ref(1)
const showList = ref(true)

onMounted(() => {
  paging.getData({
    lang: 'english',
    limit,
    offset: current.value - 1,
    orderBy: 'institution_name',
    searchBy: 'institution_name',
    sort: 'ASC',
    search: '',
    url: `https://yesstudyabroad.com/public/admin/institute/get-data/all/all/none/none/null/`,
    autoReset: {
      active: true,
      timeout: 500
    },
    // linkNum: 3,
    activeClass: 'active',
    useAuth: false,
    debug: true,
    beforeRequest: () => {
      showList.value = false
    },
    afterRequest: () => {
      setTimeout(() => {
        showList.value = true        
      }, 300);
    }
  })
})

</script>

<template>
  <div style="width: 250px; box-sizing: border-box;">
    <sp-select :selected="limit" row-label="baris" :paging="paging"></sp-select>
    <p></p>
    <sp-searchbox placeholder="Search for institution name..." 
      :paging="paging"
      v-model="paging.state.search">
    </sp-searchbox>
  </div>
  <sp-navigation
    :paging="paging" v-model="current" use-input
    >
  </sp-navigation>  

  <!-- result example -->
  <p>Current active page: {{ paging.activePage }}</p>
  <ul v-if="showList">
    <li v-for="(item, index) in paging.state.data" :key="index"> {{ paging.itemNumber(index) }} - {{ item.name }}</li>
  </ul>
  <p v-else><i>Loading...</i></p>
  <p>{{ paging.rowRange() }}</p>
</template>