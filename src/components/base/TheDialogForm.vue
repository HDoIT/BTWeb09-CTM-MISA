<template>
    <div class="dialog__form">
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
                            <div class="mi mi-icon-times" @click="handelClose()" ></div>
                        </div>
                    </div>
                    <div class="form__main">
                        <div class="row row-1">
                            <div class="col">
                                <div class="row-1-1">
                                    <div class="field field-40">
                                        <label for="manv">Mã <span class="important">*</span></label>
                                        <input type="text" id="manv" name="manv" maxlength="20" :class="{required: validate.isEmployeeCode}"  ref="manv" v-model="dataEmp.employeeCode" @input="enterEmployeeCode">
                                        <div class="important field-error" v-if="validate.isEmployeeCode">{{validate.errorCode}}</div>
                                        <!-- <text-input-group
                                            id="tennv"
                                            text="Mã"
                                            ref="manv"
                                            :vIf="validate.isEmployeeCode"
                                            error="Mã không được để trống!"
                                        ></text-input-group> -->
                                    </div>

                                    <div class="field field-60">
                                        <label for="tennv">Tên <span class="important">*</span></label>
                                        <input type="text" id="tennv" name="tennv" :class="{required: validate.isEmployeeName}"  ref="tennv" v-model="dataEmp.employeeName" @input="enterEmployeeName">
                                        <div class="important field-error" v-if="validate.isEmployeeName">Tên không được để trống!</div>
                                    </div>
                                </div>
                                <div class="field">
                                    <label>Đơn vị <span class="important">*</span></label>
                                    <div class="combobox">
                                        <input type="text" name="tendv" :class="{required: validate.isDepartmentName,active: isActiveCombobox}" class="input combobox__input input__employee" ref="tendv" :value="dataEmp.departmentName" @input="enterDepartmentName">
                                        <button type="button" class="combobox__button cbb__form" :class="{active: isActiveCombobox}" @click="handelClickToggleCombobox()"><div class="mi mi-chevron-down"></div></button>
                                            <div class="combobox__data combobox__form" v-bind:class="{active: isActiveCombobox}">
                                                <div class="data-item" v-for="(item, index) in listDepartment" :class="{active: isSelectNumberOfPage[index]}"  :key="index" @click="handelClickSelectDepartment(item.DepartmentName,index,item.DepartmentID)">
                                                    <label for="data-item-1">{{item.DepartmentName}}</label>
                                                </div>
                                            </div>
                                        <div class="important field-error" v-if="validate.isDepartmentName">Đơn vị không được để trống!</div>
                                    </div>
                                </div>
                                <div class="field">
                                    <label for="chucdanh">Chức danh</label>
                                    <input type="text" name="chucdanh" id="chucdanh" ref="chucdanh" v-model="dataEmp.jobPosition" /> 
                                </div>
                            </div>
                            <div class="col">
                                <div class="row-1-1">
                                    <div class="field field-40">
                                        <label for="ngaysinh">Ngày sinh</label>
                                        <input type="date" name="ngaysinh" id="ngaysinh" v-model="dataEmp.dateOfBirth" :class="{required: validate.isDateOfBirth}" />
                                        <div class="important field-error" v-if="validate.isDateOfBirth">Ngày không lớn hơn ngày hiện tại!</div>
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
                                        <input type="text" id="cmnd" name="cmnd" ref="cmnd" v-model="dataEmp.identityNumber">
                                    </div>
                                    <div class="field field-40">
                                        <label for="ngaycap">Ngày cấp</label>
                                        <input type="date" id="ngaycap" name="ngaycap" ref="ngaycap" v-model="dataEmp.identityDate" :class="{required: validate.isIdentityDate}">
                                        <div class="important field-error" v-if="validate.isIdentityDate">Ngày không lớn hơn ngày hiện tại!</div>
                                    </div>  
                                </div>
                                <div class="field">
                                    <label for="noicap">Nơi cấp</label>
                                    <input type="text" id="noicap" name="noicap" ref="noicap" v-model="dataEmp.identityPlace"> 
                                </div>
                            </div>
                        </div>
                        <div class="row row-2">
                            <div class="field">
                                <label for="diachi">Địa chỉ</label>
                                <input type="text" name="diachi" id="diachi" ref="diachi" v-model="dataEmp.address">
                            </div>
                        </div>
                        <div class="row-3">
                            <div class="row-3-1">
                                <div class="field">
                                    <label for="didong">ĐT di động</label>
                                    <input type="text" name="didong" id="didong" ref="didong" v-model="dataEmp.phoneNumber">
                                </div> 
                                <div class="field">
                                    <label for="codinh">ĐT cố định</label>
                                    <input type="text" name="codinh" id="codinh" ref="codinh" v-model="dataEmp.telephoneNumber">
                                </div> 
                                <div class="field">
                                    <label for="email">Email</label>
                                    <input type="text" name="email" id="email" ref="email" v-model="dataEmp.email">
                                </div>
                            </div> 
                            <div class="row-3-1">
                                <div class="field">
                                    <label for="tknh">Tài khoản ngân hàng</label>
                                    <input type="text" name="tknh" id="tknh" ref="tknh" v-model="dataEmp.bankAccountNumber">
                                </div> 
                                <div class="field">
                                    <label for="tennh">Tên ngân hàng</label>
                                    <input type="text" name="tennh" id="tennh" ref="tennh" v-model="dataEmp.bankName">
                                </div> 
                                <div class="field">
                                    <label for="chinhanh">Chi nhánh</label>
                                    <input type="text" name="chinhanh" id="chinhanh" ref="chinhanh" v-model="dataEmp.bankBranchName">
                                </div> 
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="form__footer">
                        <span style="order: 2;">
                            <button id="btn__save" type="sumit" class="btn btn__white" @click="addEmp">Cất</button>
                            <button id="btn__save__2" type="button" class="btn add__emp" @click="handelClickSaveAndAdd" >Cất và Thêm</button>
                        </span>
                        <button type="button" class="btn btn__white" style="order: 1;" @click="handelClickCloseDialog()">Hủy</button>
                    </div>
                </form>
            </div>
            <div class="alert__warning" v-if="isShowAlert">
                <alert-warning 
                    @showAlert="(c)=> isShowAlert = c"
                    :isAlertNull="isAlertNull"
                    :isAlertWarning="isAlertWarning"
                    :isQuestion="isQuestion"
                    :closeForm="handelClickCloseDialog"
                    :saveUpdate="typeForm=='EDIT' ? updateForm : saveForm"
                    >
                    {{textErr}}
                </alert-warning>
            </div>
    </div>
