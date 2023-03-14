<template>
  <div class="user-container">
    <div class="search-form">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="姓名：">
          <el-input v-model="searchForm.nickName" placeholder="请输入姓名" clearable />
        </el-form-item>
        <el-form-item label="角色：">
          <el-select v-model="searchForm.role" size="large" placeholder="请选择">
            <el-option label="全部" :value="0" />
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-box">
      <el-table :data="userList" border style="width: 100%" >
        <el-table-column prop="id" label="ID" width="100" align="center" />
        <el-table-column prop="nickName" label="姓名" width="180" align="center"/>
        <el-table-column prop="role" label="角色" header-align="center">
          <template #default="scope">
            <el-button 
              v-for="item in scope.row.role" 
              :key="item.role"
              type="primary"
              text
              bg
              >{{ item.roleName }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center"  width="100">
          <template #default="scope">
            <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      v-model:current-page="searchForm.page"
      :page-size="searchForm.pageSize"
      :page-sizes="[5,10,15,20]"
      background
      layout="prev,pager,next,jumper,sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="form-pagination"
    />

    <el-dialog v-model="isShow" title="用户修改">
      <el-form :model="editForm">
        <el-form-item label="姓名：" :label-width="100">
          <el-input v-model="editForm.nickName" clearable autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色：" :label-width="100">
          <el-select v-model="editForm.role" multiple placeholder="选择角色" style="width: 100%;">
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShow = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs,watch,computed } from 'vue';
import { userListApi,roleListApi } from '@/request/api';
import { UserData,UserListInt } from '@/type/user'
export default defineComponent({
  setup () {
    
    const data = reactive(new UserData())
    let userData:UserListInt[];
    onMounted(() => {
      getUserData();
      getRoleData();
    })


    const total = computed(() => {
      return data.userList.length
    })

    const showList = computed(() => {
      return data.userList.slice((data.searchForm.page-1)*data.searchForm.pageSize,data.searchForm.page*data.searchForm.pageSize);
    })

    // 获取用户列表数据
    const getUserData= () => {
      userListApi().then(res => {
        data.userList = res.data
        userData = res.data;
      })
    }

    // 获取角色列表数据
    const getRoleData= () => {
      roleListApi().then(res => {
        data.roleList = res.data
      })
    }

    // 搜索查询
    const onSubmit = () => {
      let arr:UserListInt[] = [];
      if(data.searchForm.nickName || data.searchForm.role) {
        if(data.searchForm.nickName) {
          arr = data.userList.filter((item) => item.nickName.includes(data.searchForm.nickName));
        }
        if(data.searchForm.role) {
          arr = (data.searchForm.nickName ? arr : data.userList).filter((item) => item.role.find(r => r.role == data.searchForm.role));
        }
      } else arr = data.userList;

      data.userList = arr;
    };

    // 编辑
    const handleEdit = (val:UserListInt) => {
      data.isShow = true
      data.editForm = JSON.parse(JSON.stringify(val));
      data.editForm.role = val.role.map(item => item.role);
    }
    
    // 确认修改
    const handleConfirm = () => {
      let temp:any = data.userList.find(item => item.id == data.editForm.id);
      temp.nickName = data.editForm.nickName;
      if(temp.role.length > data.editForm.role.length) { // 删除
        temp.role = temp.role.filter((item: { role: number; }) => data.editForm.role.includes(item.role));
      } else if (temp.role.length < data.editForm.role.length){ // 增加
        data.roleList.forEach(item => {
          if(data.editForm.role.indexOf(item.roleId) != -1) {
            if(temp.role.filter((r: { role: number; }) => r.role == item.roleId).length == 0) temp.role.push({role: item.roleId,roleName:item.roleName});
          }
        })
      }
      data.userList[data.userList.findIndex(item => item.id == temp.id)] = temp;
      data.isShow = false
    }

    const handleSizeChange = (val:number) => {
      data.searchForm.pageSize = val;
    }
    const handleCurrentChange = (val:number) => {
      data.searchForm.page = val;
    }

    watch([()=>data.searchForm.nickName,()=>data.searchForm.role],() => {
      if(data.searchForm.nickName == '' && data.searchForm.role == 0) {
        //getUserData();
        data.userList = userData.slice();
      } 
    })

    return {
      ...toRefs(data),
      total,
      showList,
      onSubmit,
      handleEdit,
      handleConfirm,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped>
  .form-pagination {
    margin: 30px 0;
    justify-content: flex-end;
  }
</style>