<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="departs" :props="defaultProps" default-expand-all="true">
        <template v-slot="{data}">
          <el-row style="width: 100%;height: 40px;" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <el-dropdown>
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
  </div>
</template>
<script>
export default {
  name: 'Department',
  data() {
    return {
      departs: [{
        name: '传智教育',
        managerName: '管理员',
        children: [
          { name: '总裁办', managerName: '管理员' },
          { name: '行政部', managerName: '管理员' },
          {
            name: '人事部',
            managerName: '管理员',
            children: [
              { name: '财务核算部', managerName: '管理员' },
              { name: '税务管理部', managerName: '管理员' },
              { name: '薪资管理部', managerName: '管理员' }
            ]
          }
        ]
      }],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 30px ;
  font-size: 14px;
}
.tree-manager {
  width: 50px;
  display: inline-block;
  margin: 10px;
}
</style>
