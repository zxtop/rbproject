<template>
    <div class="suit-default">
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
.skins-hat{width: 100%;height: 100%;position: absolute;}
.skins-hat .suit-default{width: 100%;height: 100%;position: absolute;top: 18px;}
.skins-hat .suit-default img{width: 100%;height: auto;}
</style>