<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>床位管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/bed' }">床位列表</el-breadcrumb-item>
            <el-breadcrumb-item>修改床位</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="小区名称" prop="community">
                <el-input v-model="ruleForm.community"></el-input>
            </el-form-item>
            <el-form-item label="楼栋(栋)" prop="building">
                <el-input v-model="ruleForm.building"></el-input>
            </el-form-item>
            <el-form-item label="单元" prop="floor">
                <el-input v-model="ruleForm.floor"></el-input>
            </el-form-item>
            <el-form-item label="房间号" prop="room">
                <el-input v-model="ruleForm.room"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {HOST} from '../../common/js/config'
    import axios from 'axios'
    export default {
        data() {
            return {
                ruleForm: {
                    id:'',
                    community: '',
                    building: '',
                    floor: '',
                    room: '',
                    number: ''
                },
                rules: {
                    community: [
                        { required: true, message: '请输入小区名称', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                    building: [
                        { required: true, message: '请输入楼栋'}
                    ],
                    floor: [
                        { required: true, message: '请输入单元' }
                    ],
                    room: [
                        { required: true, message: '请输入房间号' }
                    ]
                }
            };
        },
        created(){
            //取出路由跳转传递参数名是id的值
            this.ruleForm.id=this.$route.params.id
            this.getData()
        },
        methods: {
            //根据id加载记录
            getData(){
                let url = `${HOST}/bed/get/${this.ruleForm.id}`
                axios.get(url).then(res=>{
                    this.ruleForm=res.data
                })

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {//验证成功
                        //提交数据到服务器
                        let url = `${HOST}/bed/update`
                        axios.post(url,this.ruleForm).then(res=>{
                            if(res.data.code==200){
                                this.$message({
                                    message:'操作成功',
                                    type:'success'
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
    .demo-ruleForm{
        margin-top: 10px
    }
</style>