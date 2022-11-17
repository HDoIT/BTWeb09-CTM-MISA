<template>
        <div class="alert" v-show="closeAlert">
            <div class="alert__form--title">
                <div class="mi mi-warning"></div>
                <div class="text-error">
                    <slot></slot>
                </div>
            </div>
            <hr>
            <div class="alert__form--bottom">
                <div class="btn btn__close--warning" @click="closeAlert()">Đồng ý</div>
            </div>
        </div>
</template>

<script>
export default {
    emits:["showAlert"],
    data() {
        return {
            isShowAlert: false,
        }
    },
    methods: {
        closeAlert(){
            this.isShowAlert = false;
            this.$emit("showAlert",this.isShowAlert);
        }
    },
}
</script>

<style scoped>

.mi-warning{
    background-position: -598px -463px;
	width: 36px;
	height: 37px;
}

.alert{
    background-color: #fff;
    border-radius: 4px;
    padding: 32px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}

.alert__form--title{
    display: flex;
    align-items: center;
    gap: 24px;
    padding-bottom: 24px;
    padding-right: 24px;
}

.alert__form--bottom{
    padding-top: 12px;
    display: flex;
    justify-content: flex-end;
}

</style>