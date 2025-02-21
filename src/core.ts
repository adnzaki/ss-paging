/**
 * Smartscore Pagination (SSPaging)
 *
 * SSPaging is a server-side pagination library for Vue.js
 * SSPaging provides a set of ready-to-use functions and properties
 * to create pagination.
 *
 * SSPaging also has built-in components which is nearly zero-config
 * and handle most of the work for you
 *
 * @package     Pagination
 * @author      Adnan Zaki
 * @type        Libraries
 * @version     3.0.1
 * @url         https://lib.actudent.com/ss-paging
 */
import { ref, reactive, computed } from 'vue'
import { StateInterface, OptionsInterface } from './types'

const beforeRequest = ref(null)
const afterRequest = ref(null)
const state: StateInterface = reactive({
  pageLinks: [],
  prev: 0,
  next: 0,
  last: 0,
  first: 0,
  limit: 10,
  offset: 0,
  setStart: 0,
  totalRows: 0,
  numLinks: true,
  usePost: false,
  useHeader: false,
  showPaging: true,
  linkClass: 'item',
  activeClass: 'active',
  disabledClass: 'disabled',
  url: '',
  rows: 10,
  data: [],
  search: '',
  sort: 'ASC',
  orderBy: '',
  searchBy: '',
  linkNum: false,
  whereClause: null,
  ascendingSort: false,
  token: '',
  mode: 'cors',
  debug: false,
  rawResponse: [],

  // Delay runPaging() on search filter
  // Useful when you use v-on:keyup directive,
  // if set to true, it won't send any request to server
  // directly when user is typing keywords
  delay: 0,

  // auto reset data to its default
  // if search input is empty string
  autoReset: 0,

  sentences: {
    indonesia: {
      noData: 'Tidak ada data yang ditampilkan',
      showRows: 'Menampilkan baris',
      from: 'dari',
      rows: 'baris',
    },
    english: {
      noData: 'No data to display',
      showRows: 'Showing row',
      from: 'from',
      rows: 'rows',
    },
  },
  pagingLang: 'english',
})

/**
 * Method for giving a disabled state on pagination buttons
 */
function isDisabled(page: number): string {
  if (page + 1 === activePage.value) {
    return state.disabledClass
  } else {
    return ''
  }
}

/**
 * Call this function inside watcher
 */
function onSearchChanged(): void {
  if (state.search === '' && state.autoReset > 0) {
    setTimeout(() => {
      state.offset = 0
      runPaging()
    }, state.autoReset)
  }
}

/**
 * Method for navigating the page
 */
function nav(page: number): void {
  state.offset = page
  runPaging()
}

/**
 * Search data based on parameters in the search box
 */
function filter(): void {
  setTimeout(() => {
    state.offset = 0
    runPaging()
  }, state.delay)
}

/**
 * Refresh data
 *
 * @return void
 */
function reloadData(): void {
  state.offset = activePage.value - 1
  runPaging()
}

/**
 * Method for sorting data based on table's field
 */
function sortData(orderBy: string): void {
  state.sort === 'ASC'
    ? (state.ascendingSort = true)
    : (state.ascendingSort = false)
  if (state.ascendingSort) {
    state.ascendingSort = false
    state.sort = 'DESC'
  } else {
    state.ascendingSort = true
    state.sort = 'ASC'
  }
  state.orderBy = orderBy
  runPaging()
}

/**
 * Option to show number of data per page
 *
 * @return void
 */
function showPerPage(): void {
  state.limit = state.rows
  state.offset = 0
  runPaging()
}

/**
 * Method for excecuting getData() based on current state
 * like limit, offset, filter, etc.
 */
function runPaging(): void {
  getData(
    {
      url: state.url,
      sort: state.sort,
      token: state.token,
      limit: state.limit,
      offset: state.offset,
      search: state.search,
      orderBy: state.orderBy,
      searchBy: state.searchBy,
      lang: state.pagingLang,
      linkNum: state.linkNum,
      where: state.whereClause,
      mode: state.mode,
      linkClass: state.linkClass,
      useHeader: state.useHeader,
      usePost: state.usePost,
      autoReset: state.autoReset,
      activeClass: state.activeClass,
      delay: state.delay,
      debug: state.debug,
      beforeRequest: () => {
        if (beforeRequest.value !== null) beforeRequest.value()
      },
      afterRequest: () => {
        if (afterRequest.value !== null) afterRequest.value()
      },
    },
    true
  )

  if (state.debug) {
    console.clear()
    console.info(
      '[SSPaging] If you see this message, it means getData() is executed through runPaging() and your initial options have been redefined using reactive state.'
    )
  }
}
/**
 * Get data from the server with several configuration options
 */
