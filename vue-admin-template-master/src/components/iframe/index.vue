<template>
  <!-- 命令行生成的模板 -->
  <div class="base-iframe">
    <iframe :src="url" frameborder="0" scrolling="yes" style="width:100%;height:1000px;"></iframe>
  </div>
</template>

<script>
  import config from '@/../config/default.js'

  export default {
    name: 'base-iframe',
    props: {
      src: String
    },
    data() {
      return {
        url: ''
      }
    },
    computed: {},
    created() {
      this.beforeEnter()
    },
    mounted() {

    },
    methods: {
      beforeEnter() {
        // dev, itest, 线上， 离线
        if (window.location.host.includes('hfjy.com') || window.location.host.includes('localhost')) {
          config.currentHost.forEach((element, index) => {
            if (window.location.host.includes(element)) {
              if (this.src.indexOf('?') > -1) {
                this.url = `http://${config.oldLmsHost[index] + '/resource/index.html#!/' + this.src}`
              } else {
                this.url = `http://${config.oldLmsHost[index] + '/resource/index.html#!/' + this.src + '?' + new Date().getTime()}`
              }
            } else if (window.location.host.includes('localhost')) {
              this.url = `http://${config.oldLmsHost[1] + '/resource/index.html#!/' + this.src + '?' + new Date().getTime()}`
            }
          })
        }
      }
    },
    watch: {
      'src'() {
        this.beforeEnter()
      }
    }
  }
</script>
<style lang="sass">
</style>
