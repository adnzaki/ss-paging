# Getting Started
The only way to run SSPaging is through the `getData()` method. It will save configurations, get the data from server, return to client and generate pagination.

## Installation
SSPaging can be installed using NPM:
```
npm install ss-paging-vue
```
After it is installed, you can import the composables or Pinia version of SSPaging (choose one depend on your need!).
```javascript
import { usePaging, usePagingStore } from 'ss-paging-vue'

// in composables mode
const paging = usePaging()

// in Pinia mode
const paging = usePagingStore()
```
For use without build tool, you can include SSPaging via CDN:
```html
<script src="https://unpkg.com/ss-paging-vue@2.3.0/dist/ss-paging.dist.js"></script>
```
```javascript
// in your JS file
const paging = SSPaging.usePaging()
```

## Get Data
The main method of SSPaging is `getData()`, it uses `fetch()` in the background to send request and get the response from server. This method is the main actor of SSPaging, since it will get the data, set and save options and run the pagination generator. SSPaging consists of two arguments: `(options: object, callFromRunPaging: boolean)`. `options` is required in this method calls, while `callFromRunPaging` only use in internal code and <strong>should never be set</strong>. 

## Example
::: code-group
```js{14,27} [Composition API]
const limit = 5
paging.state.rows = limit
paging.getData({
  lang: 'indonesia',
  limit,
  offset: 0,
  orderBy: 'name',
  searchBy: 'name', // or array ['name', 'email']
  sort: 'ASC',
  search: '',
  url: `http://localhost/my-project/get-data/`,

  // if you use your own URL pattern
  // rawUrl: `http://localhost/my-project/get-data/{limit}/{offset}/{orderBy}/{searchBy}/{sort}/{search}` 
  autoReset: {
    active: true,
    timeout: 500
  },
  delay: {
    active: true,
    timeout: 200
  },
  linkNum: 3,
  linkClass: 'page-item',
  activeClass: 'active',
  useAuth: false, // if you do not use token-based authentication or using session
  // token: yourToken, // do not set useAuth if you use token-based authentication
  beforeRequest: () => {
    // do something
  },
  afterRequest: () => {
    // do something
  }
})

```
```js{14,27} [Pinia]
const limit = 5
paging.rows = limit
paging.getData({
  lang: 'indonesia',
  limit,
  offset: 0,
  orderBy: 'name',
  searchBy: 'name', // or array ['name', 'email']
  sort: 'ASC',
  search: '',
  url: `http://localhost/my-project/get-data/`,

  // if you use your own URL pattern
  // rawUrl: `http://localhost/my-project/get-data/{limit}/{offset}/{orderBy}/{searchBy}/{sort}/{search}` 
  autoReset: {
    active: true,
    timeout: 500
  },
  delay: {
    active: true,
    timeout: 200
  },
  linkNum: 3,
  linkClass: 'page-item',
  activeClass: 'active',
  useAuth: false, // if you do not use token-based authentication or using session
  // token: yourToken, // do not set useAuth if you use token-based authentication
  beforeRequest: () => {
    // do something
  },
  afterRequest: () => {
    // do something
  }
})

```
:::
As you can see on the example above, the difference between Composition API and Pinia version is the way to access the state. In Pinia, you get access the state with `paging.rows`, while in the Composition API you you get access to state with `paging.state.rows`. Both versions can be destructured using Vue's `toRefs` as below:
::: code-group
```js [Composition API]
const { rows } = toRefs(paging.state)

console.log(rows)
```
```js [Pinia]
const { rows } = toRefs(paging)

console.log(rows)
```
:::

## Usage with Options API
Though SSPaging is designed to work best with Composition API or Pinia, it is still possible to use SSPaging with Options API. For those who do not use build tools, or using Vue as progressive enhancements, using Options API may be a good choice to implement SSPaging. Using SSpaging is simply expose its instance into `setup()`. Here is a complete reference to use SSPaging with Options API:
::: code-group
```js [Options API Setup]
const app = Vue.createApp({
  setup() {
    return {
      paging: SSPaging.usePaging()
    }
  },
  methods: {
    nav(page) {
      this.paging.nav(page - 1)
    }
  }
}).mount('#app')
```
```html [Template]
<!-- Access nav() method that executes paging.nav() -->
<button>{{ nav(1) }}</button>

<!-- Access directly to SSPaging -->
<p>{{ paging.rowRange() }}</p>
```
:::

## Example Method
In this documentation, we will use [Single-File Components (SFC)](https://vuejs.org/guide/scaling-up/sfc.html) for all examples. If you do not familiar with SFCs, you can still implement from the example by splitting the code in a separate HTML and JS files. Also for CDN installation, you do not need the import statement since SSPaging and all Vue-related features are automatically available.