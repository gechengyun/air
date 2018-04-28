<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html{
  width: 100%;
  height: 100%;
}
body{
  margin: 0px;
  height: 100%;
  background: #EEEEEE;
  font-family: "微软雅黑", "Microsoft YaHei", "Apple LiGothic Medium", "Apple LiSung Light", "宋体", Arial, Helvetica, sans-serif
}
#app {
  height: 100%;
}
</style>
