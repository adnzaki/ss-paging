# Navigator

`<Navigator />` is a couple of navigation links that handles page navigation. It covers `paging.nav()` implementation including utility functions like `paging.activeLink()`, `paging.isDisabled()` and displaying page links in the background. There are some props available to be passed, but only two of them are required:

## Props
| Name                    | Type            | Default | Required | Description                                          |
|-------------------------|-----------------|---------|----------|------------------------------------------------------|
| `paging`                | `Object`        | None    | Yes      | SSPaging instance                                    |
| `useStore`              | `Boolean`       | `false` | No       | Set to `true` if using Pinia store                   |
| `modelValue`            | `Any`           | None    | Yes      | Page number binded to Navigator component            |
| `useInput`              | `Boolean`       | `false` | No       | whether to use text input to go to the specific page |
| `dark`                  | `Boolean`       | `false` | No       | Set to `true` to activate dark style                 |
| `customNavigationClass` | `String\|Array` | None    | No       | Apply custom class to page navigation                |
| `customInputClass`      | `String\|Array` | None    | No       | Apply custom class to page number input              |
| `customNumlinkClass`    | `String\|Array` | None    | No       | Apply custom class to page number links              |

## Example
Below is the complete example of how to use `Navigator` component, assuming you have `paging` as SSPaging instance:
```html
<navigator 
  :paging="paging" 
  use-store
  v-model="currentPage"
  use-input
  dark
  custom-navigation-class="custom-nav"
  :custom-input-class="['custom-input-1', 'custom-input-2']"
  custom-numlink-class="custom-numlink"
></navigator>
```
Note that above is just an example, you do not have to define them all and must match on your needs. You can try out this component [here](https://playcode.io/1293219).
::: tip
If you find some styles do not displayed as expected, it may caused by your template styling or your own CSS. To fix this, you can apply custom classes to the component as in the example.
:::