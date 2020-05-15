<template>
    <div class="suit-super">
        <img :src="data.img" >
    </div>
</template>

<script>
export default {
    name:'suit-super',
    data () {
        return {
            data:{
                img:'../static/images/suit-chaoren.png',
            }
        }
    }
}
</script>
<style>
.skin-suit{width: 100%;height: 100%;position: absolute;}
.skin-suit .suit-super{width: 100%;height: 100%;position: absolute;top: 13px;left: -2px;}
.skin-suit .suit-super img{width: 100%;height: auto;}
.eye_super span:after{
    left: 0rem;
    top:-0.3rem;
    width: 0.5rem;
    height: 0.5rem;
}
</style>