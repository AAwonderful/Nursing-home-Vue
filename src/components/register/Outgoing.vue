<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>登记管理</el-breadcrumb-item>
            <el-breadcrumb-item>外出登记</el-breadcrumb-item>
            <el-breadcrumb-item>外出列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="search">
            <el-form :inline="true" :model="form" class="demo-form-inline">

               <el-form-item label="客户姓名">
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

                <el-form-item label="外出类型：">
                    <el-select v-model="form.outSeason">
                        <el-option label="---请选择类型---" value=""></el-option>
                        <el-option label="爬" value="爬"></el-option>
                        <el-option label="玩" value="玩"></el-option>
                        <el-option label="走" value="走"></el-option>
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
                        <el-form-item label="陪同人与老人关系:">
                            <span>{{ props.row.relation }}</span>
                        </el-form-item>
                        <el-form-item label="陪同人电话:">
                            <span>{{ props.row.accompanyPhone }}</span>
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
                    prop="outSeason"
                    label="外出类型"
                    width="80">
            </el-table-column>
            <el-table-column
                    label="外出时间"
                    width="120">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.outTime|formatDatetime}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="预计回院时间"
                    width="120">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.backTime|formatDatetime}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="accompany"
                    label="陪同人"
                    width="120">
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
                    label="是否归来"
                    width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.isback === '0' ">
                        <el-tag type="danger">
                            {{ scope.row.isback |formatisback}}
                        </el-tag>
                    </span>
                    <span v-if="scope.row.isback === '1' ">
                        <el-tag type="success">
                            {{ scope.row.isback |formatisback}}
                        </el-tag>
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                    label="归院时间"
                    width="120">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.realbackTime|formatDatetime}}</span>
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
                    label="审核登记">
                <template slot-scope="scope">
                    <el-button type="text" size="middle" icon="el-icon-check" @click="setIsCheck(scope.row)">审核 </el-button>
                    <el-button type="text" size="middle" @click="setIsBack(scope.row)">登记归来</el-button>
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
                    custId:'',
                    outSeason:'',
                    outTime:'',
                    backTime:'',
                    accompany:'',
                    relation:'',
                    accompanyPhone:'',
                    tips:'',
                    realbackTime:'',
                    ischeck:'',
                    isback:'',
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
                let url = `${HOST}/outgoing/query/${this.currPage}`
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
                this.$router.push(`/outgoingUpdate/${id}`)
            },
            //删除
            del(id){
                console.log(id)
                this.$confirm('是否删除该记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url = `${HOST}/outgoing/del/${id}`
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
                this.$router.push("/OutgoingAdd")
            },
            //查询
            query(){
                this.currPage = 1
                this.getData()
            },
            //设置状态
            setIsCheck(row){
                if(row.ischeck === '0'){
                    //更改状态
                    row.ischeck = '1';
                    let url = `${HOST}/outgoing/update`
                    //提交服务器
                    axios.post(url,row).then(()=>{

                    })
                }
                else {
                    this.$alert('已审核，请勿重复操作', {
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
            //设置状态
            setIsBack(row){
                if(row.ischeck === '1'&&row.isback === '0' )
                {
                    //更改状态
                    row.isback = '1'
                    row.realbackTime = new Date()
                    let url = `${HOST}/outgoing/registerstate`
                    //提交服务器
                    axios.post(url,row).then(()=>{

                    })
                }
                else if(row.ischeck === '0'&&row.isback === '0'){
                    this.$alert('尚未审核，外出请审核', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${ action }`
                            });
                        }
                    });
                }
                else {
                    this.$alert('已登记归来，请勿重复操作', {
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
                else  return null
            },
            //格式化审核状态
            formatischeck(val){
                return val === '1'?'已审核':'未审核'
            },
            //格式化审核状态
            formatisback(val){
                return val === '1'?'已归来':'未归来'
            },
            formatDatetime(val){
                if(val!=null) return makeDate(val)
                else  return '暂无'
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