import { toRefs } from "vue"

const setPagingState = (useStore, { paging, property, value }) => {
  useStore ? paging[property] = value : paging.state[property] = value
}

const getPaging = (useStore, paging) => {
  return useStore ? toRefs(paging) : toRefs(paging.state)
}

const largePadding = { padding: '10px 15px' }

const iconSet = 'material-icons-round'

export { setPagingState, getPaging, largePadding, iconSet }

