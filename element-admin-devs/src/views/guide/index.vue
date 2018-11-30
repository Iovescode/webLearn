<template>
  <div class="app-container">
    <Dialog v-if="dialogDemo.show" :show.sync="dialogDemo.show"/>
    <el-button type="" @click="PopDelog"> open Deloag</el-button>
    <hr>
    <div class="hello">
      <el-card v-for="item in makeData" :key="item.index" class="box-card" >
        <div slot="header" class="clearfix"/>
        <el-form :inline="true" :ref="item.formRef" :model="item.formModel" class="demo-form-inline">
          <el-form-item :rules="[{ required: true, message: '审批人不能为空'}]" label="审批人" prop="user">
            <el-input v-model="item.formModel.user" placeholder="审批人"/>
          </el-form-item>
          <el-form-item :rules="[{ required: true, message: '区域不能为空'}]" label="区域" prop="region">
            <el-input v-model="item.formModel.region" placeholder="审批人"/>
          </el-form-item>
        </el-form>
      </el-card>
      <!-- 提交 -->
      <el-row type="flex" justify="center">
        <el-button type="primary" plain @click="enterForm">提交</el-button>
        <el-button type="primary" plain @click="reset">重置</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import Dialog from './components/index.vue'
export default {
  name: 'Guide',
  components: {
    Dialog
  },
  data() {
    return {
      dialogDemo: {
        show: false
      },
      makeData: [
        {
          formRef: 'formFirst',
          formModel: { user: '', region: '' }
        },
        {
          formRef: 'formSecond',
          formModel: { user: '', region: '' }
        },
        {
          formRef: 'formThird',
          formModel: { user: '', region: '' }
        }
      ]
    }
  },
  mounted() {

  },
  methods: {
    PopDelog() {
      this.dialogDemo.show = true
    },
    enterForm() {
      const arrModel = []
      const newArr = []
      this.makeData.forEach((item, index) => {
        var result = new Promise((resolve, reject) => {
          this.$refs[item.formRef][0].validate(valid => {
            if (valid) { resolve() }
          })
        })
        newArr.push(result)
        arrModel.push(item.formModel)
      })
      this.dispose(newArr)
    },
    dispose(newArr) {
      Promise.all(newArr)
        .then(function() {
          // 都通过了
          // console.log(arrModel)
          alert('恭喜，表单全部验证通过')
        })
        .catch(function() {
          console.log('err')
        })
    },
    reset() {
      this.makeData.map((item, index) => {
        var c = item.formRef
        if (this.$refs[c] && this.$refs[c][0]) {
          this.$refs[c][0].resetFields()
        }
      })
    }
  }
}
</script>
