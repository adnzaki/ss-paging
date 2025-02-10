import { StateInterface, OptionsInterface } from './types';
/**
 * Method for giving a disabled state on pagination buttons
 */
declare function isDisabled(page: number): string;
/**
 * Call this function inside watcher
 */
declare function onSearchChanged(): void;
/**
 * Method for navigating the page
 */
declare function nav(page: number): void;
/**
 * Search data based on parameters in the search box
 */
declare function filter(): void;
/**
 * Refresh data
 *
 * @return void
 */
declare function reloadData(): void;
/**
 * Method for sorting data based on table's field
 */
declare function sortData(orderBy: string): void;
/**
 * Option to show number of data per page
 *
 * @return void
 */
declare function showPerPage(): void;
/**
 * Method for excecuting getData() based on current state
 * like limit, offset, filter, etc.
 */
declare function runPaging(): void;
/**
 * Get data from the server with several configuration options
 */
declare function getData(options: OptionsInterface, callFromRunPaging?: boolean): void;
/**
 * Method for marking active link
 */
declare function activeLink(link: number): string;
/**
 * Create item number based on its position
 * in whole data
 */
declare function itemNumber(index: number): number;
/**
 * Generate data range
 */
declare function rowRange(): string;
declare function usePaging(): {
    state: StateInterface;
    dataTo: import("vue").ComputedRef<number>;
    dataFrom: import("vue").ComputedRef<number>;
    activePage: import("vue").ComputedRef<number>;
    nav: typeof nav;
    filter: typeof filter;
    getData: typeof getData;
    rowRange: typeof rowRange;
    sortData: typeof sortData;
    runPaging: typeof runPaging;
    reloadData: typeof reloadData;
    itemNumber: typeof itemNumber;
    activeLink: typeof activeLink;
    isDisabled: typeof isDisabled;
    showPerPage: typeof showPerPage;
    onSearchChanged: typeof onSearchChanged;
};
export { usePaging };
