<template>
  <el-dialog title="新增部门" :visible="showDialog" @close="close">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="部门名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off" style="width: 80%" placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item label="部门编码" :label-width="formLabelWidth" prop="code">
        <el-input v-model="form.code" autocomplete="off" style="width: 80%" placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" :label-width="formLabelWidth" prop="managerId">
        <el-select v-model="form.managerId" placeholder="请选择负责人" style="width: 80%" size="mini">
          <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" :label-width="formLabelWidth" prop="introduce">
        <el-input v-model="form.introduce" type="textarea" style="width: 80%" placeholder="1-100个字符" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <el-button type="primary" @click="handleAdd">确认</el-button>
          <el-button class="cancelButton" @click="handleCancel">取 消</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
import { addDepartment, getDepartmentList, getManagerList } from '@/api/department'

export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    currentNodeId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      formLabelWidth: '120px',
      form: {
        name: '',
        code: '',
        managerId: '',
        introduce: '',
        pid: ''
      },
      rules: {
        code: [
          { require: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门编码的长度为2-10个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: async(rule, value, callback) => {
              const res = await getDepartmentList()
              if (res.some(item => item.code === value)) {
                callback(new Error('部门编码已存在'))
              } else { callback() }
            }
          }
        ],
        introduce: [
          { require: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '部门介绍的长度为1-100个字符', trigger: 'blur' }
        ],
        managerId: [{ require: true, message: '部门负责人不能为空', trigger: 'blur' }],
        name: [
          { require: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门名称的长度为2-10个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: async(ruel, value, callback) => {
              const res = await getDepartmentList()
              if (res.some(item => item.name === value)) {
                callback(new Error('部门名称已存在'))
              } else {
                callback()
              }
            }
          }
        ]
      },
      managerList: []
    }
  },
  created() {
    this.getManagerList()
  },
  methods: {
    close() {
      this.$emit('update:showDialog', false)
      this.$refs.form.resetFields()
    },
    handleAdd() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          // 调用接口
          await addDepartment({ ...this.form, pid: this.currentNodeId })
          this.$emit('updateDepartment')
          this.$message.success('修改成功')
          this.$refs.form.resetFields()
          //   this.handleCancel()
          this.close()
        }
      })
    },
    handleCancel() {
      this.$refs.form.resetFields()
      this.$emit('update:showDialog', false)
    },
    async getManagerList() {
      const res = await getManagerList()
      this.managerList = res
      res.forEach(item => { item.id = JSON.stringify(item.id) })
    }
  }
}
</script>
