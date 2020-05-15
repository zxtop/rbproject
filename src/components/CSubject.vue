<template>
    <div class="subject-wrap">
        <!-- 背景图片随机加载 -->
        <c-bg></c-bg>
        <div class="subject-head" @click="hideSubject">
            <i class="ivu-icon ivu-icon-ios-arrow-back"></i>返回
        </div>

        <div class="questionform" v-if="!fail && !success">

            <div class="question_tile" ref="main2">
                <div class="title_bg">
                    <img :src="dt_img" alt="">
                    <span>{{question_index}}/10</span>
                </div>
            </div>

            <div class="question_pro_ifo">
                <div class="question_proess">
                    <div class="proess_out">
                        <Progress :percent="proess_in" hide-info stroke-color="#59db08" />
                    </div>
                </div>
            </div>

            <div class="text-main2" ref="main3">
                <div class="showQuestion">
                    <div class="question_content" style="font-size:14px;" v-html="questionForm.content"></div>

                    <div class="questio_option">
                        <p style="font-size:14px;" v-html="questionForm.option"></p>
                    </div>
                </div>

                <div  ref="eggexp" style="width:100vw;height:5vh;position: relative;"><!--提示用--></div>

                <!-- 判断题 -->
                <div class="select_judge" v-if="questionForm.type && questionForm.type.name =='判断题'">
                    <ul ref="btn_out1" id="btn_out1">
                        <li class="btn">
                            <c-btn1 @inClick="getClick" :zimuText="html_yes_iocn" :option="html_yes_iocn" :answer="questionForm.answer" @outBtnClick="outanwserCilck"></c-btn1>
                        </li>

                        <li class="btn">
                            <c-btn1 @inClick="getClick" :zimuText="html_no_iocn" :option="html_no_iocn" :answer="questionForm.answer" @outBtnClick="outanwserCilck"></c-btn1>
                        </li>
                        
                    </ul>
                </div>

                <!-- 不是判断题 -->
                <div
                    class="select_option"
                    v-if="questionForm.type && questionForm.type.name != '判断题'"
                >
                    <ul ref="btn_out2" id="btn_out2">
                        <li class="btn">
                            <c-btn1 @inClick="getClick" :zimuText="html_a_iocn" :option="html_a_iocn" :answer="questionForm.answer" @outBtnClick="outanwserCilck"></c-btn1>
                        </li>
                        <li class="btn">
                            <c-btn1 @inClick="getClick" :zimuText="html_b_iocn"  :option="html_b_iocn" :answer="questionForm.answer" @outBtnClick="outanwserCilck"></c-btn1>
                        </li>
                        <li class="btn">
                            <c-btn1 @inClick="getClick" :zimuText="html_c_iocn" :option="html_c_iocn" :answer="questionForm.answer" @outBtnClick="outanwserCilck"></c-btn1>
                        </li>
                        <li class="btn">
                            <c-btn1 @inClick="getClick" :zimuText="html_d_iocn" :option="html_d_iocn" :answer="questionForm.answer" @outBtnClick="outanwserCilck"></c-btn1>
                        </li>
                    </ul>
                </div>
            </div>
        </div>


        <div class="result_fail" v-if="fail">            
            <c-ghost @outResetQuestionList="beginQuestionClick"></c-ghost>
        </div>

        <div class="result_success" v-if="success">
            <c-box @outResetQuestionList="beginQuestionClick"></c-box>
        </div>
    </div>
</template>
<script>
import SchoolParts from "@/store/datajs/school_part.js"; //学段、学科、学期的配置文件
import { GetPageQuestion } from "@/api/questions";
import {
    getUserLevel,
    UpdateUserInfo,
    AddUserQuestionYes,
    AddUserQuestionNo
} from "@/api/user";
import CGhost from "@/components/CGhost";
import CBox from "@/components/CBox";
import CBtn1 from "@/components/CBtn1";
import CBg from "@/components/CBg";

