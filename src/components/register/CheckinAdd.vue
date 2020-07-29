<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>登记管理</el-breadcrumb-item>
            <el-breadcrumb-item>入住登记</el-breadcrumb-item>
            <el-breadcrumb-item>新增入住</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="search">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="客户名称" prop="custName">
                    <el-input v-model="ruleForm.custName"></el-input>
                </el-form-item>
                <el-form-item label="客户年龄" prop="custAge">
                    <el-input v-model="ruleForm.custAge"></el-input>
                </el-form-item>
                <el-form-item label="客户性别" prop="custSex">
                    <el-select v-model="ruleForm.custSex" placeholder="请选择性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="身份证号" prop="custIdcard">
                    <el-input v-model="ruleForm.custIdcard"></el-input>
                </el-form-item>
               <el-form-item label="床位号" prop="bedId">
                <el-select v-model="ruleForm.bedId" placeholder="请选择床位号">
                    <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.id"
                            :value="item.id">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="入住时间">
                    <el-date-picker
                            v-model="ruleForm.checkinTime"
                            type="datetime"
                            placeholder="入住日期"
                            :default-time="'12:00:00'">
                    </el-date-picker>
                    至
                    <el-date-picker
                            v-model="ruleForm.timeout"
                            type="datetime"
                            placeholder="结束日期"
                            :default-time="'12:00:00'">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-date-picker
                            v-model="ruleForm.birthdate"
                            type="date"
                            placeholder="出生日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="身高(cm)" prop="custTall">
                    <el-input v-model="ruleForm.custTall"></el-input>
                </el-form-item>
                <el-form-item label="婚姻状况" prop="custMarry">
                    <el-select v-model="ruleForm.custMarry" placeholder="婚姻状况">
                        <el-option label="已婚" value="已婚"></el-option>
                        <el-option label="未婚" value="未婚"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="体重(kg)" prop="custWeight">
                    <el-input v-model="ruleForm.custWeight"></el-input>
                </el-form-item>
                <el-form-item label="血型" prop="custBlood">
                    <el-select v-model="ruleForm.custBlood" placeholder="请选择血型">
                        <el-option label="A" value="A"></el-option>
                        <el-option label="B" value="B"></el-option>
                        <el-option label="AB" value="AB"></el-option>
                        <el-option label="O" value="O"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="头像">
                    <el-upload
                            class="avatar-uploader"
                            :action="`${host}/common/upload`"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="ruleForm.photo" :src="`${host}/${ruleForm.photo}`" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="备注信息" prop="tips">
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
                    id:'',
                    custName: '',           //姓名
                    custAge: '',        //年龄
                    custSex:'',         //性别
                    custIdcard: '',    //身份证
                    bedId: '',    //床位
                    checkinTime: '',   //入住
                    timeout:'',            //到期
                    phone:'',            //电话
                    birthdate:'',            //出生日期
                    custTall:'',            //身高
                    custMarry:'',            //婚姻
                    custWeight:'',            //体重
                    custBlood:'',            //血型
                    photo:'',            //照片
                    tips:'',          //备注


                },
                rules: {//定义校验规则
                    custName: [
                        { required: true, message: '请输入职位名称', trigger: 'blur' },
                    ],
                    custSex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    /*custAge: [
                        {  type: 'number', message: '年龄必须为数字值' }
                    ],
                    phone: [
                        {  type: 'number', message: '手机号必须为数字值' }
                    ],*/


                },
                options:[]
            };
        },
        created(){

            this.host = HOST
            this.getBed()

        },
        methods: {
            //查询所有空余的床位
            getBed(){
                let url = `${HOST}/bed/listbystate`
                axios.get(url).then(res=>{
                    this.options = res.data
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {//验证成功
                        //提交数据到服务器
                        let url = `${HOST}/checkin/add`
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
            //上传成功的回调函数
            handleAvatarSuccess(res) {
                console.log(res)
                //this.ruleForm.photo = URL.createObjectURL(file.raw);
                //上传成功后，把上传文件名赋给ruleForm. photo
                this.ruleForm.photo  = res.message

            },
            //上传成功前的回调函数
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg'||'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
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