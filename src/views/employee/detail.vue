<template>
  <div class="dashboard-container">
    <div class="app-container">
      <div class="edit-form">
        <el-form ref="userForm" :rules="rules" :model="userInfo" label-width="220px">
          <!-- 姓名 部门 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="username">
                <el-input v-model="userInfo.username" size="mini" class="inputW" />
              </el-form-item>
            </el-col>

          </el-row>
          <!-- 工号 入职时间 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="工号" prop="workNumber">
                <el-input v-model="userInfo.workNumber" disabled size="mini" class="inputW" />
              </el-form-item>
            </el-col>
          </el-row>
          <!--手机 聘用形式  -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="手机" prop="mobile">
                <el-input
                  v-model="userInfo.mobile"
                  :disabled="!!$route.params.id"
                  size="mini"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="部门" prop="departmentId">
                <select-tree v-model="userInfo.departmentId" class="inputW" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="聘用形式" prop="formOfEmployment">
                <el-select v-model="userInfo.formOfEmployment" size="mini" class="inputW">
                  <el-option label="正式" :value="1" />
                  <el-option label="非正式" :value="2" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职时间" prop="timeOfEntry">
                <el-date-picker
                  v-model="userInfo.timeOfEntry"
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="转正时间" prop="correctionTime">
                <el-date-picker
                  v-model="userInfo.correctionTime"
                  size="mini"
                  type="date"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 员工照片 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="员工头像">
                <!-- 放置上传图片 -->
                <image-upload v-model="userInfo.staffPhoto" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 保存个人信息 -->
          <el-row type="flex">
            <el-col :span="12" style="margin-left:220px">
              <el-button size="mini" type="primary" @click="saveData">保存更新</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
import { addEmployee, getEmployeeDetail, updateEmployee } from '@/api/employee'
import ImageUpload from './components/image-upload.vue'

export default {
  components: {
    selectTree: () => import('./components/select-tree.vue'),
    ImageUpload
  },
  data() {
    return {
      userInfo: {
        username: '',
        mobile: '',
        workNumber: '',
        formOfEmployment: null,
        departmentId: null,
        timeOfEntry: '',
        correctionTime: '',
        staffPhoto: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在1-4个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号不正确', trigger: 'blur' }
        ],
        departmentId: [{ required: true, message: '请选择部门', trigger: 'blur' }],
        formOfEmployment: [{ required: true, message: '请选择聘用形式', trigger: 'blur' }],
        timeOfEntry: [{ required: true, message: '请选择入职时间', trigger: 'blur' }],
        correctionTime: [
          { required: true, message: '请选择转正时间', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (this.userInfo.timeOfEntry) {
                if (new Date(value) < new Date(this.userInfo.timeOfEntry)) {
                  callback(new Error('转正时间不能早于入职时间'))
                  return
                }
                callback()
              }
            }
          }
        ]
      }
    }
  },
  created() {
    this.$route.params.id && this.getEmployeeDetail()
  },
  methods: {
    saveData() {
      this.$refs.userForm.validate(async valid => {
        if (valid) {
          if (this.$route.params.id) {
            await updateEmployee(this.userInfo)
            this.$message.success('更新员工信息成功')
          } else {
            await addEmployee(this.userInfo)
            this.$message.success('新增员工成功')
          }
          this.$router.push('/employee')
        }
      })
    },
    async getEmployeeDetail() {
      this.userInfo = await getEmployeeDetail(this.$route.params.id)
    }
  }
}
</script>

<style scoped lang="scss">
    .edit-form {
      background: #fff;
      padding: 20px;
      .inputW {
        width: 380px
      }
    }

</style>
