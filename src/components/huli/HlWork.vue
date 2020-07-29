<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>护理服务管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/hlWork'}">服务办理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="search">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="客户姓名">
                    <el-input  v-model="form.custName" placeholder="客户姓名"></el-input>
                </el-form-item>
                <el-form-item label="护士名">
                    <el-input  v-model="form.nurseName" placeholder="护士名"></el-input>
                </el-form-item>
                <el-form-item label="护理服务">
                    <el-input  v-model="form.serviceName" placeholder="护理服务"></el-input>
                </el-form-item>
                <el-form-item >
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
                    prop="serviceId"
                    label="护理服务编号"
                    width="120"
            >
            </el-table-column>
            <el-table-column
                    prop="serviceName"
                    label="护理名"
                    width="150"
            >
            </el-table-column>
            <!--         <el-table-column
                             prop="custId"
                             label="客户编号"
                             width="100">
                     </el-table-column>-->
            <el-table-column
                    prop="custName"
                    label="客户名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="nurseName"
                    label="护士名"
                    width="150"
            >
            </el-table-column>
            <el-table-column
                    prop="money"
                    label="缴纳金额"
                    width="150"
            >
            </el-table-column>
            <el-table-column
                    label="开始时间"
                    width="200">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.beginTime | formatDate}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="结束时间"
                    width="200">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.endTime | formatDate}}</span>
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
    import  axios from 'axios'
    import {HOST} from '../../common/js/config'
    export default {
        data(){
            return {
                loading:false,
                currentPage:1,
                PageInfo:{},
                form: {
                    custName: '',
                    nurseName: '',
                    serviceName: '',
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
                let url=`${HOST}/hlservice/query/${this.currentPage}`
                axios.post(url,this.form).then(res=>{
                    this.pageInfo=res.data
                    this.loading=false
                })
            },
            //页面跳转
            handleCurrentChange(val){
                this.currentPage=val,
                    this.getData()
            },
            del(id){
                this.$confirm('是否删除该记录?', '提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    let url=`${HOST}/hlservice/del/${id}`
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
            update(val){
                this.$router.push(`/hlWorkUpdate/${val}`)
            },
            add(){
                this.$router.push('/hlWorkAdd')
            },
            query(){
                this.currPage = 1
                this.getData()
            }
        },
        filters:{
            formatDate(val){
                return makeSimpleDate(val)
            },
        },
    }
</script>

<style scoped>
    .search{
        margin-top: 15px;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>