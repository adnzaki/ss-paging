# SSPaging
SSPaging is a server-side (or a low-level) pagination library for Vue.js. SSPaging provides sets of ready-to-use functions and properties to create pagination. SSPaging does not provide any template or view, but you can learn how to create it with the examples provided<br/>
SSPaging available in two versions: `SSPaging` for Composition API, and `SSPagingStore` for use with Pinia. The Vuex version is no longer published since Vuex has been deprecated by the Vue Team. I will provide the Vuex version if you need it, but it has less feature than the Pinia version. Also, the Vuex version will no longer be updated.

## Installation
SSPaging can be installed using NPM:
```
npm install ss-paging-vue
```
After it is installed, you can import the composables or Pinia version of SSPaging (choose one depend on your need!).
```javascript
import { usePaging, usePagingStore } from 'ss-paging-vue'

// in composables mode (CDN version also use this one)
const paging = usePaging()

// in Pinia mode
const paging = usePagingStore()
```
For use without build tool, you can include SSPaging via CDN:
```html
<script src="https://unpkg.com/ss-paging-vue@2.2.7/dist/ss-paging.js"></script>
```
## Documentation
For complete documentation, please refer to [SSPaging Official Documentation](https://lib.actudent.com/ss-paging/) instead.

## Contribution
Just create a pull request if you want to add features or fix bugs.

