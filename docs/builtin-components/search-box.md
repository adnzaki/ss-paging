# SearchBox
`SearchBox />` component handles searching data task for you. It covers `paging.filter()` and `paging.onSearchChanged()` implementation in the background. Some props also available for you to match your needs, but only two of them are required.

## Props
| Name           | Type            | Default    | Required | Description                                                       |
|----------------|-----------------|------------|----------|-------------------------------------------------------------------|
| `paging`       | `Object`        | None       | Yes      | **SSPaging instance**                                             |
| `modelValue`   | `Any`           | None       | Yes      | A query to be passed to search parameter                          |
| `placeholder`  | `String`        | None       | No       | A placeholder for input element                                   |
| `icon`         | `String`        | `'search'` | No       | Optional icon. Only two icons are available: `search` and `arrow` |
| `customClass` | `String\|Array` | None       | No       | Custom class for input element                                    |

## Example
Below is the complete example of how to use `SearchBox` component, assuming you have `paging` as SSPaging instance:
```html
<search-box 
  :paging="paging" 
  v-model="paging.state.search"
  placeholder="Search something..."
  icon="arrow"
  custom-class="custom-input-1"
></search-box>
```
Note that above is just an example, you do not have to define them all and must match on your needs. You can try out this component [here](https://playcode.io/1293364).
