# Search
SSPaging does not provide built-in search functionality within the data. Since SSPaging relies on server connection, searching is performed on the server side, and the results are sent to the client. SSPaging only receives the user's query and forwards it to the server for processing.

## `filter()` Method
SSPaging provides the `filter()` method to handle server-side searching. SSPaging captures the search query from the user and stores it in the `search` state. When you set the `searchBy` option in `getData()`, it determines which database field to use for the search query. For `filter()` to work, you need an input element bound to the `search` state.

## Usage
::: code-group
```vue [Composition API]
<script setup>
import { usePaging } from 'ss-paging-vue'

const paging = usePaging()
</script>

<template>
  <form @submit.prevent="paging.filter()">
    <input v-model="paging.state.search" />
  </form>
</template>
```
```vue [Pinia]
<script setup>
import { usePagingStore } from 'ss-paging-vue'

const paging = usePagingStore()
</script>

<template>
  <form @submit.prevent="paging.filter()">
    <input v-model="paging.state.search" />
  </form>
</template>
```
:::
As shown above, searching data in SSPaging is simple. Just call the `filter()` method and bind the `search` state, and the search will be performed in the background.