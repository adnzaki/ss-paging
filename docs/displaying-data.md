# Displaying Data
SSPaging stores pagination data inside the `data` state, which is refreshed every time a request is made to the server. In this section, we will guide you through creating a simple HTML table and pagination links that work with SSPaging. First, let’s set up the main template layout:

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
Now, let's create a table that displays data items. Assume we have a data list containing names.

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
Creating page navigation is simple using an HTML list element. You can add classes to enhance the appearance.

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