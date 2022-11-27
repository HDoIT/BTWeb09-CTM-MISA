<template>
    <table>
        <thead>
            <tr>
                <th></th>
                <th Checkbox >
                    <div class="checkbox-rect">
                        <input type="checkbox" name="checkall" id="checkbox-rect" v-model="isCheckAll[pageNumber]" @click="checkAll()">
                        <label for="checkbox-rect"></label>
                    </div>
                </th>
                <th propName="EmployeeCode">Mã nhân viên</th>
                <th propName="EmployeeName">Tên nhân viên</th>
                <th propName="GenderName">Giới tính</th>
                <th propName="DateOfBirth">Ngày sinh</th>
                <th propName="IdentityNumber" title="Số chứng minh nhân dân">Số CMND</th>
                <th propName="PositionName" >Chức danh</th>
                <th propName="DepartmentName" >Tên đơn vị</th>
                <th propName="BankAccountNumber" >Số tài khoản</th>
                <th propName="BankName" >Tên ngân hàng</th>
                <th propName="BankBranchName" >Chi nhánh ngân hàng</th>
                <th Action>Chức năng</th>
                <th ></th>
                <th ></th>
            </tr>
        </thead>
        
        <tbody>
            <tr v-for="(e,index) in listEmployees" :key="index">
                <td></td>
                <td>
                    <div class="loading" v-if="isLoadingTr"></div>
                    <div class="checkbox-rect" v-if="!isLoadingTr">
                        <input type="checkbox" name="checkb" class="checkb" :value="e.EmployeeID" :id="e.EmployeeCode" v-model="listCheckbox[pageNumber]" @change='updateCheckall()'>
                        <label :for="e.EmployeeCode"></label>
                    </div>
                </td>
                <td><div class="loading" v-if="isLoadingTr"></div>{{isLoadingTr == false ? e.EmployeeCode ||"" :"" }}</td>
                <td><div class="loading" v-if="isLoadingTr"></div>{{isLoadingTr == false ? e.EmployeeName ||"":"" }}</td>
                <td><div class="loading" v-if="isLoadingTr"></div>{{isLoadingTr == false ? e.GenderName||"":"" }}</td>
                <td><div class="loading" v-if="isLoadingTr"></div>{{isLoadingTr == false ? formatDate(e.DateOfBirth):"" }}</td>
                <td><div class="loading" v-if="isLoadingTr"></div>{{isLoadingTr == false ? e.IdentityNumber||"":"" }}</td>
                <td><div class="loading" v-if="isLoadingTr"></div>{{isLoadingTr == false ? e.JobPositionName||"":"" }}</td>
                <td><div class="loading" v-if="isLoadingTr"></div>{{isLoadingTr == false ? e.DepartmentName||"":"" }}</td>
                <td><div class="loading" v-if="isLoadingTr"></div>{{isLoadingTr == false ? e.BankAccountNumber||"":"" }}</td>
                <td><div class="loading" v-if="isLoadingTr"></div>{{isLoadingTr == false ? e.BankName||"":"" }}</td>
                <td><div class="loading" v-if="isLoadingTr"></div>{{isLoadingTr == false ? e.BankBranchName||"":"" }}
                </td>
                <td>
                    <span class="table__action">
                        <a id="btn__sua" href="#" @click="onClickEditEmployee(e.EmployeeID)">Sửa</a> 
                        <div class="mi mi-sort-down action_btn" :class="{active: showContextMenu2[index]}" @click="getPositionContext($event,e.EmployeeID,e.EmployeeCode,index)"></div>
                    </span>
                </td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
// import DepartmentAction from '@/action/DepartmentAction';
// import axios from 'axios';
// import EmployeeAction from '../../action/EmployeeAction.js';
import formatDate from '../../untils/formatDate';
// eslint-disable-next-line no-unused-vars
import EmployeeAction from '@/action/EmployeeAction';

