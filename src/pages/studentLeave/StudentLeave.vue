<template>
  <div class="content">
    <a-button type="primary" @click="showModal">Modal</a-button>
    <a-modal
      title="Modal"
      v-model="visible"
      @ok="hideModal"
      okText="确认"
      cancelText="取消"
    >
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </a-modal>
    <br />
    <br />
    <a-button @click="confirm">Confirm</a-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    showModal() {
      this.visible = true
    },
    hideModal() {
      this.visible = false
    },
    confirm() {
      this.$confirm({
        title: 'Confirm',
        content: 'Bla bla ...',
        okText: '确认',
        cancelText: '取消',
      });
    }
  }
}
</script>
