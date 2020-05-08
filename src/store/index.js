import Vue from 'vue'
import Vuex from 'vuex'
import foodList from './datajs/stateFoods'
import achievements from './datajs/stateAchievement'
import subjects from './datajs/subject'
import {
    login, //登录
    getUserInfo, //用户信息
    regUser, //注册
    logout //登出
} from "@/api/user";

import {
    getToken,
    setToken,
    removeToken
} from '@/util/token';
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: {
            uid: 0,       //用户ID
            gradeId:0,    //用户年级ID
            termId: 0,    // 用户年级学期ID
            firstGame: 0, // 
            name: '闯关小英雄',
            money: 3000,    
            achievementNum: 0, // 获得成就总数
        },
        // 物品，收获物品
        goods: [],

        // 小鸡信息
        chick: {
            exp: 0,         // 经验值
            upgradeExp: 100,// 升级所需经验
            level: 1,       // 等级
            eat: false,     // 是否在进食
            setTime: 300,   // 喂食时长 300s
            currentSuit: 'default', // 当前套装
            currentHat: 'default',    // 当前帽子
            currentClothes: 'default',  // 当前衣服

            componentHat: 'hat-default', // 默认帽子组件
            componentClothes: 'clothes-default', // 默认衣服组件
            // 鸡蛋
            egg: {
                num: 0,       // 鸡蛋待拾取数量
                allNum: 0,    // 库存鸡蛋总量
                progress: 0, // 鸡蛋进度条
                price: 2500,  // 鸡蛋价格
                eggBase: 50,  // 鸡蛋生成基数值：鸡蛋个数*基数 = 生成鸡蛋增加的数值
                addEggExps: 0 // 每次增加的鸡蛋经验
            }
        },

        // 食物信息
        foods: foodList.foodList,
        // 勋章列表
        achievement: achievements.achievements,
        // 学习题目
        subjectList: subjects.subjects,
        startDate: '',    // 开始时间
        endDate: '',      // 结束时间
        content: '',      // 倒计时
        currFood: {},     // 当前选中的食物
        currGood: {},     // 当前收获的物品
        currSubject: {},  // 当前管卡
        currAchievement: {},     // 当前领取的成就
        modalLevel: false,
        // 进度条
        value: 0,
        token: getToken()
    },
    mutations: {

        //用户年级学期设置
        SET_USER_GRADE_TERM(state,val){
            state.user.gradeId = val.gradeId;
            state.user.termId = val.termId;
        },

        // 首次游戏改变状态
        startGame(state, pid) {
            state.user.firstGame = pid;
            this.commit('save');
            //this.commit('load');
        },
        // 判断是否正在进食
        CHICK_IS_EAT(state) {
            state.enddate = '';
            state.chick.eat = false;
            this.commit('SAVE_GAME');
            state.content = '同学，好好学习哦！';
        },
        FEED_CLICK(state, endDate) {
            // 得到选中的食物
            // state.foods.forEach(obj => {
            //   if (obj.name === r) {
            //     state.currFood = obj
            //   }
            // // })
            // let startDate = new Date().getTime();
            // let endDate = startDate + state.currFood.eatTime;
            //state.startDate = startDate;
            state.endDate = endDate;
            state.currFood.num--;  // 扣除食物数量
            state.chick.eat = true;
            this.commit('checkAchievemnt', 1);
            this.commit('SAVE_GAME');

        },
        shopFood(state, name) {
            // 得到需要购买的食物
            state.foods.forEach(obj => {
                if (obj.name === name) {
                    state.currFood = obj
                }
            });

        },
        SHOW_GOOD(state, name) {
            // 得到查看的物品
            state.goods.forEach(obj => {
                if (obj.name === name) {
                    state.currGood = obj
                }
            });
        },
        SELL_GOOD(state, num) {
            state.user.money += state.currGood.price * num;
            state.currGood.num = state.currGood.num - num;
            console.log(state.user.money);
            console.log(state.currGood.num);
            if (state.currGood.num == 0) {
                // 出售完后删除
                state.goods.forEach((obj, index) => {
                    if (obj.name === state.currGood.name) {
                        state.goods.splice(state.goods.indexOf(index), 1);
                    }
                });
            }
        },
        UNLOCK_FOOD(state, price) {
            state.currFood.unlock = 1;
            state.user.money = state.user.money - price;
        },
        SHOP_SETTLE(state, num) {
            state.currFood.num = num;
            state.user.money = state.user.money - state.currFood.price * num;
            console.log("购买了" + num + "个" + state.currFood.name);
        },
        // 进食结束
        END_EAT(state) {
            state.enddate = '';    // 倒计时结束清零结束时间
            state.chick.eat = false;     // 进食状态设为false
            // 结束结算
            this.commit('settleExp');
            this.commit('SAVE_GAME');          // 存档
            state.content = '浇水结束';
            setTimeout(function () {
                state.content = '同学，好好学习多挣金币哦！';
            }, 2000)
        },
        endEat(state) {
            state.enddate = '';    // 倒计时结束清零结束时间
            state.chick.eat = false;     // 进食状态设为false
            // 结束结算
            this.commit('settleExp');
            this.commit('SAVE_GAME');          // 存档
            state.content = '施肥结束';
            setTimeout(function () {
                state.content = '同学，好好学习多挣金币哦！';
            }, 2000)
        },
        // 结束结算
        settleExp(state) {
            state.chick.egg.addEggExps = parseInt(state.currFood.exp / state.chick.egg.eggBase); // 鸡蛋加成 = 食物经验/基数，取整数
            let eggExps = state.chick.egg.progress += state.chick.egg.addEggExps;
            console.log("鸡蛋进度条增加后：" + eggExps);

            let exps = state.chick.exp + state.currFood.exp;
            console.log("小鸡经验增加后为：" + exps);


            this.commit('SETTLE_LEVEL', exps);
            this.commit('settleEgg', eggExps);
        },
        // 生成鸡蛋个数计算
        settleEgg(state, eggExps) {
            if (eggExps > 100) {
                console.log("eggExps:" + eggExps);
                let eggNum = parseInt(eggExps / 100);
                state.chick.egg.num += eggNum;
                console.log("生成的鸡蛋数：" + state.chick.egg.num);
                state.chick.egg.progress = eggExps - eggNum * 100;
                console.log("剩余的鸡蛋经验值：" + state.chick.egg.progress);
            }
        },
        // 升级计算
        SETTLE_LEVEL(state, exps) {
            let self = this;
            // 判断是否需要升级
            if (exps >= state.chick.upgradeExp) {
                state.chick.level += 1;
                state.chick.exp = exps - state.chick.upgradeExp;
                state.chick.upgradeExp = parseInt(state.chick.upgradeExp * 2);
                state.modalLevel = true;
                this.commit('SAVE_GAME');
            }
        },
        // 收获物品
        HARVEST_EGG(state, good) {
            console.log(good);
            // 得到收取的物品
            if (state.goods.length == 0) {
                console.log(state.goods);
                state.goods.push(good);
                state.chick.egg.num = 0;
            } else {
                state.goods.forEach(obj => {
                    if (obj.name === good.name) {
                        state.currGood = obj;
                        state.currGood.num += good.num;
                        console.log("收获物品" + state.currGood.name + "一共" + good.num + "个");
                        state.chick.egg.num = 0;
                    }
                })
            }
        },
        // 设置新用户名称
        SET_USER_NAME(state, val) {
            state.user.name = val;
            state.user.money -= 1000;
        },

        // 设置服装
        REPLACE_DRESS(state, price) {
            if (price.type == 0) {
                console.log('zzzz',state.chick)
                state.chick.currentSuit = price.pid;
                state.chick.currentClothes = price.pid;
                state.chick.currentHat = price.pid;

                state.chick.componentHat = 'hat-' + price.pid;
                state.chick.componentClothes = 'clothes-' + price.pid;

            } else if (price.type == 1) {
                state.chick.currentHat = price.pid;
                state.chick.componentHat = 'hat-' + price.pid;
            } else {
                state.chick.currentClothes = price.pid;
                state.chick.componentClothes = 'clothes-' + price.pid;
            }
        },
        // 获得成就方法
        checkAchievemnt(state, id) {
            // 寻找目标一致且未完成的成就
            let targetList = state.achievement.filter(obj => obj.completeTypeId === id && !obj.complete);
            console.log(targetList,'dddd');
            // 寻找目标植物
            //let targetPlant = state.plants.find(obj => obj.id === id);
            // 执行目标的奖励方式
            targetList.forEach(obj => {
                if (obj.completeCurrCount < obj.completeNeedCount) {
                    obj.completeCurrCount += 1;
                    if (obj.completeCurrCount >= obj.completeNeedCount) {
                        obj.complete = true;
                        if (typeof obj.oncomplete === 'function') {
                            obj.oncomplete(state, obj);
                            state.user.achievementNum++;
                        }
                    }
                }
            })
        },
        RECIVE_AWARDS(state, val) {
            state.achievement.forEach(obj => {
                if (obj.title === val) {
                    state.currAchievement = obj;
                    state.user.money += parseInt(obj.profit);
                    Vue.prototype.$popUp('获得金币', '+' + parseInt(obj.profit));
                    //obj.complete = false;
                    obj.completeID = 1;
                }
            })
        },
        // 开启闯关
        START_SUBJECT(state, val) {
            // val 是下学科的 index
            if(val > 0){
                Vue.prototype.$popUp('暂未开通该学科的闯关！', '敬请期待');
                return false;
            }
            // 当前关卡的名字
            var name = state.currSubject.name;
            //当前 关卡的 Index
            var pIndex = ''
            state.subjectList[val].list.forEach((obj, index) => {
                if (obj.name == name) {
                    pIndex = index;
                    state.currSubject = obj;                    
                }
            });
            //console.log(pIndex)
            if (pIndex > 0) {
                var prveItem = state.subjectList[val].list[pIndex - 1].learning;
                if (prveItem == 2) {
                    state.currSubject.learning = 1;
                    Vue.prototype.$popUp('激活关卡', state.currSubject.name);
                } else {
                    Vue.prototype.$popUp('警告！', '请按顺序通关');
                    return false;
                }
            } else {
                //console.log('打印 VUE', Vue.prototype.$popUp)
                state.currSubject.learning = 1;
                Vue.prototype.$popUp('激活关卡', state.currSubject.name);
            }
        },
        // 闯关成功， 激活新关卡
        ACTIVE_NEWLEVE(state, val) {
            // 当前关卡的名字
            var name = state.currSubject.name;
            // 设置当前关卡为已通过
            if(state.currSubject.learning ===1){
                state.currSubject.learning = 2;
            //当前 关卡的 Index
                var pIndex = ''
                state.subjectList[val].list.forEach((obj, index) => {
                    if (obj.name == name) {
                        pIndex = index;                  
                    }
                });
                state.currSubject = state.subjectList[val].list[pIndex + 1];
                state.currSubject.learning = 1;
                Vue.prototype.$popUp('激活关卡', state.currSubject.name);  
            }          
        },

        // 存档
        SAVE_GAME(state) {
            let achievement = state.achievement.map(obj => {
                return {
                  id: obj.id,
                  count: obj.completeCurrCount,
                  complete: obj.complete,
                  completeID: obj.completeID
                }
              });
            let data = {
                achievement,
                endDate: state.endDate,
                currFood: state.currFood,
                currGood: state.currGood,
                currSubject: state.currSubject,
                chick: state.chick,
                user: state.user,
                foods: state.foods,
                goods: state.goods,
                subjectList: state.subjectList
            };
            localStorage.setItem('farmDate', JSON.stringify(data))            
        },

        // 读档
        LOAD_GAME(state) {
            let data = JSON.parse(localStorage.getItem('farmDate'))
            console.log(data)
            if (!data) return
            state.achievement.forEach(oldAchievement => {
                data.achievement.forEach(newAchievement => {
                    if (oldAchievement.id === newAchievement.id) {
                        oldAchievement.completeCurrCount = newAchievement.count;
                        oldAchievement.complete = newAchievement.complete;
                        oldAchievement.completeID = newAchievement.completeID;
                    }
                });
            });
            console.log(data)
            state.endDate = data.endDate,
                state.currFood = data.currFood,
                state.currGood = data.currGood,
                state.currSubject = data.currSubject,
                state.chick = data.chick,
                state.user = data.user,
                state.foods = data.foods,
                state.goods = data.goods,
                state.subjectList = data.subjectList
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        }
    },
    actions: {

        //用户第一次登录使用账号 登录成功后报错token  
        Login(context,userInfo){
            return new Promise((resolve,reject)=>{
                login(userInfo).then(response=>{
                    if(response.data.result == 'success'){
                        setToken(response.data.token)
                        context.commit('SET_TOKEN',response.data.token)
                    }
                    resolve(response)
                }).catch(error=>{
                    console.log(error)
                    reject(error)
                })
            })
        },
        //设置用户年级和学期
        setusergrade(context,value){
            context.commit('SET_USER_GRADE_TERM',value);
            context.commit('SAVE_GAME');
        },
        // 设置新的用户名
        setusername(context, value) {
            context.commit('SET_USER_NAME', value);
            context.commit('SAVE_GAME');
        },
        // 保存修改用户信息
        keepuser(context) {
            context.commit('SAVE_GAME');
        },
        endeat(context) {
            context.commit('END_EAT');
        },
        // 升级经验计算
        settlelevel(context, value) {
            context.commit('SETTLE_LEVEL', value);
        },
        // 收获物品
        harvestegg(context, value) {
            context.commit('HARVEST_EGG', value);
            context.commit('SAVE_GAME');
        },
        // 查看物品详情
        shopGood(context, value) {
            context.commit('SHOW_GOOD', value);
        },
        // 出售物品
        sellgood(context, value) {
            context.commit('SELL_GOOD', value);
            context.commit('SAVE_GAME');
        },
        // 设置服装
        replacedress(context, value) {
            context.commit("REPLACE_DRESS", value);
            context.commit('SAVE_GAME');
        },
        // 购买商品
        shopsettle(context, value) {
            context.commit("SHOP_SETTLE", value);
            context.commit('SAVE_GAME');
        },
        // 解锁商品
        unlockfood(context, value) {
            context.commit("UNLOCK_FOOD", value);
            context.commit('SAVE_GAME');
        },
        // 激活学习课程 
        startsubject(context, value) {
            context.commit("START_SUBJECT", value);
            context.commit('SAVE_GAME');
        },
        // 激活新关卡
        activenewleve(content, value) {
            content.commit('ACTIVE_NEWLEVE',value);
            content.commit('SAVE_GAME')
        },
        // 领取成就奖励
        receiveawards(context, value) {
            context.commit("RECIVE_AWARDS", value);
            context.commit('SAVE_GAME');
        },
        // 读档
        loadgame(context) {
            context.commit('LOAD_GAME');
        },
        // 存档
        savegame(context) {
            context.commit('SAVE_GAME');
        }
    }
})

export default store