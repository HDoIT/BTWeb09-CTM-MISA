<template>
  <the-header @isActiveBtnHeader="(msg)=> isActiveSidebar = msg"></the-header>
  <side-bar :isActiveSidebar="isActiveSidebar"></side-bar>
  <the-main @is-loading="c=> isLoading = c"></the-main>
  <div class="loading-container" v-if="isLoading">
    <div class="icon-loading"></div>
  </div>
  <!-- <dialog-employee></dialog-employee> -->
</template>

<script>
// import DialogEmployee from './components/DialogEmployee.vue'
import TheHeader from './components/layout/TheHeader.vue'
import TheMain from './components/layout/TheMain.vue'
import SideBar from './components/layout/SideBar.vue'
export default {
  name: 'App',
  components: {
    // HelloWorld
    TheHeader,
    SideBar,
    TheMain,
    // DialogEmployee
  },
  data() {
    return{
      isActiveSidebar: false,
      isLoading: false
    }
  },

}
</script>

<style>

@import url('./style/components/Button.css');
@import url('./style/components/Input.css');
@import url('./style/components/Combobox.css');
@import url('./style/components/Icon.css');

:root{
    --mainColor: #EEEFF1;
    /* --btnColor: #7D1F8D;
    --btnHoverColor: #5E176A; */
    --btnColor: #2ca01c;
    --btnHoverColor: #35bf22;
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

a{
    color: #0075c0;
    text-decoration: none;
}


#app{
    font-family: test fonts;
    font-size: 13px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
}

.main{
    width: calc(100% - 200px);
    height: calc(100vh - 56px);
    background-color: var(--mainColor);
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

.loading-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background:rgba(0,0,0,.1);
  /* background: transparent; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-container .icon-loading {
  background: url(./assets/loading.svg) no-repeat center;
  height: 40px;
  width: 40px;
  animation: loading linear 0.8s infinite;
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 
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
} */

</style>