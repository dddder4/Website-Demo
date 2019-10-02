<template>
  <div id="app">
    <div id="nav">
      <div class="container">
        <ul id="nav-href">
            <li id="course" class="clearfix"><a href="javascript:void(0);">课程 ▼</a>
            <ul id="dropdown">
                <li><router-link  to="/course/Index">全部课程</router-link></li>
                <li><a href="javascript:void(0);">即将上线</a></li>
                <li><a href="javascript:void(0);">开发者</a></li>
            </ul>
            </li>
            <li><a href="javascript:void(0);">路径</a></li>
            <li><a href="javascript:void(0);">讨论区</a></li>
            <li><a href="javascript:void(0);">训练营</a></li>
            <li><a href="javascript:void(0);">会员</a></li>
        </ul>
        <div id="navbar-btn">
            <a href="javascript:void(0);" class="grey-btn" @click = "first()" id="login">登录</a>
            <a href="javascript:void(0);" class="green-btn" @click = "second()" id="reg">注册</a>
        </div>
        <form class="nav-search">
        <input type="text" class="input-text search" placeholder="搜索 课程/回答">
        </form>
      </div>
      <b-button v-b-toggle.header-navbar-collapse class="navbar-toggle">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </b-button>
      <b-collapse id="header-navbar-collapse" class="header-dropdown">
        <hr color=#fff />
        <ul>
          <li><a href="javascript:void(0);" @click = "showHeaderItem()">课程 ▼</a>
          <ul id="header-item">
            <li><router-link to="/course/Index">全部课程</router-link></li>
            <li><a href="javascript:void(0);">即将上线</a></li>
            <li><a href="javascript:void(0);">开发者</a></li>
          </ul>
          </li>
          <li><a href="javascript:void(0);">路径</a></li>
          <li><a href="javascript:void(0);">讨论区</a></li>
          <li><a href="javascript:void(0);">训练营</a></li>
          <li><a href="javascript:void(0);">会员</a></li>
          <li>
            <a href="javascript:void(0);" class="grey-btn header-btn" @click = "first()" id="header-login">登录</a>
            <a href="javascript:void(0);" class="green-btn header-btn" @click = "second()" id="header-reg">注册</a>
          </li>
        </ul>
        <hr color=#fff />
        <form>
        <input type="text" class="input-text header-search" placeholder="搜索 课程/回答">
        </form>
        <hr color=#fff />
      </b-collapse>
      </div>
    <router-view/>
    <div id="modal-box" :class="{'hide':active1}">
        <div id="modal">
                <button id="close-modal" @click = "hidebox()">
                    <span>x</span>
                </button>
                <ul id="modal-tabs" class="clearfix">
                    <li><a href="javascript:void(0);" id="show-login" :class="{'choose':active2}" @click = "showlogin()">登录</a></li>
                    <li><a href="javascript:void(0);" id="show-register" :class="{'choose':!active2}" @click = "showregister()">注册</a></li>
                </ul>
                <form action="" method="post" id="modal-form">
                    <div class="input-group clearfix flex">
                        <div class="input-addon">

                        </div>
                        <input type="text" class="input-control input-text" placeholder="请输入用户名" v-model="name">
                    </div>
                    <div class="input-group clearfix flex">
                        <div class="input-addon">

                        </div>
                        <input type="password" class="input-control input-text" placeholder="请输入密码" v-model="password">
                    </div>
                    <div class="status">
                      <p :class="{'hide':code==1?false:true}">注册失败</p>
                      <p :class="{'hide':code==2?false:true}">登录失败</p>
                      <p :class="{'hide':code==3?false:true}">注册失败</p>
                    </div>
                    <div class="input-group clearfix" :class="{'hide':!active2,'block':active2}">
                        <input type="checkbox" id="auto-login">
                        <p class="auto-login-msg">下次自动登录</p>
                        <a href="javascript:void(0);" class="forget">忘记密码？</a>
                    </div>
                    <div class="input-group clearfix flex">
                        <input type="button" v-model="lor" class="input-submit" @click="loginorregister">
                    </div>
                </form>
        </div>
    </div>
  </div>
</template>

