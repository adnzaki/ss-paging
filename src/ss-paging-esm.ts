/**
 * Smartscore Pagination (SSPaging)
 * 
 * SSPaging is a server-side pagination library for Vue.js only
 * SSPaging provides sets of ready-to-use functions and properties
 * to create pagination. 
 * 
 * SSPaging does not provide any template or view, but you
 * can learn how to create it with the examples provided
 *
 * @package     Pagination
 * @author      Adnan Zaki
 * @type        Libraries
 * @version     3.0.0-beta.2
 * @url         https://lib.actudent.com/ss-paging
 */
import { ref, reactive, computed } from 'vue'
import { StateInterface, OptionsInterface } from './types'

const beforeRequest = ref(null)
const afterRequest = ref(null)
const pagingStates: StateInterface = {
  pageLinks: [], limit: 10, offset: 0, prev: 0,
  next: 0, first: 0, last: 0, setStart: 0, totalRows: 0,
  numLinks: true, activeClass: 'active', linkClass: 'item', disabledClass: 'disabled',
  showPaging: true, search: '', data: [],
  orderBy: '', searchBy: '', sort: 'ASC', whereClause: null,
  url: '', ascendingSort: false, linkNum: false, rows: 10, // custom limit
  token: '', useAuth: true, mode: 'cors',
  debug: false,

  // Delay runPaging() on search filter
  // Useful when you use v-on:keyup directive,
  // if set to true, it won't send any request to server
  // directly when user is typing keywords
  delay: {
    active: false,
    timeout: 500
  },

  // auto reset data to its default 
  // if search input is empty string
  autoReset: {
    active: false,
    timeout: 3000
  },

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
    }
  },
  pagingLang: 'english',
}

const store = reactive(pagingStates)

/**
 * Method for giving a disabled state on pagination buttons
 */
function isDisabled(page: number): string {
  if ((page + 1) === activePage.value) {
    return store.disabledClass
  } else {
    return ''
  }
}

/**
 * Call this function inside watcher
 */
function onSearchChanged(): void {
  if (store.search === '' && store.autoReset.active) {
    setTimeout(() => {
      store.offset = 0
      runPaging()
    }, store.autoReset.timeout)
  }
}

/**
   * Method for navigating the page
   */
function nav(page: number): void {
  store.offset = page
  runPaging()
}

/**
 * Search data based on parameters in the search box
 */
function filter(): void {
  let timeout: number
  (store.delay.active) ? timeout = store.delay.timeout : timeout = 0
  setTimeout(() => {
    store.offset = 0
    runPaging()
  }, timeout);
}

/**
 * Refresh data
 * 
 * @return void
 */
function reloadData(): void {
  store.offset = (activePage.value - 1)
  runPaging()
}

/**
 * Method for sorting data based on table's field
 */
function sortData(orderBy: string): void {
  (store.sort === 'ASC') ? store.ascendingSort = true : store.ascendingSort = false
  if (store.ascendingSort) {
    store.ascendingSort = false
    store.sort = 'DESC'
  } else {
    store.ascendingSort = true
    store.sort = 'ASC'
  }
  store.orderBy = orderBy
  runPaging()
}

/**
 * Option to show number of data per page
 * 
 * @return void
 */
function showPerPage(): void {
  store.limit = store.rows
  store.offset = 0
  runPaging()
}

/**
 * Method for excecuting getData() based on current state
 * like limit, offset, filter, etc.
 */
function runPaging(): void {
  getData({
    token: store.token,
    lang: store.pagingLang,
    limit: store.limit,
    offset: store.offset,
    orderBy: store.orderBy,
    searchBy: store.searchBy,
    sort: store.sort,
    where: store.whereClause,
    search: store.search,
    url: store.url,
    linkNum: store.linkNum,
    mode: store.mode,
    activeClass: store.activeClass,
    linkClass: store.linkClass,
    autoReset: {
      active: store.autoReset.active,
      timeout: store.autoReset.timeout
    },
    delay: {
      active: store.delay.active,
      timeout: store.delay.timeout
    },
    useAuth: store.useAuth,
    debug: store.debug,
    beforeRequest: () => {
      if(beforeRequest.value !== null) beforeRequest.value()
    },
    afterRequest: () => {
      if(afterRequest.value !== null) afterRequest.value()
    }
  }, true)

  if(store.debug) {
    console.clear()
    console.info('If you see this message, it means getData() is executed through runPaging() and your initial options have been redefined using reactive state.')
  }
}
/**
 * Get data from the server with several configuration options
 */
