'use strict';

var vue = require('vue');
var pinia = require('pinia');

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
 * @version     3.0.0
 * @url         https://lib.actudent.com/ss-paging
 */
var beforeRequest = vue.ref(null);
var afterRequest = vue.ref(null);
var state = vue.reactive({
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
});
/**
 * Method for giving a disabled state on pagination buttons
 */
function isDisabled(page) {
    if (page + 1 === activePage.value) {
        return state.disabledClass;
    }
    else {
        return '';
    }
}
/**
 * Call this function inside watcher
 */
function onSearchChanged() {
    if (state.search === '' && state.autoReset > 0) {
        setTimeout(function () {
            state.offset = 0;
            runPaging();
        }, state.autoReset);
    }
}
/**
 * Method for navigating the page
 */
function nav(page) {
    state.offset = page;
    runPaging();
}
/**
 * Search data based on parameters in the search box
 */
function filter() {
    setTimeout(function () {
        state.offset = 0;
        runPaging();
    }, state.delay);
}
/**
 * Refresh data
 *
 * @return void
 */
function reloadData() {
    state.offset = activePage.value - 1;
    runPaging();
}
/**
 * Method for sorting data based on table's field
 */
function sortData(orderBy) {
    state.sort === 'ASC'
        ? (state.ascendingSort = true)
        : (state.ascendingSort = false);
    if (state.ascendingSort) {
        state.ascendingSort = false;
        state.sort = 'DESC';
    }
    else {
        state.ascendingSort = true;
        state.sort = 'ASC';
    }
    state.orderBy = orderBy;
    runPaging();
}
/**
 * Option to show number of data per page
 *
 * @return void
 */
function showPerPage() {
    state.limit = state.rows;
    state.offset = 0;
    runPaging();
}
/**
 * Method for excecuting getData() based on current state
 * like limit, offset, filter, etc.
 */
function runPaging() {
    getData({
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
        autoReset: state.autoReset,
        activeClass: state.activeClass,
        delay: state.delay,
        debug: state.debug,
        beforeRequest: function () {
            if (beforeRequest.value !== null)
                beforeRequest.value();
        },
        afterRequest: function () {
            if (afterRequest.value !== null)
                afterRequest.value();
        },
    }, true);
    if (state.debug) {
        console.clear();
        console.info('If you see this message, it means getData() is executed through runPaging() and your initial options have been redefined using reactive state.');
    }
}
/**
 * Get data from the server with several configuration options
 */
