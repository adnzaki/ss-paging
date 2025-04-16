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
 * @version     3.0.3
 * @url         https://lib.actudent.com/ss-paging
 */
var beforeRequest = vue.ref(null);
var afterRequest = vue.ref(null);
var onError = vue.ref(null);
var state = vue.reactive({
    pageLinks: [], // Array of pagination links
    prev: 0, // Previous page number
    next: 0, // Next page number
    last: 0, // Last page number
    first: 0, // First page number
    limit: 10, // Number of rows per page
    offset: 0, // Current offset for pagination
    setStart: 0, // Starting page number
    totalRows: 0, // Total number of rows in the dataset
    numLinks: true, // Whether to show numeric links
    usePost: false, // Whether to use POST requests
    useHeader: false, // Whether to include pagination info in headers
    showPaging: true, // Whether to display pagination
    linkClass: 'item', // CSS class for pagination links
    activeClass: 'active', // CSS class for the active link
    disabledClass: 'disabled', // CSS class for disabled links
    url: '', // Base URL for data fetching
    rows: 10, // Number of rows to display per page
    data: [], // Data fetched from the server
    search: '', // Search query string
    sort: 'ASC', // Sorting order (ASC or DESC)
    orderBy: '', // Field to sort by
    searchBy: '', // Field(s) to search by
    linkNum: false, // Whether to limit the number of links displayed
    whereClause: null, // Additional filtering conditions
    ascendingSort: false, // Whether the sorting is ascending
    token: '', // Authorization token
    mode: 'cors', // Fetch mode (e.g., cors, no-cors)
    debug: false, // Debug mode flag
    rawResponse: [], // Raw response data from the server
    delay: 0, // Delay for search filtering
    autoReset: 0, // Auto-reset data when search input is empty
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
    pagingLang: 'english', // Current language for pagination messages
});
/**
 * Method for giving a disabled state on pagination buttons.
 * @param page - The page number.
 * @return A CSS class name for disabled state or an empty string.
 */
function isDisabled(page) {
    // Check if the current page is equal to the page number plus one
    if (page + 1 === activePage.value) {
        return state.disabledClass;
    }
    else {
        // Return an empty string if not disabled
        return '';
    }
}
/**
 * Triggered when the search input changes.
 * Resets the offset and reloads data if the search input is empty.
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
 * Navigate to a specific page.
 * @param page - The page number to navigate to.
 */
function nav(page) {
    state.offset = page;
    runPaging();
}
/**
 * Filter data based on the search input.
 * Delays the filtering process based on the configured delay.
 */
function filter() {
    setTimeout(function () {
        state.offset = 0;
        runPaging();
    }, state.delay);
}
/**
 * Reload the current data by refreshing the active page.
 */
function reloadData() {
    state.offset = activePage.value - 1;
    runPaging();
}
/**
 * Sort data based on a specific field.
 * Toggles between ascending and descending order.
 * @param orderBy - The field to sort by.
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
 * Update the number of rows displayed per page.
 */
function showPerPage() {
    state.limit = state.rows;
    state.offset = 0;
    runPaging();
}
/**
 * Execute the getData() function based on the current state.
 * Handles pagination, filtering, and sorting.
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
        usePost: state.usePost,
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
        onError: function () {
            if (onError.value !== null)
                onError.value();
        },
    }, true);
    if (state.debug) {
        console.clear();
        console.info('[SSPaging] If you see this message, it means getData() is executed through runPaging() and your initial options have been redefined using reactive state.');
    }
}
/**
 * Fetch data from the server with the provided options.
 * @param options - Configuration options for the request.
 * @param callFromRunPaging - Indicates if the call is from runPaging().
 */
function getData(options, callFromRunPaging) {
    if (callFromRunPaging === void 0) { callFromRunPaging = false; }
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
    state.usePost = options.usePost;
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
    if (!options.useHeader && !options.usePost) {
        baseURL = "".concat(baseURL, "/").concat(state.limit, "/").concat(state.offset, "/").concat(state.orderBy, "/").concat(state.searchBy, "/").concat(state.sort);
    }
    var requestURL = options.usePost ? baseURL : "".concat(baseURL).concat(searchParam);
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
    var formData = new FormData();
    if (options.usePost) {
        formData.append('limit', state.limit.toString());
        formData.append('offset', state.offset.toString());
        formData.append('orderBy', state.orderBy);
        formData.append('sort', state.sort);
        formData.append('search', state.search);
        formData.append('searchBy', state.searchBy);
    }
    var fetchOptions = {
        method: 'GET',
        mode: options.mode === undefined ? 'cors' : options.mode, // CORS must be default
        headers: optionHeaders,
    };
    var fetchOptionsUsingPost = {
        method: 'POST',
        mode: fetchOptions.mode,
        body: formData
    };
    if (options.mode !== undefined) {
        state.mode = options.mode;
    }
    if (options.onError !== undefined) {
        if (!callFromRunPaging) {
            onError.value = function () { return options.onError(); };
        }
    }
    fetch(requestURL, options.usePost ? fetchOptionsUsingPost : fetchOptions)
        .then(function (response) { return response.json(); })
        .then(function (res) {
        var _a, _b, _c, _d;
        state.rawResponse = res;
        state.data = res.container;
        create({
            rows: res.totalRows,
            start: options.offset,
            linkNum: (_a = options.linkNum) !== null && _a !== void 0 ? _a : state.linkNum,
            activeClass: (_b = options.activeClass) !== null && _b !== void 0 ? _b : state.activeClass,
            linkClass: (_c = options.linkClass) !== null && _c !== void 0 ? _c : state.linkClass,
            disabledClass: (_d = options.disabledClass) !== null && _d !== void 0 ? _d : state.disabledClass,
        });
        // do something after the request success
        if (options.afterRequest !== undefined) {
            if (!callFromRunPaging) {
                afterRequest.value = function () { return options.afterRequest(); };
            }
            options.afterRequest();
        }
        if (state.debug) {
            console.info('[SSPaging] Generated URL: ', requestURL);
            console.info('[SSPaging] Reactive state:');
            console.log(state);
            console.info('[SSPaging] Below are options you have provided:');
            console.log(options);
        }
    })
        .catch(function (error) {
        // for developer
        console.error('[SSPaging] Error:', error);
        // for user
        if (options.onError !== undefined) {
            options.onError();
        }
    });
}
/**
 * Generate pagination links based on the provided settings.
 * @param settings - Configuration for pagination generation.
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
        console.info('[SSPaging] Settings for generating pagination:');
        console.log(settings);
        console.info('[SSPaging] Total possible links (if shown): ' + countLink);
        console.info('[SSPaging] Start link: ' + startLink);
        console.info('[SSPaging] If startLink value never change, it may caused linkNum is hidden');
    }
}
/**
 * Mark a pagination link as active.
 * @param link - The link number to check.
 * @return A CSS class name for the active state or an empty string.
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
 * Calculate the item number based on its position in the dataset.
 * @param index - The index of the item in the current page.
 * @return The item number in the entire dataset.
 */
function itemNumber(index) {
    return dataFrom.value + index;
}
/**
 * Get active page.
 * @return The current active page number.
 */
var activePage = vue.computed(function () {
    return state.offset / state.limit + 1;
});
/**
 * Get the last data range.
 * @return The last data range number.
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
 * Get the first data range.
 * @return The first data range number.
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
 * Generate a range of rows being displayed.
 * @return A string representing the range of rows.
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
/**
 * Hook to use the pagination functionality.
 * Provides access to state and methods for pagination.
 * @return An object containing state and pagination methods.
 */
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
