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
  whereClause: string | boolean | null,
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
  debug: boolean
}

export interface OptionsInterface {
  token?: string,
  lang?: string,
  limit?: number,
  offset?: number,
  orderBy?: string,
  searchBy?: string | string[],
  sort?: string,
  where?: string | boolean | null,
  search?: string,
  url?: string,
  rawUrl?: string,
  linkNum?: number | boolean,
  activeClass?: string,
  linkClass?: string,
  disabledClass?: string,
  autoReset?: {
    active: boolean,
    timeout: number
  },
  delay?: {
    active: boolean,
    timeout: number
  },
  useAuth?: boolean,
  mode?: string,
  debug?: boolean,
  beforeRequest?: () => void,
  afterRequest?: () => void
}