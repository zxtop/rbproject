<template>
<!-- :style="{backgroundImage: 'url(' +require('../assets/images/bg1.png')+ ')', backgroundSize:'100% 100%', backgroundRepeat: 'no-repeat'}" -->

    <div class="subject_bg" >
        <!-- <p>背景图片随机展示</p> -->
        <img :src="random">
    </div>

</template>

<script>
export default {
    data () {
        return {
            baseImg:[
                {img:'../static/images/subject_bg/bg1.png'},
                {img:'../static/images/subject_bg/bg2.png'},
                {img:'../static/images/subject_bg/bg3.png'},
                {img:'../static/images/subject_bg/bg4.png'},
                {img:'../static/images/subject_bg/bg5.png'}
                
            ]
        }
    },
    computed: {
        random(){
            // console.log(this.baseImg[Math.floor(Math.random() * this.baseImg.length + 1)-1].img)
            return this.baseImg[Math.floor(Math.random() * this.baseImg.length + 1)-1].img
        }
    },
    created () {
        console.log(this.random)
    }
}
</script>

<style scoped>
    .subject_bg{
        position: absolute;
        width: 100%;height: 100%;
        /* background: url("../assets/images/bg1.png") no-repeat; */
        /* background-size: 100% 100%; */
        z-index: -1;
    }
    .subject_bg img{
        width: 100%;
        height: 100%;
    }
</style>