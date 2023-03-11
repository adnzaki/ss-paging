var SSPaging = (function (exports, vue) {
  'use strict';

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
   * This version is a composable version of SSPaging. You can use
   * this version without state management but requires Composition API.
   *
   * @package     Pagination
   * @author      Adnan Zaki
   * @type        Libraries
   * @version     2.3.0
   * @url         https://wolestech.com
   */

  const beforeRequest = vue.ref(null);
  const afterRequest = vue.ref(null);

  const usePaging = () => {
    const store = vue.reactive({
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
    });

    return {
      state: store,
      /**
       * Method for giving a disabled state on pagination buttons
       * 
       * @param {int} page 
       * @returns string
       */
      isDisabled(page) {
        if ((page + 1) === this.activePage.value) {
          return store.disabledClass
        } else {
          return ''
        }
      },
      /**
       * Call this function inside watcher
       */
      onSearchChanged() {
        if (store.search === '' && store.autoReset.active) {
          setTimeout(() => {
            store.offset = 0;
            this.runPaging();
          }, store.autoReset.timeout);
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
        store.offset = page;
        this.runPaging();
      },
      /**
       * Search data based on parameters in the search box
       * 
       * @return void
       */
      filter() {
        let timeout;
        (store.delay.active) ? timeout = store.delay.timeout : timeout = 0;
        setTimeout(() => {
          store.offset = 0;
          this.runPaging();
        }, timeout);
      },
      /**
       * Refresh data
       * 
       * @return void
       */
      reloadData() {
        store.offset = (this.activePage.value - 1);
        this.runPaging();
      },
      /**
       * Method for sorting data based on table's field
       * 
       * @param {string} orderBy 
       * 
       * @return void
       */
      sortData(orderBy) {
        (store.sort === 'ASC') ? store.ascendingSort = true : store.ascendingSort = false;
        if (store.ascendingSort) {
          store.ascendingSort = false;
          store.sort = 'DESC';
        } else {
          store.ascendingSort = true;
          store.sort = 'ASC';
        }
        store.orderBy = orderBy;
        this.runPaging();
      },
      /**
       * Option to show number of data per page
       * 
       * @return void
       */
      showPerPage() {
        store.limit = parseInt(store.rows);
        store.offset = 0;
        this.runPaging();
      },
      /**
       * Method for excecuting getData() based on current state
       * like limit, offset, filter, etc.
       * 
       * @return void
       */
      runPaging() {
        this.getData({
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
          beforeRequest: () => {
            if(beforeRequest.value !== null) beforeRequest.value();
          },
          afterRequest: () => {
            if(afterRequest.value !== null) afterRequest.value();
          }
        }, true);
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
        store.token = options.token;
        store.pagingLang = options.lang;

        let requestURL = '';
        if(options.rawUrl === undefined) {
          store.url = options.url;
          store.limit = options.limit;
          store.offset = options.offset * options.limit;
          store.orderBy = options.orderBy;
      
          // options.searchBy could be a string or array
          typeof options.searchBy === 'string' ?
            store.searchBy = options.searchBy :
            store.searchBy = options.searchBy.join('-');
      
          store.sort = options.sort;
          store.search = options.search;
          let searchParam;
          store.search === '' ? searchParam = '' : searchParam = '/' + store.search;
      
          let baseURL = `${options.url}${store.limit}/${store.offset}/${store.orderBy}/${store.searchBy}/${store.sort}`;
      
          if(options.where === undefined || options.where === false) {
            requestURL = `${baseURL}${searchParam}`;
            store.whereClause = false;
          } else {
            requestURL = `${baseURL}/${store.whereClause}${searchParam}`;
          }
        } else {
          store.url = options.rawUrl;
          requestURL = options.rawUrl;
        }
    
        if (options.autoReset !== undefined) {
          store.autoReset.active = options.autoReset.active;
          if (options.autoReset.timeout !== undefined) {
            store.autoReset.timeout = options.autoReset.timeout;
          }
        }
    
        if (options.delay !== undefined) {
          store.delay.active = options.delay.active;
          if (options.delay.timeout !== undefined) {
            store.delay.timeout = options.delay.timeout;
          }
        }

        // do something before the request sent
        if(options.beforeRequest !== undefined) {
          if(!callFromRunPaging) {
            beforeRequest.value = () => options.beforeRequest();          
          }

          options.beforeRequest();
        }

        let fetchOptions = {
          method: 'GET',
          mode: options.cors === undefined ? 'cors' : options.cors, // CORS must be default
          headers: {
            Authorization: options.token ?? ''
          }
        };
        
        // we always use authentication for getting data by default
        // but it can be turned off for some purposes
        // Eg: Getting public data
        if(!options.useAuth) {
          fetchOptions = { method: 'GET' };
        }
    
        fetch(requestURL, fetchOptions)
          .then(response => response.json())
          .then(res => {
            store.data = res.container;
            this.create({
              rows: res.totalRows,
              start: options.offset,
              linkNum: options.linkNum ?? store.linkNum,
              activeClass: options.activeClass ?? store.activeClass,
              linkClass: options.linkClass ?? store.linkClass
            });

            // do something after the request success
            if(options.afterRequest !== undefined) {
              if(!callFromRunPaging) {
                afterRequest.value = () => options.afterRequest();
              }

              options.afterRequest();
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
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
        store.totalRows = settings.rows;
        store.activeClass = settings.activeClass;
        store.linkClass = settings.linkClass;
        store.linkNum = settings.linkNum;
    
        // reset links
        store.pageLinks = [];
    
        // count the number of pages needed by pagination link
        let countLink = settings.rows / store.limit;
        countLink = Math.ceil(countLink);
    
        // define the first link
        let startLink;
    
        // check whether to use link number of not
        if (settings.linkNum === false) {
          store.numLinks = false;
        }
    
        // generate startLink...
        if (settings.linkNum > countLink || settings.linkNum < 1) {
          startLink = 1;
        } else {
          if (settings.linkNum % 2 !== 0) {
            startLink = settings.linkNum - 1;
          } else {
            startLink = settings.linkNum;
          }
          startLink = this.activePage.value - (startLink / 2);
          if (startLink < 1) {
            startLink = 1;
          }
        }
    
        // generate pagination link....
        for (let i = startLink; i <= countLink; i++) {
          store.pageLinks.push(i);
          if (store.pageLinks.length === settings.linkNum) {
            break;
          }
        }
    
        // the last page is equal to the number of links
        store.last = countLink;
    
        // generate previous and next page links
        settings.start === (store.last -= 1) ? store.next = settings.start : store.next = settings.start + 1;
        settings.start === store.first ? store.prev = settings.start : store.prev = settings.start - 1;
      },
      /**
       * Method for marking active link
       * 
       * @param {number} link 
       * 
       * @return string
       */
      activeLink(link) {
        if (link === this.activePage.value) {
          return store.activeClass
        } else {
          return ''
        }
        
      },
      /**
       * Create item number based on its position 
       * in whole data
       * 
       * @param {number} index
       * 
       * @return int
       */
      itemNumber(index) {
        return this.dataFrom.value + index
      },
      /**
       * Get active page
       * 
       * @return int
       */
      activePage: vue.computed(() => {
        return ((store.offset / store.limit) + 1)
      }),
      /**
       * Get the last data range
       * 
       * @return int
       */
      dataTo: vue.computed(() => {
        let currentPage = store.offset / store.limit,
          range;
        if (store.pageLinks.length === 0) {
          range = 0;
        } else {
          if (currentPage === store.last) {
            range = store.totalRows;
          } else {
            range = store.offset + store.limit;
          }
        }
    
        return range
      }),
      /**
       * Get the first data range 
       * 
       */
      dataFrom: vue.computed(() => {
        let from;
        if (store.pageLinks.length === 0) {
          from = 0;
        } else {
          if (store.offset === 0) {
            from = 1;
          } else {
            from = store.offset + 1;
          }
        }
    
        return from
      }),
      /**
       * Generate data range
       * 
       * @return string
       */
      rowRange() {
        if (store.pageLinks.length === 0) {
          store.showPaging = false;
    
          // handle error on undefined
          return (store.sentences[store.pagingLang] === undefined) ? '' : store.sentences[store.pagingLang].noData
        } else {
          store.showPaging = true;
          let returnedText = 'Unable to load rows range.';
          if(store.sentences[store.pagingLang] !== undefined) {
            returnedText = `${store.sentences[store.pagingLang].showRows} ${this.dataFrom.value} - 
                          ${this.dataTo.value} ${store.sentences[store.pagingLang].from} ${store.totalRows} 
                          ${store.sentences[store.pagingLang].rows}`;
          }
    
          return returnedText
        }
      }
    }
    
  };

  exports.usePaging = usePaging;

  return exports;

})({}, Vue);
