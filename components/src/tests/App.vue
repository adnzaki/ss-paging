<script setup>
import { usePagingStore } from '../../../index';
import { onMounted, ref } from 'vue';

const paging = usePagingStore()

const limit = 25
paging.state.rows = limit

const current = ref(1)
const showList = ref(true)

onMounted(() => {
  paging.getData({
    lang: 'english',
    limit,
    offset: current.value - 1,
    orderBy: 'name',
    searchBy: 'name',
    sort: 'DESC',
    search: '',
    url: `http://localhost/ss-paging-api-example/public/customer/get-data`,
    // url: `http://localhost/ss-paging-api-example/public/customer/get-customer`,
    useHeader: false,
    autoReset: 500,
    linkNum: 3,
    activeClass: 'active',
    debug: true,
    beforeRequest: () => {
      showList.value = false
    },
    afterRequest: () => {
      setTimeout(() => {
        showList.value = true   
        console.log('Full response: ', paging.state.rawResponse)     
      }, 300);
    }
  })
})

const tableColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'phone', label: 'Phone' },
]

const selected = ref([])
const onSelected = () => {
  console.log('selected: ', selected.value)
}

const isDesktop = () => {
  return window.innerWidth >= 768
}

</script>
<style>
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
}

[data-theme="dark"] {
  --bg-color: #121212;
  --text-color: #ffffff;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}

</style>

<template>
  <div style="width: 250px; box-sizing: border-box;">
    <sp-select 
      dark 
      :paging="paging" 
      :selected="limit" 
      row-label="baris"
      :options="[5,10,15,20,25]"
    />
    <p></p>
    <sp-searchbox 
      :paging="paging"
      placeholder="Search for customer name..." 
      v-model="paging.state.search" dark>
    </sp-searchbox>
  </div>
  
  <!-- result example -->
  <p>Current active page: {{ paging.activePage }}</p>
  <sp-navigation
    dark
    :paging="paging"
    v-model="current" use-input
    >
  </sp-navigation>  
  <sp-table 
    dark
    :paging="paging"
    :fields="tableColumns" 
    v-model="selected"
    selection
    @update:model-value="onSelected">
    <template #actionHeader>
      <th class="dark" :style="isDesktop() ? { width: '200px !important' } : { width: '100px !important' } ">Action</th>
    </template>
    <template #actionBody>
      <button class="action-button">Edit</button> &nbsp; 
      <button class="delete-button">Hapus</button>
    </template>
  </sp-table>
  
  <sp-navigation
    dark
    :paging="paging"
    v-model="current"
    >
  </sp-navigation> 
  <!-- <ul v-if="showList">
    <li v-for="(item, index) in paging.state.data" :key="index"> {{ paging.itemNumber(index) }} - {{ item.name }}</li>
  </ul>
  <p v-else><i>Loading...</i></p> -->
  <p>{{ paging.rowRange() }}</p>
  <h4>Full response from server:</h4>
  <div style="background-color: #400040; padding: 20px; color: aliceblue; border-radius: 10px; word-wrap: break-word; width: 90%;">
    <pre>
      {{ paging.state.rawResponse }}
    </pre>
  </div>
</template>