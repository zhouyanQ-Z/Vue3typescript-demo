import service from ".";
import { LoginFormInterface } from "@/type/login";

// 登录接口
export function loginApi(data:LoginFormInterface) {
  return service({
    url:'login',
    method: 'post',
    data
  })
}

// 商品接口
export function goodsListApi() {
  return service({
    url: 'getGoodsList',
    method: 'get'
  })
}

// 用户接口
export function userListApi() {
  return service({
    url: 'getUserList',
    method: 'get'
  })
}

// 角色列表接口
export function roleListApi() {
  return service({
    url: 'getRoleList',
    method: 'get'
  })
}

// 权限列表接口
export function authorityListApi() {
  return service({
    url: 'getAuthorityList',
    method: 'get'
  })
}