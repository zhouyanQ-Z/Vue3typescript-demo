export interface UserListInt {
  id:number
  nickName: string
  role: RoleInt[]
  userName:string
}
interface RoleInt {
  role: number
  roleName:string
}

export interface RoleListInt {
  authority:number[]
  roleId: number
  roleName:string
}

export interface SearchFormInt {
  role:number
  nickName:string
  page: number;
  pageSize: number;
}

export interface EditFormInt {
  id:number
  nickName:string
  role:number[]
  userName:string
}


export class UserData {
  userList:UserListInt[]=[] //用户列表数据
  roleList:RoleListInt[]=[] // 角色列表信息
  searchForm:SearchFormInt={
    role: 0,
    nickName:'',
    page:1,
    pageSize:10
  }
  isShow:boolean=false
  editForm:EditFormInt={
    id:0,
    nickName:'',
    role:[],
    userName:''
  }
}