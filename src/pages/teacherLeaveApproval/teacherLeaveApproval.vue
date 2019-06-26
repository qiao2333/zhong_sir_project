<!--
 * @Description: In User Settings Edit
 * @Author: 党士麟
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-27 08:17:26
 * @LastEditTime: 2019-05-12 19:20:25
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
      姓名
      <a-input placeholder="请输入姓名" class="components-input-demo-size"/>工号
      <a-input placeholder="请输入工号" class="components-input-demo-size"/>院系
      <a-input placeholder="请输入院系" class="components-input-demo-size"/>
      <!-- 课次
      <a-input placeholder="请输入课次" class="components-input-demo-size"/>-->

      <a-button class="btn-query">查询</a-button>
      <!-- 上传更改的数据 -->
      <!-- <a-button class="btn-query">上传</a-button> -->
    </div>
    <div class="box">
      <a-table :columns="columns" :dataSource="data">
        <span slot="action" id="state" slot-scope="record">
          <!-- <select name="state" id="state" class="caozuo">
            <option>驳回</option>
            <option>同意</option>
          </select>-->
          <a-button type="primary" @click="onAgree(record.key)">同意</a-button>
          <a-button type="danger" @click="onDisagree(record.key)">驳回</a-button>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: "工号",
    dataIndex: "teacherNumber",
    key: "teacherNumber"
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "院系",
    dataIndex: "faculty",
    key: "faculty"
  },
  {
    title: "开始时间",
    dataIndex: "startTime",
    key: "startTime"
  },
  {
    title: "结束时间",
    dataIndex: "overTime",
    key: "overTime"
  },
  {
    title: "理由",
    dataIndex: "reason",
    key: "reason"
  },
  {
    title: "审批人",
    dataIndex: "approver",
    key: "approver"
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
      columns,
      data:[],
    };
  },
  created() {//生命周期函数
    this.postTeacherLeaveApproval();
  },
  methods: {
    postTeacherLeaveApproval(){ //获取信息 
      this.axios.post("https://www.easy-mock.com/mock/5cc7ec55c87cb117f3e4ba26/school/teacherLeaveApproval").then(res=>{
        // console.log("--------"+res);
        if(res.data.code === 0){
          this.data=res.data.message;
        }else{
          alert("上传失败");
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

