<template>
    <div class="dialog__form" @keydown="closeEsc">
            <div class="dialog">
                <form autocomplete="off">
                    <div class="form__header">
                        <div class="form__header--left">
                            <span class="title-form">Thông tin nhân viên</span>
                            <span class="checkbox-form">
                                <div class="checkbox-rect">
                                    <input type="checkbox" name="" id="khachhang" >
                                    <label for="khachhang"></label>
                                </div>
                                <label for="khachhang">Là khách hàng</label>
                                <div class="checkbox-rect">
                                    <input type="checkbox" name="" id="nhacungcap">
                                    <label for="nhacungcap"></label>
                                </div>
                                <label for="nhacungcap">Là nhà cung cấp</label>
                            </span>
                        </div>
                        <div class="form__header--right">
                            <div class="mi mi-icon-help" @click="help()"></div>
                            <div class="mi mi-icon-times" ref="close" @click="handelClose()" tabindex="9"></div>
                        </div>
                    </div>
                    <div class="form__main">
                        <div class="row row-1">
                            <div class="col">
                                <div class="row-1-1">
                                    <div class="field field-40">
                                        <label for="manv" >Mã <span class="important">*</span></label>
                                        <input type="text" id="manv" name="manv" maxlength="20" :class="{required: validate.isEmployeeCode}"  ref="manv" v-model="dataEmp.employeeCode" @input="enterEmployeeCode" tabindex="1">
                                        <div class="important field-error" v-if="validate.isEmployeeCode">{{validate.errorCode}}</div>
                                    </div>

                                    <div class="field field-60">
                                        <label for="tennv">Tên <span class="important">*</span></label>
                                        <input type="text" id="tennv" name="tennv" :class="{required: validate.isEmployeeName}"  ref="tennv" v-model="dataEmp.employeeName" @input="enterEmployeeName" tabindex="1">
                                        <div class="important field-error" v-if="validate.isEmployeeName">Tên không được để trống!</div>
                                    </div>
                                </div>
                                <div class="field">
                                    <label>Đơn vị <span class="important">*</span></label>
                                    <div class="combobox">
                                        <input type="text" name="tendv" :class="{required: validate.isDepartmentName,active: isActiveCombobox}" class="input combobox__input input__employee" ref="tendv" :value="dataEmp.departmentName" @input="enterDepartmentName" tabindex="2">
                                        <button type="button" class="combobox__button cbb__form" :class="{active: isActiveCombobox}" v-click-outside="outSideCbb" @click="handelClickToggleCombobox()"><div class="mi mi-chevron-down"></div></button>
                                            <div class="combobox__data combobox__form" v-bind:class="{active: isActiveCombobox}">
                                                <div class="data-item" v-for="(item, index) in listDepartment" :class="{active: isSelectNumberOfPage[index]}"  :key="index" @click="handelClickSelectDepartment(item.DepartmentName,index,item.DepartmentID)" >
                                                    <label for="data-item-1">{{item.DepartmentName}}</label>
                                                </div>
                                            </div>
                                        <div class="important field-error" v-if="validate.isDepartmentName">Đơn vị không được để trống!</div>
                                    </div>
                                </div>
                                <div class="field">
                                    <label for="chucdanh">Chức danh</label>
                                    <input type="text" name="chucdanh" id="chucdanh" ref="chucdanh" v-model="dataEmp.jobPosition" tabindex="3"/> 
                                </div>
                            </div>
                            <div class="col">
                                <div class="row-1-1">
                                    <div class="field field-40">
                                        <label for="ngaysinh">Ngày sinh</label>
                                        <input type="date" name="ngaysinh" id="ngaysinh" v-model="dataEmp.dateOfBirth" :class="{required: validate.isDateOfBirth}" tabindex="3"/>
                                    </div>
                                    <div class="field field-60">
                                        <label>Giới tính</label>
                                        <div class="gender">
                                            <input type="radio" id="nam" name="gioitinh" :value="0" v-model="dataEmp.gender" checked>
                                            <label for="nam">Nam</label>
                                            <input type="radio" id="nu" name="gioitinh" :value="1" v-model="dataEmp.gender" >
                                            <label for="nu">Nữ</label>
                                            <input type="radio" id="khac" name="gioitinh" :value="2" v-model="dataEmp.gender" >
                                            <label for="khac">Khác</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-1-1">
                                    <div class="field field-60">
                                        <label for="cmnd">Số CMND</label>
                                        <input type="text" id="cmnd" name="cmnd" ref="cmnd" v-model="dataEmp.identityNumber" tabindex="4">
                                    </div>
                                    <div class="field field-40">
                                        <label for="ngaycap">Ngày cấp</label>
                                        <input type="date" id="ngaycap" name="ngaycap" ref="ngaycap" v-model="dataEmp.identityDate" :class="{required: validate.isIdentityDate}" tabindex="4">
                                    </div>  
                                </div>
                                <div class="field">
                                    <label for="noicap">Nơi cấp</label>
                                    <input type="text" id="noicap" name="noicap" ref="noicap" v-model="dataEmp.identityPlace" tabindex="4"> 
                                </div>
                            </div>
                        </div>
                        <div class="row row-2">
                            <div class="field">
                                <label for="diachi">Địa chỉ</label>
                                <input type="text" name="diachi" id="diachi" ref="diachi" v-model="dataEmp.address" tabindex="5">
                            </div>
                        </div>
                        <div class="row-3">
                            <div class="row-3-1">
                                <div class="field">
                                    <label for="didong">ĐT di động</label>
                                    <input type="text" name="didong" id="didong" ref="didong" v-model="dataEmp.phoneNumber" tabindex="6">
                                </div> 
                                <div class="field">
                                    <label for="codinh">ĐT cố định</label>
                                    <input type="text" name="codinh" id="codinh" ref="codinh" v-model="dataEmp.telephoneNumber" tabindex="6">
                                </div> 
                                <div class="field">
                                    <label for="email">Email</label>
                                    <input type="text" name="email" id="email" ref="email" v-model="dataEmp.email" tabindex="6">
                                </div>
                            </div> 
                            <div class="row-3-1">
                                <div class="field">
                                    <label for="tknh">Tài khoản ngân hàng</label>
                                    <input type="text" name="tknh" id="tknh" ref="tknh" v-model="dataEmp.bankAccountNumber" tabindex="7">
                                </div> 
                                <div class="field">
                                    <label for="tennh">Tên ngân hàng</label>
                                    <input type="text" name="tennh" id="tennh" ref="tennh" v-model="dataEmp.bankName" tabindex="7">
                                </div> 
                                <div class="field">
                                    <label for="chinhanh">Chi nhánh</label>
                                    <input type="text" name="chinhanh" id="chinhanh" ref="chinhanh" v-model="dataEmp.bankBranchName" tabindex="7">
                                </div> 
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="form__footer">
                        <span style="order: 2;">
                            <button id="btn__save" type="sumit" class="btn btn__white" @click="addEmp" tabindex="8">Cất</button>
                            <button id="btn__save__2" type="button" class="btn add__emp" @click="handelClickSaveAndAdd" tabindex="8">Cất và Thêm</button>
                        </span>
                        <button type="button" class="btn btn__white" style="order: 1;" @click="handelClickCloseDialog()" tabindex="8" @keydown="foucsFirstTabIndex">Hủy</button>
                    </div>
                </form>
            </div>
            <div class="alert__warning" v-if="isShowAlert">
                <the-alert-warning 
                    @showAlert="(c)=> isShowAlert = c"
                    :isAlertNull="isAlertNull"
                    :isAlertWarning="isAlertWarning"
                    :isQuestion="isQuestion"
                    :closeForm="handelClickCloseDialog"
                    :saveUpdate="typeForm=='EDIT' ? updateForm : saveForm"
                    >
                    {{textErr}}
                </the-alert-warning>
            </div>
    </div>
