<!--
 * @Description: In User Settings Edit
 * @Author: 林嘉锋
 * @LastEditors: 林嘉锋
 * @Date: 2019-04-27
 * @LastEditTime: 2019-04-27
 * @function: 查看学生请假记录
 -->
<template>
  <div class="content">
    <div class="content-box">
      <div class="select">
        <span>学期：</span>
        <a-select defaultValue="2018-2019-2" style="width: 150px">
          <a-select-option value="2018-2019-2">2018-2019-2</a-select-option>
          <a-select-option value="2018-2019-1">2018-2019-1</a-select-option>
          <a-select-option value="2017-2018-2">2017-2018-2</a-select-option>
          <a-select-option value="2017-2018-1">2017-2018-1-</a-select-option>
        </a-select>
        <span>院系：</span>
        <a-select style="width: 250px" defaultValue="031100">
          <a-select-option value="031100">计算机科学与软件学院、大数据学院</a-select-option>
          <a-select-option value="030800">生命科学学院</a-select-option>
          <a-select-option value="031300">食品与制药工程学院</a-select-option>
        </a-select>
        <span>周次：</span>
        <a-select style="width: 150px" defaultValue="16">
          <a-select-option :value="item" v-for="(item,index) in 20" :key="index">{{item}}</a-select-option>
        </a-select>
        <span>专业：</span>
        <a-select style="width: 180px" defaultValue="1302">
          <a-select-option value="1302">计算机科学与技术</a-select-option>
          <a-select-option value="1301">软件工程</a-select-option>
          <a-select-option value="1306">网络工程</a-select-option>
        </a-select>

        <br>
        <p style="margin: 15px 0;">
          <span>年级：</span>
          <a-select style="width: 150px" defaultValue="2016">
            <a-select-option value="2016">2016</a-select-option>
            <a-select-option value="2017">2017</a-select-option>
            <a-select-option value="2018">2018</a-select-option>
          </a-select>
          <span>班级：</span>
          <a-select style="width: 250px" defaultValue="2016">
            <a-select-option value="2016">2016级软件工程1班</a-select-option>
            <a-select-option value="2017">2016级软件工程2班</a-select-option>
          </a-select>
          <span>姓名：</span>
          <a-input style="width:150px"></a-input>
          <span>学号：</span>
          <a-input style="width:180px"></a-input>
        </p>
      </div>
      <div class="record">
        <div class="table">
          <a-table :columns="record_columns" :dataSource="record_data" :pagination="pagination" :scroll="{ y: 550 }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userId: '',
        pagination: false,
        statusName: ['未审核', '审核通过', '审核不通过'],
        record_columns: [{
            title: '事由',
            dataIndex: 'reason',
            width: 300,
          },
          {
            title: '去处',
            dataIndex: 'whereTo',
            width: 300,
          },
          {
            title: '开始时间',
            dataIndex: 'startTime',
            width: 200,
          },
          {
            title: '结束时间',
            dataIndex: 'endTime',
            width: 200,
          },
          {
            title: '状态',
            dataIndex: 'status',
            width: 150,
          }
        ],
        record_data: [],
      }
    },
    created() {
      //页面加载时获取记录列表
      this.axios.get('http://10.20.8.69:8080/LeaveBar/Select?stid=1').then(res => {
        let list = res.data.amleavebar;
        let len = list.length;
        for (let i = 0; i < len; i++) {
          list[i].key = list[i].datetime;
          list[i].startTime = this.moment(list[i].startTime).format('YYYY-MM-DD HH:mm');
          // console.log(list[i].startTime)
          list[i].endTime = this.moment(list[i].endTime).format('YYYY-MM-DD HH:mm');
          list[i].status = this.statusName[list[i].status];
        }
        this.record_data = list;
      })
    },

  }

</script>

<style scoped>
  .record {}

</style>
