<script setup>
import { usePagingStore } from '../../../index';
import { onMounted, ref } from 'vue';

const paging = usePagingStore()

const limit = 5
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
    // url: `http://localhost/ss-paging-api-example/public/customer/get-using-post`,
    // url: `http://localhost/ss-paging-api-example/public/customer/get-customer`,
    // useHeader: true,
    // usePost: true,
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
    },
    onError: () => {
      alert('Unable to communicate with the server')
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

const darkMode = ref(true)

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  document.documentElement.setAttribute('data-theme', darkMode.value ? 'dark' : 'light')
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

.toggle-dark-mode {
  position: fixed;
  top: 30px;
  right: 30px;
  padding: 10px 20px;
  background-color: #2c133f;
  color: #fff;
  font-weight: bold;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-dark-mode:hover {
  padding: 10px 30px;
  right: 20px;
}

.toggle-dark-mode span.material-icons {
  transition: all 0.5s ease;
}

.toggle-dark-mode:hover span.material-icons {
  transform: scale(1.2);
}

.toggle-dark-mode.dark {
  background-color: #ced5ac;
  color: #201e1e;
}

</style>

<template>
  <button :class="['toggle-dark-mode', darkMode ? 'dark' : '']" @click="toggleDarkMode">
    <span class="material-icons">brightness_4</span>
  </button>
  <div style="width: 250px; box-sizing: border-box;">
    <sp-select 
      :dark="darkMode" 
      :paging="paging" 
      :selected="limit" 
      row-label="baris"
      :options="[5,10,15,20,25]"
    />
    <p></p>
    <sp-searchbox 
      :paging="paging"
      placeholder="Search for customer name..." 
      v-model="paging.state.search" :dark="darkMode">
    </sp-searchbox>
  </div>
  
  <!-- result example -->
  <p>Current active page: {{ paging.activePage }}</p>
  <sp-navigation
    :dark="darkMode"
    :paging="paging"
    v-model="current" use-input
    >
  </sp-navigation>  
  <sp-table 
    :dark="darkMode"
    :paging="paging"
    :fields="tableColumns" 
    v-model="selected"
    selection
    @update:model-value="onSelected">
    <template #actionHeader>
      <th class="dark" :style="isDesktop() ? { width: '200px !important' } : { width: '100px !important' } ">Action</th>
    </template>
    <template #actionBody>
      <td class="dark">
        <button class="action-button">Edit</button> &nbsp; 
        <button class="delete-button">Hapus</button>
      </td>
    </template>
  </sp-table>
  
  <sp-navigation
    :dark="darkMode"
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