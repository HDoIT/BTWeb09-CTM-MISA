<template > 
        
        <div class="context__menu" v-if="show" :style="{'top': top+ 'px','left': left+'px'}" >  
            <ul class="context__menu--item">
                <li>Nhân bản</li>
                <li @click="handelClickDeleteEmployee()">Xóa</li>
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
                    <div class="delete" v-show="isMultipleDelete">
                        <div class="btn-delete">Thực hiện xóa hàng loạt</div>
                    </div>
                </div>
                <div class="button-list">
                    <div class="search">
                        <input type="text" id="input-search" class="input-search" placeholder="Tìm kiếm nhân viên" v-model="keyWord" @keyup.enter="handelSearch()"/>
                        <div class="mi mi-search"  @click="handelSearch()"></div>
                    </div>
                    <div class="mi mi-reload" @click="clickReload()"></div>
                </div>
                <div class="right"></div>
            </div>
            <div class="tbl-employee">
                <!-- <the-loader></the-loader> -->
                <the-table 
                    @onClickEditEmployee="onClickEditEmployee"
                    @showContextMenu="(sh)=>show = sh"
                    @handelDeleteEmployee="deleteEmployee"
                    @showMultipleDelete="(c)=>isMultipleDelete = c"
                    @topContext="(c)=>top = c"
                    @leftContext="(c)=>left = c"
                    @employeeId="(c)=>idDelete = c"
                    @employeeCode="(c)=>employeeCode = c"
                    :listEmployees="posts"
                    :clickGetPosition="getPositionContext"
                    :pageSize="pageSize"
                    :totalRc="count"
                    :pageNumber="pageNumber"
                    :listCheckbox="listCheckbox"
                    :isCheck="isCheck"
                    :listDepartment="listDepartment"
                    :isLoadingTr="isLoadingTr"
                >
                </the-table>
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
                <div class="total">Tổng số: <b>{{count}}</b> bản ghi</div>
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

                        <button class="btn__paging--prev" :class="{'active' : (pageNumber != 1)}" @click="prevPage(pageSize,pageNumber)" :disabled="isPrevPage">Trước</button>

                        <button class="btn__paging" @click="selectPage(pageSize,1)" v-if="pageNumber > 3"> {{pages[0]}}</button>
                        <li class="page__dots" v-if="pageNumber > 3">...</li>

                        <button class="btn__paging" v-for="currentPage of displayedPages" :key="currentPage" @click="selectPage(pageSize,currentPage)" :class="{'active' : (pageNumber === (currentPage))}">{{currentPage}}</button>

                        <li class="page__dots" v-if="pageNumber < pages.length - 2">...</li>
                        <button class="btn__paging" v-if="pageNumber < pages.length - 2" @click="selectPage(pageSize,pages.length)"> {{pages[pages.length - 1]}}</button>

                        <button class="btn__paging--prev" @click="nextPage(pageSize,pageNumber)" :disabled="isNextPage">Sau</button>
                        <!-- <button class="btn__paging--prev" @click="prevPage(pageSize,pageNumber)" :disabled="isPrevPage">Trước</button>
                        <button v-for="n in (totalPage =5)" :key="n" class="btn__paging" :class="{active: isSelectPage[n]}" @click="selectPage(pageSize,n)">{{n}}</button>
                        <button class="btn__paging--prev" @click="nextPage(pageSize,pageNumber)" :disabled="isNextPage">Sau</button> -->
                    </div>
                    <div class="paging__button"></div>
                    <div class="right__bot"></div>
                </div>
            </div>
        </div>
    </div>
    <the-dialog-form v-if="employeeEdit.isShowFormEmployeeEdit"
        :loadData="loadDataWithPaging"
        :pageSize="pageSize"
        :pageNumber="pageNumber"
        :employeeFilter="keyWord"
        :selectComboboxActive="selectComboboxActive"
        :typeForm="employeeEdit.typeSubmit"
        :employeeId="employeeEdit.employeeID"
        :handelClickCloseDialog="closeForm"
        :handelClickOpenDialog="openForm"
    >
    </the-dialog-form>
    <div class="alert__warning" v-if="isShowAlertConfirm">
            <div class="alert">
            <div class="alert__form--title">
                <div class="mi mi-warning"></div>
                <div class="text-error">
                    Bạn có chắc chắn muốn xóa Nhân viên &lt;{{employeeCode}}> không?
                </div>
            </div>
            <hr>
            <div class="alert__form--bottom">
                <div class="btn btn__close--warning btn__white" @click="handelCancelDelete()">Không</div>
                <div class="btn btn__close--warning" @click="handelConfirmDelete(idDelete,pageSize,pageNumber)">Có</div>
            </div>
        </div>
    </div>

