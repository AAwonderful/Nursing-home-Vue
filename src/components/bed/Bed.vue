<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>床位管理</el-breadcrumb-item>
            <el-breadcrumb-item>床位列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="search">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="院名">
                    <el-input v-model="form.community" placeholder="院名"></el-input>
                </el-form-item>
             <!--   <el-form-item label="客户名称">
                    <el-select v-model="form.id">
                        <el-option label="&#45;&#45;请选择&#45;&#45;" value=""></el-option>
                        <el-option v-for="item in options"
                                   :label="item.name"
                                   :value="item.bedId"
                                   :key="item.id" />
                    </el-select>
                </el-form-item>-->
                <el-form-item>
                    <el-date-picker
                            v-model="form.startDate"
                            type="date"
                            placeholder="起始日期">
                    </el-date-picker>
                    至
                    <el-date-picker
                            v-model="form.endDate"
                            type="date"
                            placeholder="终止日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="query">查询</el-button>
                    <el-button type="primary" icon="el-icon-edit" circle @click="add"></el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
                :data="pageInfo.list"
                border
                style="width: 100%">
            <el-table-column
                    type="index"
                    label="序号"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="community"
                    label="院名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="building"
                    label="楼栋(栋)"
                    width="120"
            >
            </el-table-column>
            <el-table-column
                    prop="floor"
                    label="单元"
                    width="120"
            >
            </el-table-column>
            <el-table-column
                    prop="room"
                    label="房间号"
                    width="120"
            >
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="床位号"
                    width="120"
            >
            </el-table-column>
            <el-table-column
                    prop="custName"
                    label="客户"
                    width="120"
            >
            </el-table-column>
            <el-table-column
                    label="创建日期"
                    width="130">
                <template slot-scope="scope">
                    <span>{{ scope.row.crateDate | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="状态"
                    width="100">
                <template slot-scope="scope">
                    <span v-if="scope.row.state === '0' ">
                        <el-tag type="success">
                            {{ scope.row.state |formatStatus}}
                        </el-tag>
                    </span>
                    <span v-if="scope.row.state === '1' ">
                        <el-tag type="danger">
                            {{ scope.row.state |formatStatus}}
                        </el-tag>
                    </span>
                </template>
            </el-table-column>

            <el-table-column
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button type="text" size="middle"  icon="el-icon-edit" @click="update(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="middle" icon="el-icon-delete" @click="del(scope.row.id)">删除</el-button>
                  <!--  <el-button type="text" size="small" @click="setStatus(scope.row)">设置</el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                @current-change="handCurrentChange"
                layout="total,prev,pager,next"
                :page-size="pageInfo.pageSize"
                :total="pageInfo.total">
        </el-pagination>
    </div>
</template>

<script>
    import {makeSimpleDate} from '../../common/js/dateformat'
    import {HOST} from '../../common/js/config'
    import axios from 'axios'
    export default {
        data(){
            return{
                currPage:1,  //当前页
                pageInfo:{} ,//查询的数据
                form:{
                    community:'',
                    id:'',
                    floor:'',
                    room:'',
                    startDate: '',
                    endDate: '',
                    crateDate:'',
                    custName:'',
                    state:'',
                }
            }
        },
        created(){
            this.getData()
        },
        methods:{

            //加载数据
            getData(){
                let url = `${HOST}/bed/query/${this.currPage}`
                axios.post(url,this.form).then(res=>{
                    this.pageInfo = res.data
                })
            },
            //页面跳转
            handCurrentChange(val){
                this.currPage=val
                this.getData()
            },
            //查询
            query(){
                this.currPage=1
                this.getData()

            },
            //设置状态
            /*setStatus(row){
                //更改状态
                row.state = row.state === '0'?'1':'0'
                let url = `${HOST}/bed/update`
                //提交服务器
                axios.post(url,row).then(()=>{

                })
            },*/
            //修改
            update(id){
                this.$router.push(`/bedUpdate/${id}`)
            },
            //删除
            del(id){
                console.log(id)
                this.$confirm('是否删除该纪录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let url = `${HOST}/bed/del/${id}`
                    axios.get(url).then(res=>{
                        if(res.data.code==200){
                            this.$message({
                                message:'操作成功',
                                type:'success'
                            });
                            this.currPage=1
                            this.getData()
                        }
                    })
                });
            },
            //新增
            add(){
                this.$router.push("/bedAdd")
            }
        },
        filters:{
            formatDate(val){
                return makeSimpleDate(val)
            },
            //格式化状态
            formatStatus(val){
                return val==='0'?'空余':'已住'
            }
        }

    }
</script>

<style scoped>
    .search{
        margin-top: 15px
    }

</style>