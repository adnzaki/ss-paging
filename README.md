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

## Installation
SSPaging can be installed using NPM:
```
npm install ss-paging-vue
```
## Breaking Changes in v3.x
In v3.x, SSPaging shares the same codebase for both Composition API and Pinia version. This change affects the way accessing the state. For example, in v2.x you can directly access SSPaging state with `paging.rows` in Pinia version, while in v3.x you should replace it with `paging.state.rows`.

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

