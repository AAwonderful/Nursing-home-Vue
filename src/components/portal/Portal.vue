<template>
    <div>
        <span>本文档是根据颐养中心的工作流程进行充分调研和整理出来的。</span>
        <span>  描述最终用户在本系统中对于老人在办理入住、退住、膳食管理、护理管理等处理流程和业务需求的文档。</span>
            <el-divider></el-divider>
        <span> 本文档的主要目的一方面是指导学员了解最终的业务需求，另一方面是作为后续开发设计的业务需求指导文档。</span>
        <div>
            <span class="demonstration"></span>
            <el-image :src="require('../../assets/portalpic.jpg')" fit="cover"></el-image>
        </div>
    </div>
</template>

<script>
    export default {
        name: "portal"
    }
</script>

<style scoped>

</style>