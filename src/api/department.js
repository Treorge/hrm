import request from '@/utils/request'

// 获取部门列表
export function getDepartmentList() {
  return request({
    url: '/company/department',
    method: 'get'
  })
}

// 新增部门
export function addDepartment(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

// 获取部门负责人
export function getManagerList() {
  return request({
    url: '/sys/user/simple'
  })
}
