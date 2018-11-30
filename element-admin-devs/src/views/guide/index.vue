<template>
  <div class="app-container">
    <Dialog v-if="dialogDemo.show" :show.sync="dialogDemo.show"/>
    <el-button type="" @click="PopDelog"> open Deloag</el-button>
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
      }
    }
  },
  mounted() {

  },
  methods: {
    PopDelog() {
      this.dialogDemo.show = true
    }
  }
}
</script>