export default {
    data() {
        return {
            school_parts: SchoolParts.schoolParts, //学段、学科、学期的配置文件  读取的js
            school_part: {}, // 年级
            term_index: 0, //当前年级  0 表示不限
            term_id: 0, //当前年级  0 表示不限
            difficulty: 0, // 当前难度
            params: {
                subject_id: 20,
                term_id: 0,
                type_ids: [],
                user_id: 0,
                version_id: 0,
                difficulty: 0,
                knowledge_points: [],
                page: 1,
                chapters: [],
                abilities: [],
                teacher_id: 0
            }, //查询条件
            question_types_xx: [85,88], // 单选和判断 (小学的题目类型)
            question_types_cz: [10, 11, 13], // 单选多选和判断  （初中的题目类型）
            questionslist: [], //返回的题库
            user_chapter: 0,
            question_index: 0, //当前展示的第几题
            questionForm: {}, //页面展示题目的实体
            html_yes_iocn: "对", // 对错的图片
            html_no_iocn: "错",
            html_a_iocn: "A",
            html_b_iocn: "B",
            html_c_iocn: "C",
            html_d_iocn: "D",
            uid: "37",
            u_name: "",
            u_level: 0,
            u_gold_count: 0,
            u_yes_num: 0, //当前用户作对的题目数量
            u_no_num: 0,

            fail: false,    //挑战失败
            success: false,   //挑战成功
            dt_img:'../static/images/dt.png',
            num:0 //计算按钮点击次数

        };
    },
    components:{
        CGhost,
        CBox,
        CBtn1,
        CBg
    },
    computed: {
      proess_in(){
          return this.question_index * 10
      }  
    },
    created() {
        //this.school_part = this.school_parts[0];
        this.params.type_ids = this.question_types_xx; //默认赋值小学
        this.uid = this.$store.state.user.uid;
        //this.u_name = this.$store.getters.user_name;
        console.log('当前激活的关卡：' + this.$store.state.currSubject);

        // 判断如果有激活的关卡则加载试题
        if (this.$store.state.currSubject.difficulty) {
            this.beginQuestionClick();

            // getUserLevel(this.uid).then(res => {
            //     console.log(res,'dddddd');
            //     this.u_level = res.data.student.level;
            //     this.u_gold_count = res.data.student.gold_count;
            //     this.term_id = res.data.student.term_id; //这里现在用不到， 没实现根据term_id 反推到 term_index
            //     this.beginQuestionClick();
            // });
        }
    },
    updated(){

    },
    methods: {
        hideSubject() {
            this.$emit("outsubject", false);
        },
        changeParts(part) {
            this.term_index = 0;
            this.school_part = part;
            if (part.name === "小学") {
                this.params.subject_id = 20;
                this.params.type_ids = this.question_types_xx;
            } else {
                this.params.subject_id = 2;
                this.params.type_ids = this.question_types_cz;
            }
        },
        //改变年级
        changeTerm(index) {
            this.term_index = index;
            this.term_id = this.school_part.term[this.term_index].id;
        },
        beginQuestionClick() {
            this.fail = false;
            this.success = false;

            this.u_yes_num = 0;

            this.params.term_id = this.term_id;
            this.params.user_id = this.uid;
            //console.log(this.params)
            // console.log(this.$store.state.currSubject.difficulty);
            this.params.difficulty = this.$store.state.currSubject.difficulty;
            console.log('当前题目组的params.....',this.params);

            GetPageQuestion(this.params)
                .then(res => {
                    //self.knowledge = response.data.data;
                    console.log(res);
                    this.questionslist = [];
                    console.log(
                        "试题加载完毕----------------------------------"
                    );
                    this.questionslist = res.data.data;
                    this.showQuestion();
                })
                .catch(error => {
                    console.log("获取题库列表失败", error);
                });
        },
        showQuestion() {
            this.questionForm = this.questionslist[0];
            this.question_index = 0;
        },

        outanwserCilck(re){
            console.log('回答的正确吗？',re);
            if(re){
                this.u_yes_num += 1;
                //this.updataUserData();
            }
            // setTimeout(this.nextQuestion, 1000);
            // this.nextQuestion();
        },

        // 跳转下一题
        getClick(val){
            this.num++;
            if(val && this.num == 1){
                setTimeout(this.nextQuestion, 1000);
            }
        },

        //更新用户的成绩
        updataUserData() {            
            // if (this.u_yes_num == 10) {
            //     this.u_level += 1;
            // }
            // this.u_gold_count += 10;
            var studentInfo = {
                studentId: this.uid,
                level: this.u_level,
                goldCount: this.u_gold_count
            };
            UpdateUserInfo(studentInfo).then(res => {
                console.log(res);
            });
        },
        //切换下一个题目
        nextQuestion() {
            //this.clearHtml();
            this.popAdd('下一题');
            this.question_index += 1;
            if (this.question_index == 10) {
                this.showResult();
            } else {
                this.questionForm = this.questionslist[this.question_index];
                this.num = 0
            }
            
        },
        // 弹出收成
    popAdd(meg) {
      let self = this;
      let popDom = document.createElement("div"); // 创建dom
      popDom.classList.add("pop-next"); // 给dom添加class
      popDom.innerHTML = meg;
      self.$refs.eggexp.appendChild(popDom); // 在ref="eggexp"元素内添加dom
      setTimeout(() => {
        popDom.remove();
      }, 500);
    },
        addUserQuestion(uid, _id, type) {
            // 1 表示正确的题目
            if (type == 1) {
                AddUserQuestionYes(uid, _id).then(res => {
                    console.log(res);
                });
            } else {
                //添加到错题
                var StudentPointNo = {
                    studentId: uid,
                    titleId: _id,
                    subjectId: this.questionForm.subject.id,
                    typeId: this.questionForm.type.id,
                    difficulty: this.questionForm.difficulty,
                    versionId: 0,
                    termId: this.questionForm.term.id
                };
                AddUserQuestionNo(StudentPointNo).then(res => {
                    console.log(res);
                });
            }
        },
        // 做完 10 道题的结果
        showResult() {
            this.questionslist = null;
            this.question_index = 0;
            this.num = 0;
            console.log('最终结果是：'+ this.u_yes_num)
            if (this.u_yes_num == 10) {
                console.log("全部答对");
                this.success = true;
                //激活下一关
                this.$store.dispatch("activenewleve", 0);
            } else {
                console.log("继续加油");
                this.fail = true;
            }
        },
    }
};
</script>

