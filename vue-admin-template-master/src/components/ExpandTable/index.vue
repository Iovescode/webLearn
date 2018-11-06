<template>
  <div>
    <el-table
      class="special-table-hidden-checkbox"
      element-loading-text="拼命加载中..."

      :ref="tableRefName"
      :data="rows"
      v-loading="loading"
      :cell-class-name="tableRowClassName"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange">

      <!-- 多选框 -->
      <el-table-column
        type="selection"
        width="45"

        v-if="canCheckAllBox && canCheckAllBox !== ''"
        :label-class-name="labelClassName"
        :selectable="checkBoxValidateCanSelect">
      </el-table-column>

      <!-- 内容伸缩扩展 -->
      <el-table-column v-if="tableExpandSlotName" type="expand">
        <template slot-scope="scope">
          <slot :name="tableExpandSlotName" :row="scope.row"></slot>
        </template>
      </el-table-column>

      <el-table-column v-if="!tableExpandSlotName && tableExpandColumns" type="expand">
        <template slot-scope="scope">
          <el-row>
            <el-col :offset="2" :span="6" v-for="(item,index) in tableExpandColumns" :key="index"
                    style="margin-top: 10px" v-if="scope.row[item.value]">
              <el-tag>{{item.text}}</el-tag>
              <el-popover v-if="scope.row[item.value].length>19" trigger="hover" placement="top" width="500">
                <span>{{scope.row[item.value]}}</span>
                <span slot="reference" class="name-wrapper">
                    <span>{{scope.row[item.value].slice(0,17)}}...</span>
                  </span>
              </el-popover>
              <span v-else>{{scope.row[item.value]}}</span>
            </el-col>
          </el-row>
        </template>
      </el-table-column>

      <!-- 序号 -->
      <el-table-column type="index" v-if="tableIndex">
      </el-table-column>

      <!-- 正常列 -->
      <el-table-column
        v-for="(cloumn,index) in columns"
        :key="index"
        :prop="cloumn.value"
        :label="cloumn.text"
        :fixed="cloumn.fixed"
        :width="cloumn.width"
        :sortable="cloumn.sortable">

        <template slot-scope="scope">
          <template v-if="slotNameArr && slotNameArr.includes(cloumn.value)">
            <slot :name="cloumn.value" :row="scope.row"></slot>
          </template>
          <template v-else>{{scope.row[cloumn.value]}}</template>
        </template>

      </el-table-column>

    </el-table>

    <el-pagination
      v-if="pagination"
      :current-page="+pagination.page"
      :page-size="+pagination.pageSize"
      :total="+pagination.totalRows"
      :page-sizes="[5, 10, 15, 20, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="pageSizeChange"
      @current-change="pageCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'expand-table',
    props: {
      /* ******* 基础类 ******* */
      // 列表：数据(必填)
      rows: {
        type: Array,
        required: true
      },
      // 列表：表头(必填)  value:String(必填) text:String(必填) sortable:Boolean fixed: true/left/right
      columns: {
        type: Array,
        required: true
      },
      /* ******* 功能类 ******* */
      // 列表：加载中
      loading: {
        type: Boolean,
        default: false
      },
      // 列表：是否有序号
      tableIndex: {
        type: Boolean,
        default: false
      },
      // 列表：slot数组
      slotNameArr: Array,
      // 列表：ref名字
      tableRefName: {
        type: String,
        default: 'tableRef'
      },
      // 列表：放在row里 行的样式名字
      cellClassRowName: {
        type: String,
        default: ''
      },
      // 列表：放在row里 判断当前行是否显示 checkBox
      checkboxValidateRowName: {
        type: String,
        default: ''
      },
      // 是否有checkBox 传yes/no/'' 是否允许全选
      canCheckAllBox: {
        type: String,
        default: ''
      },
      // 分页对象
      pagination: {
        validator(value) {
          const requireKeysArr = ['page', 'pageSize', 'totalRows']
          for (const key of requireKeysArr) {
            if (value[key] === 'undefined' || typeof value[key] !== 'string') {
              return false
            }
          }
          return true
        }
      },
      // table 伸缩模板名称
      tableExpandSlotName: {
        type: String,
        default: ''
      },
      // table 伸缩标题名称数组
      tableExpandColumns: Array
    },
    data() {
      return {}
    },
    computed: {
      'labelClassName'() {
        if (this.canCheckAllBox === 'no') {
          return 'display-none'
        }
        return ''
      }
    },
    methods: {
      sortChange({ prop, order }) {
        this.$emit('change-table-sort', prop, order)
      },
      tableRowClassName({ row }) {
        return row[this.cellClassRowName]
      }, // 行样式
      handleSelectionChange(val) {
        this.$emit('selection-change-event', val)
      }, // checkbox 选中/取消 事件
      checkBoxValidateCanSelect(row) {
        if (row[this.checkboxValidateRowName] === true) {
          return false
        }
        return true
      }, // 判断行是否能选中 checkbox
      pageSizeChange(val) {
        this.$set(this.pagination, 'page', '1')
        this.$set(this.pagination, 'pageSize', val.toString())
        this.$emit('get-list')
      },
      pageCurrentChange(val) {
        this.$set(this.pagination, 'page', val.toString())
        this.$emit('get-list')
      }
    }
  }
</script>

<style scoped lang="sass"></style>
