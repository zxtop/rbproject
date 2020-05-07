

<template>
    <div id="app">

        <div v-show="isLog">
            <p style="padding:20px;text-align:center">用户登录</p>
            <i-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                
                <!-- <form-item label="姓名" prop="name">
                    <i-input v-model="formValidate.name" placeholder="请输入名字"></i-input>
                </form-item> -->

                <div class="user-message">
                    <form-item  prop="mobile" >
                        <i-input v-model="formValidate.mobile" placeholder="请输入手机号"></i-input>
                    </form-item>

                    <form-item  prop="password">
                        <i-input v-model="formValidate.password" placeholder="请输入密码"></i-input>
                    </form-item>
                </div>

                <!-- <form-item label="身份" prop="shenfen">
                    <Select v-model="formValidate.shenfen" placeholder="请选择身份类型">
                        <Option value="student">学生</Option>
                        <Option value="teacher">老师</Option>
                    </Select>
                </form-item> -->

                <form-item>
                    <Button type="primary" @click="handleSubmit('formValidate')">登录</Button>
                    <span>还没注册?</span> <span style="color:blue">点击注册</span>
                    <!-- <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button> -->
                </form-item>

            </i-form>
        </div>

        <div v-show="isReg">
            <p style="padding:20px;text-align:center">用户注册</p>
            <div class="user-message">
                <i-form ref="regValidate" :model="regValidate" :rules="regruleValidate" :label-width="80">

                    <form-item  prop="mobile" >
                        <i-input v-model="regValidate.mobile" placeholder="请输入手机号"></i-input>
                    </form-item>

                    <form-item  prop="password">
                        <i-input v-model="regValidate.password" placeholder="请输入密码"></i-input>
                    </form-item>

                </i-form>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                formValidate: {
                    name: '',
                    mobile:'',
                    password: '',
                    shenfen: '',
                },
                ruleValidate: {
                    name: [
                        { required: false, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '手机号不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    shenfen: [
                        { required: true, message: '请选择身份类型', trigger: 'change' }
                    ],
                },
                loading:false,
                isLog:false,
                isReg:true,
                regValidate:{

                },
                regruleValidate:{

                }
            }
        },
        mounted () {
          this.loading = true;  
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let user = {
                            "userMobile":this.formValidate.mobile,
                            "passWord":this.formValidate.password
                        };
                        this.$store.dispatch("Login",user)
                        .then((value)=>{
                            console.log(value)
                            if(value.data.result == 'success'){
                                this.$Message.success('登录成功')
                            }else{
                                this.$Message.error(value.data.message);
                            }
                        })
                    } else {
                        this.$Message.error('信息不能为空');
                        return false;
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
