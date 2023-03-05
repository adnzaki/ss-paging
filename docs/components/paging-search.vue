<script setup>
import { provide } from 'vue';
import { usePaging } from '../../src/ss-paging-esm';
import DataTable from './DataTable.vue';
import Navigation from './Navigation.vue';
import RowSelection from './RowSelection.vue';
import SearchBox from './SearchBox.vue';

const paging = usePaging()
provide('paging', paging)
</script>

<style scoped>
.row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.row > * {
  padding-left: 5px;
  padding-right: 5px;
  margin-top: 10px;
}

.col {
  flex: 1 0 0%;
}

@media (min-width: 576px) {
  .col-sm-6 {
    flex: 0 0 auto;
    width: 50%;
  }
}
</style>

<template>
  <div class="row">
    <div class="col">
      <search-box></search-box>
    </div>
  </div>
</template>