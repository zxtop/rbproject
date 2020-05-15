<template>
    <div class="hats-frog">
        <img :src="data.img" >
    </div>
</template>

<script>
export default {
    name:'hat-frog',
    data () {
        return {
            data:{
                img:'../static/images/hat-mogu.png',
            }
        }
    }
}
</script>
<style>
.skins-hat{width: 100%;height: 100%;position: absolute;}
.skins-hat .hats-frog{width: 100%;height: 100%;position: absolute;top: 13px;left: -2px;}
.skins-hat .hats-frog img{width: 100%;height: auto;}
.eye_hat span:after{
    left: 0rem;
    top:-0.3rem;
    width: 0.5rem;
    height: 0.5rem;
}
</style>