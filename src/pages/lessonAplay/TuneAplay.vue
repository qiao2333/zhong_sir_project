<!--
 * @Author: 林嘉锋
 * @LastEditors: 林嘉锋
 * @Date: 2019-04-27
 * @LastEditTime: 2019-04-28
 * @function: 调课申请
 -->
<template>
  <div class="content">
    <div class="content-box">
      <div class="applay">
        <p>
          <span class="type">停课</span>
          <span class="type">补课</span>
        </p>
        <div class="clear-fix"></div>
        <p>
          <a-select size="default" defaultValue="课程" class="select-left" @change="handleChangeCourse">
            <a-select-option v-for="item in courseList" :key="item.id">
              {{item.courseName}}
            </a-select-option>
          </a-select>
          <a-select size="default" defaultValue="班级" style="width: 200px;margin-left: 45px;"
            @change="handleChangeCourse">
            <a-select-option v-for="item in classList" :key="item.id">
              {{item.className}}
            </a-select-option>
          </a-select>
        </p>
        <p>
          <a-date-picker  format="YYYY-MM-DD" v-model="stopDate" placeholder="停课日期" />
          <span>
            <a-icon type="swap-right" style="font-size: 20px;" />
          </span>
          <a-date-picker format="YYYY-MM-DD" placeholder="补课日期" v-model="tuneDate" style="margin-left: 20px" />
        </p>
        <p>
          <a-select mode="multiple" placeholder="选择节数" style="width: 200px" @change="handleStopPitchNumChange"
            v-model="stopPitchNums" class="select-left" >
            <a-select-option v-for="item in stopPitchNumList" :key="item.id" :value="item.id">
              {{item.pitchNum}}
            </a-select-option>
          </a-select>
          <span>
              <a-icon type="swap-right" style="font-size: 20px;" />
            </span>
            <a-select mode="multiple" placeholder="选择节数" style="width: 200px" @change="handleAddPitchNumChange"
            v-model="addPitchNums" class="select-right" >
            <a-select-option v-for="item in addPitchNumList" :key="item.id" :value="item.id">
              {{item.pitchNum}}
            </a-select-option>
          </a-select>
        </p>
        <p>
          <a-input placeholder="周次" disabled v-model="stopWeek" class="select-left" />
          <span>
            <a-icon type="swap-right" style="font-size: 20px;" />
          </span>
          <a-input placeholder="周次" v-model="addWeek" class="select-right" />
        </p>
        <p>
          <a-input placeholder="地点" disabled v-model="stopWhere" class="select-left" />
          <span>
            <a-icon type="swap-right" style="font-size: 20px;" />
          </span>
          <a-select class="select-right" @change="handleChangeWere" v-model="addWhere">
            <a-select-option v-for="item in tunePlaceList" :key="item.id">
              {{item.place}}
            </a-select-option>
          </a-select>
        </p>
        <p>
          <a-textarea placeholder="理由" :rows="5" style="margin-top: 10px; width: 470px;" id="aplay-reason" />
        </p>
        <p>
          <a-button type="primary">确认申请</a-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        weeks: [{
          title: 1,
          id: 1
        }, {
          title: 2,
          id: 2
        }],
        courseList: [{
          courseName: "经济学",
          id: 1
        }, {
          courseName: "情商学",
          id: 2
        }],
        classList: [{
          className: "16软件工程1班",
          id: 1
        }, {
          className: "16软件工程2班",
          id: 2
        }],
        placeList: [{
          place: 12,
          id: 1
        }],
        tunePlaceList: [{
          place: 11,
          id: 1
        }],
        stopDate: null,
        tuneDate: null,
        stopWeek: '',
        addWeek: '',
        stopWhere: '',
        addWhere: '地点',
        stopPitchNumList:[
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
          addPitchNumList:[
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
          stopPitchNums:[],
          addPitchNums:[],
      }


    },
    methods: {
      handleChangeWere() {

      },
      handleChangeCourse() {

      },
      handleStopPitchNumChange(){

      },
      handleAddPitchNumChange(){

      }
    },

  }

</script>

<style scoped>
  .applay p {
    margin-bottom: 20px;
  }

  .applay p .type {
    float: left;
    display: block;
    width: 200px;
    height: 40px;
    line-height: 40px;
    margin-left: 10px;
  }

  .applay p .type:first-child {
    margin-right: 60px;
  }

  .applay {
    margin-left: 32%;
  }

  .select-left {
    width: 200px;
    margin-right: 20px;
  }

  .select-right {
    width: 200px;
    margin-left: 20px;
  }

  .ant-calendar-picker {
    width: 200px !important;
    margin-right: 20px;
  }

  .reason {
    float: left;
    margin-top: -10px;
  }

</style>
