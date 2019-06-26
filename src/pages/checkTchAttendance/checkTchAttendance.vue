<!--
 * @Description: In User Settings Edit
 * @Author:党士麟
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-24 16:29:09
 * @LastEditTime: 2019-05-12 19:19:40
 -->

<template>
  <!-- 
  功能：查看教师个人考勤
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
      <a-input placeholder="default size" class="components-input-demo-size"/>

      <a-button class="请输入周数">查询</a-button>
    </div> -->
    <div class="box">
      <a-table :columns="columns" :dataSource="data" size="small"/>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: "工号",
    dataIndex: "employeeId",
  },
  {
    title:"curriculumId",
    dataIndex:"curriculumId",
  },
  {
    title: "考勤情况",
    dataIndex: "status"
  },
  {
    title:"时间",
    dataIndex:'datetime',
  },
  {
    title:"审批人",
    dataIndex:"byWho",
  },
];
export default {
  data() {
    return {
      data:[],
      columns
    };
  },
  created() { //生命周期函数 
    this.getTeacherList();
  },
  methods: {
    getTeacherList(){ // 获取数据
      this.axios.get("http://172.18.44.25:8888/teacher/absence").then(res=>{
        console.log("---"+res);
        if(res.data.code === 0){
          this.data=res.data.list;
          for(var i=0,len = this.data.length;i<len;i++){
            this.data[i].key = this.data[i].id;
            if(this.data[i].status===1){
              this.data[i].status = "请假";
            }else if(this.data[i].status===2){
              this.data[i].status = "迟到";
            }else if(this.data[i].status===3){
              this.data[i].status = "早退";              
            }else if(this.data[i].status===4){
              this.data[i].status = "缺勤";
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

