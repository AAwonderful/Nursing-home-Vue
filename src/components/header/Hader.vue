<template>
    <div class="home">
        <div class="con">
            <span class="title" @click="index">东软颐养中心系统— —打造全球一流养老院，让您未来老无所依</span>

            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <span class="operate">{{userInfo.username}}</span>
            <el-button type="info" icon="el-icon-switch-button" circle @click="exit" ></el-button>
        </div>
    </div>

</template>

<script>
    export default {
        data(){
            return{
                userInfo: {
                    username: ''
                }
            }
        },
        created(){
            //从sessionStorage中取出用户并转成json对象
            this.userInfo = JSON.parse(sessionStorage.getItem("user"))
            console.log(this.userInfo)
        },
        methods:{
            exit(){
                this.$router.push('/login')
            },
        }

    }
</script>

<style scoped>
    .el-avatar--circle {
        border-radius: 50%;
        /* display: inline-block; */
        position: absolute;
        right: 150px;
        top: 15px;
    }
    .el-button{
        position: absolute;
        right: 80px;
        top: 15px;
    }
    .operate{
        color: #fff;
        position: absolute;
        right: 200px;
        font-size: 0.8em;
        font-weight: bold;
    }
    .con .title{
        font-weight: bold;
        font-size: 1.5em;
        color: #fff;
    }

</style>