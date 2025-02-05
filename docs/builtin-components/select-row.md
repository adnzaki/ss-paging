# SelectRow

`<SelectRow />` is a dropdown-like component that handles the "show per page" functionality. It internally implements `paging.showPerPage()`. Several props are available for this component, but only one is required.

## Props

| Name                | Type            | Default                  | Required | Description                                             |
|---------------------|-----------------|--------------------------|----------|---------------------------------------------------------|
| `paging`            | `Object`        | None                     | Yes      | SSPaging instance                                       |
| `label`             | `String`        | "Choose Option"          | No       | Text label if no row is selected                        |
| `rowLabel`          | `String`        | "rows"                   | No       | Row label                                               |
| `options`           | `Array`         | `[10, 25, 50, 100, 250]` | No       | Row options for `showPerPage()`                         |
| `selected`          | `Number\|Null`  | `null`                   | No       | Pre-selected row. Use this to set the default selection |
| `large`             | `Boolean`       | `false`                  | No       | Set to `true` for a larger dropdown size                |
| `customSelectClass` | `String\|Array` | None                     | No       | Custom class to modify the default select class         |
| `customOptionClass` | `String\|Array` | None                     | No       | Custom class for modifying the select option class      |
| `dark`              | `Boolean`       | `false`                  | No       | Set to `true` for dark mode style                       |

## Example

Below is an example of using the `SelectRow` component, assuming `paging` is your SSPaging instance:

```vue-html
<select-row 
  :paging="paging"
  label="Choose row"
  row-label="baris" 
  :options="[10, 20, 30, 40, 50]"
  :selected="20" 
  large
  custom-select-class="custom-select"
  :custom-option-class="['custom-option-1', 'custom-option-2']"
  dark
></select-row>
```

Note that this is just an example. You don’t need to define all props, only those that fit your needs. You can try out this component [here](https://playcode.io/1293181).

::: info
The appearance of the component may differ depending on your template or custom CSS.
:::