<template>
  <div class="home">
      <img src="../assets/container-title-2.png" id="slogan-img">
      <router-link  to="/course/Index" class="green-btn course">进入课程</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  width: 100%;
  height: 100%;
  background: url(../assets/homepage-bg.png) no-repeat;
  padding: 140px 30px 0;
  margin-top: 50px;
}
.course {
  font-size: 20px;
  margin: 24px 0 30px;
  padding: 12px 36px;
  width: 154px;
  height: 52px;
}
#slogan-img {
  max-width: 100%;
  display: block;
}
</style>
