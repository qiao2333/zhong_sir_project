<!--
 * @Author: 林嘉锋
 * @LastEditors: 林嘉锋
 * @Date: 2019-04-27
 * @LastEditTime: 2019-04-28
 * @function: 考勤学生
 -->
<template>
  <div class="content">
    <div class="content-box">
      <div class="check">
        <p>
          <a-select size="default" v-model="courseName" style="width: 200px;" @change="handleChangeCourse">
            <a-select-option v-for="item in courseList" :key="item" :value="item">
              {{item}}
            </a-select-option>
          </a-select>
        </p>
        <p>
          <a-select size="default" style="width: 200px;" v-model="className">
            <a-select-option v-for="item in classList" :key="item" :value="item">
              {{item}}
            </a-select-option>
          </a-select>
        </p>
        <p>
          <a-date-picker format="YYYY-MM-DD" placeholder="日期" v-model="date" @change="getCourseInfo" />
        </p>
        <p>
          <a-select mode="multiple" placeholder="选择节数" style="width: 200px" @change="handlePitchNumChange"
            v-model="pitchNums">
            <a-select-option v-for="item in pitchNumList" :key="item.sectionId" :value="item.sectionId">
              {{item.pitchNum}}
            </a-select-option>
          </a-select>
        </p>
        <p>
          <a-input placeholder="周次" style="width:200px;" v-model="week" disabled />
        </p>
        <!-- <p>
          <a-input placeholder="地点" style="width:200px;" v-model="where" disabled />
        </p> -->
        <p>
          <a-button type="primary" @click="showAttendanceModal">开始考勤</a-button>
        </p>
        <a-modal title="考勤学生" v-model="visible" @ok="handleOk" cancelText="取消" okText="提交" class="attendance_modal">
          <a-table :columns="user_columns" :dataSource="studentList" :pagination="false" :scroll="{y: 500 }">
            <span slot="status" slot-scope="stuNo,record,index">
              <a-radio-group name="radioGroup" @change="statusChange(record.key,index)"
                v-model="status[index]">
                <a-radio :value="0">正常</a-radio>
                <a-radio :value="1">请假</a-radio>
                <a-radio :value="2">迟到</a-radio>
                <a-radio :value="3">早退</a-radio>
                <a-radio :value="4">缺勤</a-radio>
              </a-radio-group>
            </span>
          </a-table>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    // 10.20.8.69:8080
    created() {
     
      this.getCourse();
    },
    data() {
      return {
        visible: false,
        weeks: [{
          title: 1,
          id: 1
        }, {
          title: 2,
          id: 2
        }],
        courseList: [],
        classList: [],
        placeList: [],
        date: null,
        week: '',
        where: '地点',
        course: [],
        courseId: 1,
        courseName: '',
        class: [],
        classId: 1,
        className: '班级',
        book: [],
        employeeId: 203,
        pitchNumList: [{
            sectionId: 1,
            pitchNum: '第1节'
          },
          {
            sectionId: 2,
            pitchNum: '第2节'
          },
          {
            sectionId: 3,
            pitchNum: '第3节'
          },
          {
            sectionId: 4,
            pitchNum: '第4节'
          },
          {
            sectionId: 5,
            pitchNum: '第5节'
          },
          {
            sectionId: 6,
            pitchNum: '第6节'
          },
          {
            sectionId: 7,
            pitchNum: '第7节'
          },
          {
            sectionId: 8,
            pitchNum: '第8节'
          },
          {
            sectionId: 9,
            pitchNum: '第9节'
          },
          {
            sectionId: 10,
            pitchNum: '第10节'
          },
          {
            sectionId: 11,
            pitchNum: '第11节'
          },
          {
            sectionId: 12,
            pitchNum: '第12节'
          },
          {
            sectionId: 13,
            pitchNum: '第13节'
          },
        ],
        pitchNums: [],
        user_columns: [
          {
            title: '学号',
            dataIndex: 'stuNo',
            width: 200,
          },
          {
            title: '姓名',
            dataIndex: 'name',
            width: 150,
          },
          {
            title: '状态',
            dataIndex: 'status',
            width: 500,
            scopedSlots: {
              customRender: 'status'
            },
          },

        ],
        statusName: ['正常', '请假', '迟到', '早退'],
        status: '',
        studentList: [],

      }


    },
    watch: {},
    methods: {
      getCourse() {
        this.axios.get('http://172.18.44.25:8889/role?teacher=' + this.employeeId).then(res => {
          console.log(res);
          this.courseList = res.data.list;
          this.courseName = this.courseList[0];
          this.getClass()
        })
      },
      getClass() {
        this.axios.get('http://172.18.44.25:8889/studentAbsence/class?course=' + this.courseName).then(res => {
          console.log(res);
          this.classList = res.data.list;
          this.className = this.classList[0];
        })

      },
      handleChangeCourse(value) {
        this.getClass();
      },
      getCourseInfo() {
        let date = this.moment(this.date).format('YYYY-MM-DD');
        this.axios.get('http://172.18.44.25:8889/studentAbsence/before?course=' + this.courseName + '&class=' + this
          .className + '&date=' + date).then(res => {
          console.log(res);
          let data = res.data.section;
          if (data.length) {
            let timeTableIdArr = [];
            let list = [];
            let book = new Array(13).fill(false);
            for (let i = 0; i < data.length; i++) {
              let id = data[i].sectionId;
              if (!book[id]) {
                data[i].pitchNum = '第' + id + '节';
                list.push(data[i]);
              }
              book[id] = true;
            }
            this.pitchNumList = list;
            this.week = data[0].week;
            this.studentList = res.data.student;
            this.status = new Array(this.studentList.length).fill(0);
            for(let i=0;i<this.studentList.length;i++){
              this.studentList[i].key = this.studentList[i].studentId;
            }
          }else{
            this.$message.error('该课程对应的班级在此日期没有上课');
          }
        })
      },
      handlePitchNumChange() {
        console.log(this.pitchNums);
      },
      handleChangeWhere() {

      },
      showAttendanceModal() {
        this.visible = true;
      },
      handleOk() {
        let studentStatus = [];
        let studentId = [];
        for(let i=0;i<this.studentList.length;i++){
          if(this.status[i]){
            studentStatus.push(this.status[i]);
            studentId.push(this.studentList[i].studentId);
          }
        }
        let stuAbsence = {
          curriculumId:this.pitchNums,
          studentId:studentId,
          status: studentStatus
        }
        this.axios.post('http://172.18.44.25:8889/studentAbsence/batch', stuAbsence).then(res => {
          console.log(res);
          if(res.data.code == 0)
            this.$message.success('考勤成功');
        })

      },
      statusChange(key,index) {
        console.log(key);
        console.log(this.status[index]);
      }
    },

  }

</script>

<style scoped>
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

</style>
