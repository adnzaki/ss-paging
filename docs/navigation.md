# Navigation
SSPaging supports 5 types of navigation:
- Go to the first page
- Go to the previous page
- Go to the next page
- Go to the last page
- Go to a specific page

## Navigation Helpers
SSPaging provides reactive state-based navigation helpers to simplify page navigation. These helpers include references to the first, previous, next, and last pages. Accessing them is as easy as working with any state. Here’s an example:

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
const { first, prev, next, last } = toRefs(paging.state)

paging.nav(first) // go to the first page
paging.nav(prev) // go to the previous page
paging.nav(next) // go to the next page
paging.nav(last) // go to the last page
```
:::

## Specific Page Navigation
SSPaging uses a zero-based index for offset, which is sent to the server. However, the page links are one-based, so you need to subtract 1 to ensure the correct offset. For instance, if the current active page is 5, you should pass `5 - 1` to `paging.nav()` to go to page 5. Here's how it works:

```js
const currentPage = 5 // this is a 1-based index

paging.nav(currentPage - 1) // go to page 5 with a 0-based index
paging.nav(currentPage - 2) // go to page 4 with a 0-based index

// offset value 5 is equal to page 6, so this will navigate to page 6
paging.nav(currentPage) 
```