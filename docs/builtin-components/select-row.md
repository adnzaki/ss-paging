# SelectRow

`<SelectRow />` is a dropdown-like component that handles showing per page task. It covers `paging.showPerPage()` implementation in the background. There are some props available to be passed to this component, though only one of them is required.

## Props
| Name                | Type            | Default                  | Required | Description                                             |
|---------------------|-----------------|--------------------------|----------|---------------------------------------------------------|
| `paging`            | `Object`        | None                     | Yes      | SSPaging instance                                       |
| `useStore`          | `Boolean`       | `false`                  | No       | Set to `true` if using Pinia store                      |
| `label`             | `String`        | "Choose Option"          | No       | Text label if there is no selected row                  |
| `rowLabel`          | `String`        | "rows"                   | No       | Row label                                               |
| `options`           | `Array`         | `[10, 25, 50, 100, 250]` | No       | Row options to be selected in `showPerPage()`           |
| `selected`          | `Number\|Null`  | `null`                   | No       | Pre-selected row. Use this to set default selected row. |
| `large`             | `Boolean`       | `false`                  | No       | Set to `true` to use larger dropdown size                        |
| `customSelectClass` | `String\|Array` | None                     | No       | Custom class to change default select class             |
| `customOptionClass` | `String\|Array` | None                     | No       | Custom class to change default select option class      |
| `dark`              | `Boolean`       | `false`                  | No       | Set to `true` to activate dark style                    |

## Example
Below is the complete example of how to use `SelectRow` component, assuming you have `paging` as SSPaging instance:
```html
<select-row 
  :paging="paging"
  label="Choose row"
  row-label="baris" 
  :options="[10,20,30,40,50]"
  :selected="20" 
  large
  custom-select-class="custom-select"
  :custom-option-class="['custom-option-1', 'custom-option-2']"
  dark
  use-store
></select-row>
```
Note that above is just an example, you do not have to define them all and must match on your needs. You can try out this component [here](https://playcode.io/1293181).

::: info
The look of component may different depend on your template style or your own CSS.
:::