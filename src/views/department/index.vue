<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="departs" :props="defaultProps" default-expand-all :expand-on-click-node="false">
        <template v-slot="{data}">
          <el-row style="width: 100%;height: 40px;" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <el-dropdown @command="handleCommand($event, data.id)">
                <!-- 显示区域内容 -->
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <!-- 下拉菜单选项 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <add-dept :current-node-id="currentNodeId" :show-dialog.sync="showDialog" @updateDepartment="getDepartment" />
  </div>
</template>
<script>
import { getDepartmentList } from '@/api/department'
import { listToTree } from '@/utils'

export default {
  name: 'Department',
  components: {
    AddDept: () => import('./components/add-dep')
  },
  data() {
    return {
      departs: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      showDialog: false,
      currentNodeId: null
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      const res = await getDepartmentList()
      this.departs = listToTree(res, 0)
    },
    handleCommand(type, id) {
      if (type === 'add') {
        this.showDialog = true
        this.currentNodeId = id
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 30px;
  font-size: 14px;
}
.tree-manager {
  width: 50px;
  display: inline-block;
  margin-right: 40px;
}
</style>