function getData(options: OptionsInterface, callFromRunPaging = false): void {
  state.token = options.token
  state.pagingLang = options.lang
  state.debug = options.debug

  const { url, limit, offset, orderBy, searchBy, sort, search } = options

  if (
    url === undefined ||
    limit === undefined ||
    offset === undefined ||
    orderBy === undefined ||
    searchBy === undefined ||
    sort === undefined ||
    search === undefined
  ) {
    console.error(
      '[SSPaging] Please provide url, limit, offset, orderBy, searchBy, sort and search in getData() options'
    )
    return
  }

  state.url = options.url
  state.limit = options.limit
  state.offset = options.offset * options.limit
  state.orderBy = options.orderBy
  state.useHeader = options.useHeader
  state.usePost = options.usePost

  // options.searchBy could be a string or array
  typeof options.searchBy === 'string'
    ? (state.searchBy = options.searchBy)
    : (state.searchBy = options.searchBy.join('-'))

  state.sort = options.sort
  state.search = options.search
  let searchParam: string
  state.search === '' ? (searchParam = '') : (searchParam = '/' + state.search)

  let baseURL: string = options.url
  
  // if not using header, then we need to add limit, offset, orderBy, searchBy, sort
  if (options.useHeader) {
    baseURL = `${baseURL}/${state.searchBy}`
  }
  if(!options.useHeader && !options.usePost) {
    baseURL = `${baseURL}/${state.limit}/${state.offset}/${state.orderBy}/${state.searchBy}/${state.sort}`
  }

  let requestURL: string = options.usePost ? baseURL : `${baseURL}${searchParam}`

  if (options.autoReset !== undefined) {
    state.autoReset = options.autoReset
  }

  if (options.delay !== undefined) {
    state.delay = options.delay
  }

  // do something before the request sent
  if (options.beforeRequest !== undefined) {
    if (!callFromRunPaging) {
      beforeRequest.value = () => options.beforeRequest()
    }

    options.beforeRequest()
  }

  let optionHeaders: Headers = new Headers()

  if (options.token !== undefined) {
    optionHeaders.set('Authorization', options.token)
  }

  if (options.useHeader) {
    optionHeaders.set('limit', state.limit.toString())
    optionHeaders.set('offset', state.offset.toString())
    optionHeaders.set('orderBy', state.orderBy)
    optionHeaders.set('sort', state.sort)
  }

  const formData: FormData = new FormData()

  if(options.usePost) {
    formData.append('limit', state.limit.toString())
    formData.append('offset', state.offset.toString())
    formData.append('orderBy', state.orderBy)
    formData.append('sort', state.sort)
    formData.append('search', state.search)
    formData.append('searchBy', state.searchBy)
  }

  const fetchOptions = {
    method: 'GET',
    mode: options.mode === undefined ? 'cors' : options.mode, // CORS must be default
    headers: optionHeaders,
  }

  const fetchOptionsUsingPost = {
    method: 'POST',
    mode: fetchOptions.mode, 
    body: formData
  }

  if (options.mode !== undefined) {
    state.mode = options.mode
  }

  fetch(requestURL, options.usePost ? fetchOptionsUsingPost : fetchOptions)
    .then((response) => response.json())
    .then((res) => {
      state.rawResponse = res
      state.data = res.container
      create({
        rows: res.totalRows,
        start: options.offset,
        linkNum: options.linkNum ?? state.linkNum,
        activeClass: options.activeClass ?? state.activeClass,
        linkClass: options.linkClass ?? state.linkClass,
        disabledClass: options.disabledClass ?? state.disabledClass,
      })

      // do something after the request success
      if (options.afterRequest !== undefined) {
        if (!callFromRunPaging) {
          afterRequest.value = () => options.afterRequest()
        }

        options.afterRequest()
      }

      if (state.debug) {
        console.info('[SSPaging] Generated URL: ', requestURL)
        console.info('[SSPaging] Reactive state:')
        console.log(state)
        console.info('[SSPaging] Below are options you have provided:')
        console.log(options)
      }
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

type Settings = {
  rows: number
  start: number
  linkNum: boolean | number
  activeClass: string
  linkClass: string
  disabledClass: string
}

/**
 * Generate Pagination
 */
function create(settings: Settings) {
  state.totalRows = settings.rows
  state.activeClass = settings.activeClass
  state.linkClass = settings.linkClass
  state.disabledClass = settings.disabledClass
  state.linkNum = settings.linkNum

  // reset links
  state.pageLinks = []

  // count the number of pages needed by pagination link
  let countLink = settings.rows / state.limit
  countLink = Math.ceil(countLink)

  // define the first link
  let startLink: number

  // check whether to use link number of not
  if (settings.linkNum === false) {
    state.numLinks = false
  }

  // generate startLink...
  if (typeof settings.linkNum === 'number') {
    if (settings.linkNum > countLink || settings.linkNum < 1) {
      startLink = 1
    } else {
      if (settings.linkNum % 2 !== 0) {
        startLink = settings.linkNum - 1
      } else {
        startLink = settings.linkNum
      }
      startLink = activePage.value - startLink / 2
      if (startLink < 1) {
        startLink = 1
      }
    }
  } else {
    startLink = 1
  }

  // generate pagination link....
  for (let i = startLink; i <= countLink; i++) {
    state.pageLinks.push(i)
    if (state.pageLinks.length === settings.linkNum) {
      break
    }
  }

  // the last page is equal to the number of links
  state.last = countLink

  // generate previous and next page links
  settings.start === (state.last -= 1)
    ? (state.next = settings.start)
    : (state.next = settings.start + 1)
  settings.start === state.first
    ? (state.prev = settings.start)
    : (state.prev = settings.start - 1)

  if (state.debug) {
    console.info('[SSPaging] Settings for generating pagination:')
    console.log(settings)
    console.info('[SSPaging] Total possible links (if shown): ' + countLink)
    console.info('[SSPaging] Start link: ' + startLink)
    console.info(
      '[SSPaging] If startLink value never change, it may caused linkNum is hidden'
    )
  }
}
/**
 * Method for marking active link
 */
function activeLink(link: number): string {
  if (link === activePage.value) {
    return state.activeClass
  } else {
    return ''
  }
}
/**
 * Create item number based on its position
 * in whole data
 */
function itemNumber(index: number): number {
  return dataFrom.value + index
}
/**
 * Get active page
 */
const activePage = computed(() => {
  return state.offset / state.limit + 1
})

/**
 * Get the last data range
 *
 */
const dataTo = computed(() => {
  const currentPage = state.offset / state.limit
  let range: number

  if (currentPage === state.last) {
    range = state.totalRows
  } else {
    range = state.offset + state.limit
  }

  return range
})

/**
 * Get the first data range
 *
 */
const dataFrom = computed(() => {
  let from: number

  if (state.offset === 0) {
    from = 1
  } else {
    from = state.offset + 1
  }

  return from
})

/**
 * Generate data range
 */
function rowRange(): string {
  if (state.pageLinks.length === 0) {
    state.showPaging = false

    // handle error on undefined
    return state.sentences[state.pagingLang] === undefined
      ? ''
      : state.sentences[state.pagingLang].noData
  } else {
    state.showPaging = true
    let returnedText = 'Unable to load rows range.'
    if (state.sentences[state.pagingLang] !== undefined) {
      returnedText = `${state.sentences[state.pagingLang].showRows} ${
        dataFrom.value
      } - 
                      ${dataTo.value} ${
        state.sentences[state.pagingLang].from
      } ${state.totalRows} 
                      ${state.sentences[state.pagingLang].rows}`
    }

    return returnedText
  }
}

function usePaging() {
  return {
    state,
    dataTo,
    dataFrom,
    activePage,
    nav,
    filter,
    getData,
    rowRange,
    sortData,
    runPaging,
    reloadData,
    itemNumber,
    activeLink,
    isDisabled,
    showPerPage,
    onSearchChanged,
  }
}

export { usePaging }
