<!--
 * @Author: 林嘉锋
 * @LastEditors: 林嘉锋
 * @Date: 2019-04-20
 * @LastEditTime: 2019-06-09
 * @function: 用户授权 包括：为用户授权某个角色
 -->
<template>
  <div class="content">
    <div class="content-box">
      <!-- 按钮操作 -->
      <div class="btn">
        <a-input placeholder="姓名" v-model="name" @keyup.enter="userSearch" style="width:200px" />
        <a-input placeholder="账户名" v-model="userName" @keyup.enter="userSearch" style="width:200px;margin:0 10px;" />
        <a-button type="primary" @click="userSearch">搜索</a-button>
        <a-button type="primary" @click="showUserAuthorizationModal">授权</a-button>
      </div>
      <div class="table">
        <!-- 用户列表 -->
        <a-table :columns="user_columns" :dataSource="users" :rowSelection="rowSelection" :pagination="pagination">
          <span slot="userSex" slot-scope="userSex">
            <span v-if="userSex">{{sex[userSex]}}</span>
            <span v-else>不详</span>
          </span>
          <span slot="userType" slot-scope="userType">
            <span v-if="userType">{{usertype[userType]}}</span>
            <span v-else>不详</span>
          </span>
          <span slot="regist" slot-scope="regist">
            <span>{{moment(regist).format('YYYY-MM-DD')}}</span>
          </span>
        </a-table>
        <!-- 分页器 -->
        <div class="page" style="margin-top: 20px; float: right;">
          <a-pagination showQuickJumper @change="currentPageChange" :current="currentPage" :total="total"
            :defaultPageSize="pageSize" />
        </div>
        <div class="clear-fix"></div>
      </div>
      <div class="modal">
        <!-- 用户授权模态框 -->
        <a-modal title="用户授权" v-model="authorizationModal" cancelText="取消" okText="确认" class="authorization_modal" @ok="updateRoles" :afterClose="handleModalClose">
          <a-transfer :dataSource="allRoles" showSearch :filterOption="filterOption" :targetKeys="havaRoles"
            @change="handleChange" :render="item=>item.title" :titles="['未分配', '已分配']" :locale="locale">
          </a-transfer>
        </a-modal>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    created() { //获取用户列表
      this.getUsers();
    },
    data() {
      return {
        selectItem: null,
        pagination: false,//去除默认表格分页
        rowSelection: {
          type: 'radio',
          selectedRowKeys: [],
          onChange: (selectedRowKeys, selectedRows) => {
            this.rowSelection.selectedRowKeys = selectedRowKeys
            this.selectItem = selectedRows[0];
          }
        },
        name: '',//姓名
        userName: '',//账户名
        currentPage: 1,//当前页
        pageSize: 10,//一页显示条数
        total: 10,//默认总条数
        sex: ['女', '男'], //根据用户的状态 0 1 转换为 女 男
        usertype: ['学生', '教职员工', '校外职员', '学生亲属', '系统运营者', '学校信息主管'], //同上
        user_columns: [//用户表格字段
          {
            title: '姓名',
            dataIndex: 'userName',
          },
          {
            title: '账户',
            dataIndex: 'name',
          },
          {
            title: '身份证',
            dataIndex: 'identification',
          },
          {
            title: '性别',
            dataIndex: 'userSex',
            scopedSlots: {
              customRender: 'userSex'
            },
          },
          {
            title: '用户类型',
            dataIndex: 'userType',
            scopedSlots: {
              customRender: 'userType'
            },
          },
          {
            title: '注册时间',
            dataIndex: 'regist',
            scopedSlots: {
              customRender: 'regist'
            },
          },
        ],
        users: [],//保存用户列表
        authorizationModal:false,//用户授权模态框
        locale:{itemUnit: '个', itemsUnit: '个',notFoundContent: '列表为空', searchPlaceholder: '请输入搜索内容'  },//自定义穿梭框的信息
        allRoles:[],//所有的权限
        havaRoles:[],//保存角色权限对应的key
      }
    },
    methods: {
      getUsers() { //分页查询：用户名和名字模糊搜索用户
        this.axios.get('/json/auth/user/listLikeUnivNameEname/' + this.userName + '_' + this.name +
          '/' + this.currentPage).then(res => {
          if (res.data.code == 0) {
            this.rowSelection.selectedRowKeys = [];
            this.users = res.data.pageInfo.list; //同上
            this.total = res.data.pageInfo.total;
            for (let i = 0; i < this.users.length; i++) {
              this.users[i].key = this.users[i].id;
            }
          }
        })
      },
      userSearch() {//用户搜索
        this.currentPage = 1;
        this.getUsers();
      },
      currentPageChange(current) {//页数改变重新获取列表
        this.currentPage = current;
        this.getUsers();
      },
      showUserAuthorizationModal() {//展示用户授权模态框
        if(this.selectItem == null){
          this.$message.warn('请选择某一项')
        }else{
          this.getRoleList();
          this.authorizationModal = true;
        }
      },
      getRoleList(){//根据用户id获取该用户有的角色和所有的角色
        this.axios.get('/json/auth/userRoleSet/'+this.selectItem.id).then(res=>{
          if(res.data.code == 0){
            let data =  res.data.allRoles;
            for(let i=0;i<data.length;i++){
              let item ={
                key:data[i].id+"",//需要将key值转换为string类型，插件需要，不然控制台出现警告
                title:data[i].name
              }
              this.allRoles.push(item);//添加角色
            }
            for(let i=0;i<res.data.havaRoles.length;i++){
              this.havaRoles.push((res.data.havaRoles[i].id+""));
            }
          }
        })
      },
      filterOption(inputValue, option) { //根据输入信息过滤列表
        return option.title.indexOf(inputValue) > -1;
      },
      handleChange(targetKeys, direction, moveKeys) {//穿梭框移动触发的事件
        this.havaRoles = targetKeys;//更新用户拥有的角色
      },
      updateRoles(){//根据用户id更新用户的角色集
        let user = {
          userId:this.selectItem.id,
          roleIdStr:this.havaRoles.sort().join(',')
        }
        this.axios.post('/json/auth/userRoleSet',this.$qs.stringify(user)).then(res=>{
          if(res.data.code == 0){
            this.$message.success('授权成功');
            this.authorizationModal = false;
            this.rowSelection.selectedRowKeys = [];//清空选中
            this.selectItem = null;//清空选中的的对象信息
          }else if(res.data.msg=='未授权'){
            this.$message.info('授权失败，登录已经失效')
          }else{
            this.$message.info('授权失败');
          }
        })
        
      },
      handleModalClose(){//用户授权模态框完全关闭清空暂存的数组
        this.selectItem = null;
        this.allRoles = [];
        this.havaRoles = [];
      }
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
  .authorization_modal .ant-transfer{
    margin-left: 30px;
  }

</style>
