<template > 
        
        <div class="context__menu" v-if="show" :style="{'top': top+ 'px','left': left+'px'}" >  
            <ul class="context__menu--item">
                <li>Nhân bản</li>
                <li @click="handelClickDeleteEmployee(idDelete,pageSize,pageNumber)">Xóa</li>
                <li>Ngưng sử dụng</li>
            </ul>
        </div>
      <div class="main" >
        <div class="container__main">
            <div class="header__main">
                <div class="title__main">
                    <p>Nhân viên</p>
                    <button class="btn btn__add" @click="handelClickOpenDialog(pageSize,pageNumber)">Thêm mới nhân viên</button>
                </div>
            </div>
            <div class="container__main--top">
                <div class="button-left">
                    <div class="delete" v-show="isMultipleDelete2">
                        <div class="btn-delete">Thực hiện xóa hàng loạt</div>
                    </div>
                </div>
                <div class="button-list">
                    <div class="search">
                        <input type="text" id="input-search" class="input-search" placeholder="Tìm kiếm nhân viên" v-model="keyWord" @input="hanldeChangeInput"/>
                        <div class="mi mi-search"></div>
                    </div>
                    <div class="mi mi-reload" @click="clickReload()"></div>
                </div>
                <div class="right"></div>
            </div>
            <div class="tbl-employee">
                <!-- <the-loader></the-loader> -->
                <table-employee 
                    :listEmployees="posts"
                    @onClickEditEmployee="onClickEditEmployee"
                    @showContextMenu="(sh)=>show = sh"
                    @handelDeleteEmployee="deleteEmployee"
                    :clickGetPosition="getPositionContext"
                    @topContext="(c)=>top = c"
                    @leftContext="(c)=>left = c"
                    @employeeId="(c)=>idDelete = c"
                    :pageSize="pageSize"
                    :totalRc="count"
                    :pageNumber="pageNumber"
                    :listCheckbox="listCheckbox"
                ></table-employee>
                <!-- <div class="margin__right"> -->
                    
            </div>
            <div class="container__main--bottom bottom-2" v-if="emplNull">
                    <div class="no-data">
                        <div class="mi mi-null"></div>
                        <p>Không có dữ liệu</p>
                    </div>
                    <div class="right__bot" style="height:200px"></div>
            </div>
            <div class="container__main--bottom" v-if="bottomNull">
                <div class="total">Total: <b>{{count}}</b> record</div>
                <div class="paging">
                    <div class="paging__combobox">
                        <div class="combobox">
                            <input type="text" class="input combobox__input input__paging" :value="pageSize + ' bản ghi trên 1 trang'" disabled>
                            <button class="combobox__button cbb__paging mi mi-sort-down-cbb" @click="handelClickToggleCombobox()"></button>
                            <div class="combobox__data combobox__paging" v-bind:class="{active: isActiveCombobox}">
                                <div class="data-item" :class="{active: isSelectNumberOfPage[index]}" v-for="(item, index) in listNumberOfPage" :key="index" @click="handelClickSelectPageSize(keyWord,item.value,index)">
                                    <label for="data-item-1" >{{item.value}} bản ghi trên 1 trang</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="paging__number">
                        <button class="btn__paging--prev" @click="prevPage(pageSize,pageNumber)" :disabled="isPrevPage">Trước</button>
                        <button v-for="n in totalPage" :key="n" class="btn__paging" :class="{active: isSelectPage[n]}" @click="selectPage(pageSize,n)">{{n}}</button>
                        <button class="btn__paging--prev" @click="nextPage(pageSize,pageNumber)" :disabled="isNextPage">Sau</button>
                    </div>
                    <div class="paging__button"></div>
                    <div class="right__bot"></div>
                </div>
            </div>
        </div>
    </div>
        <dialog-employee
                v-if="employeeDetail.isShowFormEmployeeDetail"
                :loadData="loadDataWithPaging"
                :pageSize="pageSize"
                :pageNumber="pageNumber"
                :employeeFilter="keyWord"
                :selectComboboxActive="selectComboboxActive"
                :typeForm="employeeDetail.typeSubmit"
                :employeeId="employeeDetail.employeeID"
                :handelClickCloseDialog="closeForm"
                :handelClickOpenDialog="openForm"
            >
        </dialog-employee>
        <!-- <div class="dialog__form--update" v-show="isActiveDialogUpdate">
        <dialog-employee-update @isActiveShowUpd="(c)=> isActiveDialogUpdate = c"
            :loadData="loadDataWithPaging"
            :pageSize="pageSize"
            :pageNumber="pageNumber"></dialog-employee-update>
    </div> -->

</template>

