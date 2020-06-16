<template>
    <i-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
       
        <form-item label="选择年级" prop="gradeId" ref="grade">
            <i-select v-model="formValidate.gradeId" placeholder="请选择年级" :label-in-value="true" @on-change="selectGrade($event)">
                <i-option v-for="item in data_grade" :value="item.value" :key="item.value">{{item.label}}</i-option>
            </i-select>
        </form-item>

        <form-item label="选择学期" prop="termId" ref="term">
            <i-select v-model="formValidate.termId" v-bind:disabled="isAble"  placeholder="请选择学期" ref="store">
                <i-option v-for="item in data_term" :value="item.value" :key="item.value">{{item.label}}</i-option>
            </i-select>
        </form-item>
    
        <form-item class="grade-btn">
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <!-- <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button> -->
        </form-item>
    </i-form>
    
</template>
<script>
import stateGradeSemester from '@/store/datajs/stateGradeSemester';
import {SetUserGradeTemId,getUserLevel} from '@/api/user';
    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if(value.length<1){
                    callback(new Error('请选择年级'));
                }else{
                    callback();
                }
            };
            const validateTem = (rule,value,callback)=>{
              
                if(value.length<1){
                    callback(new Error('请选择学期'));
                }else{
                    callback();
                }
            }
            return {
                formValidate: {
                    gradeId:'',
                    termId:''
                },
                ruleValidate: {
                    gradeId: [
                        {required: true,validator: validatePass, trigger: 'change' }
                    ],
                    termId:[
                        { required: true, validator: validateTem, trigger: 'change' }
                    ]
                },
                isAble:true,
                catchTerm:[]

            }
        },
        watch: {
          formValidate:{  
                handler:function(val,oldval){  
                      
                },  
                deep:true//对象内部的属性监听，也叫深度监听  
            }, 
            
            'formValidate.gradeId':function(val,oldVal){ //监听年级id筛选级联学期选择
                // console.log('val',val,'oldval',oldVal,this.data_grade);
                let curLabel = ''
                this.data_grade.map((item,index)=>{
                    if(val == item.value){
                        curLabel = item.label
                    }
                })
                // console.log('curLabel',curLabel,'catchTerm',this.catchTerm);
                let cur_data_term = [];
                this.catchTerm.map((item,index)=>{
                    if(item.label.indexOf(curLabel)!==-1){
                        cur_data_term.push(item)
                    }
                });
                // console.log('nnnn',cur_data_term);
                this.data_term = cur_data_term;
                this.isAble = false;
            }
        },
        created () {
            // console.log(stateGradeSemester,'ddddd');
            let data_grade = [];
            let data_term = [];
            let data_catch = [];
            stateGradeSemester.stateGradeSemester.map((item,index)=>{
                item.grade.map((g_item,g_index)=>{
                    data_grade.push({
                        value:g_item.id,
                        label:g_item.name
                    })
                })

                item.term.map((t_item,t_index)=>{
                    data_term.push({
                        value:t_item.id,
                        label:t_item.name
                    });
                    data_catch.push({
                        value:t_item.id,
                        label:t_item.name
                    })
                })
            });

            this.data_grade = data_grade;
            this.data_term = data_term;
            this.catchTerm = data_catch;
        },
        methods: {
            handleSubmit (name) {
                // console.log('点击提交。。。。',);
                if(this.formValidate.termId == undefined){
                    this.$Message.error('请选择学期')
                }
                this.$refs[name].validate((valid) => {
                    // console.log(valid)
                    if (valid) {
                        console.log('this.fromValidate.....',this.formValidate)
                        this.$Message.success('提交成功!');

                        //提交成功后提交用户信息
                        let obj = {
                            currId:this.$store.state.currId,
                            currNickName:this.$store.state.currNickName,
                            gradeId:this.formValidate.gradeId,
                            termId:this.formValidate.termId
                        }

                        let objId = {
                            userId:this.$store.state.currId,
                            termId:this.formValidate.termId,
                            gradeId:this.formValidate.gradeId
                        }
                        

                        //更改用户信息
                        SetUserGradeTemId(objId)
                        .then(response=>{
                            console.log(response.data)
                            if(response.data.result == 'true'){
                                getUserLevel(this.$store.state.currId).then(res => {
                                    console.log(res,'dddddd');
                                    let studentInfo = {
                                        studentId: this.$store.state.currId,
                                        level: res.data.student.level,
                                        goldCount: res.data.student.gold_count
                                    };
                                    this.$store.commit("SET_GOLD",studentInfo);
                                    this.$store.dispatch('setusergrade',obj);
                                });
                                
                            }else{
                                //游客登录
                                let studentInfo = {
                                    studentId: this.$store.state.currId,
                                    level: 1,
                                    goldCount: 3000
                                };
                                this.$store.commit("SET_GOLD",studentInfo);
                                this.$store.dispatch('setusergrade',obj);
                            }
                        });

                        //提交后返回主页面
                        this.$emit('input',false)

                    } else {
                        this.$Message.error('信息不能为空!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            selectGrade(value){
               
                // console.log(this.$refs['grade'].$el.classList);
                // console.log(this.formValidate)
                // this.$nextTick(()=>{
                //     this.formValidate.model1=value.value;
                // })
                // if(value.label){
                //     let arrClass = this.$refs['grade'].$el.classList;
                //     arrClass.remove('ivu-form-item-error')
                //     console.log(this.$refs['grade'].$el.classList,this.$refs['grade'].$el.children[1].children[1].remove());
                // }

                //    if(value.label){
                //        console.log(this.data_term);
                //        let arr = [];
                //        this.data_term.map(item=>{
                //           if(item.label.indexOf(value.label)!==-1){
                //               arr.push(item)
                //           }
                //        });
                //        this.data_term = arr;
                //    }
            }
        },
        mounted () {
            // 优化移动端键盘收起时页面没能恢复原状的问题
            let inputs = document.getElementsByTagName('input');
            let timer = null;
            for (let input of inputs) {
                input.addEventListener('blur', function() {
                    timer = setTimeout(() => {
                        window.scrollTo(0, 0);
                        timer = null;
                    }, 0);
                }, false);
                input.addEventListener('focus', function() {

                    timer && clearTimeout(timer);
                }, false);
            }
        }
    }
</script>
