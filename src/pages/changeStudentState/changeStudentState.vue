<!--
 * @Description: In User Settings Edit
 * @Author: 党士麟
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-26 08:47:45
 * @LastEditTime: 2019-05-08 16:58:14
 -->

<template>
  <!-- 
  功能：老师修改学生个人考勤
  -->
  <div class="content">
    <div class="select-box">
      学年:
      <a-select class="select-year">
        <a-select-option value="2016">2016</a-select-option>
        <a-select-option value="2017">2017</a-select-option>
      </a-select>学期:
      <a-select class="select-term">
        <a-select-option value="上学期">上学期</a-select-option>
        <a-select-option value="下学期">下学期</a-select-option>
      </a-select>课程:
      <a-select class="select-term">
        <a-select-option value="C语言">C语言</a-select-option>
        <a-select-option value="Java">Java</a-select-option>
      </a-select>班级:
      <a-select class="select-term">
        <a-select-option value="16软一">16软一</a-select-option>
        <a-select-option value="16软二">16软二</a-select-option>
      </a-select>周数
      <a-input placeholder="请输入周数" class="components-input-demo-size"/>课次
      <a-input placeholder="请输入课次" class="components-input-demo-size"/>

      <a-button class="btn-query">查询</a-button>
      <!-- 上传更改的数据 -->
      <!-- <a-button class="btn-query">保存</a-button> -->
    </div>
    <div class="box">
      <a-table :columns="columns" :dataSource="data">
        <template slot="action" id="state"  slot-scope="record">
          <select name="state" class="caozuo">
            <option value="正常">正常</option>
            <option value="缺勤">缺勤</option>
            <option value="迟到">迟到</option>
            <option value="早退">早退</option>
          </select>
          <a-button type="primary" @click="Submission(record.key)">提交</a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: "学号",
    dataIndex: "stdnumber",
    key: "stdnumber"
  },
  {
    title: "班级",
    dataIndex: "class",
    key: "class"
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "考勤状态",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  data() {
    return {
      data: [],
      columns
    };
  },
  created() {
    this.postChangeStudentState();
  },
  methods: {
    postChangeStudentState() { //表格渲染
      this.axios
        .post(
          "https://www.easy-mock.com/mock/5cc7ec55c87cb117f3e4ba26/school/changeStudentState"
        )
        .then(res => {
          if (res.data.code === 0) {
            this.data = res.data.message;
          } else {
            alert("操作失败");
          }
        });
    },
    Submission(key){ //提交按钮
      alert("提交"+key);
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

