<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>登记管理</el-breadcrumb-item>
            <el-breadcrumb-item>外出登记</el-breadcrumb-item>
            <el-breadcrumb-item>新增外出</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="search">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="外出人" prop="custId">
                    <el-select v-model="ruleForm.custId" placeholder="请选择外出人">
                        <el-option
                                v-for="item in options"
                                :key="item.custId"
                                :label="item.custName"
                                :value="item.custId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="外出事由" prop="outSeason">
                    <el-select v-model="ruleForm.outSeason" placeholder="请选择类型">
                        <el-option label="爬" value="爬"></el-option>
                        <el-option label="玩" value="玩"></el-option>
                        <el-option label="走" value="走"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="外出时间">
                    <el-date-picker
                            v-model="ruleForm.outTime"
                            type="datetime"
                            placeholder="外出时间"
                            :default-time="'12:00:00'">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="回院时间">
                    <el-date-picker
                            v-model="ruleForm.backTime"
                            type="datetime"
                            placeholder="回院时间"
                            :default-time="'12:00:00'">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="陪同人" prop="address">
                    <el-input v-model="ruleForm.accompany"></el-input>
                </el-form-item>
                <el-form-item label="与老人关系" prop="address">
                    <el-input v-model="ruleForm.relation"></el-input>
                </el-form-item>
                <el-form-item label="陪同人电话" prop="address">
                    <el-input v-model="ruleForm.accompanyPhone"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="tips">
                    <el-input type="textarea" v-model="ruleForm.tips"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import {HOST} from "../../common/js/config";
    export default {
        data() {
            return {
                host:'',
                ruleForm: {//定义form绑定的对象
                    custId: '',          //入住人ID
                    custName: '',     //入住人
                    outSeason: '',           //外出理由
                    outTime: '',        //外出时间
                    backTime:'',         //回院时间
                    accompany: '',    //陪同人
                    relation: '',    //与老人关系
                    accompanyPhone: '',    //陪同人电话
                    tips: '',    //备注


                },
                rules: {//定义校验规则
                    /* name: [
                         { required: true, message: '请输入职位名称', trigger: 'blur' },
                         { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                     ],
                     sex: [
                         { required: true, message: '请选择性别', trigger: 'change' }
                     ],
                     education: [
                         { required: true, message: '请选择学历', trigger: 'change' }
                     ],
                     description: [
                         { required: true, message: '请填写职位描述', trigger: 'blur' }
                     ],
                     number: [
                         { required: true, message: '请填写招聘人数', trigger: 'blur' }
                     ]*/

                },
                options:[]
            };
        },
        created(){

            this.host = HOST
            this.getCust()

        },
        methods: {
            //查询入住人
            getCust(){
                let url = `${HOST}/checkin/listbyBedId`
                axios.get(url).then(res=>{
                    this.options = res.data
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {//验证成功
                        //提交数据到服务器
                        let url = `${HOST}/outgoing/add`
                        axios.post(url,this.ruleForm).then(res=>{
                            if (res.data.code == 200){
                                this.$message({
                                    message: '新增成功',
                                    type: 'success'
                                });
                            }
                        })
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }
    }
</script>
<style scoped>
    .search{
        margin-top: 15px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        border: 1px dashed #b2b2b2;
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>