<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>东软颐养中心</el-breadcrumb-item>
              <el-breadcrumb-item :to="{path:'/nurse'}">食品管理</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="search">
              <el-form :inline="true" :model="form" class="demo-form-inline">
                  <el-form-item label="菜名">
                      <el-input  v-model="form.foodname" placeholder="菜名"></el-input>
                  </el-form-item>
                  <el-form-item label="食物类别">
                      <el-input  v-model="form.foodlable" placeholder="清淡、无糖等"></el-input>
                  </el-form-item>
                  <el-form-item label="价格">
                      <el-input  v-model="form.price" placeholder="输入的价格以下"></el-input>
                  </el-form-item>
                  <el-form-item label="好吃吗">
                      <el-select v-model="form.ishalal">
                          <el-option label="--请选择--" value=""></el-option>
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="0"></el-option>
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
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="foodname"
                    label="菜名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="foodtype"
                    label="食物类别"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="foodlable"
                    label="食物标签"
                    width="200"
            >
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="价格"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    label="是否好吃"
                    width="120"
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.ishalal === 0 ">
                        <el-tag type="danger">
                            {{ scope.row.ishalal |formatishalal}}
                        </el-tag>
                    </span>
                    <span v-if="scope.row.ishalal === 1 ">
                        <el-tag type="success">
                            {{ scope.row.ishalal |formatishalal}}
                        </el-tag>
                    </span>
                </template>
            </el-table-column>
            <!--<el-table-column-->
                    <!--label="注册时间"-->
                    <!--width="250">-->
                <!--<template slot-scope="scope">-->
                    <!--<i class="el-icon-time"></i>-->
                    <!--<span style="margin-left: 10px">{{ scope.row.createTime | formatDate}}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button type="text" size="middle"  icon="el-icon-edit" @click="update(scope.row.foodid)">编辑</el-button>
                    <el-button type="text" size="middle" icon="el-icon-delete" @click="del(scope.row.foodid)">删除</el-button>
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
                    foodname:'',
                    foodlable:'',
                    price:'',
                    ishalal:'',
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
                let url =`http://localhost:8081/food/query/${this.currentPage}`
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

            update(foodid){

                this.$router.push(`/foodUpdate/${foodid}`)
            },
            del(foodid){
                console.log(foodid)
                this.$confirm('是否删除该记录?', '提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    let url =`http://localhost:8081/food/del/${foodid}`
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
                this.$router.push('/foodAdd')
            }
        },

        filters:{
            formatDate(val){
                return makeSimpleDate(val)
            },
            formatishalal(val){
                return val === 1?'是':'否'
            },
        }

    }
</script>

<style scoped>
    .search{
        margin-top: 15px
    }

</style>