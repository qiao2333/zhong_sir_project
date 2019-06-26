<!--
 * @Author: 林嘉锋
 * @LastEditors: 林嘉锋
 * @Date: 2019-04-12
 * @LastEditTime: 2019-04-12
 * @function: 整个页面的
 -->
<template>
  <div class="home">
    <Nav></Nav>
    <Header></Header>
    <routerView></routerView>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
    import Nav from './components/Nav'
    import Header from './components/Header'
    import Footer from './components/Footer'
  export default {
      components:{
        Nav,
        Header,
        Footer
      }

  }

</script>

<style scoped>

</style>
