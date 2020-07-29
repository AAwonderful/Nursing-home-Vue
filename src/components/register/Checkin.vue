<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>登记管理</el-breadcrumb-item>
            <el-breadcrumb-item>入住登记</el-breadcrumb-item>
            <el-breadcrumb-item>入住列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="search">
            <el-form :inline="true" :model="form" class="demo-form-inline">

                <el-form-item label="客户姓名：">
                    <el-input v-model="form.custName" placeholder="客户姓名"></el-input>
                </el-form-item>
                <el-form-item label="客户性别：">
                    <el-input v-model="form.custSex" placeholder="客户性别"></el-input>
                </el-form-item>
                <el-form-item label="婚姻状况：">
                    <el-input v-model="form.custMarry" placeholder="婚姻状况"></el-input>
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
            <!--展开行-->
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left"  class="demo-table-expand">
                        <el-form-item label="客户ID：">
                            <span>{{ props.row.custId}}</span>
                        </el-form-item>
                        <el-form-item label="身份证：">
                            <span>{{ props.row.custIdcard}}</span>
                        </el-form-item>
                        <el-form-item label="手机号:">
                            <span>{{ props.row.phone }}</span>
                        </el-form-item>
                        <el-form-item label="身高(cm):">
                            <span>{{ props.row.custTall }}</span>
                        </el-form-item>
                        <el-form-item label="体重(kg）:">
                            <span>{{ props.row.custWeight }}</span>
                        </el-form-item>
                        <el-form-item label="备注信息:">
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
                    prop="custName"
                    label="客户名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="custSex"
                    label="性别"
                    width="80">
            </el-table-column>
            <el-table-column
                    label="床位号"
                    width="80">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.bedId|formatbedId}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="入住时间"
                    width="120">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.checkinTime|formatDatetime}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="到期时间"
                    width="120">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.timeout|formatDatetime}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="custBlood"
                    label="客户血型"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="custMarry"
                    label="婚姻状况"
                    width="80">
            </el-table-column>
            <el-table-column
                    label="出生日期"
                    width="150">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.birthdate |formatDate}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="middle"  icon="el-icon-edit" @click="update(scope.row.custId)">编辑</el-button>
                    <el-button type="text" size="middle" icon="el-icon-delete" @click="del(scope.row.custId)">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    label="膳食">
                <template slot-scope="scope">
                    <el-button type="text" size="middle" @click="foodCalendar(scope.row.custId)">查看膳食日历</el-button>
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
                    custName:'',
                    custSex:'',
                    bedId:'',
                    checkinTime:'',
                    timeout:'',
                    birthdate:'',
                    custBlood:'',
                    custMarry:'',
                    phone:'',
                    custAge:'',
                    custIdcard:'',
                    custTall:'',
                    custWeight:'',
                    tips:'',

                }
            }
        },
        created(){
            this.getData()
        },
        methods:{
            //加载数据
            getData(){
                this.loading = true
                let url = `${HOST}/checkin/query/${this.currPage}`
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
                this.$router.push(`/checkinUpdate/${id}`)
            },
            //删除
            del(id){
                console.log(id)
                this.$confirm('是否删除该记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url = `${HOST}/checkin/del/${id}`
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
                this.$router.push("/CheckinAdd")
            },
            //查询
            query(){
                this.currPage = 1
                this.getData()
            },
            //跳转到膳食日历
            foodCalendar(id){
                console.log(id)
                //跳转路由到修改，传递主键
                this.$router.push(`/calendar/${id}`)
            },

        },
        //过滤器
        filters:{
            //日期转换
            formatDate(val){
                if(val!=null)  return makeSimpleDate(val)
                else  return '暂无'
            },
            formatDatetime(val){
                if(val!=null) return makeDate(val)
                else  return '暂无'
            },
            formatbedId(val)
            {
                if(val == 0) return '已退房'
                else if(val == null)  return '未入住'
                else return val
            }
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