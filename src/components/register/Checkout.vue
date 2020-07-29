<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>登记管理</el-breadcrumb-item>
            <el-breadcrumb-item>退住登记</el-breadcrumb-item>
            <el-breadcrumb-item>退住列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="search">
            <el-form :inline="true" :model="form" class="demo-form-inline">

                <el-form-item label="客户姓名：">
                    <el-select v-model="form.custId">
                        <el-option label="---请选择客户---" value=""></el-option>
                        <el-option
                                v-for="item in options"
                                :key="item.custId"
                                :label="item.custName"
                                :value="item.custId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="退住类型：">
                    <el-select v-model="form.type">
                        <el-option label="---请选择类型---" value=""></el-option>
                            <el-option label="自愿" value="自愿"></el-option>
                            <el-option label="到期" value="到期"></el-option>
                            <el-option label="强退" value="强退"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="query">查询</el-button>
                </el-form-item>
                <el-button type="primary" icon="el-icon-edit" circle @click="add"></el-button>
            </el-form>
        </div>
        <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                :data="pageInfo.list"
                border
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left"  class="demo-table-expand">
                        <el-form-item label="客户ID:">
                            <span>{{ props.row.custId }}</span>
                        </el-form-item>
                        <el-form-item label="退住原因:">
                            <span>{{ props.row.season }}</span>
                        </el-form-item>
                        <el-form-item label="备注:">
                            <span>{{ props.row.tips }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    type="index"
                    label="序号"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="checkinInfo.custName"
                    label="客户姓名"
                    width="130">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="退住类型"
                    width="80">
            </el-table-column>
            <el-table-column
                    label="申请时间"
                    width="120">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.applyTime|formatDatetime}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="退住时间"
                    width="120">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.checkoutTime|formatDatetime}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="是否审核"
                    width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.ischeck === '0' ">
                        <el-tag type="danger">
                            {{ scope.row.ischeck |formatischeck}}
                        </el-tag>
                    </span>
                    <span v-if="scope.row.ischeck === '1' ">
                        <el-tag type="success">
                            {{ scope.row.ischeck |formatischeck}}
                        </el-tag>
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                    label="是否退住"
                    width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.isout === '0' ">
                        <el-tag type="danger">
                            {{ scope.row.isout |formatisout}}
                        </el-tag>
                    </span>
                    <span v-if="scope.row.isout === '1' ">
                        <el-tag type="success">
                            {{ scope.row.isout |formatisout}}
                        </el-tag>
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="middle"  icon="el-icon-edit" @click="update(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="middle" icon="el-icon-delete" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    label="审核">
                <template slot-scope="scope">
                    <el-button type="text" size="middle" icon="el-icon-check" @click="setIsCheck(scope.row)">审核 </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="total, prev, pager, next"
                @current-change="handleCurrentChange"
                :page-size="pageInfo.pageSize"
                :total="pageInfo.total">
        </el-pagination>
    </div>
</template>

<script>
    import  axios from 'axios'
    import  {HOST} from "../../common/js/config";
    import {makeSimpleDate} from '../../common/js/dateformat.js'
    import {makeDate} from '../../common/js/dateformat.js'
    import ElFormItem from "element-ui/packages/form/src/form-item";
    export default {
        components: {ElFormItem},
        data(){
            return{
                currPage:1,
                pageInfo:{},
                loading:false, //正在加载
                options:[],
                form:{
                    type:'',
                    season:'',
                    checkoutTime:'',
                    applyTime:'',
                    tips:'',
                    ischeck:'',
                    custId:'',
                    custName:'',
                    isout:'',
                },
            }
        },
        created(){
            this.getData()
            this.getCust()
        },
        methods:{
            //加载客户信息
            getCust(){
                let url = `${HOST}/checkin/list`
                axios.get(url).then(res=>{
                    this.options = res.data
                })
            },
            //加载数据
            getData(){
                this.loading = true
                let url = `${HOST}/checkout/query/${this.currPage}`
                axios.post(url,this.form).then(res=>{
                    this.pageInfo = res.data
                    this.loading = false
                })
            },
            //页面跳转
            handleCurrentChange(val){
                this.currPage = val
                this.getData()
            },
            //修改
            update(id){
                console.log(id)
                //跳转路由到修改，传递主键
                this.$router.push(`/checkoutUpdate/${id}`)
            },
            //删除
            del(id){
                console.log(id)
                this.$confirm('是否删除该记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url = `${HOST}/checkout/del/${id}`
                    axios.get(url).then(res=>{
                        console.log(res.data)
                        if (res.data.code === 200){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.currPage = 1
                            this.getData()

                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //新增
            add(){
                this.$router.push("/CheckoutAdd")
            },
            //查询
            query(){
                this.currPage = 1
                this.getData()
            },
            //设置状态
            setIsCheck(row) {
                if (row.ischeck != '1' && row.isout != '1') {
                    //更改状态
                    row.ischeck = '1';
                    row.isout = '1'
                    row.checkoutTime = new Date()
                    let url = `${HOST}/checkout/checkstate`
                    //提交服务器
                    axios.post(url, row).then(() => {

                    })
                }
                else {
                        this.$alert('已退房，请勿重复操作', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${ action }`
                                });
                            }
                        });
                    }

            },

        },
        //过滤器
        filters:{
            //日期转换
            formatDate(val){
                if(val!=null) return makeSimpleDate(val)
                else return '暂无'
            },
            //格式化审核状态
            formatischeck(val){
                return val === '1'?'已审核':'未审核'
            },
            formatDatetime(val){
                if(val!=null) return makeDate(val)
                else  return '暂无'
            },
            formatisout(val){
                return val === '1'?'已退房':'未退房'
            },
        }
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