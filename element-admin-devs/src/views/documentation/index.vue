<template>
  <div class="indexTo">
    <numberFrom/>
    <textFrom v-if="isShow" @close-dolg="closeDolg"/>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-button type="" @click="switchTo">点击</el-button>
      </el-col>
    </el-row>

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
      isShow: false
    }
  },

  methods: {
    closeDolg() {
      this.isShow = false
    },
    switchTo() {
      this.isShow = !this.isShow
    }
  }
}
</script>
<style>
.indexTo{
  margin-top: 50px
}

</style>

