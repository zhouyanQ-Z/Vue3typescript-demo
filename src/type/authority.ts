interface ListInt {
  name: string
  roleId:number
  roleList?:ListInt[]
  viewRole?:string
}
export class AuthorityData {
  id:number
  authority:number[]
  constructor(id:number,authority:number[]) {
    this.id = id;
    this.authority = authority
  }
  authorityList:ListInt[]=[]
  treeRef:any
}