<template>
  <div class="egg-wrapper" title="大蒜" ref="eggexp">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <div class="egg" @click="harvestEgg">
      <div class="grass"></div>
    </div>
    <div class="egg-progress-wrap">
      <p>{{eggprogress}}%</p>
      <div class="egg-progress">
        <div class="egg-progress-item" :style="'width:' + eggprogress + '%' "></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["eggprogress", "eggnum"],
  mounted() {
    var numberOfBlades = 100;
    var grass = document.getElementsByClassName("grass")[0];

    for (var i = 0; i < numberOfBlades; i++) {
      var blade = document.createElement("div");
      this.assignRandomStyles(blade);
      grass.appendChild(blade);
    }
  },
  methods: {
    assignRandomStyles(blade) {
      var randomHeight = Math.floor(Math.random() * 9);
      var randomLeft = Math.floor(Math.random() * (window.innerWidth - 8));
      var randomRotation = Math.floor(Math.random() * 10) - 3;
      blade.style.height = randomHeight + "rem";
      blade.style.zIndex = randomHeight;
      blade.style.opacity = randomHeight * 0.2;
      blade.style.left = randomLeft + "px";
      blade.style.transform = "rotate(" + randomRotation + "deg)";
      blade.className = "suanmiao";
      //console.log(randomRotation)
    },
    // 弹出收成
    popAdd(addEggExps) {
      let self = this;
      let popDom = document.createElement("div"); // 创建dom
      popDom.classList.add("pop-money"); // 给dom添加class
      popDom.innerHTML = "+" + addEggExps;
      self.$refs.eggexp.appendChild(popDom); // 在ref="eggexp"元素内添加dom
      setTimeout(() => {
        popDom.remove();
      }, 500);
    },
    harvestEgg() {
      let self = this;
      //let eggNum = self.$store.state.chick.egg.num;
      let eggNum = 3;
      let eggPrice = self.$store.state.chick.egg.price;
      console.log("可收获的鸡蛋：" + self.$store.state.chick.egg.num);
      if (eggNum > 0) {
        var obj = {
          name: "精美大蒜",
          num: eggNum,
          price: eggPrice,
          img: "../static/images/egg.png"
        };
        self.$store.dispatch("harvestegg", obj);
        self.popAdd(eggNum + "大蒜");
      }
    }
  }
};
</script>