export default {
    name: 'TheTable',
    props:{
        listEmployees: Array,
        clickGetPosition: Function,
        pageSize: Number,
        totalRc: Number,
        pageNumber: Number,
        isCheck: Boolean,
        isLoadingTr: Boolean
    },
    emits:[
        "onClickEditEmployee",
        "showContextMenu",
        "topContext",
        "leftContext",
        "employeeId",
        "employeeCode",
        "showMultipleDelete",
        "listIDDelete"
    ],
    data() {
        return {
            isCheckAll: [],
            posts: [],
            count: '',    
            formatDate,
            showContextMenu: false,
            showContextMenu2: [],
            topAc: 0,
            leftAc:0,
            checkedBg: [],
            listCheckbox:[],
            listEmp:[],
            isShowMultiple: true,
            departmentName:'',
            allSelected: false,
            pageCrr:0,
            
            // listCheckboxSelected:{}
        }
    },
    methods: {
        checkAll(){
            this.isCheckAll[this.pageNumber] = !this.isCheckAll[this.pageNumber]

            const listCheckbox = [];
            console.log(typeof(listCheckbox));
            // const listCheckboxOfNumber = []
            if(this.isCheckAll[this.pageNumber]){ 
                for (var key in this.listEmployees) {
                    listCheckbox.push(this.listEmployees[key].EmployeeID);
                }
            }
            this.listCheckbox[this.pageNumber] = [...listCheckbox];
            console.log("listCheckbox",this.listCheckbox);
            this.$emit("listIDDelete",this.listCheckbox)
        },
        
        updateCheckall(){
            console.log(this.listCheckbox);
            console.log("a",this.listEmployees.EmployeeID);
            if(this.listCheckbox.length == this.listEmployees.length){
                this.isCheckAll[this.pageNumber] = true;
            }else{
                this.isCheckAll[this.pageNumber] = false;
            }
        },
        /**
         * Lấy ID của nhân viên cần sửa
         * @param employeeID ID của nhân viên
         * Author: LHDO(19/11/2022)
         */
        onClickEditEmployee(employeeID) {
            console.log("employeeID:", employeeID);
            this.$emit("onClickEditEmployee", employeeID);
        },

        /**
         * Hiển thị context menu
         * Author: LHDO(19/11/2022)
         */
        handelClickOpenContextMenu(){
            this.showContextMenu = true;
            this.$emit("showContextMenu", this.showContextMenu);
        },

        /**
         * Lấy vị trí contextmenu của từng row trong table
         * @param {String} empId Id của nhân viên 
         * @param {Number} idx  Index rows
         * Author: LHDO(19/11/2022)
         */
        getPositionContext(e,empId,empCode,idx){
            this.showContextMenu = !this.showContextMenu;
            this.$emit("employeeCode", empCode);
            this.$emit("employeeId", empId);
            this.$emit("showContextMenu", this.showContextMenu);

            //Xử lý hiển thị 2 contextmenu cuối cùng trong một page
            if(this.totalRc%this.pageSize!=0 && this.pageNumber == Math.floor(this.totalRc/this.pageSize)+1){
                if (idx === (this.totalRc%this.pageSize)-1 || idx === (this.totalRc%this.pageSize)-2) {
                    this.leftAc = e.target.getBoundingClientRect().x -70
                    this.topAc = e.target.getBoundingClientRect().y -130
                    this.$emit("topContext",this.topAc);
                    this.$emit("leftContext",this.leftAc);
                }
                else{
                    this.leftAc = e.target.getBoundingClientRect().x - 70
                    this.topAc = e.target.getBoundingClientRect().y + 10
                    this.$emit("topContext",this.topAc);
                    this.$emit("leftContext",this.leftAc);
                }
            }
            else if(idx === this.pageSize-1 || idx === this.pageSize-2 || idx === this.totalRc-1){
                    this.leftAc = e.target.getBoundingClientRect().x -70
                    this.topAc = e.target.getBoundingClientRect().y -130
                    this.$emit("topContext",this.topAc);
                    this.$emit("leftContext",this.leftAc);
            }
            else{
                    this.leftAc = e.target.getBoundingClientRect().x - 70
                    this.topAc = e.target.getBoundingClientRect().y + 10
                    this.$emit("topContext",this.topAc);
                    this.$emit("leftContext",this.leftAc);
            }
            
            if(this.showContextMenu){
                this.showContextMenu2[idx] = true
            }
            if(!this.showContextMenu){
                this.showContextMenu2[idx] = false
            }

        },
    },
    
}
</script>

<style scoped>

@import url('../../style/components/Table.css');
@import url('../../style/components/Checkbox.css');

</style>