<template>
    <div class="clothes-frog">
        <img :src="data.img" >
    </div>
</template>

<script>
export default {
    name:'clothes-frog',
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
.skin-cloes .clothes-frog{width: 100%;height: 100%;position: absolute;top: 18px;}
.skin-cloes .clothes-frog img{width: 100%;height: auto;}
</style>