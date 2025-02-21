# What is SSPaging?
SSPaging is a server-side (or low-level) pagination library for Vue.js. The name originates from **Smartscore Pagination**, which was part of a past project by the creator of SSPaging. This library offers a set of ready-to-use functions and properties to simplify creating pagination in your applications.  

SSPaging also includes several built-in components you can directly integrate into your project. Alternatively, you can learn how to create your own components by following the provided examples.  

SSPaging is available in two versions: one for the Composition API and another for Pinia. The Vuex version is no longer maintained, as Vuex has been deprecated by the Vue Team.

## Brief Concept
SSPaging is designed to give developers full control over pagination. Instead of relying on a complete pagination library with pre-defined templates, SSPaging allows you to embed pagination functionality into your own templates, as long as they are built with Vue.js. This approach provides maximum flexibility, enabling you to implement pagination without altering your existing template structure. SSPaging can seamlessly integrate into any part of your template without requiring you to adopt a predefined template from a pagination library.  

SSPaging has been utilized in a wide range of projects, from small-scale applications to large systems. It has been successfully tested with tools like [Quasar Markup Table](https://quasar.dev/vue-components/markup-table), [PrimeVue DataTable](https://primevue.org/datatable), and PHP-based websites. Thanks to its simplicity, SSPaging is highly adaptable and can be used in templates or frameworks that do not natively support server-side pagination.  

## Limitations  
Although SSPaging is a powerful server-side pagination library, it has some limitations:  

- ### Server-Side Dependent  
SSPaging relies on a server connection to function, meaning it cannot work offline. All its features depend on server-side communication.  

- ### Requires More Steps  
As a low-level pagination library, SSPaging requires more implementation steps compared to higher-level pagination libraries. Each function must be individually integrated into your template. While the current version includes [built-in pagination components](builtin-components/intro), they do not cover all SSPaging features.  

## Compatibility  
SSPaging works best with Vue.js versions >3.0, as it supports both the Composition API and Pinia. For Vue versions before 3.0, you need Vue >2.7, which supports the Composition API. If your app uses Vue <2.7, you will need to install the Composition API: `@vue/composition-api`. SSPaging does not support Vuex, as it has been deprecated by the Vue team.  

## URL Pattern

SSPaging provides three different methods for passing parameters when requesting data:

1. **GET Method using URL pattern**
2. **GET Method with HTTP Headers**
3. **POST Method using FormData**

### 🔹 GET Method (URL Pattern)

By default, SSPaging expects the URL to follow a specific pattern:

```
/main-url/{limit}/{offset}/{orderBy}/{searchBy}/{sort}/{search}
```

- `main-url` can be any base endpoint you define.  
- The `/{limit}/{offset}/{orderBy}/{searchBy}/{sort}/{search}` section must follow this order.  
- If additional URL parameters are required, they must be placed **before** `/{limit}`.  

### 🔹 GET Method with HTTP Headers

Alternatively, SSPaging allows you to pass some parameters via HTTP headers, reducing the URL complexity:

```
/main-url/{searchBy}/{search}
```

In this case, `limit`, `offset`, `orderBy`, and `sort` values are sent via HTTP headers instead of being included in the URL.

### 🔹 POST Method using FormData

For an even cleaner request format, SSPaging supports sending parameters using **POST** method. With this approach, the URL is simplified to `main-url` only.

Choose the method that best fits your API structure! 🚀

::: tip
To achieve the best flexibility and cleaner URLs, we highly recommend using the POST method.
:::



## Response Format
SSPaging accepts response in JSON format with `container` and `totalRows` as key for the response. `container` holds data from server that will be stored in `paging.state.data`, while `totalRows` holds the total number of data that will be used by `paging.state.totalRows`. Your response should match this format or SSPaging cannot process your data.

## API Example  
For a more concrete example, we have prepared a sample API along with its database. You can install it on your local machine or access it via the public API we provide.<br/>
We recommend using the public API as it requires no setup. For the public API with the default URL pattern, you can access it at:  
```
# for usage with POST method
https://lib.actudent.com/sspaging-api-example/public/customer/get-using-post


# for usage with GET method without request header
https://lib.actudent.com/sspaging-api-example/public/customer/get-data/25/0/name/name/ASC 


# for usage with GET method with request header
https://lib.actudent.com/sspaging-api-example/public/customer/get-customer/name
```
If you prefer installing it on your localhost to further explore the SSPaging API example, you can clone the repository from GitHub at:  
```
https://github.com/adnzaki/ss-paging-api-example.git  
```

