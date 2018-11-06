<template>
  <div>
    <el-form-item :prop="keys[0]">
      <el-select
        clearable
        filterable
        @change="provinceChangeEvent"
        v-model="query[keys[0]]">
        <el-option
          v-for="(item,index) in options.provinceIds"
          :key="index"
          :label="item[optionValueLabel.label]"
          :value="item[optionValueLabel.id]">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :prop="keys[1]">
      <el-select
        clearable
        filterable
        @change="cityChangeEvent"
        v-model="query[keys[1]]">
        <el-option
          v-for="(item,index) in options.cityIds"
          :key="index"
          :label="item[optionValueLabel.label]"
          :value="item[optionValueLabel.id]">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :prop="keys[2]">
      <el-select
        clearable
        filterable
        v-model="query[keys[2]]">
        <el-option
          v-for="(item,index) in options.countyIds"
          :key="index"
          :label="item[optionValueLabel.label]"
          :value="item[optionValueLabel.id]">
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    name: 'cityCascader',
    props: {
      urls: {
        type: Array,
        required: true
      },
      query: {
        type: Object,
        required: true
      },
      keys: {
        type: Array,
        required: true
      },
      optionValueLabel: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        options: {
          provinceIds: [],
          cityIds: [],
          countyIds: []
        }
      }
    },
    created() {
      this.getProvinceIds()
      if (this.query[this.keys[0]]) {
        this.getCityIds(this.query[this.keys[0]])
      }
      if (this.query[this.keys[1]]) {
        this.getCountryId(this.query[this.keys[1]])
      }
    },
    methods: {
      getProvinceIds() {
        return this.$http.get(this.urls[0]).then(res => {
          if (res.data) {
            this.options.provinceIds = res.data
          }
        }).catch(console.log)
      },
      getCityIds(id) {
        return this.$http.get(this.urls[1], {
          params: {
            [this.keys[0]]: id
          }
        }).then(res => {
          if (res.data) {
            this.options.cityIds = res.data
          }
        }).catch(console.log)
      },
      getCountryId(id) {
        return this.$http.get(this.urls[2], {
          params: {
            [this.keys[1]]: id
          }
        }).then(res => {
          if (res.data) {
            this.options.countyIds = res.data
          }
        }).catch(console.log)
      },
      provinceChangeEvent(val) {
        if (val) {
          this.getCityIds(val)
        }
        this.query[this.keys[1]] = ''
        this.query[this.keys[2]] = ''
        this.options.countyIds = []
      },
      cityChangeEvent(val) {
        if (val) {
          this.getCountryId(val)
        }
        this.query[this.keys[2]] = ''
      }
    }
  }
</script>

<style scoped lang="sass">

</style>
