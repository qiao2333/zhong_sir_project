<!--
 * @Description: In User Settings Edit
 * @Author: 林嘉锋
 * @LastEditors: 林嘉锋
 * @Date: 2019-04-20
 * @LastEditTime: 2019-04-21
 * @function: 在线请假
 -->
<template>
  <!-- 根div的class为content确保内容在右边区域出现 -->
  <div class="content">
    <div class="content-box">
      <div class="leave">
        <p style="margin-left: 30px;">
          <label for="reason">事由：</label>
          <a-input placeholder="事由" id="reason" v-model="reason" />
        </p>
        <p style="margin-left: 30px;">
          <label for="where">去处：</label>
          <a-input placeholder="去处" id="where" v-model="whereTo" />
        </p>
        <p>
          <label for="start_time">开始时间：</label>
          <a-date-picker :disabledDate="disabledStartDate" showTime format="YYYY-MM-DD HH:mm:ss" v-model="startValue"
            placeholder="Start" @openChange="handleStartOpenChange" id="start_time" />
        </p>
        <p>
          <label for="end_time">结束时间：</label>
          <a-date-picker :disabledDate="disabledEndDate" showTime format="YYYY-MM-DD HH:mm:ss" placeholder="end"
            v-model="endValue" :open="endOpen" @openChange="handleEndOpenChange" id="end_time" />
        </p>
        <div class="clear-fix"></div>
        <p>
          <label for="" style="float: left;margin: 8px 3px 0 0;">图片证明：</label>
          <a-upload accept="image/*" :fileList="fileList" :beforeUpload="beforeUpload" :remove="handleRemove"
            @change="handleChange">
            <a-button>
              <a-icon type="upload" /> 上传
            </a-button>
          </a-upload>
        </p>
        <div class="clear-fix"></div>
        <a-button type="primary" @click="submit">确认</a-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        startValue: null,
        endValue: null,
        endOpen: false,
        previewVisible: false,
        previewImage: '',
        fileList: [],
        reason: '',
        whereTo: '',
        pictures: [],
      }
    },
    methods: {
      disabledStartDate(startValue) { //禁用开始日期之前的时间
        const endValue = this.endValue;
        if (!startValue || !endValue) {
          return false;
        }
        return startValue.valueOf() > endValue.valueOf();
      },
      disabledEndDate(endValue) { //禁用结束日期之后的时间
        const startValue = this.startValue;
        if (!endValue || !startValue) {
          return false;
        }
        return startValue.valueOf() >= endValue.valueOf();
      },
      handleStartOpenChange(open) { //打开开始时间的弹出框
        if (!open) {
          this.endOpen = true;
        }
      },
      handleEndOpenChange(open) { //打开结束时间的弹出框
        this.endOpen = open;
      },
      submit() {
        let amLeavebar = {
          stId: 1,
          reason: this.reason,
          whereTo: this.whereTo,
          startTime: new Date(this.startValue),
          endTime: new Date(this.endValue),
          type: 1,
          picture: this.pictures.join(';')
        };
        console.log(this.pictures.join(';'));
        console.log(amLeavebar);
        this.getUrls();
        this.axios.post('/LeaveBar/InsertLeaveBar',amLeavebar).then(res=>{
          console.log(res);
        })
      },
      handleCancel() { //点击取消按钮触发的回调
        this.previewVisible = false
      },
      handleChange({ //图片数量改变更新图片列表
        fileList
      }) {
        this.fileList = fileList
      },
      beforeUpload(file) { //图片上传之前做预处理
        let Files = new FormData(); //创建form对象
        Files.append('Files',file);
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };
        this.axios.post('/LeaveBar/Picture',Files,config).then(res=>{
          console.log(res);
          let pictureUrl = res.data.PictureUrl[0];
          this.pictures.push(pictureUrl);
        })
        return false;
      },
      handleRemove(file) {
        const index = this.fileList.indexOf(file);
        const newFileList = this.fileList.slice();
        newFileList.splice(index, 1);
        this.pictures.splice(index,1);
        this.fileList = newFileList
      },
      getUrls() {
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        // console.log(this.fileList);
        this.fileList.forEach((file) => {
          // console.log(typeof file == 'File');
          // console.log(file);
          let Files = new FormData(); //创建form对象
          Files.append('Files', file);
          this.axios.post('/LeaveBar/Picture', Files, config).then(res => {
            console.log(res);
            let pictureUrl = res.data.PictureUrl[0];
            this.pictures.push(pictureUrl);
            console.log(this.pictures);
          })
        })
      }
    },
  }

</script>
<style scoped>
  .leave {
    margin-left: 32%;
  }

  .content-box p {
    margin-bottom: 20px;
  }

  .ant-input {
    width: 250px;
    margin-right: 10px;
  }

  .ant-calendar-picker {
    width: 250px !important;
    margin-right: 10px;
  }

  .clear-fix {
    clear: both
  }

</style>
