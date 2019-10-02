<template>
    <div class="upanddown" style="height:100%">
        <div class="left">
          <component :is="intro"></component>
          <ready></ready>
          <component :is="code"></component>
        </div>
        <iframe frameborder="0" style="float:right;" scrolling="yes" src="http://localhost:8080" height="100%" width="60%">
        </iframe>
    </div>
</template>
<style scoped>
  .left {
    float: left;
    width: 40%;
    height: 100%;
    overflow: auto;
  }
</style>
<script>
import ready from '@/components/course/ready'
export default {
  components: {
    ready
  },
  computed: {
    code: function () {
      return () => import('@/components' + this.$route.path)
    },
    intro: function () {
      let path = this.$route.path
      path = path.split('/')
      path[path.length - 1] = '课程介绍'
      path = path.join('/')
      console.log(path)
      return () => import('@/components' + path)
    }
  }
}
</script>
