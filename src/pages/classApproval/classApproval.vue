<!--
 * @Description: In User Settings Edit
 * @Author: 党士麟
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-26 11:22:39
 * @LastEditTime: 2019-05-08 16:54:43
 -->

<template>
  <!-- 

  功能：老师修改学生个人考勤
  -->
  <div class="content">
    <div class="select-box">
      <!-- 学年:
      <a-select class="select-year">
        <a-select-option value="2016">2016</a-select-option>
        <a-select-option value="2017">2017</a-select-option>
      </a-select>学期:
      <a-select class="select-term">
        <a-select-option value="上学期">上学期</a-select-option>
        <a-select-option value="下学期">下学期</a-select-option>
      </a-select>-->
      周数
      <a-input placeholder="请输入周数" class="components-input-demo-size"/>课次
      <a-input placeholder="请输入课次" class="components-input-demo-size"/>

      <a-button class="btn-query">查询</a-button>
      <!-- 上传更改的数据 -->
      <a-button class="btn-query">上传</a-button>
    </div>
    <div class="box">
      <a-table :columns="columns" :dataSource="data">
        <template slot="action" id="state"  slot-scope="record">
          
          <a-button type="primary" @click="onAgree(record.key)">同意</a-button>
          <!-- <a href="#">{{record.key}}</a> -->
          <a-button type="danger" @click="onDisagree(record.key)">驳回</a-button>
        
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: "工号",
    dataIndex: "teachernumber",
    key: "teachernumber"
  },
  {
    title: "教师姓名",
    dataIndex: "teachername",
    key: "teachername"
  },
  {
      title:'需求',
      dataIndex:'request',
      key:'request'
  },
  {
    title:'需求课程',
    dataIndex:'requestcourse',
    key:'requestcourse'
  },
  {
    title:'理由',
    dataIndex:'reason',
    key:'reason'
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  data() {
    return {
      data:[],
      columns,
    };
  },
  created() {
    this.postClassApproval();
  },
  methods: {
    postClassApproval(){ //获取调课补课停课列表
      this.axios.post("https://www.easy-mock.com/mock/5cc7ec55c87cb117f3e4ba26/school/classApproval").then(res=>{
        // console.log(res);
        if(res.data.code === 0){
          this.data = res.data.message;
        }else{
          alert("获取失败");
        }
      })
    },
    onAgree(key){ //同意按钮
      
      alert("同意"+key);
    },
    onDisagree(key){ //反驳按钮
      alert("反驳"+key);
    }
    
  }
};
</script>
<style>
/* 检索栏的设置 */
.select-box {
  padding: 0;
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 8px;
  font-size: 20px;
  text-align: center;
}
/* 选择框的宽度 */
.select-year {
  /* font-size: 20px; */

  width: 150px;
}
/* 选择框的宽度 */
.select-term {
  width: 150px;
}
/* 设置按钮的颜色 */
.btn-query {
  background-color: #1890ff;
  color: aliceblue;
}
/* 设置输入框的宽度 */
.components-input-demo-size {
  width: 150px;
}
/* 设置操作中select 的背景透明 */
.caozuo {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>

