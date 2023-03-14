<template>
  <div class="goods-container">
    <div class="search-form">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="标题：">
          <el-input v-model="searchForm.title" placeholder="请输入关键字" clearable />
        </el-form-item>
        <el-form-item label="详情：">
          <el-input v-model="searchForm.introduce" placeholder="请输入关键字" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-box">
      <el-table :data="showList" border style="width: 100%" >
        <el-table-column prop="id" label="ID" width="180" align="center" />
        <el-table-column prop="title" label="标题" width="180" align="center"/>
        <el-table-column prop="introduce" label="详情" header-align="center" />
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
  </div>
</template>

<script lang="ts">
import { defineComponent,onMounted,reactive,toRefs,computed,watch } from 'vue';
import { goodsListApi } from '@/request/api'
import { GoodsData,ListInt } from '@/type/goods';

export default defineComponent({
  setup () {
    
    const data = reactive(new GoodsData());

    onMounted(() => {
      getGoods();
    })

    const total = computed(() => {
      return data.goodsList.length
    })

    const showList = computed(() => {
      return data.goodsList.slice((data.searchForm.page-1)*data.searchForm.pageSize,data.searchForm.page*data.searchForm.pageSize);
    })

    const getGoods = () => {
      goodsListApi().then(res => {
        data.goodsList = res.data;
      })
    }


    // 搜索查询
    const onSubmit = () => {
      let arr:ListInt[] = [];
      if(data.searchForm.title || data.searchForm.introduce) {
        if(data.searchForm.title) {
          arr = data.goodsList.filter((item) => item.title.includes(data.searchForm.title))
        }
        if(data.searchForm.introduce) {
          arr = data.goodsList.filter((item) => item.introduce.includes(data.searchForm.introduce))
        }
      } else arr = data.goodsList;

      data.goodsList = arr;
    }

    const handleSizeChange = (val:number) => {
      data.searchForm.pageSize = val;
    }
    const handleCurrentChange = (val:number) => {
      data.searchForm.page = val;
    }


    watch([()=>data.searchForm.title,()=>data.searchForm.introduce],() => {
      if(data.searchForm.title == '' && data.searchForm.introduce == '') {
        getGoods();
      } 
    })
    return {...toRefs(data),total,showList,onSubmit,handleSizeChange,handleCurrentChange}
  }
})
</script>

<style lang="scss" scoped>
  .search-form {
    text-align: center;
  }

  .form-pagination {
    margin: 30px 0;
    justify-content: flex-end;
  }
</style>