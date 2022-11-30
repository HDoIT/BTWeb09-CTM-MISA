<template>
    <table>
        <thead>
            <tr>
                <!-- <th></th> -->
                <th>
                    <div class="checkbox-rect">
                        <input type="checkbox" name="checkall" id="checkbox-rect" v-model="isCheckAll[pageNumber]" @click="checkAll()">
                        <label for="checkbox-rect"></label>
                    </div>
                </th>
                <th v-for="(e,index) in listThTableEmployee" :key="index" :title=e.title >{{e.nameTh}}</th>
                <th>Chức năng</th>
            </tr>
        </thead>
        
        <tbody>
            <tr v-for="(e,index) in listEmployees" :key="index" :class="{active: isActiveRow[index]}">
                <td>
                    <div class="loading" v-if="isLoadingTr"></div>
                    <div class="checkbox-rect" v-if="!isLoadingTr">
                        <input type="checkbox" name="checkb" class="checkb" :value="e.EmployeeID" :id="e.EmployeeCode" v-model="listCheckbox" @change='updateCheckall(index)'>
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
            </tr>
        </tbody>
    </table>
</template>

<script>
import formatDate from '../../untils/formatDate';
import {listThTableEmployee} from '../../i18ncomponent/i18n'

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
            formatDate,
            listThTableEmployee,
            showContextMenu: false,
            showContextMenu2: [],
            topAc: 0,
            leftAc:0,
            listCheckbox:[],
            listEmp:[],
            isActiveRow:[]
        }
    },
    methods: {
        //Xử lý sự kiện check all
        checkAll(){
            this.isCheckAll[this.pageNumber] = !this.isCheckAll[this.pageNumber]

            const listCheckbox = [];
            if(this.isCheckAll[this.pageNumber]){ 
                for (var key in this.listEmployees) {
                    listCheckbox.push(this.listEmployees[key].EmployeeID);
                    this.isActiveRow[key] = true;
                }
            }
            if(!this.isCheckAll[this.pageNumber]){ 
                for (var d in this.listEmployees) {
                    this.isActiveRow[d] = false;
                }
            }
            this.listCheckbox = listCheckbox;
            this.$emit("listIDDelete",this.listCheckbox)
        },
        
        //Xử lý sự kiện check từng dòng
        updateCheckall(index){
            
            this.isActiveRow[index] = event.target.checked;
            if(this.listCheckbox.length == this.listEmployees.length){
                this.isCheckAll[this.pageNumber] = true;
            }else{
                this.isCheckAll[this.pageNumber] = false;
            }
            this.$emit("listIDDelete",this.listCheckbox)
        },

        /**
         * Lấy ID của nhân viên cần sửa
         * @param employeeID ID của nhân viên
         * Author: LHDO(19/11/2022)
         */
        onClickEditEmployee(employeeID) {
            this.$emit("onClickEditEmployee", employeeID);
        },

        /**
         * Hiển thị context menu
         * Author: LHDO(19/11/2022)
         */
        handelClickOpenContextMenu(){
            this.showContextMenu = !this.showContextMenu;
            this.$emit("showContextMenu", this.showContextMenu);
        },

        /**
         * Lấy vị trí contextmenu của từng row trong table
         * @param {String} empId Id của nhân viên 
         * @param {Number} idx  Index rows
         * Author: LHDO(19/11/2022)
         */
        getPositionContext(e,empId,empCode,idx){
            this.showContextMenu = true;
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

        },
    },
    
}
</script>

<style scoped>

@import url('../../style/components/Table.css');
@import url('../../style/components/Checkbox.css');

</style>