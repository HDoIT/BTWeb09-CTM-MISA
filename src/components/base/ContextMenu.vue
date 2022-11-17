<template @blur="close">
    <div class="context__menu" v-show="show" :style="style" ref="context">
            <slot></slot>
    </div>
</template>

<script>
export default {
    props:{
        display: Boolean
    },
    data() {
        return {
            top: 0,
            left: 0,
            show: false
        }
    },
    computed: {
        style(){
            return {
                top: this.top + 'px',
                left: this.left + 'px',
            }
        }
    },
    methods: {
        close(){
            this.show = false;
            this.left = 0,
            this.top = 0
        },
        open(evt){
            this.left = (evt.clientX) -100;
            this.top = evt.clientY;
            this.show = !this.show;
        }
    },
}
</script>

<style>

.context__menu{
    position: fixed !important;
    top: 20px;
    z-index: 1000;
}

.context__menu--item{
    margin-top: 12px;
    right: 100px;
    background-color: #fff;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    border-radius: 2px;
    z-index: 1000;
    cursor: pointer;
    border: 2px solid var(--tableColor);
}

.context__menu--item li{
    padding: 8px;
}

.context__menu--item li:hover{
    background-color: var(--tableColor);
}

.context__menu--item.active{
    display: block;
}

ul{
    list-style: none;
}
</style>