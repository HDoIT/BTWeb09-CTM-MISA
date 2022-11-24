<template>
        <div class="alert">
            <div class="alert__form--title">
                <div class="mi" :class="{'mi-warning': isAlertWarning,'mi-dangerous': isAlertNull,'mi-question': isQuestion}"></div>
                <div class="text-error">
                    <slot></slot>
                </div>
            </div>
            <hr>
            <div class="alert__form--bottom" :class="{r: isAlertWarning, m: isAlertNull, 'flex-between': isQuestion}">
                <div class="btn btn__close--warning btn__white" v-if="isQuestion" @click="closeAlert()">Hủy</div>
                <div class="save">
                    <div class="btn btn__close--warning btn__white" v-if="isQuestion" @click="closeForm()">Không</div>
                    <div class="btn btn__close--warning" @click="isQuestion ? saveUpdate() : closeAlert()">{{isQuestion ? 'Có' : 'Đồng ý'}}</div>     
                </div>
            </div>
        </div>
</template>

<script>
export default {
    emits:["showAlert"],
    props:{
        isAlertNull: {
            type: Boolean,
            default: false
        },
        isAlertWarning: {
            type: Boolean,
            default: false
        },
        isQuestion:{
            type: Boolean,
            default: false
        },
        closeForm:{
            type: Function
        },
        saveUpdate:{
            type: Function
        }
    },
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
.save{
    display: flex;
    gap: 8px;
}
.mi-warning{
    background-position: -598px -463px;
	width: 36px;
	height: 37px;
}

.mi-dangerous{
    background-position: -752px -462px;
	width: 36px;
	height: 36px;
}

.mi-question{
    background-position: -832px -462px;
	width: 36px;
	height: 36px;
}

.alert{
    background-color: #fff !important;
    border-radius: 4px;
    padding: 32px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    width: 450px;
}

.alert__form--title{
    display: flex;
    align-items: center;
    gap: 24px;
    padding-bottom: 4px;
    padding-right: 24px;
}

.alert__form--bottom{
    padding-top: 4px;
    display: flex;
}

.r{
    justify-content: flex-end;
}

.m{
    justify-content: center;
}

.flex-between{
    justify-content: space-between;
}

</style>