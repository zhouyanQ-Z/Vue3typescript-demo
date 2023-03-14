<template>
  <div class="authority-container">
    <el-tree
      ref="treeRef"
      :data="authorityList"
      :check-strictly="true"
      show-checkbox
      node-key="roleId"
      :default-checked-keys="authority"
      :props="{
        children: 'roleList',
        label: 'name',
      }"
    />
    <el-button class="change-btn" type="primary" @click="onChangeAuthority">确认修改</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,onMounted,toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import routeStore from '@/store/modules/routeParams';
import { AuthorityData } from '@/type/authority';
import { authorityListApi } from '@/request/api';

export default defineComponent({
  setup () {
    const storeRoute = routeStore()
    const {id,authority} = storeToRefs(storeRoute);
    const data = reactive(new AuthorityData(id.value,authority.value))

    onMounted(() => {
      getData();
    })

    // 获取权限列表数据
    const getData= () => {
      authorityListApi().then(res => {
        data.authorityList = res.data
      })
    }

    // 修改权限
    const onChangeAuthority = () => {
      const temp = data.treeRef.getCheckedKeys().sort((a:number,b:number) => a-b)
      console.log(temp);
      // 将temp传给后台....
    };
    return {...toRefs(data),onChangeAuthority}
  }
})
</script>

<style lang="scss" scoped>
  .change-btn {
    margin-top: 20px;
  }
</style>