</template>

<script>
import EmployeeAction from '../../action/EmployeeAction.js';
import DepartmentAction from '../../action/DepartmentAction.js';
import TheAlertWarning from '../base/alert/TheAlertWarning.vue';
import moment from 'moment';
import formatDate from '../../untils/formatDate';
import {listErrorValidate,
        listToastMessage,
        typeButton,
        alertMessage} from '../../i18ncomponent/i18n';
import {listErrorCode} from '../../enums/errorCode'

export default {
    components: { TheAlertWarning },
    props:{
        employeeId: String,
        loadData:{
            type: Function
        },
        pageNumber:{
            type: Number
        },
        pageSize:{
            type: Number
        },
        typeForm: String,

        handelClickCloseDialog:{
            type: Function
        },
        handelClickOpenDialog:{
            type: Function
        },
        employeeFilter:{
            type: String
        },
        
    },
    emits:["showToastMessage","txtToastMsg"],
        data() {
        return {
            showToast:false,
            isAlertNull: false,
            isAlertWarning: false,
            isQuestion: false,
            textErr: '',
            isShowAlert: false,
            isActiveCombobox: false,
            isSelectNumberOfPage:[],
            listDepartment:[],
            txtToastMsg:'',
            formatDate,
            dataEmp: {
                employeeCode:'',
                employeeName : '',
                departmentId: null, 
                departmentName:'',
                gender : 0,
                jobPosition : '', 
                dateOfBirth : '', 
                identityNumber : '',
                identityDate : '', 
                identityPlace : '', 
                address : '', 
                phoneNumber : '',
                telephoneNumber : '',
                email : '', 
                bankAccountNumber : '',
                bankName : '',
                bankBranchName : '',
            },
            changeDataEmp: {
                employeeCode:'',
                employeeName : '',
                departmentId: null, 
                departmentName:'',
                gender : 0,
                jobPosition : '', 
                dateOfBirth : '', 
                identityNumber : '',
                identityDate : '', 
                identityPlace : '', 
                address : '', 
                phoneNumber : '',
                telephoneNumber : '',
                email : '', 
                bankAccountNumber : '',
                bankName : '',
                bankBranchName : '',
            },
            validate:{
                isEmployeeCode: false,
                errorCode:'',
                isEmployeeName: false,
                isDepartmentName: false,
                isDateOfBirth: false,
                isIdentityDate: false
            }
        }
    },
    methods: {
        //Xử lý sự kiện ẩn combobox khi click outside
        outSideCbb(){
            this.isActiveCombobox = false;
        },

        //Xử lý tabindex cuối về tabindex đầu tiên
        foucsFirstTabIndex() {
            event.preventDefault();
            if (!event.shiftKey && event.which == 9) {
                this.$refs.manv.focus();
            }
        },
        /**
         * Validate input Mã nhân viên
         * Author: LHDO(19/11/2022)
         */
        enterEmployeeCode(e){
            this.dataEmp.employeeCode = e.target.value
            if(this.dataEmp.employeeCode == ''){
                // alert('MÃ nhân viên không được phép để trống')
                this.validate.isEmployeeCode = true
            }
            this.validate.isEmployeeCode = false
        },

        /**
         * Validate input Tên nhân viên
         * Author: LHDO(19/11/2022)
         */
        enterEmployeeName(e){
            this.dataEmp.employeeName =e.target.value

            if(this.dataEmp.employeeName== '')
            {
                this.validate.isEmployeeName = true
            }
            this.validate.isEmployeeName = false
        },

        /**
         * Validate Combobox Đơn vị
         * Author: LHDO(19/11/2022)
         */
        enterDepartmentName(e){
            this.dataEmp.departmentName = e.target.value
            
            if(this.dataEmp.departmentName == '')
            {
                this.validate.isDepartmentName = true;
            }
            this.validate.isDepartmentName = false;
        },

        /**
         * Xử lý sự kiện cất và thêm
         * Author: LHDO(19/11/2022)
         */
        handelClickSaveAndAdd(e){
            this.addEmp(e);
            setTimeout(() => {
                this.handelClickOpenDialog();
            }, 2000);
        },

        /**
         * Hiển thị combobox đơn vị
         * Author: LHDO(19/11/2022)
         */
        handelClickToggleCombobox(){
            this.isActiveCombobox = !this.isActiveCombobox;
        },

        /**
         * Xử lý chọn tên đơn vị
         * Author: LHDO(19/11/2022)
         */
        handelClickSelectDepartment(value,idx,idDp){
            this.dataEmp.departmentName = value;
            this.isActiveCombobox = false;
            this.selectComboboxActive(idx);
            this.dataEmp.departmentId = idDp;
            this.validate.isDepartmentName = false;
            this.$refs.tendv.focus();
        },

        /**
         * Xử lý active khi click vào một đơn vị trong combobox
         * Author: LHDO(19/11/2022)
         */
        selectComboboxActive(idx){
            for(let i = 0; i<this.listDepartment.length; i++){
                    this.isSelectNumberOfPage[i] = false
            }
            this.isSelectNumberOfPage[idx] = true;
        },

        /**
         * Hiển thị cảnh báo
         * @param {string} text Nội dung cảnh báo
         * @param {bool} typeAlert Loại cảnh báo
         * Author: LHDO(19/11/2022)
         */
        showAlertWarning(text,typeAlert){
            this.isAlertNull = typeAlert;
            this.isAlertWarning = !this.isAlertNull
            this.isShowAlert = true;
            this.textErr = text;
        },

        /**
         * Validate ngày tháng năm không lớn hơn ngày tháng năm hiện tại
         * @param {String} value Ngày cần update
         * Author: LHDO(19/11/2022)
         */
        isValidateDate(value){
            var isValidDate = true;
            var dob =new Date(value);
            var dateCr = new Date();
            var month = dob.getMonth() + 1;
            var day   = dob.getDate();  
            var year  = dob.getFullYear();
            if(year > dateCr.getFullYear()){
                isValidDate = false;
            }
            else if(year == dateCr.getFullYear()){
                if(month > dateCr.getMonth()+ 1){
                    isValidDate = false;
                }
                else if(month == dateCr.getMonth()+ 1){
                    if(day > dateCr.getDate()){
                        isValidDate = false;
                    }
                    else{
                        isValidDate = true;
                    }
                }
                else{
                    isValidDate = true;
                }
            }
            else{
                isValidDate = true;
            }

            return isValidDate;
        },

        /**
         * Validate dữ liệu
         * Author: LHDO(19/11/2022)
         */
        isInputValidateEmployee(){
            var isValid = true;
            if(!this.dataEmp.departmentName.trim())
            {
                isValid = false;
                this.validate.isDepartmentName = true
                this.showAlertWarning(listErrorValidate.errorDepartmentNull,true);
            }
            if(!this.dataEmp.employeeName.trim())
            {
                isValid = false;
                this.validate.isEmployeeName = true
                this.showAlertWarning(listErrorValidate.errorEmployeeNameNull,true);
            }
            if(!this.dataEmp.employeeCode.trim()){
                isValid = false;
                this.validate.isEmployeeCode = true
                this.validate.errorCode = listErrorValidate.errorEmployeeCodeNull
                this.showAlertWarning(listErrorValidate.errorEmployeeCodeNull,true);
            }
            if(!this.isValidateDate(this.dataEmp.dateOfBirth)){
                isValid = false;
                this.validate.isDateOfBirth=true;
                this.showAlertWarning(listErrorValidate.errorDateOfBirth,false);
            }

            if(!this.isValidateDate(this.dataEmp.identityDate)){
                isValid = false;
                this.validate.isIdentityDate=true;
                this.showAlertWarning(listErrorValidate.errorIdentityDate,false);
            }

            return isValid;
        },

        /**
         * Cất dữ liệu
         * Author: LHDO(19/11/2022)
         */
        saveForm(){
            this.isQuestion = false;
            var isValid = this.isInputValidateEmployee();

            if(!isValid){
                return;
            }
            EmployeeAction.createEmployee({...this.dataEmp})
            .then((res)=>{
                if(res.status==201){
                    this.handelClickCloseDialog();
                    this.loadData(this.employeeFilter,this.pageSize,this.pageNumber);   
                    this.showToast = true;
                    this.$emit("showToastMessage", this.showToast);
                    this.txtToastMsg = listToastMessage.messageAdd;
                    this.$emit("txtToastMsg", this.txtToastMsg);

                }
                                        
            })
            .catch((e)=>{
                    switch (e.response.data.ErrorCode) {
                        case listErrorCode.InvalidCode:
                            this.showAlertWarning(e.response.data.UserMsg,true);
                            break;
                        case listErrorCode.DuplicateCode:
                            this.validate.isEmployeeCode = true
                            this.validate.errorCode = listErrorValidate.errorEmployeeCodeDuplicated
                            this.showAlertWarning(e.response.data.UserMsg,false);
                            break;
                        default:
                            this.showAlertWarning(e.response.data.UserMsg,false);
                            break;
                    }
                }
            )
            
        },

        /**
         * Xử lý đóng form có cảnh báo khi phát hiện dữ liệu nhập vào thay đổi so với dữ liệu ban đầu
         * Author: LHDO(19/11/2022)
         */
        handelClose(){
            if(this.typeForm==typeButton.add){
            this.isQuestion = true;
            this.showAlertWarning(alertMessage.alertChangeData)
            }
            if(this.typeForm==typeButton.edit){
                if(JSON.stringify(this.changeDataEmp)===JSON.stringify(this.dataEmp))
                {
                    this.handelClickCloseDialog();
                    this.isQuestion = false;
                }
                else{
                    this.isQuestion = true;
                    this.showAlertWarning(alertMessage.alertChangeData)
                }
            }
            
        },

        /**
         * Xử lý chỉnh sửa nhân viên
         * Author: LHDO(19/11/2022)
         */
        updateForm(){
            this.isQuestion = false;

            var isValid = this.isInputValidateEmployee();
            if(!isValid){
                return;
            }
            EmployeeAction.updateEmployee(this.employeeId,{...this.dataEmp})
            .then((res)=>{
                if(res.status==200)
                {
                    this.handelClickCloseDialog();
                    this.loadData(this.employeeFilter,this.pageSize,this.pageNumber);
                    this.showToast = true;
                    this.$emit("showToastMessage", this.showToast);
                    this.txtToastMsg = listToastMessage.messageUpdate;
                    this.$emit("txtToastMsg", this.txtToastMsg);
                }
                    
            }).
            catch((e)=>{
                switch (e.response.data.ErrorCode) {
                    case listErrorCode.InvalidCode:
                        this.showAlertWarning(e.response.data.UserMsg,true);
                        break;
                    case listErrorCode.DuplicateCode:
                        this.validate.isEmployeeCode = true
                        this.validate.errorCode = listErrorValidate.errorEmployeeCodeDuplicated
                        this.showAlertWarning(e.response.data.UserMsg,false);
                        break;
                    default:
                        this.showAlertWarning(e.response.data.UserMsg,false);
                        break;
                }
            })
        },
        /**
         * Xử lý submit form
         * Author: LHDO(19/11/2022)
         */
        addEmp(e){
            
                e.preventDefault();

                // var isValid = this.isInputValidateEmployee();

                // if(!isValid){
                //     return;
                // }

                if(this.typeForm === typeButton.add){                    
                    this.saveForm();
                }
                if(this.typeForm === typeButton.edit){
                    if(JSON.stringify(this.changeDataEmp)===JSON.stringify(this.dataEmp))
                    {
                        this.handelClickCloseDialog();
                    }
                    else{
                        this.updateForm();
                    }
                }                   
            
        },

        /**
         * Xử lý dùng nút ESC để đóng form
         * Author: LHDO(19/11/2022)
         */
        closeEsc(){
            if(!event.shiftKey && event.which == 27){
                // this.$refs.close.focus();
                this.handelClose();
            }
        },

        /**
         * Định dạng ngày tháng để hiển thị lên form
         * Author: LHDO(19/11/2022)
         */
        convertDate(string){
            return string ? moment(string).format('YYYY-MM-DD') : "";
        }
    },

    mounted(){
        this.$refs.manv.focus();
    },

    created() {
        //select active combobox mặc định
        this.isSelectNumberOfPage[0] = true;
        
        //Lấy danh sách bản ghi phòng ban
        DepartmentAction.getDepartment()
            .then((res)=>{  
                this.listDepartment = [...res.data]
        })

        //Hiển thị thông tin dữ liệu của nhân viên cần update theo ID
        if(this.typeForm===typeButton.add){
            EmployeeAction.getMax().then((res)=>{
                this.dataEmp.employeeCode = "NV-"+(Number(res.data[0].MaxEmployeeCode.match(/[0-9]+$/)[0]) + 1)
            })
            
            EmployeeAction.getDataUpdate(this.employeeId)

        }
        if(this.typeForm ===typeButton.edit){
            EmployeeAction.getDataUpdate(this.employeeId)
            .then(
                res=>{
                    DepartmentAction.getDepartmentById(res.data.DepartmentID).then((res)=>{
                        this.dataEmp.departmentName = res.data.DepartmentName 
                        this.changeDataEmp.departmentName = res.data.DepartmentName
                    })
                    //object ban đầu hiển thị lên form update
                    this.dataEmp.employeeCode = res.data.EmployeeCode
                    this.dataEmp.employeeName = res.data.EmployeeName
                    this.dataEmp.gender = res.data.Gender
                    this.dataEmp.departmentId = res.data.DepartmentID
                    this.dataEmp.jobPosition = res.data.JobPositionName
                    this.dataEmp.dateOfBirth =this.convertDate(res.data.DateOfBirth);
                    this.dataEmp.identityNumber = res.data.IdentityNumber
                    this.dataEmp.identityDate = this.convertDate(res.data.IdentityIssueDate)
                    this.dataEmp.identityPlace = res.data.IdentityIssuePlace
                    this.dataEmp.address = res.data.Address
                    this.dataEmp.phoneNumber = res.data.PhoneNumber
                    this.dataEmp.telephoneNumber = res.data.TelephoneNumber
                    this.dataEmp.email = res.data.Email
                    this.dataEmp.bankAccountNumber = res.data.BankAccountNumber
                    this.dataEmp.bankName = res.data.BankName
                    this.dataEmp.bankBranchName = res.data.BankBranchName

                    //Lấy object dữ liệu data trước khi update
                    this.changeDataEmp.employeeCode = res.data.EmployeeCode
                    this.changeDataEmp.employeeName = res.data.EmployeeName
                    this.changeDataEmp.gender = res.data.Gender
                    this.changeDataEmp.departmentId = res.data.DepartmentID
                    this.changeDataEmp.jobPosition = res.data.JobPositionName
                    this.changeDataEmp.dateOfBirth =this.convertDate(res.data.DateOfBirth);
                    this.changeDataEmp.identityNumber = res.data.IdentityNumber
                    this.changeDataEmp.identityDate = this.convertDate(res.data.IdentityIssueDate)
                    this.changeDataEmp.identityPlace = res.data.IdentityIssuePlace
                    this.changeDataEmp.address = res.data.Address
                    this.changeDataEmp.phoneNumber = res.data.PhoneNumber
                    this.changeDataEmp.telephoneNumber = res.data.TelephoneNumber
                    this.changeDataEmp.email = res.data.Email
                    this.changeDataEmp.bankAccountNumber = res.data.BankAccountNumber
                    this.changeDataEmp.bankName = res.data.BankName
                    this.changeDataEmp.bankBranchName = res.data.BankBranchName
                }
            )
        }
    },
}
</script>

<style scoped>

@import url('../../style/components/DialogEmployee.css');
@import url('../../style/components/Checkbox.css');
</style>