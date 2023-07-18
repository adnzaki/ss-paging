# Displaying Data
SSPaging stores pagination data inside `data` state. It will be refreshed everytime request to server is made. In this section, we will guide you to create a simple HTML table and pagination links that enough to work with SSPaging. Before create those components, let us create the main template layout:
::: code-group
```vue [Composition API] 
<script setup>
import { toRefs } from 'vue'
import { usePaging } from 'ss-paging-vue'

const paging = usePaging()
const { 
  data, 
  pageLinks, 
  first, 
  prev, 
  next, 
  last 
} = toRefs(paging.state)
</script>

<template>
  <!-- Content goes here -->
</template>
```
```vue [Pinia] 
<script setup>
import { toRefs } from 'vue'
import { usePagingStore } from 'ss-paging-vue'

const paging = usePagingStore()
const { 
  data, 
  pageLinks, 
  first, 
  prev, 
  next, 
  last 
} = toRefs(paging.state)
</script>

<template>
  <!-- Content goes here -->
</template>
```

:::


## Table
Now let us create a table that contains data items. Assumes that we have data contains a list of names.
```html
<!-- Data Table -->
<table>
  <thead>
    <tr>
      <th>No</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <td>{{ index + 1 }}</td>
      <td>{{ item.name }}</td>
    </tr>
  </tbody>
</table>
```

## Pagination Item
Creating page navigation is as simple as create a HTML list element. You may add some classes to that element to get a better view.
```html
<!-- Pagination Items and Navigation -->
<ul>
  <li class="some-class">{{ first }}</li>
  <li class="some-class">{{ prev }}</li>
  <li v-for="(item, index) in pageLinks" :key="index" class="some-class">
    {{ item }}
  </li>
  <li class="some-class">{{ next }}</li>
  <li class="some-class">{{ last }}</li>
</ul>
```