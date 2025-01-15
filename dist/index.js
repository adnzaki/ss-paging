import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';

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
 * @version     3.0.0-beta.4
 * @url         https://lib.actudent.com/ss-paging
 */
const beforeRequest = ref(null);
const afterRequest = ref(null);
const state = reactive({
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
    delay: {
        active: false,
        timeout: 500,
    },
    // auto reset data to its default
    // if search input is empty string
    autoReset: {
        active: false,
        timeout: 3000,
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
    if (state.search === '' && state.autoReset.active) {
        setTimeout(() => {
            state.offset = 0;
            runPaging();
        }, state.autoReset.timeout);
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
    let timeout;
    state.delay.active ? (timeout = state.delay.timeout) : (timeout = 0);
    setTimeout(() => {
        state.offset = 0;
        runPaging();
    }, timeout);
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
        token: state.token,
        lang: state.pagingLang,
        limit: state.limit,
        offset: state.offset,
        orderBy: state.orderBy,
        searchBy: state.searchBy,
        sort: state.sort,
        where: state.whereClause,
        search: state.search,
        url: state.url,
        linkNum: state.linkNum,
        mode: state.mode,
        activeClass: state.activeClass,
        linkClass: state.linkClass,
        useHeader: state.useHeader,
        autoReset: {
            active: state.autoReset.active,
            timeout: state.autoReset.timeout,
        },
        delay: {
            active: state.delay.active,
            timeout: state.delay.timeout,
        },
        debug: state.debug,
        beforeRequest: () => {
            if (beforeRequest.value !== null)
                beforeRequest.value();
        },
        afterRequest: () => {
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
function getData(options, callFromRunPaging = false) {
    state.token = options.token;
    state.pagingLang = options.lang;
    state.debug = options.debug;
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
    let searchParam;
    state.search === '' ? searchParam = '' : searchParam = '/' + state.search;
    let baseURL = options.url;
    // if not using header, then we need to add limit, offset, orderBy, searchBy, sort
    if (options.useHeader) {
        baseURL = `${baseURL}/${state.searchBy}`;
    }
    else {
        baseURL = `${baseURL}${state.limit}/${state.offset}/${state.orderBy}/${state.searchBy}/${state.sort}`;
    }
    let requestURL = `${baseURL}${searchParam}`;
    if (options.autoReset !== undefined) {
        state.autoReset.active = options.autoReset.active;
        if (options.autoReset.timeout !== undefined) {
            state.autoReset.timeout = options.autoReset.timeout;
        }
    }
    if (options.delay !== undefined) {
        state.delay.active = options.delay.active;
        if (options.delay.timeout !== undefined) {
            state.delay.timeout = options.delay.timeout;
        }
    }
    // do something before the request sent
    if (options.beforeRequest !== undefined) {
        if (!callFromRunPaging) {
            beforeRequest.value = () => options.beforeRequest();
        }
        options.beforeRequest();
    }
    let optionHeaders = new Headers();
    optionHeaders.set('Authorization', options.token ?? '');
    if (options.useHeader) {
        optionHeaders.set('limit', state.limit.toString());
        optionHeaders.set('offset', state.offset.toString());
        optionHeaders.set('orderBy', state.orderBy);
        optionHeaders.set('sort', state.sort);
    }
    const fetchOptions = {
        method: 'GET',
        mode: options.mode === undefined ? 'cors' : options.mode, // CORS must be default
        headers: optionHeaders,
    };
    if (options.mode !== undefined) {
        state.mode = options.mode;
    }
    console.log(optionHeaders.get('limit'));
    fetch(requestURL, fetchOptions)
        .then((response) => response.json())
        .then((res) => {
        state.rawResponse = res;
        state.data = res.container;
        create({
            rows: res.totalRows,
            start: options.offset,
            linkNum: options.linkNum ?? state.linkNum,
            activeClass: options.activeClass ?? state.activeClass,
            linkClass: options.linkClass ?? state.linkClass,
            disabledClass: options.disabledClass ?? state.disabledClass,
        });
        // do something after the request success
        if (options.afterRequest !== undefined) {
            if (!callFromRunPaging) {
                afterRequest.value = () => options.afterRequest();
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
        .catch((error) => {
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
    let countLink = settings.rows / state.limit;
    countLink = Math.ceil(countLink);
    // define the first link
    let startLink;
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
    for (let i = startLink; i <= countLink; i++) {
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
const activePage = computed(() => {
    return state.offset / state.limit + 1;
});
/**
 * Get the last data range
 *
 */
const dataTo = computed(() => {
    const currentPage = state.offset / state.limit;
    let range;
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
const dataFrom = computed(() => {
    let from;
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
        let returnedText = 'Unable to load rows range.';
        if (state.sentences[state.pagingLang] !== undefined) {
            returnedText = `${state.sentences[state.pagingLang].showRows} ${dataFrom.value} - 
                      ${dataTo.value} ${state.sentences[state.pagingLang].from} ${state.totalRows} 
                      ${state.sentences[state.pagingLang].rows}`;
        }
        return returnedText;
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
    };
}

const usePagingStore = defineStore('sspaging', () => usePaging());

export { usePaging, usePagingStore };
