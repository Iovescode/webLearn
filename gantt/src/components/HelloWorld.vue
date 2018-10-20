<template>
  <div class="hello">
    <canvas id="cavsElem">
        你的浏览器不支持canvas，请升级浏览器
    </canvas>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
    this.headerTime()
  },
  methods: {
    headerTime () {
      var canvas = document.querySelector('#cavsElem')
      var ctx = canvas.getContext('2d')
      canvas.width = 900
      canvas.height = 600
      canvas.style.border = '1px solid green'
      var rectH = 10
      var rectW = 20
      ctx.lineWidth = 0.5
      // 绘制表格
      // 第一步： 绘制横线
      for (let i = 0; i < canvas.width; i++) {
        ctx.moveTo(rectW * i, 0)
        // 如果不设置moveTo，当前画笔没有位置
        ctx.lineTo(rectW * i, canvas.height)
      }
      // 第二步：绘制竖线：如果绘制的格子的宽高相等，可以将for循环放到一个里面；
      for (var i = 0; i < canvas.height; i++) {
        ctx.moveTo(0, rectH * i)
        ctx.lineTo(canvas.width, rectH * i)
      }
      ctx.stroke()
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
