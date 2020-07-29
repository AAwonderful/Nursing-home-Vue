<template>
    <div class="wrap">
        <div class="con">
            <el-header><span class="title">东软颐养中心系统— —打造全球一流养老院，让您未来老无所依</span></el-header>
        </div>
        <div class="login">
            <el-row :gutter="20">
                <el-col :span="12" :offset="6">
                    <el-form :model="ruleForm" status-icon   label-width="100px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="pass">
                            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="checkPass">
                            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {HOST} from '../../common/js/config'
    import axios from 'axios'
    export default {
        data(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },

            }
        },
        methods: {
            submitForm(){
                let url = `${HOST}/nurse/login`
                axios.post(url,this.ruleForm).then(res=>{
                    if(res.data.code === 200){//登录成功
                        //json转字符串存入sessionStorage
                        sessionStorage.setItem("user", JSON.stringify(this.ruleForm))
                        this.$router.push('/main')
                    }else{
                        this.$message.error('用户名或密码错误');
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .wrap {

    }
    .con .title{
        font-weight: bold;
        font-size: 1.5em;
        color: #fff;

    }
    .login{
        margin-top: 20px;
    }
</style>