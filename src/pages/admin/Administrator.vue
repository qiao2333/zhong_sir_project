<!--
 * @Author: 林嘉锋
 * @LastEditors: 林嘉锋
 * @Date: 2019-04-26
 * @LastEditTime: 2019-06-08
 * @function: 管理员设置 包括：添加管理，修改管理员状态，删除管理员，模糊搜索管理员和用户
 -->
<template>
  <div class="content">
    <div class="content-box">
      <!-- 按钮操作 -->
      <div class="btn">
        <a-button type="primary" @click="showAddAdminModal">新增管理员</a-button>
        <a-popconfirm title="一个学校只有一个信息管理者，是否确定删除" @confirm="delAdmin" okText="确认" cancelText="取消">
          <a-button type="primary">删除管理员</a-button>
          </a-popconfirm>
        <a-input placeholder="学校中文名" v-model="UName" @keyup.enter="adminSearch"/>
        <a-input placeholder="学校英文名" v-model="EName" @keyup.enter="adminSearch"/>
        <a-button type="primary" @click="adminSearch">搜索</a-button>
      </div>
      <div class="table">
        <!-- 管理员列表 -->
        <a-table :columns="admin_columns" :dataSource="admins" :rowSelection="rowSelection" :pagination="pagination">
          <span slot="status" slot-scope="status,record,index">
            <a-switch @change='statusChange(index,record)' :checked="status == 0 ? true : false" checkedChildren=启用
              unCheckedChildren="禁用" />
          </span>
        </a-table>
        <!-- 分页器 -->
        <div class="page" style="margin-top: 20px; float: right;">
          <a-pagination showQuickJumper @change="adminCurrentChange" :current="adminCurrentPage" :total="adminTotal"
            :defaultPageSize="pageSize" />
        </div>
        <div class="clear-fix"></div>
      </div>
    </div>
    <!-- 新增管理员模态框 -->
    <a-modal title="新增管理员" v-model="addAdminModal" cancelText="取消" okText="确认"
      class="admin_modal" :footer="null">
      <!-- 筛选条件域 -->
      <p class="admin-p">
        <a-select size="default" v-model="universityId" style="width: 150px;">
          <a-select-option v-for="item in universitys" :key="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
        <a-input placeholder="姓名" style="margin-bottom: 5px;margin-left: 10px;" v-model="realName" @keyup.enter="userSearch"/>
        <a-input placeholder="用户名" style="margin-bottom: 5px;margin-left: 0px;" v-model="userName" @keyup.enter="userSearch"/>
        <a-button type="primary" style="margin-bottom: 5px;" @click="userSearch">搜索</a-button>
        <a-button type="primary" style="margin: 0 0 5px 10px;" @click="adminCreate">创建</a-button>
      </p>
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
        <a-pagination showQuickJumper @change="userCurrentChange" :current="userCurrentPage" :total="userTotal"
          :defaultPageSize="pageSize" />
      </div>
      <div class="clear-fix"></div>
    </a-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        addAdminModal: false,//添加管理员模态框
        selectItem:null,//选中列表某一项的对象，用于暂存某一项信息
        rowSelection: {//表格前面的单选框
          type: 'radio',
          selectedRowKeys: [],
          onChange: (selectedRowKeys, selectedRows) => {
            this.rowSelection.selectedRowKeys = selectedRowKeys
            this.selectItem = selectedRows[0];
          }
        },
        pagination: false,//设置默认的表格不分页
        admin_columns: [{//管理员表格字段
            title: '学校',
            dataIndex: 'universityName',
            width: 150,
          },
          {
            title: '学校编号',
            dataIndex: 'universityTelephone',
            width: 200,
          },
          {
            title: '用户名',
            dataIndex: 'userName',
            width: 150,
          },
          {
            title: '身份证',
            dataIndex: 'userIdentification',
            width: 150,
          },
          {
            title: '状态',
            dataIndex: 'status',
            width: 100,
            scopedSlots: {
              customRender: 'status'
            },
          },
        ],
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
        users: [],//用户列表
        universitys: [],//学校列表
        universityId: '',//绑定学校id
        name: '',//姓名
        adminCurrentPage: 1,//管理员列表当前页
        userCurrentPage: 1,//用户列表当前页
        pageSize: 10,//一页显示条数
        adminTotal: 10,//管理员列表页面总条数,默认值为10
        userTotal: 10,//用户列表页面总条数
        admins: [],//各个管理员列表
        UName: '',//学校中文名
        EName: '',//学校英文名
        realName: '',//用户名字
        userName: '',//用户账户名
        sex: ['女', '男'],//根据用户的状态 0 1 转换为 女 男
        usertype: ['学生', '教职员工', '校外职员', '学生亲属', '系统运营者', '学校信息主管'],//同上

      }
    },
    created() {
      this.getAdmis();//页面加载时获取管理员列表
    },
    methods: {
      showAddAdminModal() { //展示管理员列表的模态框
        this.rowSelection.selectedRowKeys = [];//清空单选框选中
        this.getUniversityts();//获取各个学校
        this.addAdminModal = true;
      },
      getUniversityts() { //获取所有学校
        this.axios.get('/json/auth/universitys/listAll').then(res => {
          this.universitys = res.data.universitys;
          this.universityId = this.universitys[0].id;//默认选中第一个
          this.getUsers();
        })
      },
      getAdmis() { //分页查询：根据用户名和名字模糊搜索管理员
        this.axios.get('/json/auth/uisups/listLikeUnivNameEname/' + this.UName + '_' + this.EName +
          '/' + this.adminCurrentPage).then(res => {
          if (res.data.code == 0) {
            this.rowSelection.selectedRowKeys = [];
            this.admins = res.data.pageInfo.list;//管理员列表
            this.adminTotal = res.data.pageInfo.total;//列表总条数
            for (let i = 0; i < this.admins.length; i++) {
              this.admins[i].key = this.admins[i].universityId;//为表格增加唯一key,插件需要
            }
          }
        })
      },
      getUsers() {//分页查询：根据学校id和用户名和名字模糊搜索用户
        this.axios.get('/json/auth/user/listLikeUnivIdNameEname/'+this.universityId+'/' + this.userName + '_' + this.realName +
          '/' + this.userCurrentPage).then(res => {
          if (res.data.code == 0) {
            this.rowSelection.selectedRowKeys = [];
            this.users = res.data.pageInfo.list;//同上
            this.userTotal = res.data.pageInfo.total;
            for (let i = 0; i < this.users.length; i++) {
              this.users[i].key = this.users[i].id;
            }
          }
        })

      },
      adminCurrentChange(current) {//管理员列表页数改变时请求数据
        this.adminCurrentPage = current;//当前页
        this.getAdmis();
      },
      userCurrentChange(current) {//同上（用户）
        this.userCurrentPage = current;
        this.getUsers();
      },
      adminSearch(){//管理员搜索
        this.adminCurrentPage = 1;
        this.getAdmis();
      },
      userSearch(){//用户搜索
        this.userCurrentPage = 1;
        this.getUsers();
      },
      adminCreate() { //新增管理员
        if(this.selectItem == null){
          this.$message.warn('请选择某一项')
        }else{
          let user = {
            userId:this.selectItem.id,
            universityId:this.selectItem.universityId,
            status:0
          }
          this.axios.post('/json/auth/uisup',this.$qs.stringify(user)).then(res => {
            if(res.data.code == 0){
              this.selectItem = null;
              this.$message.success('创建成功');
              this.showAddAdminModal = false;
              this.getAdmis();
            }else{
              this.$message.info('该学校已经有信息管理者或者登录已经失效，请重新登录')
            }
          });
        }
      },
      delAdmin() { //根据管理员id删除管理员
        if(this.selectItem == null){
          this.$message.warn('请选择某一项');
        }else{
          let params = {
            universityId: this.selectItem.universityId
          }
         this.axios.post('/json/auth/unisupDelete',this.$qs.stringify(params)).then(res=>{
           if(res.data.code == 0){
             this.$message.success('删除成功');
             this.getAdmis();
           }
         })
        }
      },
      statusChange(index, item) {//点击禁用和启用按钮触发事件：根据管理员id和状态修改管理员的状态 (形参参数：item 点击某一项的对象)
        let status = 0;
        if (this.admins[index].status)
          status = 0;
        else
          status = 1;
        let admin = {
          universityId: item.universityId,
          status: status,
        };

        this.axios.post('/json/auth/uisupStatus', this.$qs.stringify(admin)).then(res => {
          if (res.data.code == 0) {
            this.admins[index].status = status;//修改管理员列表下标为index的状态
            this.$message.success('修改成功!');
          }
        })
      },
    }
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

  .ant-input {
    width: 250px;
    margin-right: 10px;
  }

  .admin-p {
    height: 50px;
    line-height: 50px;
    margin-bottom: 15px;
  }

</style>
