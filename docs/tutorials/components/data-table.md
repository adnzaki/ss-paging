This component will be used to display our data to user. Now, create a file named `DataTable.vue`. Fill `DataTable.vue` with this code:
```vue [DataTable.vue]
<script setup>
import { toRefs, ref, inject } from 'vue';

const paging = inject('paging')
const { data } = toRefs(paging.state)
const showTable = ref(false)

</script>

<template>
  <table v-if="showTable">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Category</th>
        <th>Province</th>
        <th>City</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.province }}</td>
        <td>{{ item.city }}</td>
      </tr>
    </tbody>
  </table>
  <p v-else>Loading...</p>
</template>
```

Here we inject `paging` from main component `SSPaging`, add a loading indicator when getting data is in progress. The template will look like this if we have got the data:

