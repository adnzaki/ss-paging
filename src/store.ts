import { defineStore } from 'pinia'
import { usePaging } from './core'

export const usePagingStore = defineStore('sspaging', () => usePaging())