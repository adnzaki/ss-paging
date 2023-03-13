<script setup>
import { toRefs, inject } from 'vue';

const paging = inject('paging')
const { 
  numLinks, 
  pageLinks,
  first,
  prev,
  next,
  last
} = toRefs(paging.state)
</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
}

ul li a {
  padding: 10px;
  background-color: rgb(41, 190, 140);
  color: #fff;
}

ul li a:hover {
  background-color: rgb(24, 160, 115);
  color: #fff;
}

ul li:first-child {
  margin-top: 8px;
}

/* Style for active link */
.active {
  background-color: rgb(24, 160, 115);
}

/* Style for disabled link */
.disabled,
ul li a.disabled:hover {
  cursor: default;
  color: #9b9999;
  background-color: rgb(25, 118, 87);
}
</style>

<template>
  <ul>
    <li><a href="#" :class="paging.isDisabled(first)" @click="paging.nav(first)">First</a></li>
    <li><a href="#" :class="paging.isDisabled(prev)" @click="paging.nav(prev)">Prev</a></li>
    <li v-if="numLinks" v-for="(item, index) in pageLinks" :key="index">
      <a href="#" :class="paging.activeLink(item)" @click="paging.nav(item - 1)">{{ item }}</a>
    </li>
    <li><a href="#" :class="paging.isDisabled(next)" @click="paging.nav(next)">Next</a></li>
    <li><a href="#" :class="paging.isDisabled(last)" @click="paging.nav(last)">Last</a></li>
  </ul>
</template>