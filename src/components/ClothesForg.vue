<template>
    <div class="clothes-default">
        <!-- <p>我是clothesdefault</p> -->
        <img :src="data.img" >
    </div>
</template>

<script>
export default {
    name:'clothes-default',
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
.skin-cloes{width: 100%;height: 100%;position: absolute;}
.skin-cloes .clothes-default{width: 100%;height: 100%;position: absolute;top: 18px;}
.skin-cloes .clothes-default img{width: 100%;height: auto;}
</style>
