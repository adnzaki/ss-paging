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
 * This version is for Pinia state management. The Vuex version
 * is still there, but it will not receive any new updates since 
 * Vuex is deprecated by the Vue Team.
 *
 * @package     Pagination
 * @author      Adnan Zaki
 * @type        Libraries
 * @version     2.3.0-beta.1
 * @url         https://lib.actudent.com/ss-paging
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'

// these will be used to store before and after request event
const beforeRequest = ref(null)
const afterRequest = ref(null)

export const usePagingStore = defineStore('paging', {
  state: () => {
    return {
      pageLinks: [], limit: 10, offset: 0, prev: 0,
      next: 0, first: 0, last: 0, setStart: 0, totalRows: 0,
      numLinks: true, activeClass: 'active', linkClass: 'item', disabledClass: 'disabled',
      showPaging: true, search: '', data: [],
      orderBy: '', searchBy: '', sort: 'ASC', whereClause: null,
      url: '', ascendingSort: false, linkNum: false, rows: 10, // custom limit
      token: '', useAuth: true,

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
  },
  actions: {
    /**
     * Method for giving a disabled state on pagination buttons
     * 
     * @param {int} page 
     * @returns string
     */
    isDisabled(page) {
      if ((page + 1) === this.activePage) {
        return this.disabledClass
      } else {
        return ''
      }
    },
    /**
     * Call this function inside watcher
     */
    onSearchChanged() {
      if (this.search === '' && this.autoReset.active) {
        setTimeout(() => {
          this.offset = 0
          this.runPaging()
        }, this.autoReset.timeout)
      }
    },
    /**
     * Method for navigating the page
     * 
     * @param {int} page 
     * 
     * @return void
     */
     nav(page) {
      this.offset = page
      this.runPaging()
    },
    /**
     * Search data based on parameters in the search box
     * 
     * @return void
     */
    filter() {
      let timeout
      (this.delay.active) ? timeout = this.delay.timeout : timeout = 0
      setTimeout(() => {
        this.offset = 0
        this.runPaging()
      }, timeout);
    },
    /**
     * Refresh data
     * 
     * @return void
     */
    reloadData() {
      this.offset = (this.activePage - 1)
      this.runPaging()
    },
    /**
     * Method for sorting data based on table's field
     * 
     * @param {string} orderBy 
     * 
     * @return void
     */
    sortData(orderBy) {
      (this.sort === 'ASC') ? this.ascendingSort = true : this.ascendingSort = false
      if (this.ascendingSort) {
        this.ascendingSort = false
        this.sort = 'DESC'
      } else {
        this.ascendingSort = true
        this.sort = 'ASC'
      }
      this.orderBy = orderBy
      this.runPaging()
    },
    /**
     * Option to show number of data per page
     * 
     * @return void
     */
    showPerPage() {
      this.limit = parseInt(this.rows)
      this.offset = 0
      this.runPaging()
    },
    /**
     * Method for excecuting getData() based on current state
     * like limit, offset, filter, etc.
     * 
     * @return void
     */
    runPaging() {
      this.getData({
        token: this.token,
        lang: this.pagingLang,
        limit: this.limit,
        offset: this.offset,
        orderBy: this.orderBy,
        searchBy: this.searchBy,
        sort: this.sort,
        where: this.whereClause,
        search: this.search,
        url: this.url,
        linkNum: this.linkNum,
        activeClass: this.activeClass,
        linkClass: this.linkClass,
        autoReset: {
          active: this.autoReset.active,
          timeout: this.autoReset.timeout
        },
        delay: {
          active: this.delay.active,
          timeout: this.delay.timeout
        },
        useAuth: this.useAuth,
        beforeRequest: () => {
          if(beforeRequest.value !== null) beforeRequest.value()
        },
        afterRequest: () => {
          if(afterRequest.value !== null) afterRequest.value()
        }
      }, true)
    },
    /**
     * Get data for pagination
     * Options: limit, offset, url, orderBy, searchBy, sort, 
     *          search, linkNum, activeClass, linkClass
     * 
     * @param {object} options 
     * @param {boolean} callFromRunPaging never set it to TRUE, it is only for this.runPaging() !!
     * 
     * @return void
     */
    getData(options, callFromRunPaging = false) {
      this.token = options.token
      this.pagingLang = options.lang

      let requestURL = ''
      if(options.rawUrl === undefined) {
        this.url = options.url
        this.limit = options.limit
        this.offset = options.offset * options.limit
        this.orderBy = options.orderBy
  
        // options.searchBy could be a string or array
        typeof options.searchBy === 'string' ?
          this.searchBy = options.searchBy :
          this.searchBy = options.searchBy.join('-')
  
        this.sort = options.sort
        this.search = options.search
        let searchParam
        this.search === '' ? searchParam = '' : searchParam = '/' + this.search
  
        let baseURL = `${options.url}${this.limit}/${this.offset}/${this.orderBy}/${this.searchBy}/${this.sort}`
  
        if(options.where === undefined || options.where === false) {
          requestURL = `${baseURL}${searchParam}`
          this.whereClause = false
        } else {
          requestURL = `${baseURL}/${this.whereClause}${searchParam}`
        }
      } else {
        this.url = options.rawUrl
        requestURL = options.rawUrl
      }

      if (options.autoReset !== undefined) {
        this.autoReset.active = options.autoReset.active
        if (options.autoReset.timeout !== undefined) {
          this.autoReset.timeout = options.autoReset.timeout
        }
      }

      if (options.delay !== undefined) {
        this.delay.active = options.delay.active
        if (options.delay.timeout !== undefined) {
          this.delay.timeout = options.delay.timeout
        }
      }

      // do something before the request sent
      if(options.beforeRequest !== undefined) {
        if(!callFromRunPaging) {
          beforeRequest.value = () => options.beforeRequest()          
        }

        options.beforeRequest()
      }

      let fetchOptions = {}
      
      // we always use authentication for getting data by default
      // but it can be turned off for some purposes
      // Eg: Getting public data
      if(options.useAuth === false) {
        fetchOptions = { method: 'GET' }
        this.useAuth = options.useAuth
      } else {
        fetchOptions = {
          method: 'GET',
          mode: options.mode === undefined ? 'cors' : options.mode, // CORS must be default
          headers: {
            Authorization: options.token ?? ''
          }
        }
      }

      fetch(requestURL, fetchOptions)
        .then(response => response.json())
        .then(data => {
          this.data = data.container
          this.create({
            rows: data.totalRows,
            start: options.offset,
            linkNum: options.linkNum ?? this.linkNum,
            activeClass: options.activeClass ?? this.activeClass,
            linkClass: options.linkClass ?? this.linkClass
          })
          
          // do something after the request success
          if(options.afterRequest !== undefined) {
            if(!callFromRunPaging) {
              afterRequest.value = () => options.afterRequest()
            }
            
            options.afterRequest()
          }

        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    /**
     * Generate Pagination
     * 
     * @param {object} settings 
     * @param #settings.rows, setting.start, settings.activeClass, settings.linkClass, settings.linkNum
     * 
     * @return void
     */
     create(settings) {
      this.totalRows = settings.rows
      this.activeClass = settings.activeClass
      this.linkClass = settings.linkClass
      this.linkNum = settings.linkNum

      // reset links
      this.pageLinks = []

      // count the number of pages needed by pagination link
      let countLink = settings.rows / this.limit
      countLink = Math.ceil(countLink)

      // define the first link
      let startLink

      // check whether to use link number of not
      if (settings.linkNum === false) {
        this.numLinks = false
      }

      // generate startLink...
      if (settings.linkNum > countLink || settings.linkNum < 1) {
        startLink = 1
      } else {
        if (settings.linkNum % 2 !== 0) {
          startLink = settings.linkNum - 1
        } else {
          startLink = settings.linkNum
        }
        startLink = this.activePage - (startLink / 2)
        if (startLink < 1) {
          startLink = 1
        }
      }

      // generate pagination link....
      for (let i = startLink; i <= countLink; i++) {
        this.pageLinks.push(i)
        if (this.pageLinks.length === settings.linkNum) {
          break;
        }
      }

      // the last page is equal to the number of links
      this.last = countLink

      // generate previous and next page links
      settings.start === (this.last -= 1) ? this.next = settings.start : this.next = settings.start + 1
      settings.start === this.first ? this.prev = settings.start : this.prev = settings.start - 1
    },
    /**
     * Method for marking active link
     * 
     * @param {number} link 
     * 
     * @return string
     */
    activeLink(link) {
      if (link === this.activePage) {
        return this.activeClass
      } else {
        return ''
      }
    },
  },
  getters: {
    /**
     * Create item number based on its position 
     * in whole data
     * 
     * @param {number} index
     * 
     * @return int
     */
    itemNumber: (state) => index => {
      return state.dataFrom + index
    },
    /**
     * Get active page
     * 
     * @return int
     */
     activePage(state) {
      return ((state.offset / state.limit) + 1)
    },
    /**
     * Get the last data range
     * 
     * @return int
     */
    dataTo(state) {
      let currentPage = state.offset / state.limit,
        range
      if (state.pageLinks.length === 0) {
        range = 0
      } else {
        if (currentPage === state.last) {
          range = state.totalRows
        } else {
          range = state.offset + state.limit
        }
      }

      return range
    },
    /**
     * Get the first data range 
     * 
     * @return void
     */
    dataFrom(state) {
      let from
      if (state.pageLinks.length === 0) {
        from = 0
      } else {
        if (state.offset === 0) {
          from = 1
        } else {
          from = state.offset + 1
        }
      }

      return from
    },
    /**
     * Generate data range
     * 
     * @return string
     */
    rowRange(state) {
      if (state.pageLinks.length === 0) {
        state.showPaging = false

        // handle error on undefined
        return (state.sentences[state.pagingLang] === undefined) ? '' : state.sentences[state.pagingLang].noData
      } else {
        state.showPaging = true
        let returnedText = 'Unable to load rows range.'
        if(state.sentences[state.pagingLang] !== undefined) {
          returnedText = `${state.sentences[state.pagingLang].showRows} ${this.dataFrom} - 
                          ${this.dataTo} ${state.sentences[state.pagingLang].from} ${state.totalRows} 
                          ${state.sentences[state.pagingLang].rows}`
        }

        return returnedText
      }
    }
  },
})
