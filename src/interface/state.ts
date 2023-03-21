export interface StateInterface {
  pageLinks: number[], 
  limit: number, 
  offset: number, 
  prev: number,
  next: number, 
  first: number, 
  last: number, 
  setStart: number, 
  totalRows: number,
  numLinks: boolean, 
  activeClass: string, 
  linkClass: string,
  disabledClass: string,
  showPaging: boolean, 
  search: string, 
  data: Array<string>,
  orderBy: string, 
  searchBy: string, 
  sort: string, 
  whereClause: boolean | null,
  url: string, 
  ascendingSort: boolean, 
  linkNum: number | boolean, 
  rows: number, // custom limit
  token: string, 
  useAuth: boolean,
  delay: {
    active: boolean,
    timeout: number
  },
  autoReset: {
    active: boolean,
    timeout: number
  },
  mode: string,
  sentences: {
    indonesia: {
      noData: string,
      showRows: string,
      from: string,
      rows: string,
    },
    english: {
      noData: string,
      showRows: string,
      from: string,
      rows: string,
    }
  },
  pagingLang: string,
}