<!--
 * @Author: 林嘉锋
 * @LastEditors: 林嘉锋
 * @Date: 2019-04-20
 * @LastEditTime: 2019-06-09
 * @function: 角色管理 包括：添加角色、修改角色信息和状态、删除角色、为角色设置权限
 -->
<template>
  <div class="content">
    <div class="content-box">
      <!-- 按钮操作 -->
      <div class="btn">
        <a-button type="primary" @click="showRoleModal(1)">创建角色</a-button>
        <a-button type="primary" @click="showRoleModal(2)">修改角色</a-button>
        <a-popconfirm title="该用户所有关联的信息都会删掉，是否确定删除" @confirm="delRole" okText="确认" cancelText="取消">
          <a-button type="primary">删除角色</a-button>
        </a-popconfirm>
        <a-button type="primary" @click="showPermissionSetModal">设置权限</a-button>
      </div>
      <div class="table">
        <!-- 角色列表 -->
        <a-table :columns="role_columns" :dataSource="role_data" :rowSelection='rowSelection' :pagination="pagination"
          :scroll="{ y: 400 }">
          <span slot="status" slot-scope="status,record,index">
            <a-switch @change='statusChange(index,record)' :checked="status == 0 ? true : false" checkedChildren=启用
              unCheckedChildren="禁用" />
          </span>
        </a-table>
      </div>
      <div class="modal">
        <!-- 创建角色和修改角色模态框 -->
        <a-modal :title="modalTitle" v-model="role_create_modal" @ok="handleRoleCreateOk" cancelText="取消" okText="确认"
          :afterClose="clearInput">
          <p><label for="role_name">角色名称：</label>
            <a-input placeholder="名字" class="role_input" id="role_name" v-model="name" :disabled="modalType == 2" />
          </p>
          <p style="margin-top: 20px;"><label for="description"
              style="margin-bottom: 30px;display:inline-block">角色描述：</label>
            <a-textarea placeholder="角色描述" class="role_input" id="description" :rows="3" v-model="description" />
          </p>
          <p style="margin-top:20px"><label for="">使用状态：</label>
            <a-radio-group v-model="status">
              <a-radio :value="0">启用</a-radio>
              <a-radio :value="1">停用</a-radio>
            </a-radio-group>
          </p>
        </a-modal>
        <!-- 权限模态框 -->
        <a-modal title="设置权限" v-model="permission_set_modal" @ok="handlePermissionSetOk" cancelText="取消" okText="确认"
          :afterClose="handleModalClose">
          <p><label for="role_name2">角色名称：</label>
            <a-input placeholder="名字" class="role_input" id="role_name2" :disabled="true" v-model="name" />
          </p>
          <a-tree checkable @check="onCheck" :autoExpandParent="autoExpandParent" :defaultExpandAll="defaultExpandAll"
            v-model="checkedKeys" :treeData="treeData" />
        </a-modal>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    created() { //页面加载获取所有角色信息
      this.getRolesList();

    },
    data() {
      return {
        name: '',//角色名称
        description: '',//角色描述
        status: 0,//角色状态 0 启用 1禁用
        selectItem: null,///暂存某一项信息
        role_create_modal: false,//角色创建模态框
        permission_set_modal: false,//设置权限模态框
        pagination: false,//默认表格不分页
        modalType: 1, // 1创建角色 2修改角色
        modalTitle: '',//模态框标题
        rowSelection: {
          type: 'radio',
          selectedRowKeys: [],
          onChange: (selectedRowKeys, selectedRows) => {
            this.rowSelection.selectedRowKeys = selectedRowKeys
            this.selectItem = selectedRows[0];
          }
        },
        autoExpandParent: true,//默认展示权限列表的父节点
        defaultExpandAll: true,//默认展示权限所有节点
        checkedKeys: [],//保存选中的菜单的key
        checkedNo: [],//保存选中的菜单的no
        allKeys: [],//保存菜单所有的key
        allNo: [],//保存菜单的no
        treeData: [],//生成权限树的数据
        roleId: '',//保存角色Id
        role_data: [],//角色列表数据
        role_columns: [//角色表格字段
          {
            title: '角色名称',
            dataIndex: 'name',
            width: 200,
          },
          {
            title: '角色描述',
            dataIndex: 'description',
            width: 400,
          },
          {
            title: '使用状态',
            dataIndex: 'status',
            scopedSlots: {
              customRender: 'status'
            },
            width: 100,
          }
        ],
      }
    },
    methods: {
      getRolesList() {//获取角色列表
        this.axios.get('/json/auth/roles/listAll').then(res => {
          if (res.data.code == 0) {
            this.rowSelection.selectedRowKeys = [];
            this.selectItem = null;
            this.role_data = res.data.roles;
            for (let i = 0; i < this.role_data.length; i++) {
              this.role_data[i].key = this.role_data[i].id;//为角色列表增加key,插件需要唯一key
            }
          }
        });
      },
      showRoleModal(modalType) {//同一模态框根据模态框的类型modalType展示不同功能：1 创建角色 2 修改角色
        this.modalType = modalType;
        if (this.modalType == 1) {
          this.modalTitle = '创建角色'
          this.role_create_modal = true;
        } else {
          if (this.selectItem == null) {
            this.$message.warn('请选择某一项')
          } else {//回显输入域的值
            this.name = this.selectItem.name;
            this.status = this.selectItem.status;
            this.description = this.selectItem.description;
            this.modalTitle = '修改角色'
            this.role_create_modal = true;
          }
        }
      },
      clearInput() {//清空输入域
        this.name = this.description = '';
        this.status = 1;
      },
      createRole() {//创建角色
        if (this.name.trim() == '') {
          this.$message.error('角色名称不为空')
        } else {
          let role = {
            name: this.name,
            description: this.description,
            status: this.status
          }
          this.axios.post('/json/auth/role', this.$qs.stringify(role)).then(res => {
            if (res.data.code == 0) {
              this.getRolesList();
              this.role_create_modal = false;
              this.clearInput();

            }
          })
        }
      },
      modiftRole() {//根据角色id修改角色
        let role = {
          id: this.selectItem.id,
          description: this.description,
          status: this.status,
        };
        this.axios.post('/json/auth/roleStatus', this.$qs.stringify(role)).then(res => {
          if (res.data.code == 0) {
            this.getRolesList();
            this.role_create_modal = false;
            this.$message.success('修改成功!');
            this.clearInput();

          }
        })
      },
      delRole() {//根据角色id删除角色信息
        if (this.selectItem == null) {
          this.$message.warn('请选择某一项')
        } else {
          let params = {
            id: this.selectItem.id
          }
          let config = {
            headers : {'Content-Type': 'textml;charset=UTF-8',
            },
          }
          this.axios.delete('/json/auth/roleDelete/'+this.selectItem.id).then(res => {
            if (res.data.code == 0) {
              this.getRolesList();
              this.$message.success('删除成功')
            }
          })
        }
      },
      handleRoleCreateOk() {//点击模态框确认按钮根据模态框的类型来操作角色
        if (this.modalType == 1)
          this.createRole();
        else
          this.modiftRole();

      },
      getKeyAndNo(data) {//获取权限列表的key和no,key用来显示是否选中，no用来传递给后台以便更新角色的权限
        for (let i = 0; i < data.length; i++) {
          if (!data[i].parent) {//parent为false代表为功能点，true代表为一级菜单
            this.allKeys.push(data[i].key);
            this.allNo.push(data[i].no);
          }
          if (data[i].selected)
            this.checkedKeys.push(data[i].key)
          if (data[i].children) {
            let children = data[i].children;
            for (let j = 0; j < children.length; j++) {
              this.allKeys.push(children[j].key);
              this.allNo.push(children[j].no);
              if (children[j].selected) {
                this.checkedKeys.push(children[j].key)
              }
            }
          }
        }
      },
      getRoleMenu() {//根据角色id获取获取该角色的权限和所有的权限
        this.axios.get('/json/auth/roleFuncMenu/' + this.selectItem.id).then(res => {
          if (res.data.code == 0) {
            let data = res.data.menu;
            this.getKeyAndNo(data);
            this.treeData = data;
            this.permission_set_modal = true;
          }
        })

      },
      handleModalClose() {//权限模态框完全关闭后，初始化暂存数据的数组
        this.checkedKeys = [];
        this.checkedNo = [];
        this.allKeys = [];
        this.allNo = [];
        this.treeData = [];
      },
      showPermissionSetModal() {//展示权限模态框并获取权限菜单
        if (this.selectItem == null) {
          this.$message.warn('请选择某一项')
        } else {
          this.name = this.selectItem.name;
          this.roleId = this.selectItem.id;
          this.getRoleMenu();
        }
      },
      handlePermissionSetOk() {//点击权限模态框的确认按钮后将角色的权限对应的no发送至后端
        for (let i = 0; i < this.checkedKeys.length; i++) {
          for (let j = 0; j < this.allKeys.length; j++) {
            if (this.checkedKeys[i] == this.allKeys[j]) {
              this.checkedNo.push(this.allNo[j]);
              break;
            }

          }
        }
        let funcObj = {
          roleId: this.roleId,
          funcIdStr: this.checkedNo.join(',')
        }
        this.axios.post('/json/auth/roleFuncs', this.$qs.stringify(funcObj)).then(res => {
          if (res.data.code == 0) {
            this.permission_set_modal = false;
            this.$message.success('设置成功')
            this.checkedKeys = [];
          }
        })
      },
      onCheck(checkedKeys, item) {
        this.checkedKeys = checkedKeys;
      },
      statusChange(index, item) {//点击启用禁用按钮根据角色id更新角色状态
        let status = 0;
        if (this.role_data[index].status)
          status = 0;
        else
          status = 1;
        let role = {
          id: item.id,
          status: status,
        };
        this.axios.post('/json/auth/roleStatus', this.$qs.stringify(role)).then(res => {
          if (res.data.code == 0) {
            this.role_data[index].status = status;
            this.$message.success('修改成功!');
          }
        })
      },
    },
  }

</script>

<style scoped>
  .btn button {
    margin-right: 10px;
  }

  .table {
    width: 100%;
    margin-top: 20px;
  }

  .role_input {
    width: 50%;
  }

  .components-input-demo-size {
    margin-bottom: 15px;
  }

  .components-input-demo-size .ant-input {
    width: 200px;
    margin-right: 20px;
  }

</style>
