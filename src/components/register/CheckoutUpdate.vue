<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>登记管理</el-breadcrumb-item>
            <el-breadcrumb-item>退住登记</el-breadcrumb-item>
            <el-breadcrumb-item>编辑退住</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="search">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="退住人" prop="custId">
                    <el-select v-model="ruleForm.custId" placeholder="请选择退住人">
                        <el-option
                                v-for="item in options"
                                :key="item.custId"
                                :label="item.custName"
                                :value="item.custId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="退住类型" prop="type">
                    <el-select v-model="ruleForm.type" placeholder="请选择类型">
                        <el-option label="自愿" value="自愿"></el-option>
                        <el-option label="到期" value="到期"></el-option>
                        <el-option label="强退" value="强退"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="原因" prop="season">
                    <el-input v-model="ruleForm.season"></el-input>
                </el-form-item>
                <el-form-item label="申请日期">
                    <el-date-picker
                            v-model="ruleForm.applyTime"
                            type="date"
                            placeholder="申请日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="备注" prop="tips">
                    <el-input type="textarea" v-model="ruleForm.tips"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
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
                    type: '',           //类型
                    season: '',        //原因
                    applyTime:'',         //申请时间
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
            this.ruleForm.custId = this.$route.params.id
            this.getCust()
            this.getData()

        },
        methods: {
            //查询入住人
            getCust(){
                let url = `${HOST}/checkin/listbyBedId`
                axios.get(url).then(res=>{
                    this.options = res.data
                })
            },
            getData(){
                let url = `${HOST}/checkout/get/${this.ruleForm.custId}`
                axios.get(url).then(res=>{
                    this.ruleForm = res.data
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {//验证成功
                        //提交数据到服务器
                        let url = `${HOST}/checkout/update`
                        axios.post(url,this.ruleForm).then(res=>{
                            if (res.data.code == 200){
                                this.$message({
                                    message: '修改成功',
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