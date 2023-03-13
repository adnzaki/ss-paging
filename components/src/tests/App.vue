<script setup>
import { usePaging } from '../../../index';
import { onMounted, ref } from 'vue';

const paging = usePaging()
const limit = 2
paging.state.rows = limit

const current = ref(1)

onMounted(() => {
  paging.getData({
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
    // beforeRequest: () => {
    //   showTable.value = false
    // },
    afterRequest: () => {
      // console.log(paging.state.pageLinks)
    //   setTimeout(() => {
    //     showTable.value = true
    //  }, 1000);
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
    :paging="paging" v-model="current"
    >
  </sp-navigation>  

  <!-- result example -->
  <p>Current active page: {{ paging.activePage }}</p>
  <ul>
    <li v-for="(item, index) in paging.state.data" :key="index">{{ item.name }}</li>
  </ul>
</template>