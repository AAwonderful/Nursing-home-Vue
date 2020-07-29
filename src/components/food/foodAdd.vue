<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>东软颐养中心</el-breadcrumb-item>
            <el-breadcrumb-item  :to="{ path: '/food' }">食品管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增食品</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="菜名" prop="foodname">
                <el-input v-model="ruleForm.foodname"></el-input>
            </el-form-item>
            <el-form-item label="食物类别" prop="foodtype">
                <el-input v-model="ruleForm.foodtype"></el-input>
            </el-form-item>
            <el-form-item label="食物标签" prop="foodlable">
                <el-input v-model="ruleForm.foodlable"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="是否清真" prop="ishalal">
                <el-select v-model="ruleForm.ishalal" placeholder="请选择">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                ruleForm: { //定义form绑定的对象
                    foodid: '',
                    foodname: '',    //菜名
                    foodtype: '',       //食物类别
                    foodlable: '',         //食物标签
                    price: '',     //价格
                    ishalal: '',       //是否清真
                },
                rules: { //定义校验规则
                    foodname: [
                        { required: true, message: '请输入菜名', trigger: 'blur' },
                        { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
                    ],
                    foodtype: [
                        { required: true, message: '请输入食物类别' },
                    ],
                    tefoodlablel: [
                        { required: true, message: '请输入食物标签', trigger: 'blur' },
                    ],
                    price: [
                        { required: true, message: '请输入价格', trigger: 'blur' },
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {//验证成功
                       //提交数据到服务器
                       let url = 'http://localhost:8081/food/add'
                       axios.post(url,this.ruleForm).then(res=>{
                           if(res.data.code == 200){
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
    .demo-ruleForm {
        margin-top: 10px;
    }
</style>