</template>

<script>
import EmployeeAction from '../../action/EmployeeAction.js';
import DepartmentAction from '../../action/DepartmentAction.js';
import AlertWarning from '../base/alert/AlertWarning.vue';
import moment from 'moment';
import formatDate from '../../untils/formatDate';
export default {
    components: { AlertWarning },
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
    emits:[],
        data() {
        return {
            isAlertNull: false,
            isAlertWarning: false,
            isQuestion: false,
            textErr: '',
            isShowAlert: false,
            isActiveCombobox: false,
            isSelectNumberOfPage:[],
            listDepartment:[],
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
            setTimeout(() => {
                this.addEmp(e);
            }, 1000);
            setTimeout(() => {
                this.handelClickOpenDialog();
            }, 3000);
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


        isInputValidateEmployee(){
            var isValid = true
            // eslint-disable-next-line no-useless-escape
            if(this.dataEmp.departmentName.trim() == '' || this.dataEmp.departmentName==null)
            {
                this.validate.isDepartmentName = true
                this.$refs.tendv.focus()
                this.showAlertWarning("Tên đơn vị không được để trống!",this.validate.isDepartmentName)
            }
            if(this.dataEmp.employeeName.trim() == '' || this.dataEmp.employeeName.trim() === '' || this.dataEmp.employeeName == null)
            {
                this.validate.isEmployeeName = true
                this.$refs.tennv.focus()
                this.showAlertWarning("Tên nhân viên không được để trống!",this.validate.isEmployeeName)
            }
            if(this.dataEmp.employeeCode.trim() == ''){
                // alert('MÃ nhân viên không được phép để trống')
                this.validate.isEmployeeCode = true
                this.$refs.manv.focus()
                this.validate.errorCode = "Mã không được để trống!"
                this.showAlertWarning("Mã nhân viên không được để trống!",this.validate.isEmployeeCode)
                return isValid = false  
            }

            return isValid;
        },

        isValidateDate(){
            // console.log(birthday.val());
            var isValidDate = true;
            var dob =new Date(this.dataEmp.dateOfBirth);
            var dateCr = new Date();

            var month = dob.getMonth() + 1;
            var day   = dob.getDate();  
            var year  = dob.getFullYear();
            console.log(dateCr.getFullYear(),dateCr.getDate(),dateCr.getMonth() + 1,month,day,year);
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

        saveForm(){
            this.isQuestion = false;

            if(this.isInputValidateEmployee()){
                if(this.isValidateDate()){
                    EmployeeAction.createEmployee({...this.dataEmp})
                        .then(()=>{
                            this.handelClickCloseDialog();
                            this.loadData(this.employeeFilter,this.pageSize,this.pageNumber);
                            
                        })
                        .catch((e)=>
                        {
                            if(this.dataEmp.departmentName != null && this.dataEmp.departmentName.trim()!= '' && this.dataEmp.employeeName.trim() != '' && this.dataEmp.employeeCode.trim() != '')
                            {
                                this.validate.isEmployeeCode=true;
                                this.validate.errorCode = "Mã đã tồn tại trong hệ thống!"
                                this.showAlertWarning(e.response.data.UserMsg,false);
                            }
                        }
                    )
                }
                else{
                    this.validate.isDateOfBirth=true;
                    this.showAlertWarning("Ngày sinh không được lớn hơn ngày hiện tại",false)
                }
            }
            
        },
        handelClose(){
            if(this.typeForm=="ADD"){
            this.isQuestion = true;
            this.showAlertWarning("Dữ liệu đã bị thay đổi. Bạn có muốn cất không?")
            }
            if(this.typeForm=="EDIT"){
                console.log(JSON.stringify(this.changeDataEmp)===JSON.stringify(this.dataEmp));
                if(JSON.stringify(this.changeDataEmp)===JSON.stringify(this.dataEmp))
                {
                    this.handelClickCloseDialog();
                    this.isQuestion = false;
                }
                else{
                    this.isQuestion = true;
                    this.showAlertWarning("Dữ liệu đã bị thay đổi. Bạn có muốn cất không?")
                }
            }
            
        },

        updateForm(){
            this.isQuestion = false;
            if(this.isInputValidateEmployee()){              
                if(this.isValidateDate()){
                    EmployeeAction.updateEmployee(this.employeeId,{...this.dataEmp})
                    .then(()=>{
                                this.handelClickCloseDialog();
                                this.loadData(this.employeeFilter,this.pageSize,this.pageNumber);
                            
                    }).catch((e)=>
                    {
                        if(this.dataEmp.departmentName != null && this.dataEmp.employeeName != '' && this.dataEmp.employeeCode != '')
                        {

                            this.validate.isEmployeeCode=true;
                            this.validate.errorCode = "Mã đã tồn tại trong hệ thống!"
                            this.showAlertWarning(e.response.data.UserMsg,false);
                        }
                    })
                }
                else{
                    this.validate.isDateOfBirth=true;
                    this.showAlertWarning("Ngày sinh không được lớn hơn ngày hiện tại",false)
                }
            }
                // if(!Number.isInteger(Number(manv.split('').at(-1)))){
                //     this.showAlertWarning("Mã nhân viên phải kết thúc bằng số",false)
                // }
                // else if(format.test(manv)){
                //     this.showAlertWarning("Mã nhân viên không được chứa ký tự đặc biệt!",false)
                // }
                // else if(manv.length>10){
                //     this.showAlertWarning("Mã nhân viên không lớn hơn 10 ký tự",false)
                // }else{
                    
                // }
                
            
        },
        /**
         * Xử lý submit form
         * Author: LHDO(19/11/2022)
         */
        addEmp(e){
            e.preventDefault();

                this.isInputValidateEmployee();
                if(this.typeForm === "ADD"){                    
                    this.saveForm();
                }
                if(this.typeForm === "EDIT"){
                    this.updateForm();
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
                console.log(res.data);
        })

        //Hiển thị thông tin dữ liệu của nhân viên cần update theo ID
        if(this.typeForm==="ADD"){
            EmployeeAction.getMax().then((res)=>{
                this.dataEmp.employeeCode = "NV-"+(Number(res.data[0].MaxEmployeeCode.match(/[0-9]+$/)[0]) + 1)
            })
            
            EmployeeAction.getDataUpdate(this.employeeId)

        }
        if(this.typeForm ==="EDIT"){
            EmployeeAction.getDataUpdate(this.employeeId)
            .then(
                res=>{
                    DepartmentAction.getDepartmentById(res.data.DepartmentID).then((res)=>{
                        this.dataEmp.departmentName = res.data.DepartmentName 
                        this.changeDataEmp.departmentName = res.data.DepartmentName
                    })
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

                    console.log("dt",JSON.stringify(this.dataEmp));
                    console.log(JSON.stringify(this.changeDataEmp));
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