Row selection is an important part of pagination. It allows users to choose their prefered rows of data to be displayed. In this example, we will create options with 10, 25, 50, 100 and 250 rows. Let's create a file named `RowSelection.vue` and fill with this code:
```vue
<script setup>
import { usePaging } from 'ss-paging-vue';

const paging = usePaging()
</script>

<style scoped>
select {
  padding: 10px 50px;
}
</style>

<template>
  <select v-model="paging.state.rows" @change="paging.showPerPage()">
    <option value="10">10 rows</option>
    <option value="25">25 rows</option>
    <option value="50">50 rows</option>
    <option value="100">100 rows</option>
    <option value="250">250 rows</option>
  </select>
</template>
```