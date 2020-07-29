<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>护理服务管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/huli'}">护理服务</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="search">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="护理名称">
                    <el-input  v-model="form.nursingName" placeholder="护理名称"></el-input>
                </el-form-item>
                <el-form-item label="护理级别">
                    <el-select  v-model="form.workNumber">
                        <el-option label="--请选择--" value=""></el-option>
                        <el-option label="一级护理" value="一级护理"></el-option>
                        <el-option label="二级护理" value="二级护理"></el-option>
                        <el-option label="三级护理" value="三级护理"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否增值服务">
                    <el-select  v-model="form.isRaise">
                        <el-option label="--请选择--" value=""></el-option>
                        <el-option label="是" value="是"></el-option>
                        <el-option label="否" value="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-select  v-model="form.status">
                        <el-option label="--请选择--" value=""></el-option>
                        <el-option label="启用" value="启用"></el-option>
                        <el-option label="不启用" value="不启用"></el-option>
                    </el-select>
                </el-form-item>
                <br>
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
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left"  class="demo-table-expand">
                        <el-form-item label="护理修改时间">
                            <span>{{ props.row.updateTime | formatDate }}</span>
                        </el-form-item>
                        <el-form-item label="护理描述">
                            <span>{{ props.row.description }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="护理编号"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="workNumber"
                    label="护理级别"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="nursingName"
                    label="护理名称"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="servicePrice"
                    label="护理价格（元）"
                    width="120"
            >
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="服务次数"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="isRaise"
                    label="是否增值服务"
                    width="120"
            >
            </el-table-column>
            <el-table-column
                    label="上线时间"
                    width="150">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.createTime | formatDate}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="状态"
                    width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px"><el-tag type="success">{{ scope.row.status}}</el-tag></span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="createBy"
                    label="护理人员"
                    width="120">
            </el-table-column>
            <el-table-column
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button type="text" size="middle"  icon="el-icon-edit" @click="update(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="middle" icon="el-icon-delete" @click="del(scope.row.id)">删除</el-button>
                    <el-button type="text" size="middle" @click="setStatus(scope.row)">设置</el-button>
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
    import ElTag from "element-ui/packages/tag/src/tag";
    export default {
        components: {ElTag},
        data(){
            return {
                loading:false,
                currentPage:1,
                PageInfo:{},
                form: {
                    nursingName: '',
                    workNumber: '',
                    isRaise: '',
                    status: '',
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
                let url=`${HOST}/huli/query/${this.currentPage}`
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
                    let url=`${HOST}/huli/del/${id}`
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
                this.$router.push(`/huliUpdate/${val}`)
            },
            setStatus(row){
                row.status=row.status==='启用'?'不启用':'启用'
                let url=`${HOST}/huli/update`
                axios.post(url,row).then(()=>{

                })
            },
            add(){
                this.$router.push('/huliAdd')
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