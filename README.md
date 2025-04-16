<p align="center">
  <a href="https://lib.actudent.com/ss-paging" target="_blank" rel="noopener noreferrer">
    <img width="100" src="https://lib.actudent.com/ss-paging/sspaging-logo.png" alt="SSPaging logo">
  </a>
</p>

<p align="center">
  <a href="https://github.com/adnzaki/ss-paging/actions/workflows/codeql.yml">
    <img alt="CodeQL" src="https://github.com/adnzaki/ss-paging/actions/workflows/codeql.yml/badge.svg">
  </a>   
  <img alt="npm" src="https://img.shields.io/npm/dt/ss-paging-vue">
  <img alt="npm" src="https://img.shields.io/npm/v/ss-paging-vue">
  <img alt="License" src="https://img.shields.io/npm/l/ss-paging-vue">
</p>

# SSPaging
SSPaging is a lightweight server-side (or low-level) pagination library for Vue.js. The name is derived from **Smartscore Pagination, a previous project by its creator. It offers ready-to-use functions and reactive properties to simplify pagination. Built-in components are available for quick integration, while custom implementations can be built using the provided examples.


## Installation
Install SSPaging via NPM:
```sh
npm install ss-paging-vue
```

## Breaking Changes in v3.x
Starting from v3.x, SSPaging uses a unified codebase for both the Composition API and Pinia versions. This changes how the state is accessed.
  
- In **v2.x**, Pinia users could access the state directly using `paging.rows`.  
- In **v3.x**, it must be accessed via `paging.state.rows`.

## Basic Usage
After installation, import either the composable or Pinia version of SSPaging, depending on your preferred state management approach:

```javascript
import { usePaging, usePagingStore } from 'ss-paging-vue'

// Using composables
const paging = usePaging()

// Using Pinia
const paging = usePagingStore()
```
To use SSPaging without a build tool, include it via CDN:

```html
<script src="https://unpkg.com/ss-paging-vue@latest/dist/ss-paging.dist.js"></script>
```
```javascript
// In your JS file
const paging = SSPaging.usePaging()
```

## Documentation
For full documentation, visit the **[SSPaging Official Documentation](https://lib.actudent.com/ss-paging/).**

## Contribution
Want to contribute? Feel free to submit a pull request for bug fixes or new features. 🚀
