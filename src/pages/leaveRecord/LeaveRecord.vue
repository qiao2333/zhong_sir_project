<!--
 * @Description: In User Settings Edit
 * @Author: 林嘉锋
 * @LastEditors: 林嘉锋
 * @Date: 2019-04-27
 * @LastEditTime: 2019-04-27
 * @function: 查看请假记录
 -->
<template>
  <div class="content">
    <div class="content-box">
      <div class="record">
        <div class="table">
          <a-table :columns="record_columns" :dataSource="record_data" :pagination="pagination"
            :scroll="{ y: 550 }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userId:'',
        pagination:false,
        statusName:['未审核','审核通过','审核不通过'],
        record_columns:[
          {
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
          record_data:[],
      }
    },
    created() {
      //页面加载时获取记录列表
      this.axios.get('/LeaveBar/Select?stid=1').then(res=>{
        console.log(res)
          let list = res.data.amleavebar;
          let len = list.length;
          for(let i = 0; i < len; i++){
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
