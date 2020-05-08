<template>
  <div id="app" :class="{onSubject: isSubject}">
    <div class="container" :class="{ beingskin: skinBox}">

      <div class="game-title">蒜瓣闯关</div>
      
      <div class="user-box" @click="showUser">

        <div class="user-logo">
          <div class="user-level">{{chick.level}}</div>
          <span class="portrait-item portrait0"></span>
        </div>

        <div class="user-info">
          <div class="user-name">{{user.name}}</div>
          <div class="user-money">
            <div class="user-mi">
              <Icon type="logo-usd" />
            </div>
            <p>{{user.money}}</p>
          </div>
        </div>

      </div>


      <!-- 功能菜单 -->
      <ul class="nav-list">

        <li @click="showPopup(skin)">
          <span class="nav-icon">
            <i class="ivu-icon ivu-icon-ios-shirt"></i>
          </span>
          <span class="nav-name">换装</span>
        </li>

        <li @click="showPopup(shop)">
          <span class="nav-icon">
            <i class="ivu-icon ivu-icon-ios-cart"></i>
          </span>
          <span class="nav-name">商店</span>
        </li>

        <li @click="showPopup(bag)">
          <span class="nav-icon">
            <i class="ivu-icon ivu-icon-ios-filing"></i>
          </span>
          <span class="nav-name">背包</span>
        </li>

        <li @click="showAchievement()">
          <span class="nav-icon">
            <i class="ivu-icon ivu-icon-ios-medal"></i>
          </span>
          <span class="nav-name">勋章</span>
        </li>

        <li @click="showPopup(study)" class="n-green">
          <span class="nav-icon">
            <i class="ivu-icon ivu-icon-ios-game-controller-b"></i>
          </span>
          <span class="nav-name">闯关</span>
        </li>


      </ul>


      <ul class="nav-help">
        <li @click="showHelp()">
          <span class="nav-icon">
            <i class="ivu-icon ivu-icon-ios-help-circle"></i>
          </span>
          <span class="nav-name">帮助</span>
        </li>
      </ul>


      <div class="content">
        <!-- 太阳光 -->
        <c-sunlight></c-sunlight>
        <!-- 山峰 -->
        <c-peak></c-peak>
        <!-- 白云 -->
        <c-clouds></c-clouds>
        <div class="land-wrap">
          <!-- 草地 -->
          <c-grass></c-grass>
          <!-- 房子 -->
          <c-house></c-house>
          <!-- 护栏 -->
          <c-fence></c-fence>
          <!-- 蜜蜂鲜花 -->
          <c-bee></c-bee>
          <!-- 鸡蛋 
          <c-egg :eggnum="chick.egg.num" :eggprogress="chick.egg.progress"  ref="paper"></c-egg>-->
          <c-dasuan :eggnum="chick.egg.num" :eggprogress="chick.egg.progress" ref="paper"></c-dasuan>
        </div>

        <!-- 叶子 -->
        <c-leaf></c-leaf>
        <!-- 鸡饭碗 
        <c-trough></c-trough>-->
        <c-dog></c-dog>
        <!-- chick -->
        <div class="chick" :class="{noeat:!chick.eat}">
          <!-- 进食倒计 -->
          <div class="countdown-box">
            <p class="countdown-text" :class="{active : !chick.eat }">{{content}}{{setTime}}</p>
            <!-- 进食进度条 -->
            <div class="progress" v-if="value != 0 && value < 100">
              <div class="progress-content" :style="'width:' + value + '%' "></div>
            </div>
          </div>
          <!-- 装扮-帽子 -->
          <div class="skin-hat">
            <keep-alive>
              <component :is="chick.componentHat"></component>
            </keep-alive>
          </div>
          <div class="chick-head" style="display: none;"></div>
          <div class="chick-body">
            <!-- 装扮-衣服 -->
            <keep-alive>
              <component :is="chick.componentClothes"></component>
            </keep-alive>
            <!-- 青蛙衣服 -->
          </div>
          <div class="eye">
            <span></span>
            <span></span>
          </div>
          <div class="blusher">
            <span></span>
            <span></span>
          </div>
          <div class="face" style="display: none;"></div>
          <div class="wing-left" style="display: none;"></div>
          <div class="wing-content" style="display: none;">
            <span></span>
          </div>
          <div class="arm" style="display: none;">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="wing-r" style="display: none;"></div>
          <div class="wing-right">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <div class="food" style="display: none;">
              <p></p>
              <div class="dot-box">
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          <div class="mouth" style="display: none;">
            <span></span>
            <span></span>
            <p></p>
          </div>
          <div class="foot" style="display: none;">
            <span></span>
            <span></span>
          </div>
        </div>
        <!-- 弹窗遮罩层 -->
        <div class="popup-mask" v-show="skinBox" @click="hidePopup"></div>
      </div>

      

      <!-- 功能弹窗面板 -->
      <div class="page-popup">

        <div class="popup-item" v-show="isSkin">

          <div class="popup-head border-bottom-1px">
            <span class="popup-title fl">换装</span>
            <i class="ivu-icon ivu-icon-md-close-circle" @click="hidePopup"></i>
          </div>

          <div class="popup-content">
            <!-- 换装内容 -->
            <tabs :animated="false">

              <tab-pane label icon="ios-body">
                <ul class="opt-list">
                  <li
                    v-for="suit in suits"
                    :key="suit.name"
                    :class="['opt-btn', { active: chick.currentSuit === suit.id && chick.currentHat === suit.id && chick.currentClothes === suit.id}]"
                    @click="replaceDress(0,suit.id)"
                  >
                    <span class="opt-mask fadeIn animated">
                      <Icon type="md-checkmark-circle" />
                    </span>

                    {{ suit.name }}
                    
                  </li>
                </ul>
              </tab-pane>

              <tab-pane label icon="ios-school">
                <ul class="opt-list">
                  <li
                    v-for="hat in hats"
                    :key="hat.name"
                    :class="['opt-btn', { active: chick.currentHat === hat.id}]"
                    @click="replaceDress(1,hat.id)"
                  >
                    <span class="opt-mask fadeIn animated">
                      <Icon type="md-checkmark-circle" />
                    </span>
                    {{ hat.name }}
                  </li>
                </ul>
              </tab-pane>

              <tab-pane label icon="ios-shirt">
                <ul class="opt-list">
                  <li
                    v-for="clothe in clothes"
                    :key="clothe.name"
                    :class="['opt-btn', { active: chick.currentClothes === clothe.id}]"
                    @click="replaceDress(2,clothe.id)"
                  >
                    <span class="opt-mask fadeIn animated">
                      <Icon type="md-checkmark-circle" />
                    </span>
                    {{ clothe.name }}
                  </li>
                </ul>
              </tab-pane>

              <tab-pane label icon="md-rose">
                <p style="padding-top: 40px; text-align: center;">首饰饰品开发中...</p>
              </tab-pane>

              <tab-pane label icon="md-glasses">
                <p style="padding-top: 40px; text-align: center;">眼睛饰品开发中...</p>
              </tab-pane>

            </tabs>
          </div>

        </div>

        <div class="popup-item" v-show="isShop">
          <div class="popup-head border-bottom-1px">
            <span class="popup-title fl">商店</span>
            <i class="ivu-icon ivu-icon-md-close-circle" @click="hidePopup"></i>
          </div>
          <div class="popup-content">
            <p style="padding-top: 50px; text-align: center;">商店功能开发中...</p>
          </div>
        </div>
        <!-----背包开始----->
        <div class="popup-item" v-show="isBag">
          <div class="popup-head border-bottom-1px">
            <span class="popup-title fl">背包</span>
            <i class="ivu-icon ivu-icon-md-close-circle" @click="hidePopup"></i>
          </div>
          <div class="popup-content">
            <tabs :animated="false">
              <tab-pane label="道具" icon="md-ice-cream">
                <div class="food-box">
                  <ul class="food-list">
                    <li
                      v-for="(food, index) in foods"
                      @click="showFood(index)"
                      :class="{ isMask: food.num == 0 || food.unlock == 0}"
                      :key="index"
                    >
                      <div class="food-item">
                        <div class="food-img">
                          <img :src="food.url" />
                        </div>
                        <p class="food-name">{{food.name}}</p>
                        <span class="food-num" v-if="food.num !== 0">{{food.num}}</span>
                        <div
                          class="mask-bg shortage-tips"
                          @click.stop="showShop(food.name)"
                          v-if="food.num == 0 && food.unlock == 1"
                        >
                          <i-button :size="buttonSize" type="success">购买</i-button>
                        </div>
                        <div
                          class="mask-bg shortage-tips"
                          v-if="food.unlock == 0"
                          @click.stop="showUnlock(food.name)"
                        >
                          <i-button :size="buttonSize" type="warning">解锁</i-button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </tab-pane>
              <tab-pane label="收成" icon="ios-archive">
                <div class="food-box">
                  <ul class="food-list">
                    <li
                      v-for="(good, index) in goods"
                      v-show="good.num != 0"
                      @click="showGood(good.name)"
                      :key="index"
                    >
                      <div class="food-item">
                        <div class="food-img egg-img">
                          <img :src="good.img" />
                        </div>
                        <p class="food-name">{{good.name}}</p>
                        <span class="food-num">{{good.num}}</span>
                      </div>
                    </li>
                  </ul>
                  <div class="no-data" v-show="goods.length == 0">暂无物品</div>
                </div>
              </tab-pane>
            </tabs>
          </div>
        </div>
        <!-----背包结束----->

        <!-----闯关开始---->
        <div class="popup-item" v-show="isStudy">
          <div class="popup-head border-bottom-1px">
            <span class="popup-title fl">闯关</span>
            <i class="ivu-icon ivu-icon-md-close-circle" @click="hidePopup"></i>
          </div>

          <div class="popup-content">
            <tabs :animated="false">
              <tab-pane
                v-for="(subject, index1) in subjectList"
                :label="subject.type"
                :icon="subject.icon"
                :key="subject.type"
              >
                <ul class="subject-list">
                  <li
                    v-for="item in subject.list"
                    :key="item.name"
                    :class="{on:item.learning == 1, over:item.learning == 2}"
                    @click="onSubject(item,index1)"
                  >
                    <div class="subject-img">
                      <div class="learning-label">
                        <span v-if="item.learning == 0">未通关</span>
                        <span v-if="item.learning == 1">通关中</span>
                        <span v-if="item.learning == 2">已通关</span>
                      </div>
                      <img :src="item.img" />
                    </div>
                    <p class="subject-name">{{item.name}}</p>
                  </li>
                </ul>
              </tab-pane>
            </tabs>
            <p style="padding-top: 50px; text-align: center; display: none;">学习功能开发中...</p>
          </div>
        </div>
        <!-----闯关结束---->
      </div>


      <!-- 
      <transition name="fade">
        <div class="loading" v-if="isLoad">
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
        </div>
      </transition>-->


      <!-- 用户登录 -->
      <Modal v-model="modalLogin" class-name="hide-footer" :mask-closable="false" :closable="false" @on-ok="keepUser">

        <user-login v-model="modalLogin"></user-login>

      </Modal>

      <!-- 用户年级学期选择 -->
      <Modal v-model="modalGrade" class-name="hide-footer" :mask-closable="false" :closable="false" @on-ok="keepUser">

        <p style="text-align:center">年级|学期</p>
        <user-grade></user-grade>
        
      </Modal>


      <!-- 用户信息 -->
      <Modal v-model="modalUser" class-name="hide-footer" @on-ok="keepUser">

        <div class="user-form" v-if="!editUserName">

          <div class="head-portrait">
            <span class="portrait-item portrait0"></span>
          </div>

          <div class="user-name">
            {{user.name}}
            <Icon type="ios-create" @click="editUser" />
          </div>

          <div class="user-zl">
            <Row>
              <i-col span="12">
                <div class="uz-i">
                  <Icon type="ios-podium" class="c-green" />
                </div>
                <div class="uz-i">等级：{{chick.level}}</div>
              </i-col>

              <i-col span="12">
                <div class="uz-i">
                  <Icon type="ios-heart" class="c-red" />
                </div>
                <div class="uz-i">粉丝：0</div>
              </i-col>

            </Row>

            <Row>
              <i-col span="12">
                <div class="uz-i">
                  <Icon type="md-pricetags" class="c-blue" />
                </div>
                <div class="uz-i">积分：0</div>
              </i-col>
              <i-col span="12">
                <div class="uz-i">
                  <Icon type="ios-medal" class="c-orange" />
                </div>
                <div class="uz-i">段位：0</div>
              </i-col>
            </Row>
          </div>  

        </div>
        <div class="user-form" v-if="editUserName">
          <i-form :model="user">
            <p class="pl-title">修改用户名需要1000金币</p>
            <form-item>
              <i-input v-model="newUserName" placeholder="设置用户名称..."></i-input>
            </form-item>
            <i-button type="primary" @click="saveUser">保存</i-button>
          </i-form>
        </div>
      </Modal>

      <!-- 升级弹窗 -->
      <Modal :value="modalLevel" @on-ok="levelUser">
        <p class="c-modal__label">升级了</p>
        <p class="c-modal__title" style="font-size: 20px;">恭喜您升到&nbsp;{{chick.level}}&nbsp;级了！</p>
      </Modal>

      <!-- 直接购买商品 -->
      <Modal :value="modalShop" @on-ok="shopSettle" @on-cancel="hideShop">
        <div class="shopping-box">
          <p>{{currFood.name}}</p>
          <p>单价：${{currFood.price}}/个</p>
          <div class="num-form">
            <div class="shop-btn" @click="shopReduce">
              <Icon type="md-remove-circle" />
            </div>
            <div class="shop-input">
              <i-input type="text" v-model="shoppingNum" placeholder="数量"></i-input>
            </div>
            <div class="shop-btn" @click="shopAdd">
              <Icon type="md-add-circle" />
            </div>
          </div>
          <p>总价：${{currFood.price * shoppingNum}}</p>
        </div>
      </Modal>

      <!-- 查看食物详情 -->
      <Modal :value="modalFood" class-name="hide-footer" @on-cancel="hideFood">
        <div class="modal-box">
          <div class="food-img">
            <img :src="currFood.url" />
          </div>
          <div class="food-t">
            <p>物品名称：{{currFood.name}}</p>
            <p>拥有数量：{{currFood.num}}</p>
            <p>过程时长：{{currFood.eatTime | SecondToDate}}</p>
            <p>获得经验：{{currFood.exp}}</p>
            <div class="food-t-btn">
              <i-button type="primary" @click="feedClick">使用</i-button>
            </div>
          </div>
        </div>
      </Modal>

      <!-- 解锁商品确认 -->
      <Modal :value="modalUnlock" @on-ok="commitUnlock" @on-cancel="hideUnlock">
        <div class="shopping-box">
          <p>确定解锁吗？</p>
          <p>解锁需要：${{currFood.unlockPrice}}</p>
        </div>
      </Modal>

      <!-- 查看出售物品详情 -->
      <Modal :value="modalGood" class-name="hide-footer" @on-cancel="hideGood">
        <div class="modal-box" v-if="!goodDetails">
          <div class="food-img">
            <img :src="currGood.img" />
          </div>
          <div class="food-t">
            <p>物品名称：{{currGood.name}}</p>
            <p>拥有数量：{{currGood.num}}</p>
            <p>出售价值：{{currGood.price}}</p>
            <div class="food-t-btn">
              <i-button type="primary" @click="setSell">出售</i-button>
            </div>
          </div>
        </div>
        <div class="shopping-box" v-if="goodDetails">
          <p>{{currGood.name}}</p>
          <div class="num-form">
            <div class="shop-btn" @click="sellReduce">
              <span>-</span>
            </div>
            <div class="shop-input">
              <i-input type="text" v-model="sellNum" placeholder="数量"></i-input>
            </div>
            <div class="shop-btn" @click="sellAdd">
              <Icon type="md-add-circle" />
            </div>
          </div>
          <p>出售总价：${{currGood.price * sellNum}}</p>
          <i-button type="primary" @click="commitSell">出售</i-button>
        </div>
      </Modal>

      <!-- 勋章列表 -->
      <Modal v-model="modalAchievement" class-name="hide-footer" @on-cancel="hideAchievement">
        <p style="margin-bottom: 10px;">
          成就数量：
          <span>{{targetList}}</span>
          /{{achievement.length}}
        </p>
        <ul class="a-list">
          <li
            v-for="(item, index) in achievement"
            :class="{ active: item.complete, onin: item.completeID == 1 }"
            :key="index"
          >
            <div class="a-info">
              <p>
                {{item.title}}
                <span class="fr">{{item.completeCurrCount}}/{{item.completeNeedCount}}</span>
              </p>
              <div>
                {{item.desc}}
                <div class="reward" v-if="item.completeID == 0">
                  <div class="reward-icon">
                    <Icon type="logo-usd" />
                  </div>
                  <span class="reward-profit">{{item.profit}}</span>
                </div>
              </div>
            </div>
            <div
              class="a-right"
              v-if="item.complete && item.completeID == 0"
              @click="receiveAwards(item.title)"
            >
              <i-button type="primary">领取奖励</i-button>
            </div>
            <div class="a-right" v-if="item.completeID == 1">
              <i-button type="primary">已完成</i-button>
            </div>
          </li>
        </ul>
      </Modal>

      <!-- 帮助弹框 -->
      <Modal v-model="modalHelp" class-name="hide-footer" @on-cancel="hideHelp">
        <p style="margin-bottom: 10px;">
          【游戏介绍】
          <br />蒜瓣闯关是针对中小学的刷题学习平台；游戏设计多种模式，首先可以通过闯关直接获取金币奖励，
          闯关完成后还会随机奖励各种道具，通过道具可以加快小蒜苗的生长，来提升等级。小蒜苗可以收获大蒜，
          大蒜同样可以兑换成金币，金币还可以购买各种道具，商城开放收可以在商城购买学习用品。
          <br />
          <br />【游戏操作】
          <br />首先点击人物头像，来设置年级学习，然后点击闯关，开始选择科目闯关，首先会从简单的开始，在未通关前不可以进行下一关，每关10道题目，全部答对才能通关，通关后会奖励宝箱，点击宝箱会随机掉落道具；关卡越难，奖励越丰厚；
        </p>
      </Modal>


    </div>

    <!-- 做题组件 -->
    <c-subject @outsubject="hideSubject" :showsubject="isSubject" ref="dosubject"></c-subject>
    
  </div>
