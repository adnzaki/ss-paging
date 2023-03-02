# Pagination Rows
SSPaging supports custom rows to decide how many data should be displayed to user. It is done with combination of `limit` and `rows` state and `showPerPage()` method.

## The Flow
- The first step, user will choose one of some rows option. 
- Then the value of the selected option will be binded to `rows` state. 
- Then `limit` state will have the same value as `rows`, 
- and in the last step, `data` will be refreshed with those options.

## Usage
After reading the flow of pagination rows selection, let us create a full template that covers it:
::: code-group
```vue [Composition API]
<script setup>
import { usePaging } from 'ss-paging-vue'

const paging = usePaging()
</script>

<template>
  <select v-model="paging.state.rows" @change="paging.showPerPage()">
    <option disabled value="">Please select one</option>
    <option>10</option>
    <option>25</option>
    <option>50</option>
    <option>100</option>
    <option>250</option>
  </select>
</template>
```
```vue [Pinia]
<script setup>
import { usePagingStore } from 'ss-paging-vue'

const paging = usePagingStore()
</script>

<template>
  <select v-model="paging.rows" @change="paging.showPerPage()">
    <option disabled value="">Please select one</option>
    <option>10</option>
    <option>25</option>
    <option>50</option>
    <option>100</option>
    <option>250</option>
  </select>
</template>
```

:::

