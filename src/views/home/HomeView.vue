<template>
  <div class="home-container">
    <el-container>
      <el-header class="head-box">
        <el-row :gutter="20">
          <el-col :span="4" class="head-left">
            <img class="logo" src="../../assets/logo.png" alt="" />
          </el-col>
          <el-col :span="16"
            ><h2 class="head-center head-style">xxx后台管理系统</h2></el-col
          >
          <el-col :span="4" class="head-right head-style"
            ><el-button type="danger" round @click="onLogout"
              >退出登录</el-button
            ></el-col
          >
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px" class="aside-box">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="aside-menu"
            :default-active="active"
            text-color="#fff"
            router
          >
            <el-menu-item
              v-for="(menu, index) in menuList"
              :key="menu.path"
              :index="menu.path"
            >
              <span>{{ menu.meta?.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="min-height: calc(100vh - 80px)">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, inject } from "vue";
import { useRoute,useRouter } from "vue-router";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "HomeView",
  setup() {
    const global: any = inject("global");
    const route = useRoute().matched[0];
    const router = useRouter();
    const data = reactive({
      menuList: route.children.filter((item) => item.meta?.isShow),
    });

    const onLogout = () => {
      global.$confirm("您确定要退出登录吗？", "警告")
        .then(() => {
          localStorage.removeItem('token');
          router.push('/login');
          ElMessage({
            type: "success",
            message: "退出登录成功",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消退出登录",
          });
        });
    };
    return { ...toRefs(data), active: router.currentRoute.value.path, onLogout };
  },
});
</script>

<style lang="scss" scoped>
.home-container {
  //overflow-y: auto;
  position: relative;
  .head-box {
    background-color: #eee;
    height: 80px;

    .head-style {
      text-align: center;
      line-height: 80px;
    }
    .logo {
      height: 80px;
    }
  }

  .aside-box {
    .aside-menu {
      //min-height: calc(100vh - 80px);
      height: 100%;
      //position: absolute;
      //top: 80px;
      //left: 0;
      //bottom: 0;
    }
  }
}
</style>
