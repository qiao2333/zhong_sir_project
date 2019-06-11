<!--
 * @Description: In User Settings Edit
 * @Author: 党士麟
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-23 15:34:53
 * @LastEditTime: 2019-05-12 19:20:03
 -->

<template>
  <!-- 
  功能：查看学生个人考勤
  -->
  <div class="content">
    <!-- 搜索功能？？？ -->
    <!-- <div class="select-box">
      学年:
      <a-select class="select-year">
        <a-select-option value="2016">2016</a-select-option>
        <a-select-option value="2017">2017</a-select-option>
      </a-select>学期:
      <a-select class="select-term">
        <a-select-option value="上学期">上学期</a-select-option>
        <a-select-option value="下学期">下学期</a-select-option>
      </a-select>周数
      <a-input placeholder="请输入周数" class="components-input-demo-size"/>

      <a-button class="btn-query">查询</a-button>
    </div> -->
    <div class="box">
      <a-table :columns="columns" :dataSource="message" size="small"/>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: "学号",
    dataIndex: "stdnumber"
  },
  {
    title: "班级",
    dataIndex: "class"
  },
  {
    title: "姓名",
    dataIndex: "name"
  },
  {
    title: "课程",
    dataIndex: "course"
  },
  {
    title: "任课老师",
    dataIndex: "teacher"
  },
  {
    title: "考勤情况",
    dataIndex: "state"
  },
  {
    title:"时间",
    dataIndex:"time"
  }
];
export default {
  data() {
    return {
      message:[],
      columns
    };
  },
  created() { //生命周期函数
    this.getStdList();
  },
  methods: {
    getStdList(){ //获取考勤信息
      this.axios.get("https://www.easy-mock.com/mock/5cc7ec55c87cb117f3e4ba26/school/checkStdAttendance").then(result =>{
        console.log(result.body);
        if(result.data.code === 0){
          console.log(result);
          this.message=result.data.message;
          for(var i=0,len = this.message.length;i<len;i++){ //用于把状态改成
            // this.message[i].key = this.message[i].id;
            if(this.message[i].state===1){
              this.message[i].state = "请假";
            }else if(this.message[i].state===2){
              this.message[i].state = "迟到";
            }else if(this.message[i].state===3){
              this.message[i].state = "早退";              
            }else if(this.message[i].state===4){
              this.message[i].state = "缺勤";
            }
          }
        }
      })
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

