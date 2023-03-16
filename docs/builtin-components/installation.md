# Installation
If you use build tool, pagination components has been included with SSPaging after its installation. So, you only have to import them into your project. Nevertheless, some requirements are needed for styling the components. <br>

If you do not use build tool, pagination components should be imported in your script tag and can be accessed via `SSComponents` object.
```html
<script src="https://unpkg.com/ss-paging-vue@2.3.0-stable/components/dist/ss-components.prod.js"></script>
```

## Requirements
- ### Material Icons
SSPaging components relies on Material Icons to define its icon. You have to include <strong>rounded type</strong> of Material Icons in order to make icons visible.
```html
<!-- https://material.io/resources/icons/?style=round -->
<link href="https://fonts.googleapis.com/css2?family=Material+Icons+Round" rel="stylesheet">
```
- ### Components Stylesheet
Pagination components' stylesheet should be imported manually in your HTML header:
```html
<link rel="stylesheet" href="https://unpkg.com/ss-paging-vue@2.3.0-stable/components/dist/style.css">
```

## Local Usage
Pagination components can be used locally via `ss-paging-vue/components` by importing them into your components:
```vue
<script setup>
import { SelectRow, Navigator, SearchBox } from 'ss-paging-vue/components'

</script>
<template>
  <select-row></select-row>
  <navigator></navigator>
  <search-box></search-box>
</template>
```

## Global Usage
For use without build tool, you can only use pagination components globally. Nevertheless, this method can also be used with build tool. This is how to define pagination components:
::: code-group
```javascript [Non-Build tool]
const { SelectRow, Navigator, SearchBox } = SSComponents
const app = Vue.createApp({})

app.component('select-row', SelectRow)
app.component('navigator', Navigator)
app.component('search-box', SearchBox)
app.mount('#app')
```
```js [Build tool]
const { SelectRow, Navigator, SearchBox } from 'ss-paging-vue/components'
const { createApp } from 'vue'

const app = createApp({})
app.component('select-row', SelectRow)
app.component('navigator', Navigator)
app.component('search-box', SearchBox)
app.mount('#app')
```
:::

And in your HTML file:
```html
<select-row></select-row>
<navigator></navigator>
<search-box></search-box>
```
