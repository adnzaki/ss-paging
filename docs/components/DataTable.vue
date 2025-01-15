<script setup>
import { toRefs, onMounted, ref, inject } from 'vue';

const paging = inject('paging')
const { data } = toRefs(paging.state)
const showTable = ref(false)
const current = ref(1)

onMounted(() => {
  const limit = 25
  paging.state.rows = limit

  paging.getData({
    lang: 'english',
    limit,
    offset: current.value - 1,
    orderBy: 'name',
    searchBy: 'name',
    sort: 'ASC',
    search: '',
    url: `https://lib.actudent.com/sspaging-api-example/public/customer/get-data/`,
    autoReset: {
      active: true,
      timeout: 500
    },
    // linkNum: 3,
    activeClass: 'active',
    debug: true,
    beforeRequest: () => {
      showTable.value = false
    },
    afterRequest: () => {
      setTimeout(() => {
        showTable.value = true   
        console.log('Full response: ', paging.state.rawResponse)     
      }, 300);
    }
  })
})


</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>

<template>
  <table v-if="showTable">
    <thead>
      <tr>
        <th>#</th>
        <th @click="paging.sortData('name')" class="cursor-pointer">Name ^</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <td>{{ paging.itemNumber(index) }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.address }}</td>
      </tr>
    </tbody>
  </table>
  <p v-else>Loading...</p>
</template>