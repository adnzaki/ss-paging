<script setup>
import SSPaging from '../components/SSPaging.vue'
import ReloadButton from '../components/ReloadButton.vue'
</script>

# Applying Features
After preprared all necessary components, it's time to apply all SSPaging features so we will know how SSPaging works in real case. To apply SSPaging into our components, we need to get real data so we will make a request to https://yesstudyabroad.actudent.com to get public institution list from it. That website also uses SSPaging so the URL has matched our need.

## Getting Data
The first thing we have to do to apply SSPaging is getting data. Let's add SSPaging `getData()` method into `DataTable.vue`:
```js
onMounted(() => {
  const limit = 10
  paging.state.rows = limit

  paging.getData({
    lang: 'indonesia',
    limit,
    offset: 0,
    orderBy: 'institution_name',
    searchBy: 'institution_name',
    sort: 'ASC',
    search: '',
    url: `https://yesstudyabroad.actudent.com/admin/institute/get-data/all/all/none/none/null/`,
    autoReset: {
      active: true,
      timeout: 500
    },
    linkNum: 3,
    activeClass: 'active',
    useAuth: false,
    beforeRequest: () => {
      showTable.value = false
    },
    afterRequest: () => {
      setTimeout(() => {
        showTable.value = true
     }, 1000);
    }
  })
})

```
Note that `/all/all/none/none/null/` is additional part of the URL that used to filter data. You do not have to follow this URL pattern.

## Wrapping Up Components
The final part or this tutorial is wrapping up our components. It is just importing each component into our main component `SSPaging.vue`. The complete code of `SSPaging.vue` will be like this:
```vue
<script setup>
import { provide } from 'vue';
import { usePaging } from 'ss-paging-vue';
import DataTable from './DataTable.vue';
import Navigation from './Navigation.vue';
import RowSelection from './RowSelection.vue';
import SearchBox from './SearchBox.vue';

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
  <div class="row">
    <div class="col col-sm-6">
      <row-selection></row-selection>
    </div>
    <div class="col col-sm-6">
      <search-box></search-box>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <data-table></data-table>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <navigation></navigation>
    </div>
  </div>
</template>
```
<SSPaging></SSPaging>

## Reloading Data
SSPaging provides `runPaging()` method to reload data. This method is also used internally by SSPaging itself. Simply prepare an element like button and attach it into click event. In the above example we use a simple button to reload data table and attach `runPaging()` on its click event. Here is the code for reload button:
```vue
<script setup>
import { inject } from 'vue';

const paging = inject('paging')
</script>

<style scoped>
button {
  padding: 10px;
  margin-top: 10px;
  background: blueviolet;
  border-radius: 20px;
  font-weight: bold;
}
</style>

<template>
  <button @click="paging.runPaging()">Reload Pagination!</button>
</template>
```

## Next Steps
We have learned everything in SSPaging from its concept to real example through the tutorials. SSPaging is lightweight and very simple library that is even allows you to modify itself. SSPaging is under active development and any contributions are welcome via Github. Hope you enjoy coding with SSPaging!<br/>

<br/>
<i>- Adnan Zaki (Wolestech Devteam)</i>