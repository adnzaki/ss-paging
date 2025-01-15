# Pagination Rows
SSPaging supports custom rows to control how many items should be displayed to the user. This is achieved by combining the `limit` and `rows` state along with the `showPerPage()` method.

## The Flow
- First, the user selects one of the row options.
- The selected option's value is bound to the `rows` state.
- Then, the `limit` state is updated to match the `rows` value.
- Finally, the `data` is refreshed with the new settings.

## Usage
Based on the flow described above, here's how you can create a complete template to implement pagination row selection:

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

:::