<script>
import api from '@/API'
export default {
  name: 'App',
  data () {
    return {
      active1: true,
      active2: true,
      lor: '登录',
      name: '',
      password: '',
      code: 0
    }
  },
  methods: {
    setuser: function () {
      let name = sessionStorage.getItem('name') || localStorage.getItem('name')
      if (name) {
        document.getElementById('login').innerHTML = name
        document.getElementById('header-login').innerHTML = name
        document.getElementById('reg').innerHTML = '退出'
        document.getElementById('header-reg').innerHTML = '退出'
      }
    },
    showlogin: function () {
      this.active2 = true
      this.lor = '登录'
    },
    showregister: function () {
      this.active2 = false
      this.lor = '注册'
    },
    showbox: function () {
      this.active1 = false
    },
    hidebox: function () {
      this.active1 = true
    },
    loginorregister: function () {
      if (this.lor === '登录') {
        api().get('/api/login', {
          params: {
            name: this.name,
            password: this.password
          }
        })
          .then((response) => {
            if (response.data.msg === 'error') {
              this.code = 2
            } else if (response.data.msg === 'success') {
              sessionStorage.setItem('name', this.name)
              sessionStorage.setItem('password', this.password)
              if (document.getElementById('auto-login').checked) {
                localStorage.setItem('name', this.name)
                localStorage.setItem('password', this.password)
              }
              this.$options.methods.setuser()
              this.$options.methods.hidebox.call(this)
            }
          })
          .catch((error) => {
            this.code = 2
            console.log(error)
          })
      } else if (this.lor === '注册') {
        api().post('/api/register', {
          name: this.name,
          password: this.password
        })
          .then((response) => {
            if (response.data.msg === 'error') {
              this.code = 1
            } else if (response.data.msg === 'success') {
              this.code = 3
            }
          })
          .catch((error) => {
            this.code = 1
            console.log(error)
          })
      }
    },
    logout: function () {
      sessionStorage.removeItem('name')
      sessionStorage.removeItem('password')
      localStorage.removeItem('name')
      localStorage.removeItem('password')
      document.getElementById('login').innerHTML = '登录'
      document.getElementById('header-login').innerHTML = '登录'
      document.getElementById('reg').innerHTML = '注册'
      document.getElementById('header-reg').innerHTML = '注册'
    },
    first: function () {
      if (document.getElementById('login').innerHTML === '登录') {
        this.$options.methods.showbox.call(this)
        this.$options.methods.showlogin.call(this)
      } else {
      }
    },
    second: function () {
      if (document.getElementById('reg').innerHTML === '注册') {
        this.$options.methods.showbox.call(this)
        this.$options.methods.showregister.call(this)
      } else {
        this.$options.methods.logout.call(this)
      }
    },
    showHeaderItem: function () {
      if (document.getElementById('header-item').style.display === 'block') {
        document.getElementById('header-item').style.display = 'none'
      } else {
        document.getElementById('header-item').style.display = 'block'
      }
    }
  },
  mounted () {
    this.$options.methods.setuser()
  }
}
</script>

