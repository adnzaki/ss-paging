<script setup>
import SSPaging from '../components/SSPaging.vue'
import DataTable from '../components/DataTable.vue'
import RowSelection from '../components/RowSelection.vue'
import SearchBox from '../components/SearchBox.vue'
import Navigation from '../components/Navigation.vue'
import PagingTable from '../components/paging-table.vue'
import PagingRowSelect from '../components/paging-row-select.vue'
import PagingSearch from '../components/paging-search.vue'
import PagingNavigation from '../components/paging-navigation.vue'
</script>

# Preparing Template
In this tutorial, we will learn step by step how to create template for our complete pagination that consists of row selection, search box, data table and navigation. In our template, we will use composables version of SSPaging.

## Main Component
The first component to be created is our main component named `SSPaging.vue`. This component will wrap up all necessary components in SSPaging by providing the `paging` object to be injected. Let's fill out with this code.
```vue
<script setup>
import { provide } from 'vue';
import { usePaging } from 'ss-paging-vue';

const paging = usePaging()
provide('paging', paging)
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
</template>
```

## Data Table
This component will be used to display our data to user. Now, create a file named `DataTable.vue`. Fill `DataTable.vue` with this code:
```vue [DataTable.vue]
<script setup>
import { toRefs, onMounted, ref, inject } from 'vue';

const paging = inject('paging')
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
        <th>Name</th>
        <th>Category</th>
        <th>Province</th>
        <th>City</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <td>{{ index + 1 }}</td>
        <th @click="paging.sortData('institution_name')" class="cursor-pointer">
          Name ^
        </th>
        <td>{{ item.category }}</td>
        <td>{{ item.province }}</td>
        <td>{{ item.city }}</td>
      </tr>
    </tbody>
  </table>
  <p v-else>Loading...</p>
</template>
```

Here we inject `paging` from main component `SSPaging` and add a loading indicator when getting data is in progress. The template will look like this if we have got the data:
<PagingTable></PagingTable>

::: info
Note that in name header, we add `paging.sortData()` to sort data, while `institution_name` is field name in the database.
:::

## Row Selection
Row selection is an important part of pagination. It allows users to choose their prefered rows of data to be displayed. In this example, we will create options with 10, 25, 50, 100 and 250 rows. Let's create a file named `RowSelection.vue` and fill with this code:
```vue
<script setup>
import { inject } from 'vue';

const paging = inject('paging')
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
Now we have a component like this:
<PagingRowSelect></PagingRowSelect>

::: info
The select value is binded to `paging.state.rows`, and whenever the value changes, it will trigger `paging.showPerPage()` to run.
::: 

## Search Box
To handle user's query search, we need a single text input that binded to `paging.state.search`. Whenever users hit enter, it executes `paging.filter()` method. Let's create a file named `SearchBox.vue` and fill with this code:
```vue
<script setup>
import { inject, watch, computed } from 'vue';

const paging = inject('paging')
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
Now we have a template like this:
<PagingSearch></PagingSearch>
::: info
In our search box, we enable auto reset function if `paging.state.search` is empty. In this case we will watch `paging.state.search` and `paging.onSearchChanged()` will automatically reset data table to its default if `paging.state.search` is empty.
:::

## Navigation
The last component of pagination we have to have to create is navigation. To create a fully functional navigation, we need some CSS styles applied to it. Let's create a file named `Navigation.vue` and fill with this code:
```vue
<script setup>
import { toRefs, inject } from 'vue';

const paging = inject('paging')
const { 
  numLinks, 
  pageLinks,
  first,
  prev,
  next,
  last
} = toRefs(paging.state)
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

.active {
  background-color: rgb(24, 160, 115);
}
</style>

<template>
  <ul>
    <li><a href="#" @click="paging.nav(first)">First</a></li>
    <li><a href="#" @click="paging.nav(prev)">Prev</a></li>
    <li v-if="numLinks" v-for="(item, index) in pageLinks" :key="index">
      <a href="#" :class="paging.activeLink(item)" @click="paging.nav(item - 1)">{{ item }}</a>
    </li>
    <li><a href="#" @click="paging.nav(next)">Next</a></li>
    <li><a href="#" @click="paging.nav(last)">Last</a></li>
  </ul>
</template>
```
And now we have a basic navigation component like this:
<PagingNavigation></PagingNavigation>

::: info
The link numbers does not appear because we have not wrap up the components together.
::: 