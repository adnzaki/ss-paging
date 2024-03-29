# Configuration
There are several configurations available in SSPaging through the `getData` method as described before. Now, let us dive into deeper part of SSPaging configuration.

## `getData()` Options
Basically, only 7 options needed by SSPaging to generate pagination. If you even use your own URL pattern, it is decreased to only 1 option should be set, because the 6 options are part of the SSPaging URL pattern. But to get the full power of SSPaging, we have to set configurations as complete as possible to SSPaging. Here are the complete explanation of SSPaging configuration passed via `getData()` method.

### `lang`: string
SSPaging provides 2 languages for you: English and Indonesia. Accepted values are `'indonesia'` and `'english`. In current version, SSPaging uses Indonesia as the default language that will be changed to English on the next version.

### `limit`: number
This option is a part of SSPaging URL pattern. It will be used to limit results generated by the backend. Default value is `10`.

### `offset`: number
This option is a part of SSPaging URL pattern. It will be used to determine where the display data to start from.

### `orderBy`: string
This option is a part of SSPaging URL pattern. It will be used set data order.

### `searchBy`: string|array
This option is a part of SSPaging URL pattern. It will be used to tell the server which field that is used to search data. It can be a string or array

### `sort`: string
This option is a part of SSPaging URL pattern. The common value of this option are 'ASC' and 'DESC', but it can be another value depend on your backend.

### `search`: string
This option is a part of SSPaging URL pattern. It accepts your search query parameter.

### `url`: string 
This option is a part of SSPaging URL pattern. This is your main URL as described in SSPaging URL pattern, it can be customized depend on your needs.

### `rawUrl`: string
This option will override all options that included in SSPaging URL pattern. You can use this option if you do not want to follow SSPaging URL pattern. This option requires change the `limit` state in order to generate correct pagination as follow:
```js 
paging.state.limit = 5
```

### `linkNum`: number
The number of page links you want to provide to users. (Eg. 1,2,3...)

### `linkClass`: string
The class style of pagination item. It is optional, use only if you want to dynamically change the link class

### `activeClass`: string
Current active page class style (for link number only)

### `disabledClass`: string <Badge type="tip" text="New in v3.x" />
Set class for disabled link

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

### `mode`: string
The mode you want to use for the request with `fetch()` method, e.g., `cors`, `no-cors`, or `same-origin`. Default is `cors`. If you set `useAuth` option to `false`, you do not have to set this option.

### `debug`: boolean <Badge type="tip" text="New in v3.x" />
Set to `true` to activate console debugging.

### `beforeRequest`: function
You can run something before the request sent by defining your function in this option.

### `afterRequest`: function
You can also run something after the request success by defining your function in this option.



## API References
Here is a complete API references you can use from SSPaging which we will cover later on this guide:
| Method                      | Target     | Description                                                             |
|-----------------------------|------------|-------------------------------------------------------------------------|
| `isDisabled(page: int)`     | Navigation | Determine whether a first/prev/next/last link should be disabled or not |
| `onSearchChanged()`         | Search     | Method to run after search parameter has changed                        |
| `nav(page: int)`            | Navigation | Run pagination to the given page                                        |
| `filter()`                  | Search     | Search data based on search parameter                                   |
| `sortData(orderBy: string)` | Table      | Run pagination to apply sorting data on the server                      |
| `showPerPage()`             | Dropdown   | Change per page data based on selected row                              |
| `reloadData()`              | Table      | Reload data based on settings stored in SSPaging                        |
| `activeLink(link: int)`     | Navigation | Determine whether a number link is currently active or not              |
| `itemNumber(index: int)`    | Table      | Show an item number based on its order on the data                      |
| `activePage`                | -          | Get current active page                                                 |
| `rowRange()`                | -          | Show the range of current active data                                   |