<style>
html,body,#app{
  height: 100%;
}
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
ul {
    list-style: none;
}
#nav-href li {
    float: left;
}
a {
    text-decoration: none;
    display: inline-block;
}
a:hover {
  text-decoration: none;
}
button {
    cursor: pointer;
}
.input-text {
    height: 34px;
    padding: 6px 12px;
    display: inline-block;
    border: 1px solid #ccc;
    font-size: 14px;
}
#nav-href {
  margin-left: 117px;
}
#nav-href a {
    color: #777;
    height: 50px;
    width: 80px;
    display: inline-block;
    text-align: center;
    line-height: 50px;
}
#nav-href a:hover {
    color: #fff;
}
#nav {
    background-color: rgba(25,30,41,1);
    height: 50px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
}
#dropdown {
    display: none;
    background-color: rgba(25,30,41,1);
    padding-left: 0;
    position: absolute;
}
#dropdown li {
    float: none;
}
#dropdown a {
    height: 30px;
    width: 150px;
    font-size: 14px;
    line-height: 30px;
}
#dropdown li:hover {
    background-color: #3c424e;
}
#course {
    position: relative;
}
#course:hover #dropdown {
    display: block;
}
.clearfix {
    zoom: 1;
}
.clearfix:after {
    clear:both;
    display:block;
    content:"";
    height:0px;
    overflow:hidden;
}
.nav-search {
    height: 34px;
    width: 234px;
    float: right;
    padding: 0 15px;
    margin: 8px 0;
}
.search {
    width: 204px;
    border-radius: 4px;
}
#navbar-btn {
    height: 50px;
    width: 112px;
    float: right;
}
#navbar-btn a {
    height: 34px;
    width: 50px;
    margin: 8px 0;
    text-align: center;
    line-height: 34px;
    font-size: 14px;
    display: inline-block;
}
.green-btn {
    background-color: #11aa8c;
    color: #fff;
    border-radius: 4px;
}
.green-btn:hover {
    background-color: #10be9d;
    color: #fff;
}
.grey-btn {
    border: 1px solid;
    line-height: 25px;
    color: #777;
    border-radius: 4px;
}
.grey-btn:hover {
    background-color: #2d323e;
    color: #777;
}
#modal-box {
    background-color: rgba(0,0,0,0.5);
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0%;
    left: 0%;
}
#modal {
    width: 350px;
    background-color: #fff;
    display: block;
    position: fixed;
    top: 15%;
    left: 34%;
    border-radius: 4px;
    padding: 20px;
}
#modal-tabs {
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
}
#modal-tabs a {
    color: #4c5156;
    font-weight: 700;
    font-size: 18px;
    float: left;
    margin-right: 20px;
    padding-bottom: 4px;
}
#modal-tabs a:hover {
    border-bottom: 1px solid #11aa8c;
}
.choose {
    border-bottom: 1px solid #11aa8c;
}
.hide {
    display: none;
}
.inlineblock {
  display: inline-block;
}
.block {
  display: block;
}
.flex {
    display: flex;
    flex-wrap: nowrap;
}
#modal-form {
    margin-top: 20px;
}
.input-group {
    margin-bottom: 15px;

}
.input-control {
    width: 100%;
}
.input-addon {
    width: 46px;
    height: 34px;
    background-color: #eee;
    padding: 6px 12px;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    border: 1px solid #ccc;
    border-right: 0px;
}
.auto-login-msg {
  display: inline-block;
  font-size: 12px;
}
.forget {
    color: #999;
    font-size: 12px;
    float: right;
}
.input-submit {
    color: #fff;
    height: 34px;
    width: 100%;
    border: 0;
    background-color: #0c9;
}
.input-submit:hover {
    background-color: #009973;
    border: 1px solid #008f6b;
}
#close-modal {
    color: #ccc;
    font-size: 21px;
    background-color: #fff;
    border: 0;
    outline: none;
    position: absolute;
    right: 10px;
    top: 5px;
    padding: 0 6px;
}
.bordersolid {
    border: 1px solid #eee;
    background-color: #fff;
    padding: 30px;
}
.upanddown {
    padding-top: 70px;
    padding-bottom: 10px;
}
.leftandright {
    padding-left: 30px;
    padding-right: 30px;
}
.footer {
    left:0px;
    position:fixed;
    width:100%;
    height:30px;
    text-align:center;
    bottom:0px;
}
.status {
  color: red;
  font-size: 12px;
}
.container {
  width: 1170px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  margin-top: -16px;
}
.icon-bar {
  background-color: #888;
  display: block;
  width: 22px;
  height: 2px;
  border-radius: 1px;
  margin-top: 4px;
}
.navbar-toggle {
  display: none;
  border-radius: 4px;
  border: 1px solid #ddd;
  float: right;
  margin: 8px 15px 8px 0;
  padding: 5px 10px 9px;
  background-color: rgba(25,30,41,1);
}
.navbar-toggle:hover {
  background-color: #ddd;
}
.header-dropdown {
  margin-top: 50px;
  background-color: #1a1e2a;
  display: none;
  padding: 0 15px;
}
.header-dropdown a {
  height: 40px;
  width: 100%;
  color: #777;
  padding: 10px 0;
}
.header-dropdown a:hover {
  color: #fff;
}
#header-item {
  height: 100px;
  padding: 5px 0;
  display: none;
}
#header-item a {
  font-size: 14px;
  height: 30px;
  padding: 5px 15px 5px 25px;
}
.header-search {
  width: 100%;
  border-radius: 4px;
}
.header-dropdown .header-btn {
  height: 34px;
  width: 50px;
  margin: 8px 0;
  text-align: center;
  line-height: 34px;
  font-size: 14px;
  display: inline-block;
  padding: 0;
}
@media screen and (min-width: 992px) and (max-width: 1200px) {
  .container {
    width: 970px;
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .container {
    width: 750px;
  }
  #nav {
    height: 100px;
  }
}
@media screen and (max-width: 768px) {
  .container {
    display: none;
  }
  .navbar-toggle {
    display: block;
  }
  .header-dropdown {
    display: block;
  }
  #modal {
    top: 0;
    left: 0;
    margin: 10px;
    width: 95%;
  }
}
</style>
