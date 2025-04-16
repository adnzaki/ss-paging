<script setup>
import SSPaging from '../components/SSPaging.vue'
import ReloadButton from '../components/ReloadButton.vue'
</script>

# Applying Features
After preprared all necessary components, it's time to apply all SSPaging features so we will know how SSPaging works in real case. To apply SSPaging into our components, we need to get real data so we will make a request to https://lib.actudent.com/ss-paging-api-example to get dummy data from it.

## Getting Data
The first thing we have to do to apply SSPaging is getting data. Let's add SSPaging `getData()` method into `DataTable.vue`:
::: code-group
```js [Using default URL pattern]
// DataTable.vue
import { toRefs, onMounted, ref, inject } from 'vue';

const paging = inject('paging')
const { data } = toRefs(paging.state)
const showTable = ref(false)
const current = ref(1)

onMounted(() => {
  const limit = 25
  paging.state.rows = limit

  paging.getData({
    lang: 'english',
    limit,
    offset: current.value - 1,
    orderBy: 'name',
    searchBy: 'name',
    sort: 'ASC',
    search: '',
    url: 'https://lib.actudent.com/sspaging-api-example/public/customer/get-data',
    autoReset: 500,
    linkNum: 3,
    activeClass: 'active',
    debug: true,
    beforeRequest: () => {
      showTable.value = false
    },
    afterRequest: () => {
      setTimeout(() => {
        showTable.value = true   
        console.log('Full response: ', paging.state.rawResponse)     
      }, 300);
    },
    onError: () => {
      alert('Unable to communicate with the server')
    }
  })
})

```
```js [Using HTTP header]
// DataTable.vue
import { toRefs, onMounted, ref, inject } from 'vue';

const paging = inject('paging')
const { data } = toRefs(paging.state)
const showTable = ref(false)
const current = ref(1)

onMounted(() => {
  const limit = 25
  paging.state.rows = limit

  paging.getData({
    lang: 'english',
    limit,
    offset: current.value - 1,
    orderBy: 'name',
    searchBy: 'name',
    sort: 'ASC',
    search: '',
    url: 'https://lib.actudent.com/sspaging-api-example/public/customer/get-customer',
    autoReset: 500,
    useHeader: true // [!code ++]
    linkNum: 3,
    activeClass: 'active',
    debug: true,
    beforeRequest: () => {
      showTable.value = false
    },
    afterRequest: () => {
      setTimeout(() => {
        showTable.value = true   
        console.log('Full response: ', paging.state.rawResponse)     
      }, 300);
    },
    onError: () => {
      alert('Unable to communicate with the server')
    }
  })
})

```
```js [Using POST Request]
// DataTable.vue
import { toRefs, onMounted, ref, inject } from 'vue';

const paging = inject('paging')
const { data } = toRefs(paging.state)
const showTable = ref(false)
const current = ref(1)

onMounted(() => {
  const limit = 25
  paging.state.rows = limit

  paging.getData({
    lang: 'english',
    limit,
    offset: current.value - 1,
    orderBy: 'name',
    searchBy: 'name',
    sort: 'ASC',
    search: '',
    url: 'https://lib.actudent.com/sspaging-api-example/public/customer/get-customer',
    autoReset: 500,
    usePost: true // [!code ++]
    linkNum: 3,
    activeClass: 'active',
    debug: true,
    beforeRequest: () => {
      showTable.value = false
    },
    afterRequest: () => {
      setTimeout(() => {
        showTable.value = true   
        console.log('Full response: ', paging.state.rawResponse)     
      }, 300);
    },
    onError: () => {
      alert('Unable to communicate with the server')
    }
  })
})

```
:::


## Rows Numbering
In previous example, we get rows number from `index + 1`. It is good enough for most cases, but this method will not continue numbering on the next page, so the row number will back to 1 if we navigate to the next page. The good news is SSPaging provides built-in method to provide continous rows numbering. We can get access to this method by calling `paging.itemNumber(index)`. <br/>
Let's modify `DataTable.vue` to give it continous numbering:
```html
<!-- DataTable.vue -->
<tbody>
  <tr v-for="(item, index) in data" :key="index">
    <td>{{ index + 1 }}</td> 
    <td>{{ paging.itemNumber(index) }}</td> 
    <td>{{ item.name }}</td>
    <td>{{ item.email }}</td>
    <td>{{ item.phone }}</td>
    <td>{{ item.address }}</td>
  </tr>
</tbody>
```

## Data Range
SSPaging provides a method for showing data table range via `paging.rowRange()`. Here is the code for our main component later:
```html
<p>{{ paging.rowRange() }}</p>
```

## Reloading Data
SSPaging provides `reloadData()` method to reload data. This method is also used internally by SSPaging itself. Simply prepare an element like button and attach it into click event. Here is the code for reload button:
```vue
<!-- ReloadButton.vue -->
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
  <button @click="paging.reloadData()">Reload Pagination!</button>
</template>
```

## Wrapping Up Components
The final part or this tutorial is wrapping up our components. It is just importing each component into our main component `SSPaging.vue`. The complete code of `SSPaging.vue` will be like this:
```vue
<script setup>
import { provide } from 'vue';
import { usePagingStore } from 'ss-paging-vue';
import DataTable from './DataTable.vue'; 
import Navigation from './Navigation.vue'; 
import RowSelection from './RowSelection.vue'; 
import SearchBox from './SearchBox.vue'; 
import ReloadButton from './ReloadButton.vue'; 

const paging = usePagingStore()
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
  <p>{{ paging.rowRange() }}</p> 
  <div class="row"> 
    <div class="col"> 
      <navigation></navigation> 
    </div> 
  </div> 
  <div class="row"> 
    <div class="col"> 
      <reload-button></reload-button> 
    </div> 
  </div> 
</template>
```
<SSPaging></SSPaging>
## Next Steps
We have learned everything in SSPaging from its concept to real example through the tutorials. SSPaging is lightweight and very simple library that is even allows you to modify itself. SSPaging is under active development and any contributions are welcome via Github. Hope you enjoy coding with SSPaging!<br/>

<br/>
<i>- Adnan Zaki (Wolestech Devteam)</i>