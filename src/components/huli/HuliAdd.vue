<template>
    <div>

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>护理服务管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/huli'}">护理服务</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/huliAdd'}">新增</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="search">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="护理级别" prop="workNumber">
                    <el-select v-model="ruleForm.workNumber" placeholder="请选择护理级别">
                        <el-option label="一级护理" value="一级护理"></el-option>
                        <el-option label="二级护理" value="二级护理"></el-option>
                        <el-option label="三级护理" value="三级护理"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="护理名称" prop="nursingName">
                    <el-input v-model="ruleForm.nursingName"></el-input>
                </el-form-item>
                <el-form-item label="护理人员" prop="createBy">
                    <el-select v-model="ruleForm.createBy" placeholder="--请选择护理人员--">
                        <el-option
                                v-for="item in opts"
                                :key="item.id"
                                :label="item.username"
                                :value="item.username">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="护理价格" prop="servicePrice">
                    <el-input v-model="ruleForm.servicePrice"></el-input>
                </el-form-item>
                <el-form-item label="是否增值" prop="isRaise">
                    <el-select v-model="ruleForm.isRaise" placeholder="--请选择--">
                        <el-option label="是" value="是"></el-option>
                        <el-option label="否" value="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否启用" prop="status">
                    <el-select v-model="ruleForm.status" placeholder="--请选择--">
                        <el-option label="启用" value="启用"></el-option>
                        <el-option label="不启用" value="不启用"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="护理描述" prop="description">
                    <el-input type="textarea" v-model="ruleForm.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
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
                    workNumber: '',
                    nursingName: '',
                    servicePrice: '',
                    description: '',
                    isRaise: '',
                    status: '',
                    createBy: '',
                },
                rules: {
                    nursingName: [
                        { required: true, message: '请输入护理名称', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                    servicePrice: [
                        { required: true, message: '请输入价格', trigger: 'blur' },
                    ],
                    workNumber: [
                        { required: true, message: '请选择级别', trigger: 'blur' },
                    ],
                    createBy: [
                        { required: true, message: '请选择护理人员', trigger: 'blur' },
                    ],
                    isRaise: [
                        { required: true, message: '请选择是否增值', trigger: 'blur' },
                    ],
                    status: [
                        { required: true, message: '请选择启用状态', trigger: 'blur' },
                    ],

                },
                opts:[]
            };
        },
        created(){
            this.getnurse()
        },
        methods: {
            getnurse(){
                let url =`http://localhost:8081/nurse/listall`
                axios.get(url).then(res=>{
                    this.opts=res.data
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {//验证成功
                        let url =`http://localhost:8081/huli/add`
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