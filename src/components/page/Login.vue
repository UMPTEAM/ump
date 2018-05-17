<template>
    <div class="login-wrap">
        
        <div class="ms-title" ><i class="el-icon-loading">&nbsp;UMP</i></div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : 认证授权运维团队。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: 'admin',
                    password: '123123'
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    
                    //by zyk 2018-5-11 测试axios
                    // this.$axios.get('https://yesno.wtf/api').then(res=>{
                    //     console.log(res.data);
                    //     this.msg = res.data;
                    // }).catch(error=>{
                    //     console.log(error);
                    // })

                    this.$axios.post('/api/login',this.ruleForm).then(res=>{
                            console.log('======res.data');
                            console.log(res.data);
                            if(res.data.info === false){
                                this.$router.push('/login');
                                this.$message({
                                type:'error',
                                message:'登录失败,无效的用户名！'
                            });
                                return false;
                            }
                            if(res.data.pwd === false){
                                this.$router.push('/login');
                                this.$message({
                                type:'error',
                                message:'登录失败,用户密码输入错误！'
                            });
                                return false;
                            }

                               if (valid) {
                                    localStorage.setItem('ms_username',this.ruleForm.username);
                                    this.$router.push('/');
                                    this.$message({
                                        type:'success',
                                        message:'欢迎你 :)     '+this.ruleForm.username+'   登录成功！'
                                    });
                                } else {
                                    console.log('error submit!!');
                                    return false;
                                }

                        }).catch(error=>{
                            console.log('=========error');
                            console.log(error);
                            this.$router.push('/login');
                            this.$message({
                            type:'error',
                            message:'登录失败,请检查用户或密码！'
                        });
                         return false;
                        })

                 
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>