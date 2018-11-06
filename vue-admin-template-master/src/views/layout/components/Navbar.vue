<template>
  <el-menu class="navbar" mode="horizontal" :class="{'no-sidebar-navbar-width':!sidebar.opened}">
    <hamburger :class="['hamburger-container',{'small-width':!sidebar.opened}]" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <div class="right-menu">

      <div class="searchContent">
        <el-input placeholder="姓名/手机号/学生编号" class="input-with-select" v-model="query.kw" clearable>
          <el-button slot="append" icon="el-icon-search" @click="inquire"></el-button>
        </el-input>
        <div class="searchList" v-show="list">
          <li v-show="haveListData" v-for="item in searchList" :key="item.value" @click="nameLists(item.text,item.value)">{{item.text}}</li>
          <div v-show="!haveListData" class="no-data-message">暂无数据</div>
        </div>

        <div class="name">{{name}}</div>

        <el-dropdown class="avatar-container right-menu-item" trigger="click">
          <div class="avatar-wrapper">
              <svg-icon icon-class="girl"  class="user-avatar" v-if="sex!==1"></svg-icon>
              <svg-icon icon-class="boy" class="user-avatar" v-else></svg-icon>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided>
              <span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <span @click="reset" style="display:block;color:red;">清除缓存</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Hamburger,
  },
  data() {
    return {
      query: {
        kw: ''
      },
      list: false,
      searchList: [],
      nameList: '',
      haveListData: false
    }
  },
  mounted() {
    document.addEventListener('click', this.hideList)
  },
  destroyed() {
    document.removeEventListener('click', this.hideList)
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'sex',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    reset() {
      location.replace(location.pathname + '?_' + Math.random() + location.hash)
    },
    inquire() {
      this.$http.get('index_searchUser', {
        params: { kw: this.query.kw }
      }).then(res => {
        if (res.data) {
          if (res.data.length) {
            this.haveListData = true
          } else {
            this.haveListData = false
          }
          this.list = true
          this.searchList = res.data
        } else {
          this.haveListData = false
          this.$message.warning('没有符合要求的数据！')
        }
      }).catch((res) => {
        this.haveListData = false
        this.$message({
          message: res.message,
          type: 'error',
          duration: 3 * 1000
        })
      })
    },
    nameLists(text, value) {
      this.query.kw = text
      this.list = false
      if (value) {
        this.$router.push(`/roster/detail/${value}`)
      } else {
        this.$message.error('系统错误！')
        return
      }
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    hideList() {
      this.list = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0 !important;
    padding: 0;
    margin: 0 auto;
    left: 0;
    width: 100%;
    z-index: 1002;
    position: fixed;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
      width: 180px;
      text-align: center;
      margin-top: 7px;
      transition: .38s;
    }
    .breadcrumb-container{
      float: left;
      position: absolute;
      left: 190px;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .right-menu {
      height: 100%;
      text-align: right;
      position: absolute;
      /*width: 50%;*/
      right: 20px;
      &:focus{
        outline: none;
      }
      .searchContent{
        /*float: right;*/
        .input-with-select{
          position: relative;
          left: -30px;
          top: 0;
          width:250px!important;
        }
        .name{
          position: relative;
          top: 0;
          line-height: 50px;
          display: inline-block;
          padding: 0 20px;
          /*width: 30px;*/
        }
        .searchList{
          position: absolute;
          width: 193px;
          left: -30px;
          /*left: 50%;*/
          top: 43px;
          border-radius: 4px;
          border: 1px solid #dcdfe6;
          border-top: 0;
          background: #fff;
          z-index: 222;
          text-align: left;
          padding: 3px 20px;
        }
        li{
          cursor: pointer;
          line-height: 30px;
        }
        li:hover{
          color: red
        }
      }
      .el-input-group{
        width: 400px !important;
        position: absolute;
        top: 5px;
        left: 0;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .screenfull {
        height: 20px;
        position: relative;
        top: 14px;
      }
      .international{
        vertical-align: top;
      }
      .theme-switch {
        vertical-align: 15px;
      }
      .avatar-container {
        height: 50px;
        .avatar-wrapper {
          cursor: pointer;
          position: relative;
          .user-avatar {
            width: 2em;
            display: inline-block;
            text-align: center;
            position: relative;
            height: 2em;
            top: 5px;
          }
          .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }

      .color-pink{
        background-color: pink!important;
      }
    }
  }

  .small-width{
    width: 54px!important;
  }
  .no-data-message{
    text-align: center;
    color: #606266;
  }
</style>
