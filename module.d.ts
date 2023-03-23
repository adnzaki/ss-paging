import { usePaging } from "./src/ss-paging-esm";
import { usePagingStore } from './src/ss-paging-store'

declare module 'ss-paging-vue' {
  export { usePaging, usePagingStore }
}