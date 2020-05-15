<template>
    <div class="suit-frog">
        <img :src="data.img" >
    </div>
</template>

<script>
export default {
    name:'suit-frog',
    data () {
        return {
            data:{
                img:'../static/images/suit-frog.png',
            }
        }
    }
}
</script>
<style>
.skin-suit{width: 100%;height: 100%;position: absolute;}
.skin-suit .suit-frog{width: 100%;height: 100%;position: absolute;top: 13px;left: -2px;}
.skin-suit .suit-frog img{width: 100%;height: auto;}

/* .eye span:after{
  left: -.2rem;
  top: -1rem;
  width: 1rem;
  height: 1rem;
  background-color: #fff;
  border-radius: 50%;
  z-index: 6;
  -webkit-animation:eye 1.4s ease-in infinite;
} */
</style>