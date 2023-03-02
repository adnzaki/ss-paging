# Navigation
Like other pagination library, SSPaging has 5 types of navigation as follows:
- Go to the first page
- Go to the previous page
- Go to the next page
- Go to the last page
- Go to the spesific page

## Navigation Helpers
SSPaging provides navigation helpers to ease you while navigating the page. These helpers is in the form of reactive state that contain first, previous, next and the last page. Getting access to these helpers is as simple as usual state. Here is the complete example:
::: code-group
```js [Composition API]
import { toRefs } from 'vue'
import { usePaging } from 'ss-paging-vue'

const paging = usePaging()
const { first, prev, next, last } = toRefs(paging.state)

paging.nav(first) // go to the first page
paging.nav(prev) // go to the previous page
paging.nav(next) // go to the next page
paging.nav(last) // go to the last page
```
```js [Pinia]
import { toRefs } from 'vue'
import { usePagingStore } from 'ss-paging-vue'

const paging = usePagingStore()
const { first, prev, next, last } = toRefs(paging)

paging.nav(first) // go to the first page
paging.nav(prev) // go to the previous page
paging.nav(next) // go to the next page
paging.nav(last) // go to the last page
```

:::

## Specific Page Navigation
Basically, SSPaging uses zero-based index as an offset that will be sent to server. While the number links in SSPaging is one-based index, we should add `-1` in order to make SSPaging get a correct offset. So, if current active page in link number is 5 and you want to go to page 5, you have to pass `5-1` to `paging.nav()`. Here is the complete example:
```js
const currentPage = 5 // this is 1-based index

paging.nav(currentPage - 1) // go to page 5 with 0-based index
paging.nav(currentPage - 2) // go to page 4 with 0-based index

// offset value 5 is equal to page 6, so this will navigate to page 6
paging.nav(currentPage) 
```