function getData(options, callFromRunPaging) {
    if (callFromRunPaging === undefined) { callFromRunPaging = false; }
    state.token = options.token;
    state.pagingLang = options.lang;
    state.debug = options.debug;
    var url = options.url, limit = options.limit, offset = options.offset, orderBy = options.orderBy, searchBy = options.searchBy, sort = options.sort, search = options.search;
    if (url === undefined ||
        limit === undefined ||
        offset === undefined ||
        orderBy === undefined ||
        searchBy === undefined ||
        sort === undefined ||
        search === undefined) {
        console.error('[SSPaging] Please provide url, limit, offset, orderBy, searchBy, sort and search in getData() options');
        return;
    }
    state.url = options.url;
    state.limit = options.limit;
    state.offset = options.offset * options.limit;
    state.orderBy = options.orderBy;
    state.useHeader = options.useHeader;
    // options.searchBy could be a string or array
    typeof options.searchBy === 'string'
        ? (state.searchBy = options.searchBy)
        : (state.searchBy = options.searchBy.join('-'));
    state.sort = options.sort;
    state.search = options.search;
    var searchParam;
    state.search === '' ? (searchParam = '') : (searchParam = '/' + state.search);
    var baseURL = options.url;
    // if not using header, then we need to add limit, offset, orderBy, searchBy, sort
    if (options.useHeader) {
        baseURL = "".concat(baseURL, "/").concat(state.searchBy);
    }
    else {
        baseURL = "".concat(baseURL).concat(state.limit, "/").concat(state.offset, "/").concat(state.orderBy, "/").concat(state.searchBy, "/").concat(state.sort);
    }
    var requestURL = "".concat(baseURL).concat(searchParam);
    if (options.autoReset !== undefined) {
        state.autoReset = options.autoReset;
    }
    if (options.delay !== undefined) {
        state.delay = options.delay;
    }
    // do something before the request sent
    if (options.beforeRequest !== undefined) {
        if (!callFromRunPaging) {
            beforeRequest.value = function () { return options.beforeRequest(); };
        }
        options.beforeRequest();
    }
    var optionHeaders = new Headers();
    if (options.token !== undefined) {
        optionHeaders.set('Authorization', options.token);
    }
    if (options.useHeader) {
        optionHeaders.set('limit', state.limit.toString());
        optionHeaders.set('offset', state.offset.toString());
        optionHeaders.set('orderBy', state.orderBy);
        optionHeaders.set('sort', state.sort);
    }
    var fetchOptions = {
        method: 'GET',
        mode: options.mode === undefined ? 'cors' : options.mode, // CORS must be default
        headers: optionHeaders,
    };
    if (options.mode !== undefined) {
        state.mode = options.mode;
    }
    fetch(requestURL, fetchOptions)
        .then(function (response) { return response.json(); })
        .then(function (res) {
        var _a, _b, _c, _d;
        state.rawResponse = res;
        state.data = res.container;
        create({
            rows: res.totalRows,
            start: options.offset,
            linkNum: (_a = options.linkNum) !== null && _a !== undefined ? _a : state.linkNum,
            activeClass: (_b = options.activeClass) !== null && _b !== undefined ? _b : state.activeClass,
            linkClass: (_c = options.linkClass) !== null && _c !== undefined ? _c : state.linkClass,
            disabledClass: (_d = options.disabledClass) !== null && _d !== undefined ? _d : state.disabledClass,
        });
        // do something after the request success
        if (options.afterRequest !== undefined) {
            if (!callFromRunPaging) {
                afterRequest.value = function () { return options.afterRequest(); };
            }
            options.afterRequest();
        }
        if (state.debug) {
            console.info('Reactive state:');
            console.log(state);
            console.info('Below are options you have provided:');
            console.log(options);
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
    state.totalRows = settings.rows;
    state.activeClass = settings.activeClass;
    state.linkClass = settings.linkClass;
    state.disabledClass = settings.disabledClass;
    state.linkNum = settings.linkNum;
    // reset links
    state.pageLinks = [];
    // count the number of pages needed by pagination link
    var countLink = settings.rows / state.limit;
    countLink = Math.ceil(countLink);
    // define the first link
    var startLink;
    // check whether to use link number of not
    if (settings.linkNum === false) {
        state.numLinks = false;
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
            startLink = activePage.value - startLink / 2;
            if (startLink < 1) {
                startLink = 1;
            }
        }
    }
    else {
        startLink = 1;
    }
    // generate pagination link....
    for (var i = startLink; i <= countLink; i++) {
        state.pageLinks.push(i);
        if (state.pageLinks.length === settings.linkNum) {
            break;
        }
    }
    // the last page is equal to the number of links
    state.last = countLink;
    // generate previous and next page links
    settings.start === (state.last -= 1)
        ? (state.next = settings.start)
        : (state.next = settings.start + 1);
    settings.start === state.first
        ? (state.prev = settings.start)
        : (state.prev = settings.start - 1);
    if (state.debug) {
        console.info('Settings for generating pagination:');
        console.log(settings);
        console.info('Total possible links (if shown): ' + countLink);
        console.info('Start link: ' + startLink);
        console.info('If startLink value never change, it may caused linkNum is hidden');
    }
}
/**
 * Method for marking active link
 */
function activeLink(link) {
    if (link === activePage.value) {
        return state.activeClass;
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
    return state.offset / state.limit + 1;
});
/**
 * Get the last data range
 *
 */
var dataTo = vue.computed(function () {
    var currentPage = state.offset / state.limit;
    var range;
    if (currentPage === state.last) {
        range = state.totalRows;
    }
    else {
        range = state.offset + state.limit;
    }
    return range;
});
/**
 * Get the first data range
 *
 */
var dataFrom = vue.computed(function () {
    var from;
    if (state.offset === 0) {
        from = 1;
    }
    else {
        from = state.offset + 1;
    }
    return from;
});
/**
 * Generate data range
 */
function rowRange() {
    if (state.pageLinks.length === 0) {
        state.showPaging = false;
        // handle error on undefined
        return state.sentences[state.pagingLang] === undefined
            ? ''
            : state.sentences[state.pagingLang].noData;
    }
    else {
        state.showPaging = true;
        var returnedText = 'Unable to load rows range.';
        if (state.sentences[state.pagingLang] !== undefined) {
            returnedText = "".concat(state.sentences[state.pagingLang].showRows, " ").concat(dataFrom.value, " - \n                      ").concat(dataTo.value, " ").concat(state.sentences[state.pagingLang].from, " ").concat(state.totalRows, " \n                      ").concat(state.sentences[state.pagingLang].rows);
        }
        return returnedText;
    }
}
function usePaging() {
    return {
        state: state,
        dataTo: dataTo,
        dataFrom: dataFrom,
        activePage: activePage,
        nav: nav,
        filter: filter,
        getData: getData,
        rowRange: rowRange,
        sortData: sortData,
        runPaging: runPaging,
        reloadData: reloadData,
        itemNumber: itemNumber,
        activeLink: activeLink,
        isDisabled: isDisabled,
        showPerPage: showPerPage,
        onSearchChanged: onSearchChanged,
    };
}

var usePagingStore = pinia.defineStore('sspaging', function () { return usePaging(); });

exports.usePaging = usePaging;
exports.usePagingStore = usePagingStore;
