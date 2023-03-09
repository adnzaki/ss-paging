import { toRefs } from "vue"

const setPagingState = (useStore, { paging, property, value }) => {
  useStore ? paging[property] = value : paging.state[property] = value
}

const getPaging = (useStore, paging) => {
  return useStore ? toRefs(paging) : toRefs(paging.state)
}

const densePadding = { padding: '6px 12px' }

const iconSet = 'material-icons-round'

export { setPagingState, getPaging, densePadding, iconSet }

