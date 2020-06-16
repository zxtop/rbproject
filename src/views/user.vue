<template>
    <div id="app">
        <div class="container-user">

            <div v-show="isLog" class="user-panle-log" :class="{'show-in':isLog}">
                
                <p style="padding:20px;text-align:center">用户登录</p>
                <i-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    
                    <div class="user-message">
                        <form-item  prop="userMobile">
                            <i-input v-model="formValidate.userMobile" placeholder="请输入手机号"></i-input>
                        </form-item>

                        <form-item  prop="passWord">
                            <i-input type="password" v-model="formValidate.passWord" placeholder="请输入密码"></i-input>
                        </form-item>
                    </div>

                    
                    <form-item>
                        <Button type="primary" @click="handleSubmit('formValidate')">登录</Button>
                        <span>还没注册?</span> <span style="color:blue" @click="changePanle()">点击注册</span>
                        <!-- <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button> -->
                    </form-item>

                </i-form>
                <div class="user_visitor">
                    <span style="color:#E88D35" @click="handleVisitor">游客登录</span>
                </div>
            </div>

            <div v-show="!isLog" class="user-panle-reg" :class="{'show-in':!isLog}">
                <p style="padding:20px;text-align:center">用户注册</p>
                
                <i-form ref="regValidate" :model="regValidate" :rules="regruleValidate" :label-width="80">
                    <div class="user-message">
                        <form-item  prop="userMobile" >
                            <i-input v-model="regValidate.userMobile" placeholder="请输入手机号"></i-input>
                        </form-item>

                        <form-item  prop="userEmail" >
                            <i-input v-model="regValidate.userEmail" placeholder="请输入邮箱"></i-input>
                        </form-item>

                        <form-item  prop="passWord">
                            <i-input type="password" v-model="regValidate.passWord" placeholder="请输入密码"></i-input>
                        </form-item>

                        <form-item  prop="passwdCheck">
                            <i-input type="password" v-model="regValidate.passwdCheck" placeholder="请再次输入密码"></i-input>
                        </form-item>

                        <form-item  prop="nickName" >
                            <i-input v-model="regValidate.nickName" placeholder="姓名"></i-input>
                        </form-item>

                    </div>
                    <form-item>
                        <Button type="primary" @click="handleSubmit('regValidate')">提交</Button>
                        <span>已有账号?</span> <span style="color:blue" @click="changePanle()">点击登录</span>
                    </form-item>

                </i-form>
                
            </div>

        </div>

    </div>
</template>

<script>

import {regUser} from '@/api/user';

    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if(value.length<1){
                        callback(new Error("密码不能小于1位"));
                    }
                    if (this.regValidate.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.regValidate.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.regValidate.passWord) {
                    callback(new Error('输入不一致'));
                } else {
                    callback();
                }
            };

            const validateNumber = (rule,value,callback)=>{
                if(value.length<1){
                    callback(new Error('请输入正确的登录账号'));
                }else{
                    callback();
                }
            }
            return {
                formValidate: {
                    userMobile:'',
                    passWord: '',
                    userType:'user'
                },
                ruleValidate: {
                    userMobile: [
                        { required: true, message: '手机号不能为空', trigger: 'blur' }
                    ],
                    passWord: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                },
                loading:false,
                isLog:true,
                regValidate:{
                    userMobile:'',
                    userEmail:'',
                    passWord:'',
                    passwdCheck:'',
                    nickName: "",
                    userType: "user"
                },
                regruleValidate:{
                    nickName: [
                        { required: false, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    userMobile: [
                        { validator:validateNumber, trigger: 'blur' }
                    ],
                    userEmail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                    ],
                    passWord: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ]
                },
                message:true
            }
        },
        props:{
           
        },
        computed: {
           
        },
        mounted () {
          this.loading = true;  
        //   console.log(this.modalLogin,"用户登录组件")
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(name == 'formValidate'){
                           
                            this.$store.dispatch("Login",this.formValidate)
                            .then((value)=>{
                                
                                if(value.data.result == 'success'){
                                    this.message = false;
                                    this.$emit('input',this.message);
                                    this.$Message.success('登录成功');
                                    //返回登录信息----记录用户名字和用户id

                                    this.$store.commit('LOGIN_ID_NAME',value.data.user);

                                    //年级 学期选择
                                    
                                    //存储用户设置

                                }else{
                                    this.$Message.error(value.data.message);
                                }
                            });

                        }else{
                            console.log('注册。。。。。',this.regValidate);
                            regUser(this.regValidate)
                            .then(response=>{
                                if(response.data.result == 'success'){
                                    //注册成功
                                    this.$Message.success(response.data.message);
                                    this.formValidate.userMobile = this.regValidate.userMobile;
                                    this.regValidate.userMobile = '';
                                    this.regValidate.userEmail = '';  
                                    this.regValidate.passWord = '';
                                    this.regValidate.passwdCheck = '';
                                    this.regValidate.nickName = '';
                                    this.isLog = !this.isLog;
                                }else{
                                    //注册失败
                                    this.$Message.error(response.data.message);
                                }
                            })
                            .catch(error=>{
                                this.$Message.error('注册失败');
                            })
                        }

                    } else {
                        this.$Message.error('信息不能为空');
                        return false;
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            changePanle(){
                this.isLog = !this.isLog;
               
                this.handleReset('formValidate');
                this.handleReset('regValidate');
            },
            handleVisitor(){
                this.$emit('getVisitor');
                this.$store.dispatch('saveuserId',-1)
            }
            
        }
    }
</script>
