---
title: 基础实例
---

# 基础实例

<script setup>
const handler = setInterval(()=>{
    if(window.xingkong){
        clearInterval(handler)
        init();
    }
}, 1000)
function init(){
    console.log(window.xingkong)
    const stage = new xingkong.default("canvas")
    const circleShape = new xingkong.CircleGraphics(20, 30, 10);
    stage.addGraphics(circleShape)
    console.log(stage)
    stage.render()
}
</script>
  <div class="example-my">
    <canvas id="canvas"></canvas>
    <div class="detail"></div>
</div>
