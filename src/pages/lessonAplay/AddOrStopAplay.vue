<!--
 * @Author: 林嘉锋
 * @LastEditors: 林嘉锋
 * @Date: 2019-04-27
 * @LastEditTime: 2019-04-28
 * @function: 停课补课申请
 -->
<template>
  <div class="content">
    <div class="content-box">
      <div class="applay">
        <p>
          <a-radio-group v-model="aplay_status">
            <a-radio :value="0">停课</a-radio>
            <a-radio :value="1">补课</a-radio>
          </a-radio-group>
        </p>
        <p>
          <a-select size="default"  style="width: 200px;" @change="handleChangeCourse" v-model="courseId">
            <a-select-option v-for="item in courseList" :key="item.courseId" :value="item.courseId">
              {{item.name}}
            </a-select-option>
          </a-select>
        </p>
        <p>
          <a-select size="default" style="width: 200px;" v-model="classId">
            <a-select-option v-for="item in classList" :key="item.classId" :value="item.classId">
              {{item.name}}
            </a-select-option>
          </a-select>
        </p>
        <p>
          <a-date-picker format="YYYY-MM-DD" placeholder="日期" v-model="date" @change="getLessonInfo"/>
        </p>
        <p>
          <a-select mode="multiple"  placeholder="选择节数"
            style="width: 200px" @change="handlePitchNumChange" v-model="pitchNums" >
            <a-select-option v-for="item in pitchNumList" :key="item.id" :value="item.id">
              {{item.pitchNum}}
            </a-select-option>
          </a-select>
        </p>
        <p>
          <a-input placeholder="周次" style="width:200px;" v-model="week" />
        </p>
        <p>
          <a-select class="select-right" @change="handleChangeWhere" v-model="where"  style="width: 200px">
            <a-select-option v-for="item in placeList" :key="item.id">
              {{item.placeName}}
            </a-select-option>
          </a-select>
        </p>
        <p>
          <a-textarea placeholder="理由" :rows="4" style="width: 470px;" id="aplay-reason" />
        </p>
        <p>
          <a-button type="primary">确认申请</a-button>
        </p>
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
        this.axios.get('/Adjustment/Selectcourse?employeeId=1').then(res => {
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
      this.getCourse();
      // this.getClass();
    },
    data() {
      return {
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
        where:'地点',
        course: [],
        courseId: '',
        coursename: '课程',
        class: [],
        classId: '',
        classname: '班级',
        endOpen: false,
        aplay_status: 0,
        book: [],
        employeeId: 203,
        pitchNumList:[
          {id:1,pitchNum:'第一节'},
          {id:2,pitchNum:'第二节'},
          {id:3,pitchNum:'第三节'},
          {id:4,pitchNum:'第四节'},
          {id:5,pitchNum:'第五节'},
          {id:6,pitchNum:'第六节'},
          {id:7,pitchNum:'第七节'},
          {id:8,pitchNum:'第八节'},
          {id:9,pitchNum:'第九节'},
          {id:10,pitchNum:'第十节'},
          {id:11,pitchNum:'第十一节'},
          ],
          pitchNums:[],
      }


    },
    methods: {
      getCourse() {//203 30
        this.axios.get('/Adjustment/Selectcourse?employeeId=203').then(res => {
          console.log(res);
            this.courseList = res.data.courses;
            this.courseId = this.courseList[0].courseId;
            this.getClass();
        })

      },
      getClass() {
        let selectclass = this.$qs.stringify({
          employeeid: this.employeeId,
          courseid: this.courseId
        });
        console.log(selectclass);
        this.axios.get('/Adjustment/Selectclass?employeeid='+this.employeeId+'&courseid='+this.courseId).then(res=>{
          console.log(res);
          this.classList = res.data.teacherclass;
          this.classId = this.classList[0].classId;

        })

      },
      handleChangeCourse() {
        let selectclass = this.$qs.stringify({
          employeeid: this.employeeId,
          courseid: this.courseId
        });
        console.log(selectclass)
        this.axios.get('/Adjustment/Selectclass?employeeid='+this.employeeId+'&courseid='+this.courseId).then(res=>{
          console.log(res);
          this.classList = res.data.teacherclass;
          this.classId = this.classList[0].classId;
        })
      },
      getLessonInfo(){
        console.log(this.moment(this.date).format('YYYY-MM-DD'));
        let example = {
          employeeid:this.employeeId,
          courseid:this.courseId,
          classid:this.classId,
          starttime:this.moment(this.date).format('YYYY-MM-DD')
        }
        this.axios.post('/Adjustment/SelectSuspendClass',example).then(res=>{
          console.log(res);
        })
      },
      handlePitchNumChange(){

        console.log(this.pitchNums);
      },
      handleChangeWhere(){

      }
    },

  }

</script>

<style scoped>
  .applay {
    margin-bottom: 50px;
  }

  .applay p {
    margin-bottom: 20px;
  }

  .applay {
    margin-left: 32%;
  }

  .ant-calendar-picker {
    width: 200px !important;
  }

</style>
