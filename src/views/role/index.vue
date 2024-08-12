<template>
  <div class="container">
    <div class="app-container">
      <div class="role-operate">
        <el-button type="primary" size="mini" @click="addRole">添加角色</el-button>
      </div>
      <el-table :data="roleList">
        <el-table-column prop="name" align="center" width="200" label="角色">
          <template v-slot="{row}">
            <el-input v-if="row.isEdit" v-model="row.editRow.name" size="mini" />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" align="center" width="200" label="启用">
          <template v-slot="{row}">
            <el-switch v-if="row.isEdit" v-model="row.editRow.state" />
            <span v-else>{{ row.state === 1 ? "启用" : row.state === 0 ? "未启用" : "无" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" align="center" label="描述">
          <template v-slot="{row}">
            <el-input v-if="row.isEdit" v-model="row.editRow.description" type="textarea" />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right">
          <template v-slot="{row}">
            <template v-if="row.isEdit">
              <el-button type="primary" size="mini" @click="handleUpdate(row)">确定</el-button>
              <el-button size="mini" @click="row.isEdit = false">取消</el-button>
            </template>
            <template v-else>
              <el-button type="text" size="small">分配权限</el-button>
              <el-button type="text" size="small" @click="handleEdit(row)">编辑</el-button>
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="confirmDel(row.id)">
                <el-button slot="reference" style="margin-left:10px" size="mini" type="text">删除</el-button>
              </el-popconfirm>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" style="height:60px" align="middle" justify="end">
        <el-pagination :page-size="pageParams.pagesize" :current-page="pageParams.currentpage" :total="pageParams.total" layout="prev, pager, next" @current-change="pageChange" />
      </el-row>
    </div>
    <el-dialog title="新增角色" :visible.sync="showDialog" @close="close">
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="roleForm.name" type="text" style="width:300px" size="mini" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="启用">
          <el-switch v-model="roleForm.state" :active-value="1" :inactive-value="0" size="mini" />
        </el-form-item>
        <el-form-item prop="description" label="角色描述">
          <el-input v-model="roleForm.description" type="textarea" :rows="3" style="width:300px" size="mini" placeholder="请输入角色描述" />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12">
              <el-button type="primary" size="mini" @click="handleAdd">确定</el-button>
              <el-button size="mini" @click="close">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { addRole, delRole, getRoleList, updateRole } from '@/api/role'

export default {
  name: 'Role',
  data() {
    return {
      roleList: [],
      pageParams: {
        pagesize: 15,
        currentpage: 1,
        total: 0
      },
      showDialog: false,
      roleForm: {
        name: '',
        state: 0,
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        description: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }]
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
      this.roleList.forEach(item => {
        this.$set(item, 'isEdit', false)
        this.$set(item, 'editRow', {
          name: item.name,
          state: +item.state,
          description: item.description
        })
      })
    },
    pageChange(newPage) {
      this.pageParams.currentpage = newPage
      this.getRoleList()
    },
    handleEdit(row) {
      row.isEdit = true
      row.editRow.name = row.name
      row.editRow.state = +row.state
      row.editRow.description = row.description
    },
    addRole() {
      this.showDialog = true
    },
    handleAdd() {
      this.$refs.roleForm.validate(async(valid) => {
        if (valid) {
          await addRole(this.roleForm)
          this.$message.success('添加成功')
          this.getRoleList()
          this.close()
        }
      })
    },
    close() {
      this.showDialog = false
      this.roleForm = {
        name: '',
        state: 0,
        description: ''
      }
      this.$refs.roleForm.resetFields()
    },
    async handleUpdate(row) {
      if (row.editRow.name && row.editRow.description) {
        await updateRole({ id: row.id, name: row.editRow.name, description: row.editRow.description, state: +row.editRow.state })
        this.$message.success('修改成功')
        Object.assign(row, {
          ...row.editRow,
          isEdit: false
        })
      } else {
        this.$message.warning('角色和描述不能为空')
      }
    },
    async confirmDel(id) {
      await delRole(id)
      this.$message.success('删除成功')
      if (this.roleList.length === 1 && this.pageParams.currentpage > 1) {
        this.pageParams.currentpage--
      }
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
