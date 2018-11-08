<template>
  <!-- 命令行生成的模板 -->
  <div class="dashboard-container">
    <div > 请查看network</div>
    <el-button @click="getProvinceIds">请查看network</el-button>
  </div>
</template>

<script>
export default {
  name: 'child',
  data() {
    return {

    }
  },
  created() {
    // this.getProvinceIds()
  },
  methods: {
    getProvinceIds() {
      return this.$http('get@teacher_getLists', { params: { 'type': '1', 'page': '1' }, remote: 'izj' }).then(res => {
        if (res.data) {
          // this.options.provinceIds = res.data
        }
      }).catch(console.log)
    }
  },
  computed: {

  }
}
</script>
<style lang="sass">
</style>
