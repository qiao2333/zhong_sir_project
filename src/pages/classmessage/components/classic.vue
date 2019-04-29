<template>
  <div class="content">
    <a-input-search
      placeholder="输入班级"
      style="width: 200px"
      @search="onSearch"
    />
    
  </div>
</template>

<script>
import ExportJsonExcel from 'js-export-excel';
export default {
  methods: {
    onSearch (value) {
      console.log(value)
    },
  },
}
</script>