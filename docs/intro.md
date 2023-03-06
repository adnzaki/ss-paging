# What is SSPaging?
SSPaging is a server-side (or a low-level) pagination library for Vue.js. The name was taken from <strong>[Smartscore Pagination](https://smartscore.wolestech.com)</strong> which was a part from past project of SSPaging creator. SSPaging provides sets of ready-to-use functions and properties to create pagination. SSPaging does not provide any template or view, but you can learn how to create it with the examples provided<br/>
SSPaging available in two versions: for Composition API and Pinia. The Vuex version is no longer published since Vuex has been deprecated by the Vue Team. I will provide the Vuex version if you need it, but it has less feature than the Pinia version. Also, the Vuex version will no longer be updated.

## Brief Concept
SSPaging aims to allow developer to get a full control of pagination. Rather than using a full pagination library with the template included, you can include pagination functionalities on your own template as long as it uses Vue.js. By using this way, you have a full flexibility with pagination without having to breakdown your current template. SSPaging can be used everywhere in your template, without forcing you to use template from pagination library itself.<br/>
SSPaging has been used in any scale of projects, from small to large. It is tested on [Quasar Framework](https://quasar.dev), [Primevue DataTable](https://primevue.org/datatable) and any PHP-served website. Because of its simplicity, SSPaging allows developer to use it everywhere, especially on template or framework that does not support server-side pagination.

## Limitations
While SSPaging is a powerful server-side pagination, it has some limitations as follow:
- ### Server-side dependant
SSPaging is a server-side pagination, so it will not work without connection to server. All features are rely on server connection to run.
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
