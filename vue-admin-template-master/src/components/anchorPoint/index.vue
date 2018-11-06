<template>
  <div class="to-top">
    <div class="point-list-body" v-show="isOpenList">
      <i class="el-icon-arrow-up" @click="goPreAnchor"></i>
      <ul>
        <li
          v-for="(val,index) in pointList"
          :key="index">
          <el-button type="text" @click="goAnchor(val.hrefId,index)" v-html="val.text"
                     :class="['point-text',{'current-point-class': currentPointIndex === index}]"></el-button>
        </li>
      </ul>
      <i class="el-icon-arrow-down" @click="goNextAnchor"></i>
    </div>
    <div class="go-to-top" v-show="isOpenList" @click="goToTop">返回<br/>顶部</div>
    <div class="open-list-btn" v-show="!isOpenList" @click.stop="isOpenList=true">+</div>
  </div>
</template>

<script>
  export default {
    name: 'anchorPoint',
    props: {
      pointList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isOpenList: false,
        currentPointIndex: 0
      }
    },
    mounted() {
      document.addEventListener('click', this.hideList)
      document.addEventListener('scroll', this.highLightDataList)
    },
    destroyed() {
      document.removeEventListener('click', this.hideList)
      document.removeEventListener('scroll', this.highLightDataList)
    },
    activated() {
      document.addEventListener('click', this.hideList)
      document.addEventListener('scroll', this.highLightDataList)
    },
    deactivated() {
      document.removeEventListener('click', this.hideList)
      document.removeEventListener('scroll', this.highLightDataList)
    },
    methods: {
      goToTop() {
        this.isOpenList = false
        this.goToTopEvent()
      },
      goToTopEvent() {
        const stime = 10
        const y = document.documentElement.scrollTop

        window.scrollTo(0, Math.floor(y / 1.05))

        if (y > 0) {
          window.setTimeout(this.goToTopEvent, stime)
        }
      },
      hideList() {
        this.isOpenList = false
      },
      goAnchor(hrefId, index) {
        const anchor = document.body.querySelector(hrefId)
        this.currentPointIndex = index
        if (anchor && anchor.offsetTop) {
          window.scrollTo(0, anchor.offsetTop - 210)
        }
      },
      goPreAnchor() {
        if (this.currentPointIndex === 0) {
          return
        }
        this.goAnchor(this.pointList[this.currentPointIndex - 1].hrefId, this.currentPointIndex - 1)
      },
      goNextAnchor() {
        if (this.currentPointIndex === this.pointList.length - 1) {
          return
        }
        this.goAnchor(this.pointList[this.currentPointIndex + 1].hrefId, this.currentPointIndex + 1)
      },
      highLightDataList() {
        var wst = document.documentElement.scrollTop
        this.pointList.forEach((val, index) => {
          if (document.body.querySelector(val.hrefId) && document.body.querySelector(val.hrefId).offsetTop <= wst + 250) {
            this.currentPointIndex = index
          }
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
  .to-top
    position: fixed
    right: 15px
    bottom: 25px
    display: block
    transition: all 0.2s ease-in-out
    cursor: pointer
    z-index: 1500
    .point-list-body
      background-color: #fff
      text-align: center
      .el-icon-arrow-up
        margin-top: 5px
      .el-icon-arrow-down
        margin-bottom: 5px
      ul
        list-style: none
        padding: 0 5px
        margin: 0
        .point-text
          color: #666
          padding: 5px 0
        li + li
          border-top: 1px solid #ccc
        .current-point-class
          color: #03a9f4
    .open-list-btn
      width: 52px
      height: 52px
      font-size: 48px
      border-radius: 26px
      color: #fff
      background-color: #838f94
      text-align: center
      font-weight: bold
    .go-to-top
      width: 52px
      height: 52px
      border-radius: 26px
      color: #fff
      background-color: #838f94
      text-align: center
      padding-top: 9px
      font-weight: bold
</style>
