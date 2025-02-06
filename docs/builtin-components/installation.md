# Installation

If you use a build tool, pagination components are included with SSPaging after installation. Simply import them into your project. However, you need to meet some styling requirements.

If you're not using a build tool, import the pagination components via the `SSComponents` object in your script tag:
```html
<script src="https://unpkg.com/ss-paging-vue@latest/components/dist/ss-components.prod.js"></script>
```

## Requirements

- ### Material Icons  
SSPaging components rely on Material Icons (rounded type) for icons. Include the following link to display the icons:
```html
<!-- https://material.io/resources/icons/?style=round -->
<link href="https://fonts.googleapis.com/css2?family=Material+Icons+Round" rel="stylesheet">
```

- ### Components Stylesheet  
For usage without a build tool, you need to manually import the pagination components' stylesheet in your HTML header:  
```html
<link rel="stylesheet" href="https://unpkg.com/ss-paging-vue@latest/components/dist/style.css">
```
If you're using a build tool, you can import the stylesheet directly in your JavaScript or Vue file:  
```js
import 'ss-paging-vue/components/style.css';
```

## Local Usage

For local usage with a build tool, import the components into your Vue files:
```vue
<script setup>
import { Table, SelectRow, Navigator, SearchBox } from 'ss-paging-vue/components'
</script>

<template>
  <table></table>
  <select-row></select-row>
  <navigator></navigator>
  <search-box></search-box>
</template>
```

## Global Usage

If not using a build tool, pagination components can only be used globally. However, this method also works with a build tool. Here's how to define and register the components:

::: code-group
```javascript [Non-Build tool]
const { Table, SelectRow, Navigator, SearchBox } = SSComponents
const app = Vue.createApp({})

app.component('table', Table)
app.component('select-row', SelectRow)
app.component('navigator', Navigator)
app.component('search-box', SearchBox)
app.mount('#app')
```
```js [Build tool]
import { Table, SelectRow, Navigator, SearchBox } from 'ss-paging-vue/components'
import { createApp } from 'vue'

const app = createApp({})
app.component('table', Table)
app.component('select-row', SelectRow)
app.component('navigator', Navigator)
app.component('search-box', SearchBox)
app.mount('#app')
```
:::

Then in your HTML file:
```html
<table></table>
<select-row></select-row>
<navigator></navigator>
<search-box></search-box>
```