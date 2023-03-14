import { RoleListInt } from './user'

interface PaginationInt {
  page: number
  pageSize: number
}
export class RoleData {
  roleList:RoleListInt[]=[]
  paginationData:PaginationInt={
    page:1,
    pageSize: 10
  }
}