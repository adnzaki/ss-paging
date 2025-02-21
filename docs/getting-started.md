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
<script src="https://unpkg.com/ss-paging-vue@latest/dist/ss-paging.dist.js"></script>
```
```javascript
// in your JS file
const paging = SSPaging.usePaging()
```

## Get Data
The main method of SSPaging is `getData()`, it uses `fetch()` in the background to send request and get the response from server. This method is the main actor of SSPaging, since it will get the data, set and save options and run the pagination generator. SSPaging consists of two arguments: `(options: object, callFromRunPaging: boolean)`. `options` is required in this method calls, while `callFromRunPaging` only use in internal code and <strong>should never be set</strong>. 

## Example
```js
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

  autoReset: 500,
  delay: 200,
  linkNum: 3,
  linkClass: 'page-item',
  activeClass: 'active',
  // useHeader: true // If enabled (set to true), it will send limit, offset, orderBy, and sort as request headers.
  // usePost: true // If you prefer using POST method to make request
  // token: yourToken, // do not set useAuth if you use token-based authentication
  beforeRequest: () => {
    // do something
  },
  afterRequest: () => {
    // do something
  }
})

```
::: tip
You can also destructure the state using Vue's `toRefs` as below:

```js
const { rows } = toRefs(paging.state)

console.log(rows)
```
:::
## Usage with Options API
Although SSPaging is designed to work best with the Composition API or Pinia, it can still be used with the Options API. For those who don't use build tools or are utilizing Vue for progressive enhancement, the Options API can be a good choice for implementing SSPaging. To use SSPaging, simply expose its instance within the `setup()` hook. Below is a complete reference for using SSPaging with the Options API.

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
This documentation uses [Single-File Components (SFC)](https://vuejs.org/guide/scaling-up/sfc.html) for all examples. If you're not familiar with SFCs, you can implement the example by splitting the code into separate HTML and JS files. For CDN installation, you **do not need** the import statement, as SSPaging and all Vue-related features are automatically available.