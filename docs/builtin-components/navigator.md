# Navigator

`<Navigator />` is a navigation component that handles page navigation with links. It implements `paging.nav()`, including utility functions like `paging.activeLink()`, `paging.isDisabled()`, and page link rendering. There are several props available, but only two are required.

## Props

| Name                    | Type            | Default | Required | Description                                          |
|-------------------------|-----------------|---------|----------|------------------------------------------------------|
| `paging`                | `Object`        | None    | Yes      | SSPaging instance                                    |
| `modelValue`            | `Any`           | None    | Yes      | Page number bound to the Navigator component         |
| `useInput`              | `Boolean`       | `false` | No       | Set to `true` to use a text input for page navigation|
| `dark`                  | `Boolean`       | `false` | No       | Set to `true` to enable dark mode style              |
| `customNavigationClass` | `String\|Array` | None    | No       | Custom class for page navigation                     |
| `customInputClass`      | `String\|Array` | None    | No       | Custom class for the page number input              |
| `customNumlinkClass`    | `String\|Array` | None    | No       | Custom class for page number links                   |

## Example

Here’s an example of using the `Navigator` component, assuming `paging` is your SSPaging instance:

```vue-html
<navigator 
  :paging="paging" 
  v-model="currentPage"
  use-input
  dark
  custom-navigation-class="custom-nav"
  :custom-input-class="['custom-input-1', 'custom-input-2']"
  custom-numlink-class="custom-numlink"
></navigator>
```

Note that this is just an example. You don’t need to define all props, only those that suit your needs. You can try out this component [here](https://playcode.io/1293219).

::: tip
If some styles are not displaying as expected, it may be caused by your template styling or custom CSS. You can resolve this by applying custom classes as shown in the example.
:::