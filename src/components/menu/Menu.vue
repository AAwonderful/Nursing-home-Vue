<template>
    <div>
        <el-menu
                :default-active="active"
                class="el-menu-vertical"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
        >
            <el-menu-item index="1">
                <i class="el-icon-s-home"></i>
                <span slot="title" @click="toindex">首页</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-notebook-2"></i>
                    <span>东软颐养中心</span>
                </template>

                <el-menu-item-group>
                    <el-menu-item index="1-1" @click="nurse"><i class="el-icon-user-solid"></i>员工管理</el-menu-item>
                    <el-menu-item index="1-2" @click="bed"><i class="el-icon-first-aid-kit"></i>床位管理</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-3">
                    <template slot="title"><i class="el-icon-message-solid"></i>护理服务管理</template>
                    <el-menu-item index="1-3-1" @click="hl">护理服务</el-menu-item>
                    <el-menu-item index="1-3-2" @click="hlwork">服务办理</el-menu-item>
                </el-submenu>
                <el-submenu index="1-4">
                    <template slot="title"><i class="el-icon-s-check"></i>登记管理</template>
                    <el-menu-item index="1-4-1" @click="checkin">入住登记</el-menu-item>
                    <el-menu-item index="1-4-2" @click="checkout">退住登记</el-menu-item>
                    <el-menu-item index="1-4-3" @click="outgoing">外出登记</el-menu-item>
                </el-submenu>
                <el-submenu index="1-5">
                    <template slot="title"><i class="el-icon-fork-spoon"></i>膳食管理</template>
                    <el-menu-item index="1-5-1" @click="food">餐食</el-menu-item>

                </el-submenu>
            </el-submenu>

            <!--<el-menu-item index="3">
                <i class="el-icon-s-release"></i>
                <span slot="title" @click="logout">退出</span>
            </el-menu-item>-->

        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "menu",
        methods:{
            toindex(){
                this.$router.push('/')
            },
            nurse(){
                this.$router.push('/nurse')
            },
            hl(){
                this.$router.push('/huli')
            },
            hlwork(){
                this.$router.push('/hlWork')
            },
            bed(){
                this.$router.push('/bed')
            },
            checkin(){
                this.$router.push('/checkin')
            },
            checkout(){
                this.$router.push('/checkout')
            },
            outgoing(){
                this.$router.push('/outgoing')
            },
            food(){
                this.$router.push('/food')
            },
            foodcalendar(){
                this.$router.push('/clientList')
            }
        }
    }
</script>

<style scoped>
    .el-menu-vertical {
        min-height: 600px;
    }
</style>