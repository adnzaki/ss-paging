import { StateInterface, OptionsInterface } from './types';
/**
 * Method for giving a disabled state on pagination buttons.
 * @param page - The page number.
 * @return A CSS class name for disabled state or an empty string.
 */
declare function isDisabled(page: number): string;
/**
 * Triggered when the search input changes.
 * Resets the offset and reloads data if the search input is empty.
 */
declare function onSearchChanged(): void;
/**
 * Navigate to a specific page.
 * @param page - The page number to navigate to.
 */
declare function nav(page: number): void;
/**
 * Filter data based on the search input.
 * Delays the filtering process based on the configured delay.
 */
declare function filter(): void;
/**
 * Reload the current data by refreshing the active page.
 */
declare function reloadData(): void;
/**
 * Sort data based on a specific field.
 * Toggles between ascending and descending order.
 * @param orderBy - The field to sort by.
 */
declare function sortData(orderBy: string): void;
/**
 * Update the number of rows displayed per page.
 */
declare function showPerPage(): void;
/**
 * Execute the getData() function based on the current state.
 * Handles pagination, filtering, and sorting.
 */
declare function runPaging(): void;
/**
 * Fetch data from the server with the provided options.
 * @param options - Configuration options for the request.
 * @param callFromRunPaging - Indicates if the call is from runPaging().
 */
declare function getData(options: OptionsInterface, callFromRunPaging?: boolean): void;
/**
 * Mark a pagination link as active.
 * @param link - The link number to check.
 * @return A CSS class name for the active state or an empty string.
 */
declare function activeLink(link: number): string;
/**
 * Calculate the item number based on its position in the dataset.
 * @param index - The index of the item in the current page.
 * @return The item number in the entire dataset.
 */
declare function itemNumber(index: number): number;
/**
 * Generate a range of rows being displayed.
 * @return A string representing the range of rows.
 */
declare function rowRange(): string;
/**
 * Hook to use the pagination functionality.
 * Provides access to state and methods for pagination.
 * @return An object containing state and pagination methods.
 */
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
