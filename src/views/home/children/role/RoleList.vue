<template>
  <div class="role-container">
    <el-form :inline="true">
      <el-form-item>
        <el-button type="warning" @click="onAddRole">添加角色</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table :data="showList" border style="width: 100%" >
        <el-table-column prop="roleId" label="ID" width="100" align="center" />
        <el-table-column prop="roleName" label="角色名" align="center" />
        <el-table-column prop="authority" label="操作" align="center" width="180">
          <template #default="scope">
            <el-button type="primary" @click="updateAuthor(scope.row)">修改权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      v-model:current-page="paginationData.page"
      :page-size="paginationData.pageSize"
      :page-sizes="[5,10,15,20]"
      background
      layout="prev,pager,next,jumper,sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="form-pagination"
    />
  </div>
</template>

<script lang="ts">
import { 
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  getCurrentInstance,
  ComponentInternalInstance,
  computed,
  inject
} from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { roleListApi } from '@/request/api';
import { RoleData } from '@/type/role';
import { RoleListInt } from '@/type/user';
import routeStore from '@/store/modules/routeParams'

export default defineComponent({
  setup () {
    const data = reactive(new RoleData())

    //const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const storeRoute = routeStore();
    const router = useRouter();
    const global:any = inject('global');

    onMounted(() => {
      getRoleData();
    })

    const total = computed(() => {
      return data.roleList.length
    })

    const showList = computed(() => {
      return data.roleList.slice((data.paginationData.page-1)*data.paginationData.pageSize,data.paginationData.page*data.paginationData.pageSize);
    })

    // 获取角色列表数据
    const getRoleData= () => {
      roleListApi().then(res => {
        data.roleList = res.data
      })
    }

    // 添加角色
    const onAddRole = () => {
      
      global.$prompt('请输入角色名称', '添加').then((val:{value:string}) => {
          if(val.value.trim()) {
            data.roleList.push({roleId: data.roleList.length+1,roleName:val.value.trim(),authority:[]})
            ElMessage({
              type: 'success',
              message: `${val.value.trim()} 角色添加成功`,
            })
          }
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消添加',
          })
        })
    };

    // 修改权限
    const updateAuthor = (val:RoleListInt) => {
      // 保存参数
      storeRoute.saveRoute({id: val.roleId,authority: val.authority})
      // 跳转页面
      router.push('/authority');
      //proxy?.$router.push({
      //  name:'authority',
        //params: { // 新版本router已移除params参数
        //  id: val.roleId,
        //  authority: val.authority
        //}
      //});
    };

    const handleSizeChange = (val:number) => {
      data.paginationData.pageSize = val;
    }
    const handleCurrentChange = (val:number) => {
      data.paginationData.page = val;
    }


    return {
      ...toRefs(data),
      total,
      showList,
      onAddRole,
      updateAuthor,
      handleSizeChange,
      handleCurrentChange,
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