<style scoped>
a {
    text-decoration: none;
    color: #aaa;
}
img{
    width: 100%;
}
.hide {
    display: none;
}
.global {
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
}
.question_tile {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
}
.title_bg {
    position: static;
    margin: 0 auto;
    width: 100%;
    /* height: 1.2rem; */
    font-size: 1.2em;
}
.question-text .text-title {
    width: 70%;
    margin: 0 auto;
    overflow: hidden;
}

.showQuestion {
    background-color: #ffffff;
    margin: 2%;
    border-radius: 10px;
    padding: 1em;
    line-height: 2em;
}
.showQuestion img{
    width: 100%;
}
.questio_option{
    margin-top: 2rem;
}
.select_judge {
    width: 100%;
    margin: auto;
}
.select_judge ul {
    display: table;
    margin: 0rem auto;
}
.select_judge ul li {
    text-align: center;
    float: left;
    margin: 3rem;
}
.select_option {
    width: 100%;
    margin: auto;
}
.select_option ul {
    display: table;
    margin: 0rem auto;
}
.select_option ul li {
    text-align: center;
    float: left;
    margin: 1rem;
}

input:focus {
    outline: none;
}
.agin-icon {
    width: 216px;
    height: 65px;
    position: relative;
    background: url("../assets/images/agin-icon.png") no-repeat;
    background-size: 100% 100%;
    margin: 40px auto 0 auto;
    animation-delay: 1s;
    -webkit-animation-delay: 1s;
}

.btn {
    width: 50px;
    height: 50px;
}

.result_fail{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

/* 进度条样式 */
.question_pro_ifo{
    padding:0 0.5rem
}
.question_proess{
    border-radius: 0.5rem;
    padding:.4rem .4rem;
    width: 100%;
    height: 2.2rem;
    position: relative;
    background: #f6bc1c;
    overflow: hidden;
}
.proess_out{
    width: 100%;
    background: #a55a2b;
    height: 1.4rem;
    padding: .1rem .4rem;
    border-radius: 0.5rem;
}

.showQuestion .question_content >>> img{
    width: 100%!important;
}
.title_bg img{width: 100px;vertical-align: middle;}
.title_bg span{color: #fff;font-size: 24px;vertical-align: middle;}
</style>