<script>
// import axios from 'axios';
import TableEmployee from '../base/Table.vue';
import DialogEmployee from '../base/DialogEmployee.vue';
import {listNumberOfPage} from '../../i18ncomponent/i18n'
import EmployeeAction from '../../action/EmployeeAction.js';
// import DialogEmployeeUpdate from '../../components/base/DialogEmployeeUpdate.vue';
import formatDate from '../../untils/formatDate';
// import TheLoader from '../common/loader/Loader.vue'
export default {
    components:{
        TableEmployee,
        DialogEmployee,
        // DialogEmployeeUpdate
        // TheLoader
    },
    props:{
        
    },

    // formatDate:[formatDate],
    data() {
        return {
            isCheck: false,
            posts: [],
            error: [],
            count: 0, 
            isActiveDialog: false,
            isActiveDialogUpdate: false,
            isActiveCombobox: false,
            pageSize: 10,
            pageNumber: 1,
            totalPage: 0,
            buttonPageNumber: [],
            listNumberOfPage: listNumberOfPage,
            isSelectPage: [],
            isSelectNumberOfPage: [],
            isNextPage: false,
            isPrevPage: false,
            idEmployee: '',
            showContextMenu: false,
            top: 0,
            left: 0,
            show: false,
            idDelete: '',
            isMultipleDelete: [],
            isMultipleDelete1: false,
            isMultipleDelete2: false,
            formatDate,
            employeeDetail: {
                employeeID: "",
                typeSubmit: "",
                isShowFormEmployeeDetail: false,
            },
            keyWord:"",
            emplNull: false,
            bottomNull: true,
            listCheckbox: []
        }
    },  
    computed: {
        style(){
            return {
                top: this.top + 'px',
                left: this.left + 'px',
            }
        },
        
    },  
    methods:{
        closeForm(){
            this.employeeDetail.isShowFormEmployeeDetail = false
        },

        openForm(){
            this.employeeDetail.isShowFormEmployeeDetail = true
        },

        close(){
            this.show = false;
            this.left = 0,
            this.top = 0
        },

        openContextMenu(id){
            console.log(id);
            this.show = true;
            this.idDelete = id;
        },

        closePagination(){
            this.isActiveCombobox = false;
        },

        handelClickOpenDialog(pageSize,pageNumber){
            this.employeeDetail.isShowFormEmployeeDetail = true;
            this.pageSize = pageSize;
            this.pageNumber = pageNumber;
            this.employeeDetail.typeSubmit = "ADD";
            this.employeeDetail.employeeID = "";
        },

        handelClickUpdate(){
            this.isActiveDialogUpdate = true;
        },

        handelClickToggleCombobox(){
            this.isActiveCombobox = !this.isActiveCombobox;
        },

        handelClickSelectPageSize(keyword,value,idx){
            this.pageSize = value;
            this.loadDataWithPaging(this.keyWord,this.pageSize,this.pageNumber);
            this.selectComboboxActive(idx)
            this.isActiveCombobox = false
            this.isSelectPage[1] = true
            this.loadDataWithPaging(keyword,this.pageSize,1)
        },

        selectComboboxActive(idx){
            for(let i = 0; i<this.listNumberOfPage.length; i++){
                this.isSelectNumberOfPage[i] = false
            }
            this.isSelectNumberOfPage[idx] = true;
        },

        hanldeChangeInput(e) {
            this.keyWord = e.target.value
            this.loadDataWithPaging(this.keyWord,this.pageSize,1)
            console.log(this.keyWord);
        },

        clickReload() {
            this.pageSize = 10;
            this.pageNumber = 1;
            this.keyWord = "";
            this.loadDataWithPaging(this.keyWord,this.pageSize, this.pageNumber);
        },

        handelClickUpdateEmployee(id,pageSize,pageNumber){
            // this.isActiveDialogUpdate = true;
            this.isActiveDialog = true;
            this.idEmployee = id;
            console.log(id,this.idEmployee);
            this.pageSize = pageSize;
            this.pageNumber = pageNumber;
            this.typeForm = "EDIT";
        },

        handelClickDeleteEmployee(id,pageSize,pageNumber){
            EmployeeAction.deleteEmployee(id).then(
                res=>{
                    console.log(res);
                    this.loadDataWithPaging(this.keyWord,pageSize,pageNumber)
                    this.show = false;
                }
            )
        },

        loadDataWithPaging(keyWord,pageSize,pageNumber){
            console.log("a",keyWord);
            EmployeeAction.getAllPaging(keyWord,pageSize,pageNumber)
            .then(response =>{
                    this.posts = [... response.data.Data]
                    this.count = response.data.TotalRecord
                    this.totalPage = response.data.TotalPage
                    this.$emit('countEmp', this.count)
                    this.pageSize = pageSize
                    this.pageNumber = pageNumber
                    if (pageNumber === this.totalPage) {
                        this.isNextPage = true;
                    }
                    else{
                        this.isNextPage = false;
                    }
                    if (pageNumber === 1) {
                        this.isPrevPage = true;
                    }
                    else{
                        this.isPrevPage = false;
                    }
                    this.emplNull= false,
                    this.bottomNull= true
                })
                .catch(e => {
                    console.log("Không tìm thấy nhân viên",e);
                    this.posts = [];
                    this.emplNull=true
                    this.bottomNull = false
                })
        },

        selectPage(pageSize,pageNumber){
            for(let i = 1; i<=this.totalPage; i++){
                this.isSelectPage[i] = false
            }
            this.listCheckbox =[]
            this.isSelectPage[pageNumber] = true
            this.loadDataWithPaging(this.keyWord,pageSize,pageNumber);
            console.log(this.isCheck);
        },

        nextPage(pageSize,pageNumber){
            pageNumber = this.pageNumber + 1;
            this.selectPage(pageSize,pageNumber);
            this.loadDataWithPaging(this.keyWord,pageSize,pageNumber);
            
        },
        
        prevPage(pageSize,pageNumber){
            pageNumber = this.pageNumber - 1;
            this.selectPage(pageSize,pageNumber);
            this.loadDataWithPaging(this.keyWord,pageSize,pageNumber);
        },

        onClickEditEmployee(employeeID) {
            console.log("employeeID main:", employeeID);
            const { employeeDetail } = this;
            employeeDetail.employeeID = employeeID;
            employeeDetail.typeSubmit = "EDIT";
            employeeDetail.isShowFormEmployeeDetail = true;
            console.log(employeeDetail.typeSubmit);
        },
    },
    created() {
        this.loadDataWithPaging(this.keyWord,this.pageSize,this.pageNumber);
        this.isSelectPage[1] = true;
        this.isSelectNumberOfPage[0]= true;
        // console.log(formatDate("2022-10-11"));
    },
}
</script>

<style scoped>

@import url('../../style/layout/MainApp.css');
@import url('../../style/components/Table.css');
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