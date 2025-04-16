# Preparing Template

In this tutorial, we'll guide you step by step on how to create a template for your complete pagination system, which includes row selection, a search box, a data table, and navigation. We'll use the Pinia version of SSPaging for this example.

## Installing Pinia
To use Pinia in your app, please refer to the installation guide [here](https://pinia.vuejs.org/getting-started.html#Installation). Once installed, you can use the Pinia version of SSPaging.

## Why Use Pinia?  
In real-world applications, managing deeply nested components can be difficult. Since SSPaging is often used across multiple components—and sometimes even within the store itself—it's strongly recommended to understand how to use the Pinia version of SSPaging. And using the Pinia version of SSPaging only requires adding the word **"Store"** to the import statement and its definition, as shown below:
```js
import { usePagingStore } from 'ss-paging-vue';

const paging = usePagingStore()
```
While the normal version is:
```js
import { usePaging } from 'ss-paging-vue';

const paging = usePaging()
```
However, note that this approach requires using `provide` and `inject` in nested components. <br/>
::: tip
Although you use the Pinia version of SSPaging, it only requires basic knowledge of Pinia, such as how to install it and use it within a Vue application. *We've done the heavy lifting* — **you enjoy the benefits!**
:::

## Main Component

The first component we need is the main component called `SSPaging.vue`. This component will wrap all the necessary SSPaging components. Here's how you can set it up:

```vue
<script setup>
import { usePagingStore } from 'ss-paging-vue';

const paging = usePagingStore()
</script>

<style scoped>
.row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.row > * {
  padding-left: 5px;
  padding-right: 5px;
  margin-top: 10px;
}

.col {
  flex: 1 0 0%;
}

@media (min-width: 576px) {
  .col-sm-6 {
    flex: 0 0 auto;
    width: 50%;
  }
}
</style>

<template>
  <!-- All child components will go here -->
</template>
```

## Data Table

The `DataTable.vue` component will be used to display the data to the user. Create a file named `DataTable.vue` and add the following code:

```vue [DataTable.vue]
<script setup>
import { toRefs, ref } from 'vue';
import { usePagingStore } from 'ss-paging-vue';

const paging = usePagingStore()
const { data } = toRefs(paging.state)
const showTable = ref(true)
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
        <td>{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.address }}</td>
      </tr>
    </tbody>
  </table>
  <p v-else>Loading...</p>
</template>
```

::: info
In the name header, we add `paging.sortData()` to sort the data. The `'name'` is the field name in the database.
:::

## Row Selection

The row selection component allows users to choose how many rows of data to display. For this example, we offer options of 10, 25, 50, 100, and 250 rows. Create a file named `RowSelection.vue` and add this code:

```vue
<script setup>
import { usePagingStore } from 'ss-paging-vue';

const paging = usePagingStore()
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

This component binds the selected value to `paging.state.rows` and triggers `paging.showPerPage()` when the value changes.

::: info
The select value is bound to `paging.state.rows`, and when it changes, the `paging.showPerPage()` method is called.
:::

## Search Box

To allow users to search for specific data, we create a search box. The search box is bound to `paging.state.search`. When the user submits the form, it triggers `paging.filter()`. Create a file named `SearchBox.vue` with the following code:

```vue
<script setup>
import { watch, computed } from 'vue';
import { usePagingStore } from 'ss-paging-vue';

const paging = usePagingStore()
const search = computed(() => paging.state.search)
watch(search, () => paging.onSearchChanged())
</script>

<style scoped>
form input {
  padding: 5px;
  border-radius: 5px;
  border: solid 2px #228223;
  transition: .1s;
}
</style>

<template>
  <form @submit.prevent="paging.filter()">
    <input v-model="paging.state.search" placeholder="Search for name..." />
  </form>
</template>
```

This search box will automatically reset the data table when `paging.state.search` is empty.

::: info
If `paging.state.search` is empty, `paging.onSearchChanged()` is triggered to reset the data table to its default state.
:::

## Navigation

The navigation component provides the user with pagination controls such as "First", "Prev", "Next", and "Last" links. It also displays page numbers. Create a file named `Navigation.vue` and add this code:

```vue
<script setup>
import { toRefs } from 'vue';
import { usePagingStore } from 'ss-paging-vue';

const paging = usePagingStore()
const { numLinks, pageLinks, first, prev, next, last } = toRefs(paging.state)
</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
}

ul li a {
  padding: 10px;
  background-color: rgb(41, 190, 140);
  color: #fff;
}

ul li a:hover {
  background-color: rgb(24, 160, 115);
  color: #fff;
}

ul li:first-child {
  margin-top: 8px;
}

/* Style for active link */
.active {
  background-color: rgb(24, 160, 115);
}

/* Style for disabled link */
.disabled,
ul li a.disabled:hover {
  cursor: default;
  color: #9b9999;
  background-color: rgb(25, 118, 87);
}
</style>

<template>
  <ul>
    <li><a href="#" :class="paging.isDisabled(first)" @click="paging.nav(first)">First</a></li>
    <li><a href="#" :class="paging.isDisabled(prev)" @click="paging.nav(prev)">Prev</a></li>
    <li v-if="numLinks" v-for="(item, index) in pageLinks" :key="index">
      <a href="#" :class="paging.activeLink(item)" @click="paging.nav(item - 1)">{{ item }}</a>
    </li>
    <li><a href="#" :class="paging.isDisabled(next)" @click="paging.nav(next)">Next</a></li>
    <li><a href="#" :class="paging.isDisabled(last)" @click="paging.nav(last)">Last</a></li>
  </ul>
</template>
```

This navigation component provides functional pagination controls with proper styling.

::: info
The links for page numbers are not visible yet, and all links are currently disabled because we haven't wrapped the components together yet.
:::

Now you're ready to integrate these components into your main template, allowing you to display a fully functional pagination system!