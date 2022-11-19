<template>
    <div class="dialog__form">
            <div class="dialog">
                <form autocomplete="off">
                    <div class="form__header">
                        <div class="form__header--left">
                            <span class="title-form">Thông tin nhân viên</span>
                            <span class="checkbox-form">
                                <input type="checkbox" name="" id="khachhang">
                                <label for="khachhang">Là khách hàng</label>
                                <input type="checkbox" name="" id="nhacungcap">
                                <label for="nhacungcap">Là nhà cung cấp</label>
                            </span>
                        </div>
                        <div class="form__header--right">
                            <div class="mi mi-icon-help"></div>
                            <div class="mi mi-icon-times" @click="handelClickCloseDialog()"></div>
                        </div>
                    </div>
                    <div class="form__main">
                        <div class="row row-1">
                            <div class="col">
                                <div class="row-1-1">
                                    <div class="field field-40">
                                        <label for="manv">Mã <span class="important">*</span></label>
                                        <input type="text" id="manv" name="manv" :class="{required: validate.isEmployeeCode}"  ref="manv" v-model="dataEmp.employeeCode" @input="enterEmployeeCode">
                                        <div class="important field-error" v-if="validate.isEmployeeCode">Mã không được để trống!</div>
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
                                        <input type="text" name="tendv" :class="{required: validate.isDepartmentName}" class="input combobox__input input__employee" ref="tendv" :value="dataEmp.departmentName" @input="enterDepartmentName">
                                        <button type="button" class="combobox__button cbb__form" @click="handelClickToggleCombobox()"><div class="mi mi-chevron-down"></div></button>
                                            <div class="combobox__data combobox__form" v-bind:class="{active: isActiveCombobox}">
                                                <div class="data-item" v-for="(item, index) in listDepartment" :class="{active: isSelectNumberOfPage[index]}"  :key="index" @click="handelClickSelectDepartment(item.DepartmentName,index,item.DepartmentId)">
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
                                        <input type="date" name="ngaysinh" id="ngaysinh" v-model="dataEmp.dateOfBirth"/>
                                    </div>
                                    <div class="field field-60">
                                        <label>Giới tính</label>
                                        <div class="gender">
                                            <input type="radio" id="nam" name="gioitinh" value="1" v-model="dataEmp.gender" checked>
                                            <label for="nam">Nam</label>
                                            <input type="radio" id="nu" name="gioitinh" value="0" v-model="dataEmp.gender" >
                                            <label for="nu">Nữ</label>
                                            <input type="radio" id="khac" name="gioitinh" value="2" v-model="dataEmp.gender" >
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
                                        <input type="date" id="ngaycap" name="ngaycap" ref="ngaycap" v-model="dataEmp.identityDate">
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
                        <button type="button" class="btn btn__white" style="order: 1;">Hủy</button>
                    </div>
                </form>
            </div>
            <div class="alert__warning" v-show="isShowAlert">
                <alert-warning :closeAlert="showAlert" @showAlert="(c)=> isShowAlert = c">
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
        }
    },
    emits:["isActiveShow","focusForm"],
        data() {
        return {
            checkGender:1,
            textErr: '',
            isShowAlert: false,
            isActiveCombobox: false,
            cbbDepartment: '',
            isSelectNumberOfPage:[],
            idDepartment: '',
            departmentName:'',
            listDepartment:[],
            formatDate,
            dataEmp: {
                employeeCode:'',
                employeeName : '',
                departmentId: '', 
                departmentName:'',
                gender : 1, 
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
                isEmployeeName: false,
                isDepartmentName: false,
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
                this.validate.isDepartmentName = true
            }
            this.validate.isDepartmentName = false
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
         * Author: LHDO(19/11/2022)
         */
        showAlertWarning(text){
            this.isShowAlert = true;
            this.textErr = text;
        },

        /**
         * Xử lý submit form
         * Author: LHDO(19/11/2022)
         */
        addEmp(e){
            e.preventDefault();

            if(this.dataEmp.employeeCode == ''){
                // alert('MÃ nhân viên không được phép để trống')
                this.validate.isEmployeeCode = true
            }
            if(this.dataEmp.employeeName== '')
            {
                this.validate.isEmployeeName = true
            }
            if(this.dataEmp.departmentName == '')
            {
                this.validate.isDepartmentName = true
            }
            if(this.typeForm === "ADD"){
                EmployeeAction.createEmployee({...this.dataEmp})
                .then(res=>{
                    console.log(res);
                    this.handelClickCloseDialog();
                    this.loadData(this.employeeFilter,this.pageSize,this.pageNumber);
                }).catch(e=>
                {
                    console.log(e.response.data.userMsg);
                    this.showAlertWarning(e.response.data.userMsg)
                }
            );
            }
            if(this.typeForm === "EDIT"){
                EmployeeAction.updateEmployee(this.employeeId,{...this.dataEmp})
                .then(res=>{
                    console.log(res);
                    this.handelClickCloseDialog();
                    this.loadData(this.employeeFilter,this.pageSize,this.pageNumber);
                }).catch(e=>
                {
                    console.log(e.response.data.userMsg);
                    this.showAlertWarning(e.response.data.userMsg)
                }
            ); 
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

    //     
    //     addEmp(e){
    //         const formValues = this.getFormValues(e.target.elements);

    //         e.preventDefault();
    //         console.log('submitting form', formValues);

    //         const formData = {
    //             EmployeeCode: formValues.employeeCode,
    //             EmployeeName: formValues.employeeName,
    //             DepartmentId: this.idDepartment,
    //             Gender: this.checkGender,
    //             PositionId: formValues.jobPosition,
    //             DateOfBirth: formValues.dateOfBirth,
    //             IdentityNumber: formValues.cmnd,
    //             IdentityDate: formValues.ngaycap,
    //             IdentityPlace: formValues.noicap,
    //             PhoneNumber: formValues.didong,
    //             Email: formValues.email,
    //             Address: formValues.address,
    //             TelephoneNumber: formValues.codinh,
    //             BankAccountNumber: formValues.tknh,
    //             BankName: formValues.tennh,
    //             BankBranchName: formValues.bankBranchName,
                
    //         }
    //         EmployeeAction.createEmployee(formData).then(
    //             // eslint-disable-next-line no-unused-vars
    //             res=>{
    //                 this.loadData(this.pageSize,this.pageNumber);
    //                 this.handelClickCloseDialog();
    //             }
    //         ).catch(e=>
    //             {
    //                 console.log(e.response.data.userMsg);
    //                 this.showAlertWarning(e.response.data.userMsg)
    //             }
    //         )

    //     },
    //     getFormValues(elements) {
    //         // Get elements that have a "name" attr
    //         const formElems = Array.from(elements).filter(el => el.name);

    //         // Create dictionary of those elements' values
    //         const values = formElems.reduce((p,c) => {
    //             p[c.name] = c.value;
    //             return p;
    //         }, {});
    //         console.log(formElems);

    //         return values;
    //     },

    //     clearForm(){
                
    //     },
    //     handelClickCloseDialog(){
    //         this.$emit("handelClickCloseDialog");
    //     },

    //     handelFocus(){
    //     },

    //     // handelClickSelectPageSize(){
    //     //     this.isActiveCombobox = !this.isActiveCombobox
    //     //     alert(2)
    //     //     // this.loadDataWithPaging(this.pageSize,this.pageNumber);
    //     //     // for(let i = 0; i<this.listNumberOfPage.length; i++){
    //     //     //     this.isSelectNumberOfPage[i] = false
    //     //     // }
    //     //     // this.isSelectNumberOfPage[idx] = true;
    //     // },
    //     // loadFormUpdate(){
    //     //     this.$refs.employeeCode.value = this.eData.EmployeeCode;
    //     //     this.$refs.employeeName.value = this.eData.EmployeeName;
    //     //     this.$refs.departmentName.value = this.eData.DepartmentName;
    //     //     this.checkGender = this.eData.Gender;
    //     //     this.$refs.jobPosition.value = this.eData.PositionName;
    //     //     this.$refs.dateOfBirth.value = this.eData.EmployeeCode;
    //     //     this.$refs.cmnd.value = this.eData.IdentityNumber;
    //     //     this.$refs.ngaycap.value = this.eData.IdentityDate;
    //     //     this.$refs.noicap.value = this.eData.IdentityPlace;
    //     //     this.$refs.address.value = this.eData.Address;
    //     //     this.$refs.didong.value = this.eData.PhoneNumber;
    //     //     this.$refs.codinh.value = this.eData.TelephoneNumber;
    //     //     this.$refs.email.value = this.eData.Email;
    //     //     this.$refs.tknh.value = this.eData.BankAccountNumber;
    //     //     this.$refs.tennh.value = this.eData.BankName;
    //     //     this.$refs.bankBranchName.value = this.eData.BankBranchName;
    //     // },

    //     // handelClickUpdateEmployee(){
    //     //     alert(this.checkGender)
    //     //     var employeeCode = this.$refs.employeeCode.value
    //     //     var employeeName = this.$refs.employeeName.value
    //     //     // var departmentName = this.$refs.departmentName.value            
    //     //     var gender = Number(this.checkGender);
    //     //     let jobPosition = this.$refs.jobPosition.value
    //     //     let dateOfBirth = this.$refs.dateOfBirth.value
    //     //     // let dob = this.$refs.dateOfBirth.value
    //     //     let cccd = this.$refs.cmnd.value
    //     //     let identityDate = this.$refs.ngaycap.value
    //     //     let identityPlace = this.$refs.noicap.value
    //     //     let address = this.$refs.address.value
    //     //     let phoneNumber = this.$refs.didong.value
    //     //     let telephoneNumber = this.$refs.codinh.value
    //     //     let email = this.$refs.email.value
    //     //     let bankAccountNumber = this.$refs.tknh.value
    //     //     let bankName =this.$refs.tennh.value
    //     //     let bankBranchName = this.$refs.bankBranchName.value

    //     //     const formDataUpdate = {
    //     //         EmployeeCode: employeeCode,
    //     //         EmployeeName: employeeName,
    //     //         DepartmentId: "142cb08f-7c31-21fa-8e90-67245e8b283e",
    //     //         Gender: gender,
    //     //         PositionName: jobPosition,
    //     //         DateOfBirth: dateOfBirth,
    //     //         IdentityNumber: cccd,
    //     //         IdentityDate: identityDate,
    //     //         IdentityPlace: identityPlace,
    //     //         PhoneNumber: phoneNumber,
    //     //         Email: email,
    //     //         Address: address,
    //     //         TelephoneNumber: telephoneNumber,
    //     //         BankAccountNumber: bankAccountNumber,
    //     //         BankName: bankName,
    //     //         BankBranchName: bankBranchName,
                
    //     //     }


    //     //     EmployeeAction.updateEmployee(this.eData,formDataUpdate).then(
    //     //         (res)=>{
    //     //             console.log(res.data)
    //     //             this.loadData(this.pageSize,this.pageNumber)
    //     //             this.handelClickCloseDialog();
    //     //         }
    //     //     ).catch(e=>
    //     //         {
    //     //             alert(e.response.data.userMsg);
    //     //         }
    //     //     );
    //     // },
    //     showAlertWarning(text){
    //         this.isShowAlert = true;
    //         this.textErr = text;
    //     },
    //     formatDateInput(){

    //     },
    //     async loadFormUpdate(){

    //             this.$refs['employeeCode'].focus();
    //             const id = this.eData;
    //             console.log(id);
    //             const res = await EmployeeAction.getDataUpdate(id)

    //             const contact = res.data;
    //             const id2 = contact.DepartmentId
    //             const res2 = await EmployeeAction.getDepartmentById(id2)
    //             const contactDp = res2.data

    //             this.dataEmp.employeeCode = contact.EmployeeCode
    //             this.dataEmp.employeeName = contact.EmployeeName
    //             this.dataEmp.departmentId = contact.DepartmentId
    //             this.dataEmp.departmentName = contactDp.DepartmentName
    //             this.dataEmp.gender = contact.Gender
    //             this.dataEmp.jobPosition = contact.PositionName
    //             this.dataEmp.dateOfBirth = contact.DateOfBirth
    //             this.dataEmp.cccd = contact.IdentityNumber
    //             this.dataEmp.identityDate = contact.IdentityDate
    //             this.dataEmp.identityPlace = contact.IdentityPlace
    //             this.dataEmp.address = contact.Address
    //             this.dataEmp.phoneNumber = contact.PhoneNumber
    //             this.dataEmp.telephoneNumber = contact.TelephoneNumber
    //             this.dataEmp.email = contact.Email
    //             this.dataEmp.bankAccountNumber = contact.BankAccountNumber
    //             this.dataEmp.bankName = contact.BankName
    //             this.dataEmp.bankBranchName = contact.BankBranchName
    //             console.log(contact);
    //     },
    // },

    mounted(){
        this.$refs.manv.focus();
    },

    created() {

        //select active combobox mặc định
        this.isSelectNumberOfPage[0] = true;
        
        //Lấy danh sách bản ghi phòng ban
        DepartmentAction.getDepartment()
            .then(res=>{  
                this.listDepartment = [...res.data]
                console.log(res.data);
        })

        //Hiển thị thông tin dữ liệu của nhân viên cần update theo ID
        if(this.typeForm==="ADD"){
            EmployeeAction.getDataUpdate(this.employeeId)
            this.dataEmp.employeeCode ="NV"+Math.round(Math.random()*100000);
        }
        if(this.typeForm ==="EDIT"){
            EmployeeAction.getDataUpdate(this.employeeId)
            .then(
                res=>{
                    DepartmentAction.getDepartmentById(res.data.DepartmentId).then(res=>{
                        console.log(res);
                        this.dataEmp.departmentName = res.data.DepartmentName
                        this.dataEmp.departmentId = res.data.DepartmentId
                    })
                    this.dataEmp.employeeCode = res.data.EmployeeCode
                    this.dataEmp.employeeName = res.data.EmployeeName
                    this.dataEmp.gender = res.data.Gender
                    this.dataEmp.jobPosition = res.data.PositionName
                    this.dataEmp.dateOfBirth =this.convertDate(res.data.DateOfBirth);
                    this.dataEmp.identityNumber = res.data.IdentityNumber
                    this.dataEmp.identityDate = this.convertDate(res.data.IdentityDate)
                    this.dataEmp.identityPlace = res.data.IdentityPlace
                    this.dataEmp.address = res.data.Address
                    this.dataEmp.phoneNumber = res.data.PhoneNumber
                    this.dataEmp.telephoneNumber = res.data.TelephoneNumber
                    this.dataEmp.email = res.data.Email
                    this.dataEmp.bankAccountNumber = res.data.BankAccountNumber
                    this.dataEmp.bankName = res.data.BankName
                    this.dataEmp.bankBranchName = res.data.BankBranchName
                }
            )
        }
    },
}
</script>

<style scoped>

@import url('../../style/components/DialogEmployee.css');
.alert__warning{
    position: absolute;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    background:rgba(0,0,0,.4);
}
.cbb__form{
    background-color: transparent;
}
</style>