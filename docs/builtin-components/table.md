# Table

The SSPaging Table Component is a highly customizable and responsive Vue component designed to display paginated data from SSPaging. It dynamically renders table columns based on the provided `fields` prop, allowing you to easily map your data properties to table headers and cells. Key features include:

- **Dynamic Fields:** Automatically generates table headers and cells using the `fields` array, making it flexible to different data structures.
- **Row Selection:** Includes checkboxes for selecting individual rows, as well as a "select all" checkbox for bulk selection. The selected items are exposed via the `v-model` binding for easy integration with parent components.
- **Sorting:** Column headers can be made sortable by setting the `sortable` flag on a field. Clicking on a sortable header triggers the sorting functionality provided by SSPaging.
- **Responsive Layout:** On desktop screens, the table displays all columns in a traditional horizontal format. On mobile devices, it switches to a condensed view where only the primary field is displayed along with an expand icon. When expanded, the remaining fields are shown in a vertical list.
- **Custom Actions:** Supports custom slots for header and body actions, allowing you to integrate additional controls or functionality seamlessly.
- **Custom Styling:** Various props (e.g., `tableClass`, `theadClass`, `trClass`, `thClass`, `tdClass`) are provided to help tailor the look and feel of the table to your design requirements.

This component not only streamlines the process of displaying server-side paginated data but also enhances user experience with its intuitive selection, sorting, and responsive design features.

## Props

| Name        | Type             | Default                  | Required | Description                                                     |
|-------------|------------------|--------------------------|----------|-----------------------------------------------------------------|
| `paging`    | `Object`         | None                     | Yes      | SSPaging instance                                               |
| `sortIcon`  | `String`         | `"sort"`                 | No       | Icon for sorting displayed on sortable headers                  |
| `fields`    | `Array`          | None                     | Yes      | Array of field definitions for dynamic columns (each field should include at least a `label` and `key`, and optionally a `sortable` flag) |
| `rowKey`    | `String`         | `"id"`                   | No       | Unique key used to identify each row                            |
| `selection` | `Boolean`        | `false`                  | No       | Enable row selection checkboxes                                 |
| `dark`      | `Boolean`        | `false`                  | No       | Activate dark mode |
| `modelValue`| `Array`          | None                     | No       | Array of selected rows (used with `v-model`)                    |
| `tableClass`| `String` or `Array` | None                  | No       | Custom CSS classes for the table element                        |
| `tbodyClass`| `String` or `Array` | None                  | No       | Custom CSS classes for the table body element                   |
| `theadClass`| `String` or `Array` | None                  | No       | Custom CSS classes for the table header element                 |
| `trClass`   | `String` or `Array` | None                  | No       | Custom CSS classes for table row elements                       |
| `thClass`   | `String` or `Array` | None                  | No       | Custom CSS classes for table header cells                       |
| `tdClass`   | `String` or `Array` | None                  | No       | Custom CSS classes for table data cells                         |

## Example

Below is an example of using the `Table` component, assuming `paging` is your SSPaging instance:

::: code-group
```vue-html
<sp-table 
  :paging="paging" 
  :fields="tableColumns" 
  v-model="selected"
  selection
  @update:model-value="onSelected">
  <template #actionHeader>
    <th :style="isDesktop() ? { width: '200px !important' } : { width: '100px !important' } ">Action</th>
  </template>
  <template #actionBody>
    <button class="action-button">Edit</button> &nbsp; 
    <button class="delete-button">Hapus</button>
  </template>
</sp-table>
```
```js
const tableColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'phone', label: 'Phone' },
]

const selected = ref([])
const onSelected = () => {
  console.log('selected: ', selected.value)
}

const isDesktop = () => {
  return window.innerWidth >= 768
}
```
:::

You can try out this component [here](https://stackblitz.com/edit/vitejs-vite-mvx7ohax?file=src%2Fcomponents%2FDataTable.vue)
## Note for Slots 
- For the `#actionHeader` slot, **you must define a `<th>` element** since it is inserted directly into the table header row.  
- For the `#actionBody` slot, **do not wrap your content in a `<td>` element**, as the internal component already provides the `<td>` wrapper.