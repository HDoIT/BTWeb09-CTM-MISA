<template>
  <header-app @isActiveBtnHeader="(msg)=> isActiveSidebar = msg"></header-app>
  <side-bar :isActiveSidebar="isActiveSidebar"></side-bar>
  <main-app></main-app>
  <!-- <dialog-employee></dialog-employee> -->
</template>

<script>
// import DialogEmployee from './components/DialogEmployee.vue'
import HeaderApp from './components/layout/Header.vue'
import MainApp from './components/layout/MainApp.vue'
import SideBar from './components/layout/SideBar.vue'
export default {
  name: 'App',
  components: {
    // HelloWorld
    HeaderApp,
    SideBar,
    MainApp,
    // DialogEmployee
  },
  data() {
    return{
      isActiveSidebar: false
    }
  },

}
</script>

<style>

@import url('./style/components/Button.css');
@import url('./style/components/Input.css');
@import url('./style/components/Combobox.css');
:root{
    --mainColor: #EEEFF1;
    --btnColor: #7D1F8D;
    --btnHoverColor: #5E176A;
    --sidebarColor: #041434;
    --sidebarFirstColor: #A7C4FF16;
    --sidebarHoverColor: #27395E54;
    --thtableColor: #e5e8ec;
    --rowtableHoverColor: #F8F8F8;
    --cbbHoverColor: rgba(80,184,60,0.1);
    --tableColor: #c7c7c7;

    --heightBtn: 36px;
}

@font-face {
    font-family: test fonts;
    src: url(./assets/fonts/notosans-regular.2cb88a13.woff2);
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    max-height: 100vh;
}

#app{
    font-family: test fonts;
    font-size: 13px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
}

.mi{
    background: url('./assets/img/Sprites.64af8f61.svg');
    background-repeat: no-repeat;
    cursor: pointer;
}

.main{
    width: calc(100% - 200px);
    height: calc(100vh - 56px);
    background-color: var(--mainColor);
    /* padding-top: 80px; */
}

.header{
    width: 100%;
    height: 56px;
    display: flex;
}

.sidebar{
    width: 200px;
    height: calc(100vh - 56px);
    background-color: var(--sidebarColor);
    overflow: auto;
}

.mi-sort-down{
    background-position: -891px -359px;
	width: 28px;
	height: 18px;
}
.mi-sort-down-cbb{
    background-position: -1743px -301px;
}
/* input */
/* combobox */

a{
  text-decoration: none;
}

.mi-icon-dashboard{
    background-position: -33px -1630px;
    width: 18px;
	height: 20px;
}

.mi-icon-cash{
    background-position: -78px -1631px;
    width: 14px;
	height: 18px;
}

.mi-icon-bank{
    background-position: -121px -1633px;
    width: 16px;
	height: 16px;
}

.mi-icon-purchase{
    background-position: -165px -1632px;
	width: 16px;
	height: 18px;
}

.mi-icon-sale{
    background-position: -206px -1631px;
	width: 20px;
	height: 18px;
}

.mi-icon-invoice{
    background-position: -254px -1632px;
	width: 14px;
	height: 17px;
}

.mi-icon-stock{
    background-position: -294px -1632px;
	width: 18px;
	height: 17px;
}

.mi-icon-tool{
    background-position: -339px -1633px;
	width: 18px;
	height: 17px;
}

.mi-icon-fixed-assets{
    background-position: -382px -1632px;
	width: 17px;
	height: 18px;
}

.mi-icon-salary{
    background-position: -296px -1662px;
	width: 14px;
	height: 18px;
}

.mi-icon-tax{
    background-position: -427px -1634px;
	width: 16px;
	height: 16px;
}

.mi-icon-price{
    background-position: -471px -1633px;
	width: 17px;
	height: 17px;
}

.mi-icon-synthetic{
    background-position: -514px -1632px;
	width: 16px;
	height: 18px;
}

.mi-icon-budget{
    background-position: -382px -1664px;
	width: 16px;
	height: 16px;
}

.mi-icon-report{
    background-position: -552px -1636px;
	width: 14px;
	height: 13px;
}

.mi-icon-analysis{
    background-position: -207px -1667px;
	width: 17px;
	height: 14px;
}

/* icon main */


.mi-search{
    background-position: -89px -33px;
    position: absolute;
    right: 2%;
    top: 20%;
    width: 22px;
    height: 22px;
}

.mi-search:hover{
    background-position: -956px -31px;
}

.mi-reload{
    background-position: -425px -201px;
	width: 21px;
	height: 23px;
    margin: 0 6px;
}

.mi-reload:hover{
    background-position: -1098px -90px;
}
/* Icon header */


.mi-menu-icon{
    background-position: -428px -92px;
	width: 16px;
	height: 16px;
}

.mi-null{
    background-position: -1230px -638px;
	width: 120px;
	height: 66px;
}

.mi-navbar-icon-white{
    background-position: -316px -37px;
	width: 16px;
	height: 14px;
    display: none;
}

.mi-navbar-icon-black{
    background-position: -847px -35px;
	width: 16px;
	height: 14px;
    margin-right: 22px;
}

.mi-chevron-down{
    background-position: -935px -366px;
	width: 34px;
	height: 5px;
}

.mi-user{
    background-position: -352px -894px;
	width: 32px;
	height: 32px;
    border-radius: 50%;
    margin-left: 12px;
}

.mi-bell{
    background-position: -788px -30px;
	width: 22px;
	height: 25px;
    margin-right: 12px;
}

/* Icon Dialog */


.mi-icon-help{
    background-position: -732px -31px;
	width: 22px;
	height: 22px;
}

.mi-icon-times{
    background-position: -147px -147px;
	width: 18px;
	height: 18px;
}

[data-title]:hover:after {
    opacity: 1;
    transition: all 0.1s ease 0.5s;
    visibility: visible;
}
[data-title]:after {
    content: attr(data-title);
    background-color: #00FF00;
    color: #111;
    font-size: 150%;
    position: absolute;
    padding: 1px 5px 2px 5px;
    bottom: -1.6em;
    left: 100%;
    white-space: nowrap;
    box-shadow: 1px 1px 3px #222222;
    opacity: 0;
    border: 1px solid #111111;
    z-index: 99999;
    visibility: hidden;
}
[data-title] {
    position: relative;
}

</style>