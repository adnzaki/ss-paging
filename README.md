<p align="center">
  <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">
    <img width="100" src="https://lib.actudent.com/ss-paging/sspaging-logo.png" alt="SSPaging logo">
  </a>
</p>

<p align="center">
  <img alt="npm" src="https://img.shields.io/npm/dt/ss-paging-vue">
  <img alt="npm" src="https://img.shields.io/npm/v/ss-paging-vue">
  <img alt="SSPaging License" src="https://img.shields.io/npm/l/ss-paging-vue">
</p>

# SSPaging
SSPaging is a server-side (or a low-level) pagination library for Vue.js. The name was taken from <strong>[Smartscore Pagination](https://smartscore.wolestech.com)</strong> which was a part from past project of SSPaging creator. SSPaging provides sets of ready-to-use functions and properties to create pagination. SSPaging provides some built-in components you can use in your project, but you can also learn how to create your own with the provided examples<br/>
SSPaging available in two versions: for Composition API and Pinia. The Vuex version is no longer published since Vuex has been deprecated by the Vue Team. 

## Installation
SSPaging can be installed using NPM:
```
npm install ss-paging-vue
```

### Unreleased Version
You can also install the unreleased version of SSPaging by adding the `next` tag.
```
npm install ss-paging-vue@next
```
Note that installing unreleased version potentially breakdown your code or throw an error, especially for Pinia users that should add `state` to call SSPaging property like `paging.rows` into `paging.state.rows`. 

## Basic Usage
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
## Documentation
For complete documentation, please refer to [SSPaging Official Documentation](https://lib.actudent.com/ss-paging/) instead.

## Contribution
Just create a pull request if you want to add features or fix bugs.

