<template>
    <div>

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>护理服务管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/hlWork'}">服务办理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/hlWorkUpdate'}">更新</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="search">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="护理服务" prop="serviceName">
                    <el-select v-model="ruleForm.serviceId" placeholder="--请选择服务--">
                        <el-option
                                v-for="item in opts"
                                :key="item.id"
                                :label="item.nursingName"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="办理人" prop="custName" label-width="100px">
                    <el-input v-model="ruleForm.custName"></el-input>
                </el-form-item>
                <el-form-item label="缴纳金额/元" prop="money" label-width="100px">
                    <el-input v-model="ruleForm.money"></el-input>
                </el-form-item>
                <el-form-item  label="办理时间">
                    <el-date-picker
                            v-model="ruleForm.beginTime"
                            type="date"
                            placeholder="起始日期">
                    </el-date-picker>
                    至
                    <el-date-picker
                            v-model="ruleForm.endTime"
                            type="date"
                            placeholder="终止日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                ruleForm: {
                    serviceId: '',
                    custName:'',
                    money: '',
                    beginTime: '',
                    endTime: '',
                },
                rules: {
                    money: [
                        { required: true, message: '请输入价格', trigger: 'blur' },
                    ],
                    serviceId: [
                        { required: true, message: '请选择服务', trigger: 'blur' },
                    ],
                    beginTime: [
                        { required: true, message: '请选择开始时间', trigger: 'blur' },
                    ],
                    endTime: [
                        { required: true, message: '请选择结束时间', trigger: 'blur' },
                    ],


                },
                opts:[]
            };
        },
        created(){
            this.ruleForm.id= this.$route.params.id
            this.getData()
            this.getservice()
        },
        methods: {
            getservice(){
                let url =`http://localhost:8081/huli/listall`
                axios.get(url).then(res=>{
                    this.opts=res.data
                })
            },
            getData(){
                let url =`http://localhost:8081/hlservice/get/${this.ruleForm.id}`
                axios.get(url).then(res=>{
                    this.ruleForm=res.data
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {//验证成功
                        let url =`http://localhost:8081/hlservice/update`
                        axios.post(url,this.ruleForm).then(res=>{
                            if (res.data.code==200){
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                            }

                        })

                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .search{
        margin-top: 5px;
    }
</style>