<template>
  <div class="container">
    <div class="app-container">
      <div class="role-operate">
        <el-button type="primary" size="mini">添加角色</el-button>
      </div>
      <el-table :data="roleList">
        <el-table-column prop="name" align="center" width="200" label="角色" />
        <el-table-column prop="state" align="center" width="200" label="启用" />
        <el-table-column prop="description" align="center" label="描述" />
        <el-table-column align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small">分配权限</el-button>
            <el-button type="text" size="small" @click="handleCheck(scope.row)">查看</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" style="height:60px" align="middle" justify="end">
        <el-pagination :page-size="pageParams.pagesize" :current-page="pageParams.currentpage" :total="pageParams.total" layout="prev, pager, next" @current-change="pageChange" />
      </el-row>
    </div>
  </div>
</template>
<script>
import { getRoleList } from '@/api/role'

export default {
  name: 'Role',
  data() {
    return {
      roleList: [],
      pageParams: {
        pagesize: 10,
        currentpage: 1,
        total: 0
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      // this.roleList = await getRoleList()
      const { rows, total } = await getRoleList(this.pageParams)
      this.roleList = rows
      this.pageParams = total
    },
    handleCheck() {

    },
    pageChange(newPage) {
      this.pageParams.currentpage = newPage
      this.getRoleList()
    }
  }
}
</script>

<style scoped>
.role-operate {
  padding: 10px;
}
</style>
