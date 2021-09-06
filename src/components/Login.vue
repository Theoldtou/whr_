<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <!-- 头像 -->
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 活动图区域 -->
            <!-- 账号 -->
            <!-- <el-form  v-model="loginForm" prop="username" label-width="0px" class="login_form">
                <el-form-item label="" prop="loginFormRules.username">
                <el-input v-model="loginForm.username"  prefix-icon="el-icon-s-custom"></el-input>
                </el-form-item> -->
            
            <!-- 密码 -->
            <!-- <el-form  label-width="0px" prop="password">
                <el-form-item label="">
                <el-input v-model="loginForm.password"  prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
            </el-form> -->
            <!-- 按钮 -->
            <!-- <el-form-item class="btns">
             <el-button type="primary">登录</el-button>
              <el-button type="info">重置</el-button>
            </el-form-item> -->

            <!-- 活动图区域 -->
            <!-- 账号 -->
            <el-form  class="login_form" :label-position="labelPosition"  :model="loginForm" :rules="rules" ref="loginFormRef">
                <el-form-item prop="username"><!-- 账号 -->
                    <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    props: {

    },
     data() {
        return {
            labelPosition: 'right',
            loginForm: {
            username: 'admin',
            password: '123456',
            
            }   ,
            ruleForm: {
                username: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
                rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入用密码', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                }

        };
    },
    methods: {
        //点击重置
        resetLoginForm(){
        // console.log(this);
        this.$refs.loginFormRef.resetFields();
        },
        login(){
            
            this.$refs.loginFormRef.validate(async valid=>{
                console.log(valid);
                if(!valid)return;
              const { data : res }= await this.$http.post("http://127.0.0.1:8888/api/private/v1/login",this.loginForm);
              console.log(res);
            if(res.meta.status !==200 )return this.$message.error('登陆失败');
                    this.$message.success('登录成功')
                window.sessionStorage.setItem('token', res.data.token);
                this.$router.push("/home")
            })
        }
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow:  0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    background-color: #eee;

    }
}
.login_form{
    position: absolute;
    bottom:0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.btns{
    display: flex;
    justify-content: flex-end;
}

</style>
