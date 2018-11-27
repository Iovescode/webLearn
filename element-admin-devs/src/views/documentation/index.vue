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
    <service-dialog :show.sync="show"/>
    <el-button @click="open">click</el-button>
    <el-button @click="sendTo">sendTo</el-button>
    <el-button @click="one">one</el-button>
    <el-button @click="two">two</el-button>
    <br>
    <el-select v-model="value5" multiple placeholder="请选择" class="selectName">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>

    <el-select
      v-model="value11"
      multiple
      collapse-tags
      style="margin-left: 20px;"
      placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
  </div>
</template>

<script>

import numberFrom from './details/number'
import textFrom from './details/text'
import serviceDialog from './details/Diglo'
export default {
  components: {
    numberFrom,
    textFrom,
    serviceDialog
  },
  data() {
    return {
      ruls: [],
      isShow: false,
      show: false,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value5: [],
      value11: []
    }
  },
  watch: {
    value5: (e) => {
      if (e.length > 4) {
        const ele = document.querySelectorAll('.selectName')[0].children[0].children[0]
        ele.style.height = '56px'
        ele.style.overflow = 'hidden'
      } else {
        const ele = document.querySelectorAll('.selectName')[0].children[0].children[0]
        ele.style.height = ''
        ele.style.overflow = ''
      }
    }
  },
  created() {

  },
  methods: {
    sendTo() {
      this.xhrs('get@singlePoetry', { params: { 'type': '1', 'page': '1' }}).then((res) => { console.log(res) })
    },
    one() {
      this.xhrs('get@recommendPoetry', { params: { 'type': '1', 'page': '1' }, remote: 'izj' }).then((res) => { console.log(res) })
    },

    two() {
      this.xhrs('post@singlePoetry', { params: { 'type': '1', 'page': '1' }, remote: 'izj' }).then((res) => { console.log(res) })
    },

    open() {
      this.show = true
    },
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
/* .el-select.selectName> .el-select__tags span:first-of-type {
      height: 56px;
    overflow: hidden;
    background-color: red;
} */
</style>

