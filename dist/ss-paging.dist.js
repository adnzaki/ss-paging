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
    * @version     3.0.0-alpha.1
    * @url         https://lib.actudent.com/ss-paging
    */
   var beforeRequest = vue.ref(null);
   var afterRequest = vue.ref(null);
   var pagingStates = {
       pageLinks: [], limit: 10, offset: 0, prev: 0,
       next: 0, first: 0, last: 0, setStart: 0, totalRows: 0,
       numLinks: true, activeClass: 'active', linkClass: 'item', disabledClass: 'disabled',
       showPaging: true, search: '', data: [],
       orderBy: '', searchBy: '', sort: 'ASC', whereClause: null,
       url: '', ascendingSort: false, linkNum: false, rows: 10,
       token: '', useAuth: true, mode: 'cors',
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
   };
   var store = vue.reactive(pagingStates);
   /**
      * Method for giving a disabled state on pagination buttons
      */
   function isDisabled(page) {
       if ((page + 1) === activePage.value) {
           return store.disabledClass;
       }
       else {
           return '';
       }
   }
   /**
    * Call this function inside watcher
    */
   function onSearchChanged() {
       if (store.search === '' && store.autoReset.active) {
           setTimeout(function () {
               store.offset = 0;
               runPaging();
           }, store.autoReset.timeout);
       }
   }
   /**
      * Method for navigating the page
      */
   function nav(page) {
       store.offset = page;
       runPaging();
   }
   /**
    * Search data based on parameters in the search box
    */
   function filter() {
       var timeout;
       (store.delay.active) ? timeout = store.delay.timeout : timeout = 0;
       setTimeout(function () {
           store.offset = 0;
           runPaging();
       }, timeout);
   }
   /**
    * Refresh data
    *
    * @return void
    */
   function reloadData() {
       store.offset = (activePage.value - 1);
       runPaging();
   }
   /**
    * Method for sorting data based on table's field
    */
   function sortData(orderBy) {
       (store.sort === 'ASC') ? store.ascendingSort = true : store.ascendingSort = false;
       if (store.ascendingSort) {
           store.ascendingSort = false;
           store.sort = 'DESC';
       }
       else {
           store.ascendingSort = true;
           store.sort = 'ASC';
       }
       store.orderBy = orderBy;
       runPaging();
   }
   /**
    * Option to show number of data per page
    *
    * @return void
    */
   function showPerPage() {
       store.limit = store.rows;
       store.offset = 0;
       runPaging();
   }
   /**
    * Method for excecuting getData() based on current state
    * like limit, offset, filter, etc.
    */
   function runPaging() {
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
           beforeRequest: function () {
               if (beforeRequest.value !== null)
                   beforeRequest.value();
           },
           afterRequest: function () {
               if (afterRequest.value !== null)
                   afterRequest.value();
           }
       }, true);
   }
   function getData(options, callFromRunPaging) {
       var _a;
       if (callFromRunPaging === void 0) { callFromRunPaging = false; }
       store.token = options.token;
       store.pagingLang = options.lang;
       var requestURL;
       if (options.rawUrl === undefined) {
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
           var searchParam = void 0;
           store.search === '' ? searchParam = '' : searchParam = '/' + store.search;
           var baseURL = "".concat(options.url).concat(store.limit, "/").concat(store.offset, "/").concat(store.orderBy, "/").concat(store.searchBy, "/").concat(store.sort);
           if (options.where === undefined || options.where === false) {
               requestURL = "".concat(baseURL).concat(searchParam);
               store.whereClause = false;
           }
           else {
               requestURL = "".concat(baseURL, "/").concat(store.whereClause).concat(searchParam);
           }
       }
       else {
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
       if (options.beforeRequest !== undefined) {
           if (!callFromRunPaging) {
               beforeRequest.value = function () { return options.beforeRequest(); };
           }
           options.beforeRequest();
       }
       var fetchOptions = {};
       // we always use authentication for getting data by default
       // but it can be turned off for some purposes
       // Eg: Getting public data
       if (options.useAuth === false) {
           fetchOptions = { method: 'GET' };
           store.useAuth = options.useAuth;
       }
       else {
           fetchOptions = {
               method: 'GET',
               mode: options.mode === undefined ? 'cors' : options.mode,
               headers: {
                   Authorization: (_a = options.token) !== null && _a !== void 0 ? _a : ''
               }
           };
       }
       if (options.mode !== undefined) {
           store.mode = options.mode;
       }
       fetch(requestURL, fetchOptions)
           .then(function (response) { return response.json(); })
           .then(function (res) {
           var _a, _b, _c;
           store.data = res.container;
           create({
               rows: res.totalRows,
               start: options.offset,
               linkNum: (_a = options.linkNum) !== null && _a !== void 0 ? _a : store.linkNum,
               activeClass: (_b = options.activeClass) !== null && _b !== void 0 ? _b : store.activeClass,
               linkClass: (_c = options.linkClass) !== null && _c !== void 0 ? _c : store.linkClass
           });
           // do something after the request success
           if (options.afterRequest !== undefined) {
               if (!callFromRunPaging) {
                   afterRequest.value = function () { return options.afterRequest(); };
               }
               options.afterRequest();
           }
       })
           .catch(function (error) {
           console.error('Error:', error);
       });
   }
   /**
    * Generate Pagination
    */
   function create(settings) {
       store.totalRows = settings.rows;
       store.activeClass = settings.activeClass;
       store.linkClass = settings.linkClass;
       store.linkNum = settings.linkNum;
       // reset links
       store.pageLinks = [];
       // count the number of pages needed by pagination link
       var countLink = settings.rows / store.limit;
       countLink = Math.ceil(countLink);
       // define the first link
       var startLink;
       // check whether to use link number of not
       if (settings.linkNum === false) {
           store.numLinks = false;
       }
       // generate startLink...
       if (typeof settings.linkNum === 'number') {
           if (settings.linkNum > countLink || settings.linkNum < 1) {
               startLink = 1;
           }
           else {
               if (settings.linkNum % 2 !== 0) {
                   startLink = settings.linkNum - 1;
               }
               else {
                   startLink = settings.linkNum;
               }
               startLink = activePage.value - (startLink / 2);
               if (startLink < 1) {
                   startLink = 1;
               }
           }
       }
       // generate pagination link....
       for (var i = startLink; i <= countLink; i++) {
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
   }
   /**
    * Method for marking active link
    */
   function activeLink(link) {
       if (link === activePage.value) {
           return store.activeClass;
       }
       else {
           return '';
       }
   }
   /**
    * Create item number based on its position
    * in whole data
    */
   function itemNumber(index) {
       return dataFrom.value + index;
   }
   /**
    * Get active page
    */
   var activePage = vue.computed(function () {
       return ((store.offset / store.limit) + 1);
   });
   /**
    * Get the last data range
    *
    */
   var dataTo = vue.computed(function () {
       var currentPage = store.offset / store.limit, range;
       if (store.pageLinks.length === 0) {
           range = 0;
       }
       else {
           if (currentPage === store.last) {
               range = store.totalRows;
           }
           else {
               range = store.offset + store.limit;
           }
       }
       return range;
   });
   /**
    * Get the first data range
    *
    */
   var dataFrom = vue.computed(function () {
       var from;
       if (store.pageLinks.length === 0) {
           from = 0;
       }
       else {
           if (store.offset === 0) {
               from = 1;
           }
           else {
               from = store.offset + 1;
           }
       }
       return from;
   });
   /**
    * Generate data range
    */
   function rowRange() {
       if (store.pageLinks.length === 0) {
           store.showPaging = false;
           // handle error on undefined
           return (store.sentences[store.pagingLang] === undefined) ? '' : store.sentences[store.pagingLang].noData;
       }
       else {
           store.showPaging = true;
           var returnedText = 'Unable to load rows range.';
           if (store.sentences[store.pagingLang] !== undefined) {
               returnedText = "".concat(store.sentences[store.pagingLang].showRows, " ").concat(dataFrom.value, " - \n                      ").concat(dataTo.value, " ").concat(store.sentences[store.pagingLang].from, " ").concat(store.totalRows, " \n                      ").concat(store.sentences[store.pagingLang].rows);
           }
           return returnedText;
       }
   }
   function usePaging() {
       return {
           state: vue.reactive(pagingStates),
           isDisabled: isDisabled,
           onSearchChanged: onSearchChanged,
           nav: nav,
           filter: filter,
           reloadData: reloadData,
           sortData: sortData,
           showPerPage: showPerPage,
           runPaging: runPaging,
           getData: getData,
           activeLink: activeLink,
           activePage: activePage,
           itemNumber: itemNumber,
           rowRange: rowRange
       };
   }

   exports.usePaging = usePaging;

   return exports;

})({}, Vue);
