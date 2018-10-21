<template>
  <div class="indexTo">
    <numberFrom/>
    <textFrom v-if="isShow" @close-dolg="closeDolg"/>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-button type="" @click="switchTo">点击 </el-button>
      </el-col>
    </el-row>
    <hr> 自定义校验

  </div>
</template>

<script>

import numberFrom from './details/number'
import textFrom from './details/text'
export default {
  components: {
    numberFrom,
    textFrom
  },
  data() {
    return {
      ruls: [],
      isShow: false
    }
  },

  methods: {
    closeDolg() {
      this.isShow = false
    },
    switchTo() {
      this.isShow = !this.isShow
      // console.log(this.xhrs.GET('https://www.baidu.com/search/error.html', { a: 1, b: 2 }))
    }
  }
}
</script>
<style>
.indexTo{
  margin-top: 50px
}

</style>

