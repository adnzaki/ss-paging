# Search
Basically, SSPaging does not provide any search functionality within the data. Since SSPaging is depend on server connection, searching is done on the server and the result sent to client. SSPaging only receive query from user and forward it to server to be processed.

## `filter()` method
SSPaging provides `filter()` to handle searching on server-side. SSPaging takes search query from user and store it in `search` state. When you set `searchBy` option in `getData()`, it will be used to determine which field in database to be used in search query. In order to make `filter()` works, it needs an input from user that binded to `search` state. 

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
    <input v-model="paging.search" />
  </form>
</template>
```
:::
As you can see above, searching data in SSPaging is very simple. Simply call the `filter()` method and bind the `search` state, and searching is done in the background.