</template>

<script>
import TheTable from '../base/TheTable.vue';
import TheDialogForm from '../base/TheDialogForm.vue';
import {listNumberOfPage} from '../../i18ncomponent/i18n'
import EmployeeAction from '../../action/EmployeeAction.js';
import formatDate from '../../untils/formatDate';
import DepartmentAction from '@/action/DepartmentAction';
// import TheLoader from '../common/loader/Loader.vue'
export default {
    components:{
        TheTable,
        TheDialogForm,
        // TheLoader
    },
    emits:[
        "isLoading"
    ],
    props:{
        
    },
    // formatDate:[formatDate],
    data() {
        return {
            isLoadingTr: false,
            isLoading: false,
            employeeCode:'',
            isShowAlertConfirm: false,
            isCheck: false,
            isConfirm: false,
            posts: [],
            listDepartment:[],
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
            isMultipleDelete: true,
            formatDate,
            employeeEdit: {
                employeeID: "",
                typeSubmit: "",
                isShowFormEmployeeEdit: false,
            },
            keyWord:"",
            emplNull: false,
            bottomNull: true,
            listCheckbox: [],
            pages:[],
            backToArray: [],
        }
    },  
    computed: {
        style(){
            return {
                top: this.top + 'px',
                left: this.left + 'px',
            }
        },
        
        displayedPages() {
            
            if(this.pages.length>5){
                if (this.pageNumber === 1) {
                return this.pages.slice(this.pageNumber - 1, this.pageNumber + 2);
                }
                else if (this.pageNumber === this.pages.length) {
                    return this.pages.slice(this.pageNumber - 5, this.pageNumber + 1);
                }
                else if (this.pageNumber >= 4 && this.pageNumber <= this.pages.length-3) {
                    return this.pages.slice(this.pageNumber - 2, this.pageNumber + 1);
                }
                else if (this.pageNumber > this.pages.length-3) {
                    return this.pages.slice(this.pageNumber - 4, this.pageNumber + 1);
                }
                else {
                    return this.pages.slice(this.pageNumber - 2, this.pageNumber + 3);
                }
            }
            else{
                return this.pages;
            }
        },
        
    },
    methods:{
        
        /**
         * Đóng form thông tin nhân viên
         * Author: LHDO(19/11/2022)
         */
        closeForm(){
            this.employeeEdit.isShowFormEmployeeEdit = false
        },

        /**
         * Mở form thông tin nhân viên
         * Author: LHDO(19/11/2022)
         */
        openForm(){
            //check null
            this.employeeEdit.isShowFormEmployeeEdit = true
        },

        /**
         * Click hiển thị thông tin nhân viên
         * @param {int} pageSize Số bản ghi hiện tại
         * @param {int} pageNumber Số trang hiện tại
         * Author: LHDO(19/11/2022)
         */
        handelClickOpenDialog(pageSize,pageNumber){
            this.employeeEdit.isShowFormEmployeeEdit = true;
            this.pageSize = pageSize;
            this.pageNumber = pageNumber;
            this.employeeEdit.typeSubmit = "ADD";
            this.employeeEdit.employeeID = "";
        },


        // handelClickUpdate(){
        //     this.isActiveDialogUpdate = true;
        // },

        /**
         * Ẩn hiện combobox
         * Author: LHDO(19/11/2022)
         */
        handelClickToggleCombobox(){
            this.isActiveCombobox = !this.isActiveCombobox;
        },

        /**
         * Chọn kịch thước trang
         * @param {string} keyword từ khóa tìm kiếm
         * @param {int} value kích thước trang
         * @param {int} idx Index của combobox
         * Author: LHDO(19/11/2022)
         */
        handelClickSelectPageSize(keyword,value,idx){
            this.pageSize = value;
            // this.loadDataWithPaging(this.keyWord,this.pageSize,this.pageNumber);
            this.selectComboboxActive(idx)
            this.isActiveCombobox = false
            this.isSelectPage[1] = true
            this.backToArray=[];
            this.loadDataAgain(keyword,this.pageSize,1) 
        },

        /**
         * Chọn value combobox
         * Author: LHDO(19/11/2022)
         */
        selectComboboxActive(idx){
            for(let i = 0; i<this.listNumberOfPage.length; i++){
                this.isSelectNumberOfPage[i] = false
            }
            this.isSelectNumberOfPage[idx] = true;
        },

        /**
         * Lấy giá trị nhập vào trong input tìm kiếm
         * Author: LHDO(19/11/2022)
         */
        // hanldeChangeInput(e) {
        //         if(e.target.value=='')
        //         {
        //                 this.loadDataWithPaging(e.target.value,this.pageSize,1)
        //         }
        // },

        handelSearch(){
            console.log(this.keyWord);
            this.backToArray=[];
            this.loadDataAgain(this.keyWord,this.pageSize,1) 
        },

        /**
         * Load lại dữ liệu
         * Author: LHDO(19/11/2022)
         */
        clickReload() {
            this.pageSize = 10;
            this.pageNumber = 1;
            this.keyWord = "";
            this.posts=[];
            this.loadDataAgain(this.keyWord,this.pageSize,this.pageNumber) 
        },

        /**
         * Lấy giá trị nhập vào trong input tìm kiếm
         * Author: LHDO(19/11/2022)
        //  */
        // handelClickUpdateEmployee(id,pageSize,pageNumber){
        //     // this.isActiveDialogUpdate = true;
        //     this.isActiveDialog = true;
        //     this.idEmployee = id;
        //     console.log(id,this.idEmployee);
        //     this.pageSize = pageSize;
        //     this.pageNumber = pageNumber;
        //     this.typeForm = "EDIT";
        // },

        getAllEmp(){
            EmployeeAction.getAll().then((res)=>{
                console.log(res.data);
            })
        },

        handelCancelDelete(){
            this.isShowAlertConfirm = false;
        },

        handelConfirmDelete(id,pageSize,pageNumber){
            // this.isLoading = true;
            // this.$emit("isLoading", this.isLoading);
            this.employeeEdit.typeSubmit = "DELETE"
            this.isShowAlertConfirm = false;
            if(this.isConfirm){
                EmployeeAction.deleteEmployee(id).then(
                        ()=>{
                        this.loadDataWithPaging(this.keyWord,pageSize,pageNumber)
                        if(this.posts.length ==1){
                            // alert(2);
                        }
                    }
                )
            }
        },

        /**
         * Xóa bản ghi
         * Author: LHDO(19/11/2022)
        */
        handelClickDeleteEmployee(){
            this.isShowAlertConfirm = true;
            this.show = false;
            this.isConfirm = true;       
        },

        // compareValues(key, order = 'asc') {
        //     return function(a, b) {
        //         // eslint-disable-next-line no-prototype-builtins
        //         if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        //         // nếu không tồn tại
        //             return 0;
        //         }

        //         const varA = (typeof a[key] === 'string') ?
        //         a[key].toUpperCase() : a[key];
        //         const varB = (typeof b[key] === 'string') ?
        //         b[key].toUpperCase() : b[key];

        //         let comparison = 0;
        //         if (varA > varB) {
        //         comparison = 1;
        //         } else if (varA < varB) {
        //         comparison = -1;
        //         }
        //         return (
        //         (order == 'desc') ? (comparison * -1) : comparison
        //         );
        //     };
        // },
        /**
         * Load dữ liệu có phân trang, tìm kiếm
         * Author: LHDO(19/11/2022)
        */
        loadDataWithPaging(keyWord,pageSize,pageNumber){
            if(this.employeeEdit.typeSubmit == "EDIT" || this.employeeEdit.typeSubmit == "DELETE" || this.employeeEdit.typeSubmit == "ADD"){
                this.isLoading = true;
                this.$emit("isLoading", this.isLoading);
            }
            else{
                this.isLoadingTr = true;
            }
            EmployeeAction.getAllPaging(keyWord,pageSize,pageNumber)
            .then(response =>{
                    this.posts = [... response.data.Data];
                    this.totalPage = response.data.totalPages
                    for (let i = 1; i <= this.totalPage; i++) {
                       this.backToArray.push(i)
                    }
                    const uniqueSet = new Set(this.backToArray)
                    this.pages = [...uniqueSet];
                    this.count = response.data.totalCount
                    this.$emit('countEmp', this.count)
                    this.pageSize = pageSize
                    this.pageNumber = pageNumber
                    if (pageNumber >= this.totalPage) {
                        this.isNextPage = true;
                    }
                    else{
                        this.isNextPage = false;
                    }
                    if (pageNumber <= 1) {
                        this.isPrevPage = true;
                    }
                    else{
                        this.isPrevPage = false;
                    }
                    this.emplNull= false,
                    this.bottomNull= true
                    // this.setPages();
                    if(this.totalPage == 0){
                        this.emplNull=true
                        this.bottomNull = false
                    }

                })
                .catch((e) => {
                    this.posts = [];
                    console.log(e, "Không tìm thấy nhân viên");
                    this.emplNull=true
                    this.bottomNull = false
                })
                .finally(()=>
                {   
                    if(this.employeeEdit.typeSubmit == "EDIT" || this.employeeEdit.typeSubmit == "DELETE" || this.employeeEdit.typeSubmit == "ADD"){
                        setTimeout(() => {
                            this.isLoading = false;
                            this.$emit("isLoading", this.isLoading);
                        }, 400);
                    }
                    else{
                        setTimeout(() => {
                            this.isLoadingTr = false;
                        }, 400);
                    }
                    
                }
                )
        },

        loadDepartment(){
            DepartmentAction.getDepartment().then(res=>{
                this.listDepartment = [...res.data]
            });
        },

        loadDataAgain(keySearch,pageSize,pageNumber){
            this.employeeEdit.typeSubmit = "LOAD";
            this.loadDataWithPaging(keySearch,pageSize,pageNumber);
        },
        /**
         * Chọn trang
         * Author: LHDO(19/11/2022)
        */
        selectPage(pageSize,pageNumber){
            for (let i = 1; i <= this.totalPage; i++) {
                this.isSelectPage[i] = false
            }
            this.isSelectPage[pageNumber] = true
            this.loadDataAgain(this.keyWord,pageSize,pageNumber)
        },

        /**
         * Chuyển tiếp trang
         * Author: LHDO(19/11/2022)
        */
        nextPage(pageSize,pageNumber){
            pageNumber = this.pageNumber + 1;
            this.selectPage(pageSize,pageNumber);
            this.loadDataAgain(this.keyWord,pageSize,pageNumber)
            this.isCheck =false
        },
        
        /**
         * Quay lại trang
         * Author: LHDO(19/11/2022)
        */
        prevPage(pageSize,pageNumber){
            pageNumber = this.pageNumber - 1;
            this.selectPage(pageSize,pageNumber);
            this.loadDataAgain(this.keyWord,pageSize,pageNumber)
        },

        /**
         * Sửa thông tin nhân viên
         * Author: LHDO(19/11/2022)
        */
        onClickEditEmployee(employeeID) {
            const { employeeEdit } = this;
            employeeEdit.employeeID = employeeID;
            employeeEdit.typeSubmit = "EDIT";
            employeeEdit.isShowFormEmployeeEdit = true;
        },
    },
    created() {
        this.loadDataWithPaging(this.keyWord,this.pageSize,this.pageNumber);
        this.isSelectPage[1] = true;
        this.isSelectNumberOfPage[0]= true;
        
    },
}
</script>

<style scoped>

@import url('../../style/layout/MainApp.css');
@import url('../../style/components/Table.css');

.mi-warning{
    background-position: -598px -463px;
	width: 50px;
	height: 37px;
}
</style>