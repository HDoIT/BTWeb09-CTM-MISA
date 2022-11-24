<template>
    <table>
        <thead>
            <tr>
                <th></th>
                <th Checkbox >
                    <div class="checkbox-rect">
                        <input type="checkbox" name="checkall" id="checkbox-rect" v-model="selectAll">
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
            <tr v-for="(e,index) of listEmployees" :key="index" :class="{rowTable : checkedBg[index]}">
                <td></td>
                <td>
                    <div class="loading" v-if="isLoadingTr"></div>
                    <div class="checkbox-rect" v-if="!isLoadingTr">
                        <input type="checkbox" name="checkb" class="checkb" :value="e.EmployeeId" :id="e.EmployeeCode" v-model="listCheckbox" >
                        <label :for="e.EmployeeCode" @click="changeBackgroundTd(index)"></label>
                    </div>
                </td>
                <td><div class="loading" v-if="isLoadingTr"></div>{{isLoadingTr == false ? e.EmployeeCode ||"" :"" }}</td>
                <td><div class="loading" v-if="isLoadingTr"></div>{{isLoadingTr == false ? e.EmployeeName ||"":"" }}</td>
                <td><div class="loading" v-if="isLoadingTr"></div>{{isLoadingTr == false ? e.GenderName||"":"" }}</td>
                <td><div class="loading" v-if="isLoadingTr"></div>{{isLoadingTr == false ? formatDate(e.DateOfBirth):"" }}</td>
                <td title="Số chứng minh nhân dân"><div class="loading" v-if="isLoadingTr"></div>{{isLoadingTr == false ? e.IdentityNumber||"":"" }}</td>
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
import DepartmentAction from '@/action/DepartmentAction';
// import axios from 'axios';
// import EmployeeAction from '../../action/EmployeeAction.js';
import formatDate from '../../untils/formatDate';

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
        "handelClickDeleteEmployee",
        "onClickEditEmployee",
        "showContextMenu",
        "topContext",
        "leftContext",
        "employeeId",
        "employeeCode",
        "showMultipleDelete"
    ],
    data() {
        return {
            posts: [],
            count: '',    
            formatDate,
            showContextMenu: false,
            showContextMenu2: [],
            topAc: 0,
            leftAc:0,
            checkedBg: [],
            listCheckbox:[],
            isShowMultiple: true,
            departmentName:'',
            // listCheckboxSelected:{}
        }
    },
    computed:{

        selectAll:{
            get: function () {
                return this.listEmployees ? this.listCheckbox.length == this.listEmployees.length : false;
            },
            set: function (value) {
                var listCheckbox = [];
                if (value) {
                    this.listEmployees.forEach(function (user) {
                        listCheckbox.push(user.EmployeeId);
                    });
                    for(let i = 0;i<this.pageSize;i++){
                        this.checkedBg[i] = false;
                    }
                }
                this.listCheckbox= listCheckbox;
                if(this.listCheckbox.length>2){
                    this.isShowMultiple = true;
                }
                else{
                    this.isShowMultiple = false;
                }
                this.$emit("showMultipleDelete",this.isShowMultiple);
                
                for(let i = 0;i<this.pageSize;i++){
                    this.checkedBg[i] = !this.checkedBg[i];
                }
                
            },
        }
    },
    methods: {

        changeBackgroundTd(i){
            console.log(this.listCheckbox.length);
            this.checkedBg[i] = !this.checkedBg[i];
            let count = 2;
            console.log(this.listCheckbox);
            if(count>2){
                this.isShowMultiple = true;
            }
            else{
                this.isShowMultiple = false;
            }
            this.$emit("showMultipleDelete",this.isShowMultiple)
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

        DepartmentName(string){
            DepartmentAction.getDepartmentById(string).then(res=>{
                this.departmentName = res.data.DepartmentName;
            });
            return this.departmentName;
        }

    },
    updated() {
        // console.log(this.pageNumber);
        this.DepartmentName('142cb08f-7c31-21fa-8e90-67245e8b283e');
    },
    
    // lấy dữ liệu khi component được tạo thành công
    created() {
        
        // this.getPositionContext()
    }
}
</script>

<style scoped>

@import url('../../style/components/Table.css');
@import url('../../style/components/Checkbox.css');
.bgcolor td {
  background-color: rgb(225, 238, 249);
}

td .loading{
    width: 100%;
    height: 12px;
    background: linear-gradient(to right, #eee 20%, #ddd 50%, #eee 80%);
    background-size: 500px 100px;
    animation-name: moving-gradient;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
}

@keyframes moving-gradient {
    0% { background-position: -250px 0; }
    100% { background-position: 250px 0; }
}
</style>