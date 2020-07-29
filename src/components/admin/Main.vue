<template>
    <div id="app">
        <el-container>
            <el-header><Header/></el-header>
            <el-container>
                <el-aside width="200px">
                    <Menu/>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>

</template>

<script>
    import Header from '../header/Hader'
    import Menu from '../menu/Menu'
    export default {
        components:{
            Header,
            Menu
        }
    }
</script>

<style>
    /** 清除内外边距 **/
    body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, /* structural elements 结构元素 */
    dl, dt, dd, ul, ol, li, /* list elements 列表元素 */
    pre, /* text formatting elements 文本格式元素 */
    form, fieldset, legend, button, input, textarea, /* form elements 表单元素 */
    th, td /* table elements 表格元素 */
    {
        margin: 0;
        padding: 0;
    }

    .el-container {
        height: 100vh;
        min-height: 600px;
    }

    .el-header {
        background-color: cornflowerblue;
        /*background-color: #314057;*/
        line-height: 75px;
        height: 75px !important;
    }
    .el-aside{
        width: 220px !important;
        height: 100%;
        background-color: #545c64;
    }

    .el-main{
        padding: 10px !important;
    }
</style>
