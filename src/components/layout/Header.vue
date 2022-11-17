<template>
    <div class="header">
        
        <div class="header__logo" :class="{active: isActiveSidebar}">
            <div class="mi mi-menu-icon"></div>
            <div class="logo">
                <img src="../../assets/img/Logo_Module_TiengViet_White.66947422.svg" alt="">
            </div>
            <div class="mi mi-navbar-icon-white btn__navbar--open"  @click="handelClickExpandCollapseSidebar()"></div>
        </div>
        <div class="header__content">
            <div class="header__content--left">
                <div class="mi mi-navbar-icon-black btn__navbar--close" @click="handelClickExpandCollapseSidebar()"></div>
                 Công ty TNHH Sản xuất- Thương mại - HD 
                 <div class="mi mi-chevron-down"></div>
            </div>
            <div class="header__content--right">
                <div class="menu__header">
                    <div class="mi mi-bell"></div>
                </div>
                <div class="mi mi-user"></div>
                <span>Lê Hữu Độ</span>
            </div>
        </div>

    </div>
</template>

<script>

// import HelloWorld from './HelloWorld.vue';

export default {
    name: "HeaderApp",
    components:{ 
        // HelloWorld 
    },
    props: ["label"],
    emits:["isActiveBtnHeader"],
    methods:{
        handelClickExpandCollapseSidebar(){
            this.isActiveSidebar = !this.isActiveSidebar;
            this.$emit("isActiveBtnHeader", this.isActiveSidebar)
        }
    },
    data() {
        return {
            isActiveSidebar: false
        }
    },
}
</script>

<style scoped>
@import url('../../style/layout/Header.css');
</style>
    