<template>
  <div id="app">
    <div class="loading">
      <div class="pic">
        <div id="preloader_6">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="press">

        <p v-if="showPress">
          <Progress :percent="percent" :stroke-width="15" text-inside />
        </p>

        <p v-if="!showPress" @click="fullScreen">
          <Button type="success" ghost>进入游戏</Button>
        </p>
        
      </div>
      
      <!-- <div class="dt_img"></div> -->


    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      percent: 0, // 加载进度
      showPress: true
    };
  },
  mounted() {
    this.init(); // 初始化
  },
  methods: {
    // 初始化
    init() {
      localStorage.setItem('farmDate', null)
      this.$nextTick(function() {
        var self = this;
        //var time = new date();
        // 页面加载读取缓存
        self.$store.dispatch("loadgame");
      });
      this.loadPage();
    },

    loadPage() {
      var that = this;
      var interval = setInterval(function() {
        if (that.percent < 100) {
          that.percent += 50;
          that.showPress = true;
          //console.log(that.percent);
        } else {
          clearInterval(interval);
          that.showPress = false;
        }
      }, 100);
    },


    fullScreen() {
      // 全屏切换
      //screenfull.toggle();
      this.$screenFull();

      this.$router.push({
        path: "/start",
        query: this.otherQuery
      });

      // this.$router.push({
      //   path: "/user",
      //   query: this.otherQuery
      // });

    }
    
  }
};
</script>