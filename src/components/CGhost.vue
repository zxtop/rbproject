<template>
    <div class="ghost">
        <h1>挑战失败！继续努力哦</h1>
        <div class="body">
            <div class="face_ghost">
                <div class="eye left"></div>
                <div class="eye right"></div>
                <div class="smile"></div>
                <div class="rosy left"></div>
                <div class="rosy right"></div>
            </div>
            <div class="arm left"></div>
            <div class="arm right"></div>
            <div class="bottom">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="shadow"></div>
        <Button type="success" style="background-color: #ed4014;
    border-color: #ed4014;
    position: absolute;
    bottom: -4rem;
    left: 50%;    width: 100px;margin-left: -50px;" @click="reLoadQUesionts">继续闯关</Button>
    </div>
</template>
<script>
export default {
    name: 'ghost',
    data(){
        return {

        }
    },
    methods:{
        reLoadQUesionts(){
            console.log('1111111')
            this.$emit('outResetQuestionList',false)
        }
    }
}
</script>
<style scoped>
body .ghost {
  position: relative;
  width: 160px;
  height: 200px;
}
.ghost h1{
    position: absolute;
    top: -10rem;
    color: #F0EFDA;
    line-height: 1.3em;
}
body .ghost .body {
  position: relative;
  width: 160px;
  height: 200px;
  border-top-right-radius: 80px;
  border-top-left-radius: 80px;
  background-color: #F0EFDA;
  -webkit-animation: float 4s ease infinite;
          animation: float 4s ease infinite;
}
body .ghost .body .face_ghost {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 67px;
  left: 37px;
  width: 72px;
  height: 41px;
}
body .ghost .body .face_ghost .eye {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: #272B24;
}
body .ghost .body .face_ghost .eye.left {
  margin-right: 32px;
}
body .ghost .body .face_ghost .smile {
  margin-top: 6px;
  width: 32px;
  height: 16px;
  margin-left: 20px;
  border-bottom-left-radius: 16px 12px;
  border-bottom-right-radius: 16px 12px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: #272B24;
}
body .ghost .body .face_ghost .rosy {
  position: absolute;
  top: 28px;
  width: 22px;
  height: 8px;
  border-radius: 100%;
  background-color: #FFAA9E;
}
body .ghost .body .face_ghost .rosy.left {
  left: -6px;
  -webkit-transform: rotate(-8deg);
          transform: rotate(-8deg);
}
body .ghost .body .face_ghost .rosy.right {
  right: -6px;
  -webkit-transform: rotate(8deg);
          transform: rotate(8deg);
}
body .ghost .body .arm {
  position: absolute;
  top: 136px;
  width: 60px;
  height: 40px;
  background-color: #F0EFDA;
}
body .ghost .body .arm.left {
  left: -4px;
  border-radius: 60% 100%;
  -webkit-animation: arms-left 4s ease infinite;
          animation: arms-left 4s ease infinite;
}
body .ghost .body .arm.right {
  right: -65px;
  border-radius: 100% 60%;
  -webkit-animation: arms-right 4s ease infinite;
          animation: arms-right 4s ease infinite;
}
body .ghost .body .bottom {
  display: flex;
  position: absolute;
  top: 100%;
  left: 0px;
  right: -1px;
}
body .ghost .body .bottom div {
  flex-grow: 1;
  position: relative;
  top: -14px;
  height: 28px;
  border-radius: 100%;
  background-color: #F0EFDA;
}
body .ghost .body .bottom div:nth-child(2n) {
  top: -10px;
  margin: 0 -2px;
  border-top: 10px solid #F0EFDA;
  background: transparent;
}
body .ghost .shadow {
  position: absolute;
  bottom: -100px;
  left: 50%;
  width: 200px;
  height: 12px;
  border-radius: 100%;
  background-color: #191D18;
  -webkit-animation: shadow 4s ease infinite;
          animation: shadow 4s ease infinite;
}

@-webkit-keyframes float {
  0%,100% {
    top: 0px;
  }
  40% {
    top: -40px;
  }
}

@keyframes float {
  0%,100% {
    top: 0px;
  }
  40% {
    top: -40px;
  }
}
@-webkit-keyframes arms-left {
  0%,100% {
    -webkit-transform: translate(-50%, -50%) rotate(50deg);
            transform: translate(-50%, -50%) rotate(50deg);
  }
  40% {
    -webkit-transform: translate(-50%, -50%) rotate(40deg);
            transform: translate(-50%, -50%) rotate(40deg);
  }
}
@keyframes arms-left {
  0%,100% {
    -webkit-transform: translate(-50%, -50%) rotate(50deg);
            transform: translate(-50%, -50%) rotate(50deg);
  }
  40% {
    -webkit-transform: translate(-50%, -50%) rotate(40deg);
            transform: translate(-50%, -50%) rotate(40deg);
  }
}
@-webkit-keyframes arms-right {
  0%,100% {
    -webkit-transform: translate(-50%, -50%) rotate(-50deg);
            transform: translate(-50%, -50%) rotate(-50deg);
  }
  40% {
    -webkit-transform: translate(-50%, -50%) rotate(-40deg);
            transform: translate(-50%, -50%) rotate(-40deg);
  }
}
@keyframes arms-right {
  0%,100% {
    -webkit-transform: translate(-50%, -50%) rotate(-50deg);
            transform: translate(-50%, -50%) rotate(-50deg);
  }
  40% {
    -webkit-transform: translate(-50%, -50%) rotate(-40deg);
            transform: translate(-50%, -50%) rotate(-40deg);
  }
}
@-webkit-keyframes shadow {
  0%,100% {
    -webkit-transform: translateX(-50%) scale(1);
            transform: translateX(-50%) scale(1);
  }
  40% {
    -webkit-transform: translateX(-50%) scale(0.5);
            transform: translateX(-50%) scale(0.5);
  }
}
@keyframes shadow {
  0%,100% {
    -webkit-transform: translateX(-50%) scale(1);
            transform: translateX(-50%) scale(1);
  }
  40% {
    -webkit-transform: translateX(-50%) scale(0.5);
            transform: translateX(-50%) scale(0.5);
  }
}
</style>