function getData(options: OptionsInterface, callFromRunPaging = false): void {
  store.token = options.token
  store.pagingLang = options.lang
  store.debug = options.debug

  let requestURL: string
  if(options.rawUrl === undefined) {
    store.url = options.url
    store.limit = options.limit
    store.offset = options.offset * options.limit
    store.orderBy = options.orderBy

    // options.searchBy could be a string or array
    typeof options.searchBy === 'string' ?
      store.searchBy = options.searchBy :
      store.searchBy = options.searchBy.join('-')

    store.sort = options.sort
    store.search = options.search
    let searchParam: string
    store.search === '' ? searchParam = '' : searchParam = '/' + store.search

    const baseURL = `${options.url}${store.limit}/${store.offset}/${store.orderBy}/${store.searchBy}/${store.sort}`

    if(options.where === undefined || options.where === false) {
      requestURL = `${baseURL}${searchParam}`
      store.whereClause = false
    } else {
      requestURL = `${baseURL}/${store.whereClause}${searchParam}`
    }
  } else {
    store.url = options.rawUrl
    requestURL = options.rawUrl
  }

  if (options.autoReset !== undefined) {
    store.autoReset.active = options.autoReset.active
    if (options.autoReset.timeout !== undefined) {
      store.autoReset.timeout = options.autoReset.timeout
    }
  }

  if (options.delay !== undefined) {
    store.delay.active = options.delay.active
    if (options.delay.timeout !== undefined) {
      store.delay.timeout = options.delay.timeout
    }
  }

  // do something before the request sent
  if(options.beforeRequest !== undefined) {
    if(!callFromRunPaging) {
      beforeRequest.value = () => options.beforeRequest()          
    }

    options.beforeRequest()
  }

  let fetchOptions: object = {}
  
  // we always use authentication for getting data by default
  // but it can be turned off for some purposes
  // Eg: Getting public data
  if(options.useAuth === false) {
    fetchOptions = { method: 'GET' }
    store.useAuth = options.useAuth
  } else {
    fetchOptions = {
      method: 'GET',
      mode: options.mode === undefined ? 'cors' : options.mode, // CORS must be default
      headers: {
        Authorization: options.token ?? ''
      }
    }
  }

  if(options.mode !== undefined) {
    store.mode = options.mode
  }

  fetch(requestURL, fetchOptions)
    .then(response => response.json())
    .then(res => {
      store.data = res.container
      create({
        rows: res.totalRows,
        start: options.offset,
        linkNum: options.linkNum ?? store.linkNum,
        activeClass: options.activeClass ?? store.activeClass,
        linkClass: options.linkClass ?? store.linkClass,
        disabledClass: options.disabledClass ?? store.disabledClass
      })

      // do something after the request success
      if(options.afterRequest !== undefined) {
        if(!callFromRunPaging) {
          afterRequest.value = () => options.afterRequest()
        }

        options.afterRequest()
      }

      if(store.debug) {
        console.info('Reactive state:')
        console.log(store)
        console.info('Below are options you have provided:')
        console.log(options)
      }
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

type Settings = {
  rows: number,
  start: number,
  linkNum: boolean | number,
  activeClass: string,
  linkClass: string,
  disabledClass: string
}

/**
 * Generate Pagination
 */
function create(settings: Settings) {
  store.totalRows = settings.rows
  store.activeClass = settings.activeClass
  store.linkClass = settings.linkClass
  store.disabledClass = settings.disabledClass
  store.linkNum = settings.linkNum

  // reset links
  store.pageLinks = []

  // count the number of pages needed by pagination link
  let countLink = settings.rows / store.limit
  countLink = Math.ceil(countLink)

  // define the first link
  let startLink: number

  // check whether to use link number of not
  if (settings.linkNum === false) {
    store.numLinks = false
  }

  // generate startLink...
  if(typeof settings.linkNum === 'number') {
    if (settings.linkNum > countLink || settings.linkNum < 1) {
      startLink = 1
    } else {
      if (settings.linkNum % 2 !== 0) {
        startLink = settings.linkNum - 1
      } else {
        startLink = settings.linkNum
      }
      startLink = activePage.value - (startLink / 2)
      if (startLink < 1) {
        startLink = 1
      }
    }
  } else {
    startLink = 1
  }

  // generate pagination link....
  for (let i = startLink; i <= countLink; i++) {
    store.pageLinks.push(i)
    if (store.pageLinks.length === settings.linkNum) {
      break;
    }
  }

  // the last page is equal to the number of links
  store.last = countLink

  // generate previous and next page links
  settings.start === (store.last -= 1) ? store.next = settings.start : store.next = settings.start + 1
  settings.start === store.first ? store.prev = settings.start : store.prev = settings.start - 1

  if(store.debug) {
    console.info('Settings for generating pagination:')
    console.log(settings)
    console.info('Total possible links (if shown): ' + countLink)
    console.info('Start link: ' + startLink)
    console.info('If startLink value never change, it may caused linkNum is hidden')
  }
}
/**
 * Method for marking active link
 */
function activeLink(link: number): string {
  if (link === activePage.value) {
    return store.activeClass
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
  return ((store.offset / store.limit) + 1)
})

/**
 * Get the last data range
 * 
 */
const dataTo = computed(() => {
  const currentPage = store.offset / store.limit
  let range: number

  if (currentPage === store.last) {
    range = store.totalRows
  } else {
    range = store.offset + store.limit
  }

  return range
})

/**
 * Get the first data range 
 * 
 */
const dataFrom = computed(() => {
  let from: number

  if (store.offset === 0) {
    from = 1
  } else {
    from = store.offset + 1
  }

  return from
})

/**
 * Generate data range
 */
function rowRange(): string {
  if (store.pageLinks.length === 0) {
    store.showPaging = false

    // handle error on undefined
    return (store.sentences[store.pagingLang] === undefined) ? '' : store.sentences[store.pagingLang].noData
  } else {
    store.showPaging = true
    let returnedText = 'Unable to load rows range.'
    if(store.sentences[store.pagingLang] !== undefined) {
      returnedText = `${store.sentences[store.pagingLang].showRows} ${dataFrom.value} - 
                      ${dataTo.value} ${store.sentences[store.pagingLang].from} ${store.totalRows} 
                      ${store.sentences[store.pagingLang].rows}`
    }

    return returnedText
  }
}

function usePaging() {
  return {
    state: store,
    isDisabled,
    onSearchChanged,
    nav,
    filter,
    reloadData,
    sortData,
    showPerPage,
    runPaging,
    getData,
    activeLink,
    activePage,
    itemNumber,
    rowRange,
    dataFrom,
    dataTo,
  }
}

export { usePaging }