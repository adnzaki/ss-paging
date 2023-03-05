<script setup>
import { provide } from 'vue';
import { usePaging } from '../../src/ss-paging-esm';
import DataTable from './DataTable.vue';
import Navigation from './Navigation.vue';
import RowSelection from './RowSelection.vue';
import SearchBox from './SearchBox.vue';
import ReloadButton from './ReloadButton.vue';

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
    <div class="col col-sm-6">
      <row-selection></row-selection>
    </div>
    <div class="col col-sm-6">
      <search-box></search-box>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <data-table></data-table>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <navigation></navigation>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <reload-button></reload-button>
    </div>
  </div>
</template>