# What is SSPaging?
SSPaging is a server-side (or a low-level) pagination library for Vue.js. The name was taken from <strong>[Smartscore Pagination](https://smartscore.wolestech.com)</strong> which was a part from the past project of SSPaging creator. SSPaging provides sets of ready-to-use functions and properties to create pagination. SSPaging provides some built-in components you can use in your project, but you can also learn how to create your own with the provided examples.<br/>
SSPaging available in two versions: for Composition API and Pinia. The Vuex version is no longer published since Vuex has been deprecated by the Vue Team. 

## Brief Concept
SSPaging aims to allow developer to get a full control of pagination. Rather than using a full pagination library with the template included, you can embed pagination functionalities on your own template as long as it uses Vue.js. By using this way, you have a full flexibility with pagination without having to breakdown your current template. SSPaging can be used everywhere in your template, without forcing you to use template from pagination library itself.<br/>
SSPaging has been used in variety of projects, from small to large. It has been tested on [Quasar Markup Table](https://https://quasar.dev/vue-components/markup-table), [Primevue DataTable](https://primevue.org/datatable) and any PHP-served website. Because of its simplicity, SSPaging allows developer to use it everywhere, especially on template or framework that does not support server-side pagination.

## Limitations
While SSPaging is a powerful server-side pagination, it has some limitations as follow:
- ### Server-side dependant
SSPaging is a server-side pagination, so it will not work without connection to server. All features are rely on server connection to run.
- ### Requires more steps 
SSPaging is a low-level pagination library that requires more steps to implement than higher level pagination library since each function should be placed one by one into template. Though the current version has [built-in pagination components](builtin-components/intro), they do not cover all features in SSPaging.
## Compatibilty
SSPaging works best with Vue.js version >3.0 since it supports both Composition API and Pinia. For version before 3.0, you need Vue >2.7 that has support of Composition API. If your app is using Vue <2.7, you also need to install the composition api: `@vue/composition-api`. SSPaging also does not support Vuex that has been deprecated by Vue team.

## URL Pattern
SSPaging has 2 options for providing URL to get the data. The first option is following SSPaging URL pattern, and the second option is using your own URL pattern.<br/>
The pattern of URL  accepted by SSPaging must looked like this:
```
/main-url/{limit}/{offset}/{orderBy}/{searchBy}/{sort}/{search}
```
The `main-url` can contain anything you want, but `/{limit}/{offset}/{orderBy}/{searchBy}/{sort}/{search}` must be in its order. If you need more URL arguments, you can add before `/{limit}...`.<br/>
If you would like to use your own URL, you can set it in `getData` method that will be explained later. <strong>But remember that SSPaging is server-side pagination library, it will only work if you can provide everything from your backend (including URL pattern) that needed by SSPaging to generate pagination.</strong><br/>
We recommend you to use the URL pattern from SSPaging, so you do not have to think how to match SSPaging needs.

## Response Format
SSPaging accepts response in JSON format with `container` and `totalRows` as key for the response. `container` holds data from server that will be stored in `paging.state.data` in Composition API or `paging.data` in Pinia, while `totalRows` holds the total number of data that will be used by `paging.state.totalRows` in Composition API  or `paging.totalRows` in Pinia. Your response should match this format or SSPaging cannot process your data.


