<script setup>
import { toRefs, onMounted, ref, inject } from 'vue';

const paging = inject('paging')
const { data } = toRefs(paging.state)
const showTable = ref(false)

onMounted(() => {
  const limit = 10
  paging.state.rows = limit

  paging.getData({
    lang: 'english',
    limit,
    offset: 0,
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
      showTable.value = false
    },
    afterRequest: () => {
      setTimeout(() => {
        showTable.value = true
     }, 1000);
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
        <th @click="paging.sortData('institution_name')" class="cursor-pointer">Name ^</th>
        <th>Category</th>
        <th>Province</th>
        <th>City</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <td>{{ paging.itemNumber(index) }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.province }}</td>
        <td>{{ item.city }}</td>
      </tr>
    </tbody>
  </table>
  <p v-else>Loading...</p>
</template>