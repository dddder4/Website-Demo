<template>
    <div class="leftandright upanddown">
        <div class="index">
            <router-link to="/course/Index">全部课程</router-link>
            <span>&nbsp;/&nbsp;</span>
            <router-link to="/course/Show">{{course}}</router-link>
        </div>
        <div class="bordersolid introduction">
            <p style="font-size:21px;margin-bottom:15px">{{course}}</p>
            <p style="color:#4c5157">{{introduce}}</p>
        </div>
        <div class="bordersolid">
            <ul class="nav clearfix">
                <li><a href="javascript:void(0);">实验列表</a></li>
            </ul>
            <ul class="chapter clearfix">
                <li class="clearfix" v-for="chapter in chapterlist" :key="chapter.pk">
                    <img src="../../assets/lab-not-ok.png" class="item">
                    <span class="item" style="color:#999">第{{chapter.id+1}}节</span>
                    <span class="item">{{chapter.name}}</span>
                    <router-link :to="{path:'/course/'+chapter.coursename+'/'+chapter.name+'/实验指导'}" class="button right">开始实验</router-link>
                    <a href="javascript:void(0);" class="button left">查看文档</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import api from '@/API'
export default {
  name: 'CourseShow',
  data () {
    return {
      chapterlist: '',
      course: '',
      introduce: ''
    }
  },
  created () {
    let items = []
    let item = {}
    let coursename = this.$route.path
    coursename = coursename.split('/')
    coursename = coursename[coursename.length - 1]
    this.course = coursename
    api().get('api/introduce', {
      params: {
        course_name: coursename
      }
    })
      .then((response) => {
        this.introduce = response.data.introduce
      })
      .catch((error) => {
        console.log(error)
      })
    api().get('/api/showChapters', {
      params: {
        course_name: coursename
      }
    })
      .then((response) => {
        for (var i = 0; i < response.data.list.length; i++) {
          item = {
            pk: response.data.list[i].id,
            name: response.data.list[i].chapter_name,
            id: i,
            coursename: coursename
          }
          items.push(item)
        }
        this.chapterlist = items
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
<style scoped>
.index {
    padding: 5px 10px 15px 5px;
}
.index span {
    color: #ccc;
}
.index a {
    color: #666;
    font-size: 13px;
}
.index a:hover {
    color: #0c9;
}
.introduction {
    margin-bottom: 10px;
}
.nav {
    border-bottom: 1px solid #eee;
}
.nav li {
    float: left;
}
.nav a {
    margin-right: 30px;
    padding-bottom: 4px;
    color: #4c5157;
}
.chapter li {
    margin: 10px 0;
    padding: 5px;
}
.chapter li:hover {
    background-color: #f5f5f5;
}
.item {
    margin: 6px 12px;
    float: left;
}
.button {
    float: right;
    padding: 6px 12px;
    font-size: 14px;
    margin: 0 5px;
}
.left {
    color: #333;
    border: 1px solid #ccc;
}
.left:hover {
    background-color: #e6e6e6;
    border-color: #adadad;
}
.right {
    color: #fff;
    background-color: #0c9;
    border: 1px solid #0c9;
}
</style>
