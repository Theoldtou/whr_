<template>
        <el-container class="home-container">
            <!-- 头部布局 -->
            <el-header>
                <div>
                    <img class="img_1" src="../assets/10.jpg" alt="">
                    <span>电商后台管理系统</span>
                </div>
                <el-button type="info" @click="logout">退出</el-button></el-header>
            <!-- 页面主题布局 -->
            <el-container>
                <!-- 侧边栏 -->
                <el-aside :width="isCollapse ? '64px' :'200px'">
                    <div class="toggle-button" @click="toggleCollapse">|||</div>
                    <!-- 侧边栏菜单 -->
                    <el-menu
                    background-color="#333744"
                    text-color="#fff"
                    active-text-color="#409EFF"
                    unique-opened
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    router
                    :default-active="activePath"
                    >
                        <!-- 一级菜单 -->
                        <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
                            <!-- 一级菜单模板区 -->
                                <template slot="title">
                                    <!-- 图标 -->
                                    <i :class="iconsObj[item.id]"></i>
                                    <!-- 文本 -->
                                    <span>{{item.authName}}</span>
                                </template>
                                <!-- 二级菜单 -->
                                <el-menu-item :index="'/'+ subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/'+ subItem.path)">
                                    <template slot="title">
                                    <!-- 图标 -->
                                    <i class="el-icon-location"></i>
                                    <!-- 文本 -->
                                    <span>{{subItem.authName}}</span>
                                </template>
                                </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <!-- 右侧 -->
                <el-main>
                    <!-- 路由占位符 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

</template>

<script>
export default {
     data() {
        // 左侧菜单数据
        return {
            menulist:[],
            iconsObj:{
                '125':'el-icon-user-solid',
                '103':'el-icon-s-platform',
                '101':'el-icon-s-shop',
                '102':'el-icon-document',
                '145':'el-icon-folder-opened',
            },
            //是否折叠
            isCollapse:false,
            //被激活得链接地址
            activePath:''
        }
    },
    created(){
        this.getMenuList()
        this.activePath=window.sessionStorage.getItem('activePath')
    },
    methods: {
        logout(){
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        //所有菜单
      async getMenuList() {
         const{data:res}=  await this.$http.get('menus')
        //  if(res,meta.status !==200) return this.$message.error(res.meta.msg)
        //  this.menulist=res.data
        if(res.meta.status !==200)return this.$message.error(res.meta.msg)
        this.menulist=res.data
        console.log(res);
        
        },
        //点击按钮  折叠展开
        toggleCollapse(){
            this.isCollapse=!this.isCollapse
        },
        // 保存链接得激活状态
        saveNavState(activePath){
            window.sessionStorage.setItem('activePath',activePath)
            this.activePath=activePath
        }
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.home-container{
    height: 100%;
}
.el-header {
    background-color: #373d41;
    display: flex;
    justify-content:space-between ;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    div{
        display: flex;
        align-items: center;
        span{
            margin-left: 15px;
        }
    }
  }
.el-aside{
      background-color: #373d41;
      .el-menu{
          border-right: none;
          
      } 
  }
.el-main{
    background-color: #eaedf1;
}


.img_1{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.iconfont{
    margin-right: 10px;
}

.toggle-button{
    background-color:#4A5064 ;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}


//  var checkEmail =(rule,value,cb) =>{
//                 const regEmail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
//                 if(regEmail.test(value)){
//                     return cb()
//                 }
//                 cb(new Error('请输入合法的邮箱'))
//             },
//             // 验证手机号码
//           var checkMobile =(rule,value,cb)=>{
//                const regMobile=/^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
//                if(regMobile.test(value)){
//                    return cb()
//                }
//                cb(new Error('请输入正确手机号'))
//           },
</style>









