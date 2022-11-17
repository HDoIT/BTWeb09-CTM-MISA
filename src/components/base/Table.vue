<!-- eslint-disable vue/no-mutating-props -->
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
            <tr v-for="(e,index) of listEmployees" :key="index">
                <td></td>
                <td>
                    <div class="checkbox-rect">
                        <input type="checkbox" name="checkb" class="checkb" :value="e.EmployeeId" :id="e.EmployeeCode" v-model="listCheckbox" @change="checkboxChange">
                        <label :for="e.EmployeeCode"></label>
                    </div>
                </td>
                <td>{{e.EmployeeCode ||""}}</td>
                <td>{{e.EmployeeName ||""}}</td>
                <td>{{e.GenderName||""}}</td>
                <td>{{formatDate(e.DateOfBirth)}}</td>
                <td title="Số chứng minh nhân dân">{{e.IdentityNumber||""}}</td>
                <td>{{e.PositionName||""}}</td>
                <td>{{e.DepartmentName||""}}</td>
                <td>{{e.BankAccountNumber||""}}</td>
                <td>{{e.BankName||""}}</td>
                <td>{{e.BankBranchName||""}}
                </td>
                <td>
                    <span class="table__action">
                        <a id="btn__sua" href="#" @click="onClickEditEmployee(e.EmployeeId)">Sửa</a> 
                        <div class="mi mi-sort-down action_btn" :class="{active: showContextMenu2[index]}" @click="getPositionContext($event,e.EmployeeId,index)"></div>
                    </span>
                    <!-- <div class="context-menu">
                        <ul class="context__menu--item action-${e.EmployeeId}">
                            <li>Nhân bản</li>
                            <li @click="deleteEmployee(`${e.EmployeeId}`)">Xóa</li>
                            <li>Ngưng sử dụng</li>
                        </ul>
                    </div> -->
                </td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
// import axios from 'axios';
// import EmployeeAction from '../../action/EmployeeAction.js';
import formatDate from '../../untils/formatDate';

export default {
    name: 'TableEmployee',
    props:{
        listEmployees: Array,
        clickGetPosition: Function,
        pageSize: Number,
        totalRc: Number,
        pageNumber: Number,
    },
    emits:[
        "handelClickDeleteEmployee",
        "onClickEditEmployee",
        "showContextMenu",
        "topContext",
        "leftContext",
        "employeeId",
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
            checkedBg: false,
            listCheckbox:[]
        }
    },
    computed:{
        selectAll:{
            get: function () {
                var check = this.listEmployees ? this.listCheckbox.length == this.listEmployees.length : false
                return check;
            },
            set: function (value) {
                var listCheckbox = [];
                if (value) {
                    this.listEmployees.forEach(function (user) {
                        listCheckbox.push(user.EmployeeId);
                    });
                }
                this.listCheckbox= listCheckbox;
            },
        }
    },
    methods: {
        checkboxChange(e) {
            console.log(this.listEmployees,e);
        },
        onClickEditEmployee(employeeID) {
            console.log("employeeID:", employeeID);
            this.$emit("onClickEditEmployee", employeeID);
        },

        handelClickOpenContextMenu(){
            this.showContextMenu = true;
            this.$emit("showContextMenu", this.showContextMenu);
        },

        getPositionContext(e,empId,idx){
            console.log();
            this.showContextMenu = !this.showContextMenu;
            this.$emit("employeeId", empId);
            this.$emit("showContextMenu", this.showContextMenu);
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
    updated() {
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
</style>