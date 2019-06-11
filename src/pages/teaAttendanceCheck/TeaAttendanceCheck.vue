<!--
 * @Author: 林嘉锋
 * @LastEditors: 林嘉锋
 * @Date: 2019-04-27
 * @LastEditTime: 2019-04-28
 * @function: 考勤教师
 -->
<template>
  <div class="content">
    <div class="content-box">
      <div class="check">
        <p>
          <a-date-picker format="YYYY-MM-DD" placeholder="日期" v-model="date" @change="dateChange"/>
        </p>
        <p>
          <a-select placeholder="选择节数" style="width: 200px" v-model="pitchNums">
            <a-select-option v-for="item in pitchNumList" :key="item.timeTableId" :value="item.timeTableId">
              {{item.pitchNum}}
            </a-select-option>
          </a-select>
        </p>
        <p>
          <a-button type="primary" @click="showAttendanceModal">开始考勤</a-button>
        </p>
        <a-modal title="考勤教师" v-model="visible" @ok="handleOk" cancelText="取消" okText="提交" class="tea_modal">
          <p>
            <a-input placeholder="教师" style="width:200px;" v-model="teaName" disabled />
          </p>
          <p>
            <a-input placeholder="课程" style="width:200px;" v-model="coueseName" disabled />
          </p>
          <p>
            <a-input placeholder="周次" style="width:200px;" v-model="week" disabled />
          </p>
          <!-- <p>
            <a-input placeholder="地点" style="width:200px;" v-model="where" disabled />
          </p> -->
          <p>
            <a-radio-group name="radioGroup"  v-model="status">
              <a-radio :value="1">请假</a-radio>
              <a-radio :value="2">迟到</a-radio>
              <a-radio :value="3">早退</a-radio>
              <a-radio :value="4">缺勤</a-radio>
            </a-radio-group>
          </p>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
  const ajax = {
    // 定义一个普通方法
    getCourse: () => {
      //主要内容在这里 在方法中返回一个Promise
      // 使用Promise的resolve返回需要异步获取的对象即可
      return new Promise((resolve, reject) => {
        this.axios.get('http://172.18.44.25:8889/Adjustment/Selectcourse?employeeId=1').then(res => {
          resolve({
            data: res.data
          });
        }).catch({
          data: error
        });
      })
    }
  }
  export default {
    created() {
      this.classname = 1;
      this.coursename = 1;
    },
    watch: {
      book:function(newVal,oldVal){
        console.log("----")
        console.log(newVal);
        this.book = newVal;
        console.log(this.book)
      }
    },
    data() {
      return {
        visible: false,
        date: null,
        week: '',
        where: '',
        courseid: '',
        currId:'',
        coueseName: '',
        classname: '',
        teaName: '',
        book:[],
        pitchNumList: [
          {
            timeTableId: 1,
            pitchNum: '第1节'
          },
          {
            timeTableId: 2,
            pitchNum: '第2节'
          },
          {
            timeTableId: 3,
            pitchNum: '第3节'
          },
          {
            timeTableId: 4,
            pitchNum: '第4节'
          },
          {
            timeTableId: 5,
            pitchNum: '第5节'
          },
          {
            timeTableId: 6,
            pitchNum: '第6节'
          },
          {
            timeTableId: 7,
            pitchNum: '第7节'
          },
          {
            timeTableId: 8,
            pitchNum: '第8节'
          },
          {
            timeTableId: 9,
            pitchNum: '第9节'
          },
          {
            timeTableId: 10,
            pitchNum: '第10节'
          },
          {
            timeTableId: 11,
            pitchNum: '第11节'
          },
          {
            timeTableId: 12,
            pitchNum: '第12节'
          },
          {
            timeTableId: 13,
            pitchNum: '第13节'
          },
        ],
        pitchNums: [],
        statusName: ['正常', '请假', '迟到', '早退'],
        status: 1,

      }


    },
    methods: {
      dateChange(){
        let day = this.moment(this.date).format('YYYY-MM-DD');
        this.axios.get('http://172.18.44.25:8889/teacherAbsence/confirm?day='+day).then(res=>{
          console.log(res);
          let data = res.data.list;
          let timeTableIdArr = [];
          let list = [];
          let book = new Array(13).fill(false);
          for(let i = 0;i < data.length;i++){
            let id = data[i].timeTableId;
            if(!book[id]){
              data[i].pitchNum = '第'+id+'节';
            list.push(data[i]);
           }
            book[id] = true;
          }
          this.pitchNumList = list;
        })
      },
    
      showAttendanceModal() {
        let data = this.pitchNumList;
          for(let i = 0;i < data.length;i++){
            if(data[i].timeTableId == this.pitchNums){
              this.coueseName = data[i].course;
              this.week = data[i].week+'';
              this.teaName = data[i].employee;
              this.currId = data[i].id+'';
              this.visible = true;
              break;
            }
          }
      },
      handleOk() {
        let queryObj = {
          curriculumId:this.currId,
          status:this.status
        }
        this.axios.post('http://172.18.44.25:8889/teacherAbsence/confirm',queryObj).then(res=>{
          console.log(res);
          if(res.data.code == 0){
            this.date = null;
            this.pitchNums = [];
            this.visible = false;
            this.$message.success("考勤成功");
          }
        })
      },
      statusChange() {}
    },

  }

</script>

<style scoped>
  .content-box {
    margin-top: 30px !important;
    padding: 40px 0 10px 0px;
  }

  .check {
    margin-bottom: 50px;
  }

  .check p {
    margin-bottom: 20px;
  }

  .check {
    margin-left: 32%;
  }

  .ant-calendar-picker {
    width: 200px !important;
  }

  .tea_modal p {
    margin: 0 0 20px 100px;
  }

</style>
