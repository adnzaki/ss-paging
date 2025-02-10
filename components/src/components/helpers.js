import { toRefs } from "vue"
import { usePaging, usePagingStore } from '../../../index';

const setPagingState = (useStore, { paging, property, value }) => {
  useStore ? paging[property] = value : paging.state[property] = value
}

const getPaging = (useStore, paging) => {
  return paging === undefined ? useStore ? usePagingStore() : usePaging() : paging
}

const largePadding = { padding: '10px 15px' }

const iconSet = 'material-icons-round'

export { setPagingState, getPaging, largePadding, iconSet }


