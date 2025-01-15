# SearchBox

`<SearchBox />` is a component designed to handle data searching. It implements `paging.filter()` and `paging.onSearchChanged()` in the background. A few props are available to customize its functionality, but only two are required.

## Props

| Name           | Type            | Default    | Required | Description                                                       |
|----------------|-----------------|------------|----------|-------------------------------------------------------------------|
| `paging`       | `Object`        | None       | Yes      | **SSPaging instance**                                             |
| `modelValue`   | `Any`           | None       | Yes      | A query value for searching                                      |
| `placeholder`  | `String`        | None       | No       | Placeholder text for the input field                              |
| `icon`         | `String`        | `'search'` | No       | Optional icon: `search` or `arrow`                                |
| `customClass`  | `String\|Array` | None       | No       | Custom class for the input field                                  |

## Example

Here’s how to use the `SearchBox` component, assuming `paging` is your SSPaging instance:

```html
<search-box 
  :paging="paging" 
  v-model="paging.state.search"
  placeholder="Search something..."
  icon="arrow"
  custom-class="custom-input-1"
></search-box>
```

This is just an example. You don’t need to define all props, only those that fit your needs. You can try out this component [here](https://playcode.io/1293364).