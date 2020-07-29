<template>
    <div class="content" id="id1" style="float:left;width:100%;">
        <div id="id2" style="width:50%; float:left;">

            <el-form :model="food" :rules="rules" ref="food" label-width="100px" class="demo-ruleForm">
                <el-form-item label="早餐" prop="breakfast">
                    <el-input v-model="food.breakfast"></el-input>
                </el-form-item>
                <el-form-item label="午餐" prop="lunch">
                    <el-input v-model="food.lunch"></el-input>
                </el-form-item>
                <el-form-item label="晚餐" prop="dinner">
                    <el-input v-model="food.dinner"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div id="id3" style="width:50%; float:left;">
            <div>
                <Calendar
                        ref="Calendar"
                        :markDateMore="arr"
                        :markDate="arr2"
                        agoDayHide="1530115221"
                        v-on:choseDay="clickDay"
                        v-on:changeMonth="changeDate"
                >
                </Calendar>
            </div>
            <!--<el-dialog title="修改餐食" :visible.sync="dialogTableVisible" center :append-to-body='true' :lock-scroll="false" width="30%">-->
                <!--<Child :inputName="mychild"></Child>-->
            <!--</el-dialog>-->
        </div>
        <div id="id4" style=" float:left;">
            <el-form :model="food2" :rules="rules" ref="food2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="早餐" prop="breakfast">
                    <el-select v-model="food2.breakfast" placeholder="请选择早餐">
                        <el-option
                                v-for="item in options"
                                :key="item.foodid"
                                :label="item.foodname"
                                :value="item.foodname">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="午餐" prop="lunch">
                    <el-select v-model="food2.lunch" placeholder="请选午餐">
                        <el-option
                                v-for="item in options"
                                :key="item.foodid"
                                :label="item.foodname"
                                :value="item.foodname">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="晚餐" prop="">
                    <el-select v-model="food2.dinner" placeholder="请选晚餐">
                        <el-option
                                v-for="item in options"
                                :key="item.foodid"
                                :label="item.foodname"
                                :value="item.foodname">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item style="text-align:center">
                    <el-button type="primary" @click="addfood('food2')">添加</el-button>
                    <el-button type="primary" @click="submitForm('food2')">修改</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
    import  axios from 'axios'
    import Calendar from "vue-calendar-component";
    // import Child from './child';
    import {makeSimpleDate} from '../../common/js/dateformat.js'
    export default {
        data() {
            return {
                mychild:{
                    clientid:''
                },
                food:{
                    clientid:'',
                    breakfast:'',
                    lunch:'',
                    dinner:'',
                    date:'',
                },
                food2:{
                    clientid:'',
                    breakfast:'',
                    lunch:'',
                    dinner:'',
                    date:'',
                },
                search:{
                    clientid:'',
                    date:'',
                },
                // arr2: ['2018/6/23'],
                options:[],
                dialogTableVisible: false,
            };
        },
        components: {
            Calendar,

        },
        created() {
            this.food.clientid=this.$route.params.id;
            this.food2.clientid=this.$route.params.id;
            this.search.clientid=this.$route.params.id;
            this.search.date=makeSimpleDate(new Date());


            this.getCust();


            this.getData();
            function format(date, index) {
                date = new Date(date);
                return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`;
            }
            setTimeout(() => {
                this.arr = [
                    {
                        date: format(new Date(), 3),
                        className: "mark1"
                    },
                    {
                        date: format(new Date(), 12),
                        className: "mark2"
                    }
                ];
                this.arr.push({
                    date: format(new Date(), 15),
                    className: "mark1"
                });
            }, 300);
        },
        methods: {
            //查询当天的餐食
            getData(){
                this.loading=true
                let url =`http://localhost:8081/foodCalendar/selByDate`
                axios.post(url,this.search).then(res=>{
                    console.log(res.data),
                        this.food = res.data,
                        this.loading=false
                })
            },
            //查询所有的食物
            getCust(){
                let url = `http://localhost:8081/food/list`
                axios.get(url).then(res=>{
                    this.options = res.data
                })
            },
            clickDay(data) {
                this.search.date=makeSimpleDate(data);
                this.food2.date=makeSimpleDate(data);
                this.getData();
                console.log("选中", data); //选中某天
                this.$toast("选中了" + data);
            },
            changeDate(data) {
                this.$toast("切换到的月份为" + data);
                console.log("左右点击切换月份", data); //左右点击切换月份
            },
            demo() {
                this.$refs.Calendar.ChoseMonth("2018-12-13"); //跳到12月12日选中12月12日
            },
            addfood(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {//验证成功
                        //提交数据到服务器
                        let url = 'http://localhost:8081/foodCalendar/add'
                        axios.post(url,this.food2).then(res=>{
                            if(res.data.code == 200){
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                            }
                        })
                    }
                });
                this.getData();
            },
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {//验证成功
                        //提交数据到服务器
                        let url = 'http://localhost:8081/foodCalendar/updateByDate'
                        axios.post(url,this.food2).then(res=>{
                            if(res.data.code == 200){
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                            }
                        })
                    }
                });
                this.getData();
            }
        },

    };
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        text-align: center;
        width: 90%;
        margin: auto;
    }


    .wh_content_item > .wh_isMark {
        background: orange;
    }
    .wh_container >>> .wh_content_all {
        /* background-color: red; */
    }
</style>