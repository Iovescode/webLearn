<template>
  <!-- 命令行生成的模板 -->
  <div class="dashboard-container">


    <el-form inline>
      <city-cascader :query="query" :keys="keys" :option-value-label="optionValueLabel" :urls="['student_getListProvince', 'student_getCity', 'student_getArea']"></city-cascader>
    </el-form>

    <expand-table
      :pagination="paging"
      @get-list="getList"
      :rows="rows"
      :loading="loading"
      :columns="columns">
    </expand-table>
  </div>
</template>

<script>
  import ExpandTable from '@/components/ExpandTable'
  // import cityCascader from '@/components/cityCascader'

  export default {
    name: 'dashboard',
    data() {
      return {
        loading: false,
        columns: [
          {
            'value': 'studentName', 'text': '学生姓名'
          },
          {
            'value': 'phone', 'text': '手机号'
          }
        ],
        paging: {
          page: '1', // 当前第几页
          pageSize: '20', // 一页多少条
          totalRows: '200' // 一共多少条
        },
        rows: [
          {
            studentName: '张三',
            phone: '11'
          },
          {
            studentName: '李四',
            phone: '11'
          }
        ],
        query: {
          provinceId: '',
          cityId: '',
          countryId: ''
        },
        keys: ['provinceId', 'cityId', 'countryId'],
        optionValueLabel: {
          id: 'id',
          label: 'area_name'
        }
      }
    },
    components: {
      ExpandTable
      // cityCascader
    },
    created() {

    },
    mounted() {

    },
    methods: {
      getList() {
        this.rows.push({
          studentName: '张三',
          phone: Math.random()
        })
      }
    }
  }
</script>
<style lang="sass" scoped>
  @import '../../styles/dashboard/index.sass'
</style>
