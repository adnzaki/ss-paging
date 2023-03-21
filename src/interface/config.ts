export interface OptionsInterface {
  token?: string,
  lang?: string,
  limit?: number,
  offset?: number,
  orderBy?: string,
  searchBy?: string | string[],
  sort?: string,
  where?: string | boolean,
  search?: string,
  url?: string,
  rawUrl?: string,
  linkNum?: number | boolean,
  activeClass?: string,
  linkClass?: string,
  autoReset?: {
    active: boolean,
    timeout: number
  },
  delay?: {
    active?: boolean,
    timeout: number
  },
  useAuth?: boolean,
  mode?: string,
  beforeRequest?: () => void,
  afterRequest?: () => void
}