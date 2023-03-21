import { defineStore } from 'pinia'
import { usePaging } from './ss-paging-esm'

export const usePagingStore = defineStore('paging', () => usePaging())