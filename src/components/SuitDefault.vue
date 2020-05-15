<template>
    <div class="suit-default">
        <!-- <p>我是suitdefault</p> -->
        <img :src="data.img" >
    </div>
</template>

<script>
export default {
    name:'suit-default',
    data () {
        return {
            data:{
                img:'../static/images/st.png',
            }
        }
    }
}
</script>
<style scoped>
.skin-suit{width: 100%;height: 100%;position: absolute;}
.skin-suit .suit-default{width: 100%;height: 100%;position: absolute;top: 18px;}
.skin-suit .suit-default img{width: 100%;height: auto;}
</style>