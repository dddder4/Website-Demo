<template>
  <div class="upanddown leftandright">
      <div class="bordersolid label">
          <div class="clearfix">
              <span>类别：</span>
              <ul>
                  <li><a href="javascript:void(0);">全部</a></li>
                  <li><a href="javascript:void(0);">免费</a></li>
                  <li><a href="javascript:void(0);">限免</a></li>
                  <li><a href="javascript:void(0);"><img src="../../assets/icon-vip.png" style="height:16px">会员</a></li>
              </ul>
          </div>
          <div class="clearfix">
              <span>标签：</span>
              <ul>
                  <li><a href="javascript:void(0);">全部</a></li>
                  <li><a href="javascript:void(0);">Python</a></li>
                  <li><a href="javascript:void(0);">？？</a></li>
                  <li><a href="javascript:void(0);">？？</a></li>
              </ul>
          </div>
      </div>
      <div class="bordersolid course clearfix">
          <div class="clearfix course-title">
              <ul>
                  <li><a href="javascript:void(0);" class="course-title-left">已上线</a></li>
                  <li><a href="javascript:void(0);" class="course-title-left">即将上线</a></li>
              </ul>
              <div class="course-title-right">
                  <a href="javascript:void(0);">最新</a>
                  /
                  <a href="javascript:void(0);">最热</a>
              </div>
          </div>
          <ul class="course-list">
              <li v-for="course in courselist" :key="course.id">
                  <router-link :to="{path:'/course/Show/'+course.name}"><img :src="course.imgsrc" style="height:140px"><span>{{course.name}}</span></router-link>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import api from '@/API'
export default {
  name: 'CourseIndex',
  data () {
    return {
      courselist: ''
    }
  },
  created () {
    var items = []
    var item = {}
    api().get('/api/showCourses/')
      .then((response) => {
        console.log(response)
        for (var i = 0; i < response.data.list.length; i++) {
          item = {
            id: response.data.list[i].id,
            imgsrc: require('./' + response.data.list[i].course_name + '/pic.png'),
            name: response.data.list[i].course_name
          }
          items.push(item)
        }
        this.courselist = items
      })
      .catch((error) => {
        console.log(error)
      })
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background-color:#f9f9f9')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul li {
    float: left;
}
.label {
    margin-bottom: 10px;
    color: #666;
    font-size: 16px;
}
.label div {
    display: inline;
}
.label span {
    float: left;
    margin: 0 4px 4px 0;
    padding: 4px 10px;
    height: 30px;
    line-height: 20px;
}
.label ul {
    float: left;
}
.label a {
    color: #666;
    margin: 0 4px 4px 0;
    padding: 4px 10px;
    height: 30px;
    line-height: 20px;
}
.label a:hover {
    color: #fff;
    background-color: #32bf90;
    border-radius: 15px;
}
.course-title {
    border-bottom: 1px solid #eee;
}
.course-title-left {
    color: #666;
    margin: 0 30px 0 0;
    padding: 0 0 4px;
}
.course-title-left:hover {
    border-bottom: 1px solid #36cc98;
}
.course-title-right {
    margin-top: 6px;
    float: right;
    color: #c1cbe3;
    font-size: 12px;
}
.course-title-right a {
    color: #c1cbe3;
}
.course-title-right a:hover {
    color: #32bf90;
}
.course-list li{
    float: left;
    padding: 0 15px;
    margin: 10px 0;
}
.course-list li a {
    border: 1px solid #eee;
}
.course-list li a:hover {
    box-shadow: 0 1px 5px #eee;
}
.course-list li img {
    display: block;
}
.course-list li span {
    color: #4c5156;
    padding: 10px 10px;
    display: inline-block;
}
</style>
