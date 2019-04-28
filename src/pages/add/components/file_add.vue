<template>
	<a-upload name="file" :multiple="false" action="//jsonplaceholder.typicode.com/posts/" :headers="headers" @change="handleChange">
    <a-button>
      <a-icon type="upload" /> 点击上传学生Excel表
    </a-button>
  </a-upload>
</template>

<script>
	export default {
  data () {
    return {
      headers: {
        authorization: 'authorization-text',
      }
    }
  },
  methods: {
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} 学生Excel表上传成功!`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 文件上传失败.`);
      }
    },
  },
}

</script>

<style>
</style>