</template>
<script>
import CSunlight from "@/components/CSunlight";
import CBee from "@/components/CBee";
import CClouds from "@/components/CClouds";
import CDasuan from "@/components/CDasuan";
import CDog from "@/components/CDog";
import CEgg from "@/components/CEgg";
import CFence from "@/components/CFence";
import CGrass from "@/components/CGrass";
import CHouse from "@/components/Chouse";
import CLeaf from "@/components/CLeaf";
import CPeak from "@/components/CPeak";
import CSubject from "@/components/CSubject";
import HatDefault from "@/components/HatDefault";
import ClothesDefault from "@/components/ClothesDefault";

import HatForg from "@/components/HatForg";
import ClothesForg from "@/components/ClothesForg";
import screenfull from "screenfull";

import UserLogin from "@/views/user";
import UserGrade from "@/components/UGrade";
export default {
  name: "index",
  data() {
    return {
      modalLogin:true,//用户登录开关
      effects: 2,
      //isLoad: true,
      editUserName: false,
      modalUser: false,
      skinBox: false, //打开弹出遮罩
      modalAchievement: false,
      modalHelp: false,
      modalShop: false,
      modalUnlock: false,
      modalFood: false,
      modalGood: false,
      goodDetails: false,
      isSubject: false, //是否做题组件显示
      sellNum: 1, // 物品出售默认值
      skin: "skin",
      shop: "shop",
      bag: "bag",
      study: "study",
      isSkin: false, //换装
      isShop: false, //商店
      isBag: false, //背包
      isStudy: false,
      buttonSize: "small",
      newUserName: "",
      formUser: {
        // 用户信息填写表单
        name: ""
      },
      clothes: [
        // 衣服列表
        {
          id: "default",
          name: "默认上衣"
        },
        {
          id: "forg",
          name: "青蛙上衣"
        }
      ],
      hats: [
        // 帽子列表
        {
          id: "default",
          name: "默认帽子"
        },
        {
          id: "forg",
          name: "青蛙帽子"
        }
      ],
      suits: [
        // 套装列表
        {
          id: "default",
          name: "默认套装"
        },
        {
          id: "forg",
          name: "青蛙套装"
        }
      ],
      // 全屏/不全屏
      isFullscreen: false,
      shoppingNum: 0, // 购物数量
      percent: 0, // 加载进度
      showPress: true
    };
  },
  components: {
    CSunlight,
    CBee,
    CClouds,
    CDasuan,
    CDog,
    CEgg,
    CFence,
    CGrass,
    CHouse,
    CLeaf,
    CPeak,
    CSubject,
    HatDefault,
    ClothesDefault,
    HatForg,
    ClothesForg,
    UserLogin,
    UserGrade
  },
  computed: {
    // 计算已完成成就的数量
    targetList() {
      //let target = this.$store.state.achievement.filter(obj => obj.complete);
      //console.log("完成成就target:" + target);
      //return target.length;
    },
    user() {
      return this.$store.state.user;
    },
    chick() {
      return this.$store.state.chick;
    },
    foods() {
      return this.$store.state.foods;
    },
    goods() {
      return this.$store.state.goods;
    },
    subjectList() {
      return this.$store.state.subjectList;
    },
    eat() {
      return this.$store.state.eat;
    },
    setTime() {
      return this.$store.state.setTime;
    },
    startDate() {
      return this.$store.state.startDate;
    },
    endDate() {
      return this.$store.state.endDate;
    },
    content() {
      return this.$store.state.content;
    },
    currFood() {
      return this.$store.state.currFood;
    },
    currGood() {
      return this.$store.state.currGood;
    },
    achievement() {
      return this.$store.state.achievement;
    },
    modalLevel() {
      return this.$store.state.modalLevel;
    },
    value() {
      return this.$store.state.value;
    },
    modalGrade(){
      return !this.modalLogin
    }

  },
  mounted() {
    this.init(); // 初始化
  },
  methods: {
    // 初始化
    init() {
      this.$nextTick(function() {
        var self = this;
        //var time = new date();
        // 页面加载读取缓存
        self.$store.dispatch("loadgame");
        // 判断是否是新的一天
        //self.isNewDay(time);
        // 判断是否在进食
        self.chickIsEat();
      });
    },
    isNewDay: function(time) {},
    // 判断是否正在进食
    chickIsEat: function() {
      // 页面加载获取当前时间
      let loadDate = new Date().getTime();
      // 判断上一次是否进食结束
      let isEat = this.$store.state.endDate - loadDate;
      if (isEat > 0) {
        this.$store.state.chick.eat = true;
        this.countdown(loadDate);
      } else {
        this.$store.commit("CHICK_IS_EAT");
        return;
      }
    },
    hideFood: function() {
      this.modalFood = !this.modalFood;
    },
    showFood: function(index) {
      this.modalFood = !this.modalFood;
      this.$store.state.currFood = this.$store.state.foods[index];
    },
    // 点击食物进行喂食
    feedClick: function() {
      // 判断是否在进食
      if (this.$store.state.chick.eat) {
        this.error("我还在吃着呢");
        return;
      } else if (this.$store.state.currFood.num > 0) {
        let startDate = new Date().getTime();
        let endDate = startDate + this.$store.state.currFood.eatTime;
        this.$store.commit("FEED_CLICK", endDate);
        this.countdown(startDate);
      } else {
        this.error("你没有" + this.state.currFood.name + "食物了");
      }
      this.hideFood();
      this.hidePopup();
      this.success("喂食成功");
    },
    // 喂食倒计时方法
    countdown(startdate) {
      let self = this;
      let es = self.$store.state.endDate - startdate;
      let delay = (100 / self.$store.state.currFood.eatTime) * 1000; // 计算每秒走的进度
      console.log("计算每秒走的进度:" + delay + "%");
      if (es > 0) {
        let timer = setInterval(function() {
          let nowTime = new Date().getTime();
          let t = self.$store.state.endDate - nowTime;
          let value = ((self.$store.state.currFood.eatTime - t) / 1000) * delay; // 计算进度条
          console.log("计算进度条:" + value + "%");
          if (value <= 100) {
            self.$store.state.value = value;
          } else {
            self.$store.state.value = 100;
          }
          console.log("t:" + t + "进度条：" + value + "%");
          if (t > 0) {
            self.$store.state.chick.eat = true;
            let day = Math.floor(t / 86400000);
            let hour = Math.floor((t / 3600000) % 24);
            let min = Math.floor((t / 60000) % 60);
            let sec = Math.floor((t / 1000) % 60);
            hour = hour < 10 ? "0" + hour : hour;
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            let format = "";
            if (day > 0) {
              format = `${day}天${hour}小时${min}分${sec}秒`;
            }
            if (day <= 0 && hour > 0) {
              format = `${hour}小时${min}分${sec}秒`;
            }
            if (day <= 0 && hour <= 0) {
              format = `${min}分${sec}秒`;
            }
            self.$store.state.content = format; // 显示倒计时
            console.log('存档')
            self.$store.dispatch("savegame");
          } else {
            clearInterval(timer); // 清除定时器
            // 喂食结束
            self.$store.dispatch("endeat");
            // 弹出鸡蛋加成
            self.$refs.paper.popAdd(
              self.$store.state.chick.egg.addEggExps + "%"
            );
          }
        }, 1000);
      }
    },
    showShop: function(name) {
      this.$store.commit("shopFood", name);
      this.modalShop = true;
    },
    hideShop: function() {
      this.modalShop = false;
    },
    shopReduce: function() {
      this.shoppingNum--;
    },
    shopAdd: function() {
      this.shoppingNum++;
    },
    showGood: function(name) {
      this.$store.dispatch("shopGood", name);
      this.modalGood = true;
    },
    hideGood: function() {
      this.modalGood = false;
    },
    setSell: function() {
      this.goodDetails = !this.goodDetails;
    },
    sellAdd: function() {
      if (this.sellNum == this.$store.state.currGood.num) {
        this.error("不能再加了");
        return;
      } else {
        this.sellNum++;
      }
    },
    sellReduce: function() {
      if (this.sellNum == 1) {
        this.error("不能再减了");
        return;
      } else {
        this.sellNum--;
      }
    },
    commitSell: function() {
      this.goodDetails = !this.goodDetails;
      //var price = this.$store.state.currGood.price*this.selNum;
      this.success(
        "出售了" +
          this.$store.state.currGood.num +
          "个" +
          this.$store.state.currGood.name
      );
      this.$store.dispatch("sellgood", this.sellNum);
      this.modalGood = false;
    },
    showUnlock: function(name) {
      this.$store.commit("shopFood", name);
      this.modalUnlock = true;
    },
    hideUnlock: function() {
      this.modalUnlock = false;
    },
    commitUnlock: function() {
      var food = this.$store.state.currFood.name;
      var unlockPrice = this.$store.state.currFood.unlockPrice;
      console.log("解锁需要金币：" + unlockPrice);
      if (this.$store.state.user.money < unlockPrice) {
        this.error("不够金币解锁");
        this.modalUnlock = false;
        return false;
      } else {
        this.$store.dispatch("unlockfood", unlockPrice);
        this.success("成功解锁了" + food);
      }
      this.hideUnlock();
    },
    showAchievement: function() {
      this.modalAchievement = true;
    },
    hideAchievement: function() {
      this.modalAchievement = false;
    },
    showHelp: function() {
      this.modalHelp = true;
    },
    hideHelp: function() {
      this.modalHelp = false;
    },
    // 领取成就奖励
    receiveAwards: function(val) {
      this.$store.dispatch("receiveawards", val);
    },
    // 点击闯关  参数是 (关卡，科目Index)
    onSubject: function(val, pid) {
      this.$store.state.currSubject = val;   // 设置当前管卡
      if (val.learning == 0) {
        console.log(val.name + "-未开始闯关");
        this.$store.dispatch("startsubject", pid);
      } else if (val.learning == 2) {
        console.log(val.name + "-已完成闯关");
      } else {
        console.log(val.name + "-正在闯关");
        this.isSubject = true;
        this.$refs.dosubject.beginQuestionClick();   //选择关卡以后以后开始出题
      }
      //console.log(this.$store.state.currSubject);
    },
    // 关闭题目界面
    hideSubject: function(val) {
      this.isSubject = val;
    },


    // 打开功能菜单弹窗
    showPopup: function(val) {
      this.skinBox = true;
      if (val == "skin") {
        this.isSkin = true;
      } else if (val == "shop") {
        this.isShop = true;
      } else if (val == "study") {
        this.isStudy = true;
      } else {
        this.isBag = true;
      }
    },


    // 关闭功能菜单弹窗
    hidePopup: function() {
      this.skinBox = false;
      var that = this;
      setTimeout(function() {
        that.isSkin = false;
        that.isShop = false;
        that.isBag = false;
        that.isStudy = false;
      }, 400);
    },
    // 打开用户信息面板
    showUser: function() {
      this.modalUser = true;
    },
    editUser: function() {
      this.editUserName = !this.editUserName;
    },
    saveUser: function() {
      if (this.newUserName == "") {
        console.log("请输入用户名称");
        this.error("请输入用户名称");
        return false;
      } else {
        this.success("修改成功");
        this.editUserName = !this.editUserName;
        this.$store.dispatch("setusername", this.newUserName);
        //this.$store.dispatch('savegame');
      }
    },
    // 设置服装
    replaceDress: function(type, pid) {
      this.$store.dispatch("replacedress", { type: type, pid: pid });
    },
    keepUser: function() {
      this.$store.dispatch("keepuser");
    },
    // 升级弹窗确认按钮，确认后再检测是否可以继续升级
    levelUser: function() {
      var self = this;
      self.$store.state.modalLevel = false;
      setTimeout(function() {
        self.$store.dispatch("settlelevel", self.$store.state.chick.exp);
      }, 500);
    },
    shopSettle: function() {
      var num = this.shoppingNum;
      var name = this.$store.state.currFood.name;
      if (num == 0) {
        this.error("请输入购买数量");
        this.modalShop = false;
        return false;
      } else if (
        this.$store.state.user.money <
        this.$store.state.currFood.price * num
      ) {
        this.error("不够金币购买");
        this.modalShop = false;
        return false;
      } else {
        this.success("成功购买了" + num + "个" + name);
        this.hidePopup();
      }
      this.$store.dispatch("shopsettle", num);
      this.hideShop();
      this.shoppingNum = 0;
    },
    // 公共成功提示
    success: function(val) {
      this.$Message.success(val);
    },
    // 公共失败提示
    error: function(val) {
      this.$Message.error(val);
    },
    handleValue(value){
      this.modalLogin = value;
      console.log(this.modalLogin,"弹出框消失")
    }
  },
  // 过滤器
  filters: {
    // 格式化显示时间 毫秒转：天-小时-分钟-秒
    SecondToDate(value) {
      var time = value;
      if (null != time && "" != time) {
        if (time > 60 * 1000 && time < 60 * 60 * 1000) {
          time =
            parseInt(time / 1000 / 60.0) +
            "分钟" +
            parseInt(
              (parseFloat(time / 1000 / 60.0) - parseInt(time / 1000 / 60.0)) *
                60
            ) +
            "秒";
        } else if (time >= 60 * 60 * 1000 && time < 60 * 60 * 24 * 1000) {
          time =
            parseInt(time / 1000 / 3600.0) +
            "小时" +
            parseInt(
              (parseFloat(time / 1000 / 3600.0) -
                parseInt(time / 1000 / 3600.0)) *
                60
            ) +
            "分钟" +
            parseInt(
              (parseFloat(
                (parseFloat(time / 1000 / 3600.0) -
                  parseInt(time / 1000 / 3600.0)) *
                  60
              ) -
                parseInt(
                  (parseFloat(time / 1000 / 3600.0) -
                    parseInt(time / 1000 / 3600.0)) *
                    60
                )) *
                60
            ) +
            "秒";
        } else if (time >= 60 * 60 * 24 * 1000) {
          time =
            parseInt(time / 1000 / 3600.0 / 24) +
            "天" +
            parseInt(
              (parseFloat(time / 1000 / 3600.0 / 24) -
                parseInt(time / 1000 / 3600.0 / 24)) *
                24
            ) +
            "小时" +
            parseInt(
              (parseFloat(time / 1000 / 3600.0) -
                parseInt(time / 1000 / 3600.0)) *
                60
            ) +
            "分钟" +
            parseInt(
              (parseFloat(
                (parseFloat(time / 1000 / 3600.0) -
                  parseInt(time / 1000 / 3600.0)) *
                  60
              ) -
                parseInt(
                  (parseFloat(time / 1000 / 3600.0) -
                    parseInt(time / 1000 / 3600.0)) *
                    60
                )) *
                60
            ) +
            "秒";
        } else {
          time = Math.round((time % (1000 * 60)) / 1000) + "秒";
        }
      }
      return time;
    }
  }
};
</script>