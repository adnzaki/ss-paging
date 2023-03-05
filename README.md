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

## Brief Concept
SSPaging aims to allow developer to get a full control of pagination. Rather than using a full pagination library with the template included, you can include pagination functionalities on your own template as long as it uses Vue.js. By using this way, you have a full flexibility with pagination without having to breakdown your current template. SSPaging can be used everywhere in your template, without forcing you to use template from pagination library itself.

## Features
- ### Powerful
SSPaging is a powerful server-side pagination library that provides sets of ready-to-use actions/methods to work with the server. It uses no dependency to work, very small size and full of flexibility. 
- ### Helpful 
It provides a URL pattern that will guide you to create a suitable server-side code that match SSPaging needs, but still gives you a freedom to provide your own URL pattern.<br/>
- ### Progressive
SSPaging can be embeded everywhere, whether it is your new or even existing project.

## Limitations
While SSPaging is a powerful server-side pagination, it has some limitations to work with. As it is a library that developed for my own projects.
- ### Server-side dependant
SSPaging is a server-side pagination, so it will not work without connection to server.
- ### Usage scope
SSPaging only work with Composition API that needs Vue >3.0 or forcing you to use Pinia if you want to use it in Vue 2. For Vue 3 users, SSPaging works well with Composition API and Pinia. Current version of SSPaging also does not support Vuex. Though the Vuex version is still used in my project, but it is just for migration process.
- ### No template, make your own!
SSPaging does not provide any template, so you have to build or use your own template.

## URL Pattern
SSPaging has 2 options for providing URL to get the data. The first option is following SSPaging URL pattern, and the second option is using your own URL pattern.<br/>
The pattern of URL  accepted by SSPaging must looked like this:
```
/main-url/{limit}/{offset}/{orderBy}/{searchBy}/{sort}/{search}
```
The `main-url` can contain anything you want, but `/{limit}/{offset}/{orderBy}/{searchBy}/{sort}/{search}` must be in its order. If you need more URL arguments, you can add before `/{limit}...`.<br/>
If you would like to use your own URL, you can set it in `getData` method that will be explained later. <strong>But remember that SSPaging is server-side pagination library, it will only work if you can provide everything from your backend (including URL pattern) that needed by SSPaging to generate pagination.</strong><br/>
We recommend you to use the URL pattern from SSPaging, so you do not have to think how to match SSPaging needs.

## The `getData()` method
The main method of SSPaging is `getData()`. This method is the main actor of SSPaging, since it will get the data, set and save options and run the pagination generator. SSPaging consists of two arguments: `(options: object, callFromRunPaging: boolean)`. `options` is required in this method calls, while `callFromPaging` only use in internal code and <strong>should never be set</strong>. Some great options are available for you to set your pagination settings as follows:
### `lang`: string
SSPaging provides 2 languages for you: English and Indonesia. Accepted values are `'indonesia'` and `'english`.
### `limit`: number
This option is a part of SSPaging URL pattern. It will be used to limit results generated by the backend.
### `offset`: number
This option is a part of SSPaging URL pattern. It will be used to determine where the display data to start from.
### `orderBy`: string
This option is a part of SSPaging URL pattern. It will be used set data order.
### `searchBy`: string|array
This option is a part of SSPaging URL pattern. It will be used to tell the server which field that is used to search data. It can be a string or array
### `sort`: string
This option is a part of SSPaging URL pattern. This common value of this option are 'ASC' and 'DESC', but it can be another value depend on your backend.
### `search`: string
This option is a part of SSPaging URL pattern. It accepts your search query parameter.
### `url`: string 
This option is a part of SSPaging URL pattern. This is your main URL as described in SSPaging URL pattern, it can be customized depend on your needs.
### `rawUrl`: string
This option will override all options that included in SSPaging URL pattern. You can use this option if you do not want to follow SSPaging URL pattern.
### `linkNum`: number
The number of page links you want to provide to users. (Eg. 1,2,3...)
### `linkClass`: string
The class style of pagination item. It is optional, use only if you want to dynamically change the link class
### `activeClass`: string
Current active page class style (for link number only)
### `autoReset`: object
This option allows you to automatically reset search to the default data if it meets the specified timeout.
- #### `active`: boolean
Option to activate the `autoReset` option
- #### `timeout`: number
Option to set the timeout before `autoReset` runs.
### `delay`: object
By activate this option, SSPaging will delay search after the query has submitted in the specified timeout.
- #### `active`: boolean
Option to activate the `delay` option
- #### `timeout`: number
Option to set the waiting time of SSPaging filter function to run.
### `useAuth`: boolean
By default, SSPaging requires token-based authentication (like JSON Web Tokens and Personal Access Token) to get the data. Set it to `false` if you do not need authentication or if you use session to secure your sites.
### `token`: string
This option is used to store your token.
### `beforeRequest`: function
You can run something before the request sent by defining your function in this option.
### `afterRequest`: function
You can also run something after the request success by defining your function in this option.
### Example
```javascript
const limit = 5

// in composables
paging.state.rows = limit

// in Pinia 
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

## Documentation
For complete documentation, see [SSPaging site](https://lib.actudent.com/ss-paging/). The site is on active progress, so the content may not complete yet.

## Contribution
Just create a pull request if you want to add features or fix bugs.

