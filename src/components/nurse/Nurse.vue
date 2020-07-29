<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>人员管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/nurse'}">员工管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="search">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="员工名称">
                    <el-input  v-model="form.username" placeholder="员工名称"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select  v-model="form.sex">
                        <el-option label="--请选择--" value=""></el-option>
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="query">查询</el-button>
                </el-form-item>
                <el-button type="primary" icon="el-icon-edit" circle @click="add"></el-button>
            </el-form>
        </div>
        <el-table
                :data="pageInfo.list"
                border
                v-loading="loading"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="员工编号"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="员工名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="电子邮件"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="phoneNumber"
                    label="电话号码"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="职务"
                    width="120"
            >
            </el-table-column>
            <!--<el-table-column
                    prop="number"
                    label="员工号"
                    width="200">
            </el-table-column>-->
            <el-table-column
                    label="注册时间"
                    width="250">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.createTime | formatDate}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button type="text" size="middle"  icon="el-icon-edit" @click="update(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="middle" icon="el-icon-delete" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                @current-change="handleCurrentChange"
                layout="total,prev, pager, next"
                :page-size="pageInfo.pageSize"
                :total="pageInfo.total">
        </el-pagination>
    </div>
</template>

<script>
    import {makeSimpleDate} from '../../common/js/dateformat'
    import axios from 'axios'
    export default {
        data() {
            return {
                loading:false,
                currentPage:1,
                pageInfo: {},
                form:{//提交查询的数据
                    username:'',
                    sex:''
                }
            }
        },
        created(){
            this.getData()
        },
        methods:{
            //加载数据
            getData(){
                this.loading=true
                let url =`http://localhost:8081/nurse/query/${this.currentPage}`
                axios.post(url,this.form).then(res=>{
                    console.log(res.data),
                        this.pageInfo = res.data,
                        this.loading=false
                })
            },
            //页面跳转
            handleCurrentChange(val){
                this.currentPage=val,
                    this.getData()
            },
            //查询
            query(){
                console.log(this.form)
                this.currentPage=1
                this.getData()
            },

            update(id){
                console.log(id)
                this.$router.push(`/nurseUpdate/${id}`)
            },
            del(id){
                console.log(id)
                this.$confirm('是否删除该记录?', '提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    let url =`http://localhost:8081/nurse/del/${id}`
                    axios.get(url).then(res=>{
                        console.log(res.data)
                        if (res.data.code==200){
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                        }
                        this.currentPage=1
                        this.getData()
                    })
                })

            },
            add(){
                this.$router.push('/nurseAdd')
            }
        },

        filters:{
            formatDate(val){
                return makeSimpleDate(val)
            }
        }

    }
</script>

<style scoped>
    .search{
        margin-top: 15px;
    }
</style>