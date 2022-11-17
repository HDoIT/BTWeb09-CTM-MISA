<template>
            <div class="dialog">
                <form>
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
                                        <input type="text" id="manv" name="manv" class="required" ref="manv"  v-model="dataEmp.manv">
                                        <div class="important field-error">Mã không được để trống!</div>
                                    </div>
                                    <div class="field field-60">
                                        <label for="tennv">Tên <span class="important">*</span></label>
                                        <input type="text" id="tennv" name="tennv" class="required" ref="tennv"  :value="dataEmp.tennv">
                                        <div class="important field-error">Tên không được để trống!</div>
                                    </div>
                                </div>
                                <div class="field">
                                    <label>Đơn vị <span class="important">*</span></label>
                                    <div class="combobox">
                                        <input type="text" name="tendv" class="input combobox__input input__employee" ref="tendv" :value="dataEmp.tendv">
                                        <button type="button" class="combobox__button cbb__form"><div class="mi mi-chevron-down"></div></button>
                                        <div class="combobox__data combobox__department">
                                            <!-- <div class="data-item">
                                                <input type="checkbox" name="" id="data-item-5">
                                                <label for="data-item-5">TCDN</label>
                                            </div>
                                            <div class="data-item">
                                                <input type="checkbox" name="" id="data-item-6">
                                                <label for="data-item-6">CTM</label>
                                            </div>
                                            <div class="data-item">
                                                <input type="checkbox" name="" id="data-item-7">
                                                <label for="data-item-7">ANC</label>
                                            </div>
                                            <div class="data-item">
                                                <input type="checkbox" name="" id="data-item-8">
                                                <label for="data-item-8">DDA</label>
                                            </div> -->
                                        </div>
                                    </div>
                                    <div class="important field-error">Đơn vị không được để trống!</div>
                                </div>
                                <div class="field">
                                    <label for="chucdanh">Chức danh</label>
                                    <input type="text" id="chucdanh" ref="chucdanh" :value="dataEmp.chucDanh"/>
                                </div>
                            </div>
                            <div class="col">
                                <div class="row-1-1">
                                    <div class="field field-40">
                                        <label for="ngaysinh">Ngày sinh</label>
                                        <input type="date" name="ngaysinh" id="ngaysinh" ref="ngaysinh" v-model="dataEmp.ngaySinh"/>
                                    </div>
                                    <div class="field field-60">
                                        <label>Giới tính</label>
                                        <div class="gender">
                                            <input type="radio" id="nam" name="gioitinh" value="1" v-model="checkGender">
                                            <label for="nam">Nam</label>
                                            <input type="radio" id="nu" name="gioitinh" value="0" v-model="checkGender" >
                                            <label for="nu">Nữ</label>
                                            <input type="radio" id="khac" name="gioitinh" value="2" v-model="checkGender" >
                                            <label for="khac">Khác</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-1-1">
                                    <div class="field field-60">
                                        <label for="cmnd">Số CMND</label>
                                        <input type="text" id="cmnd" ref="cmnd" :value="dataEmp.cccd">
                                    </div>
                                    <div class="field field-40">
                                        <label for="ngaycap">Ngày cấp</label>
                                        <input type="date" id="ngaycap" ref="ngaycap" :value="dataEmp.ngayCapCCCD">
                                    </div>  
                                </div>
                                <div class="field">
                                    <label for="noicap">Nơi cấp</label>
                                    <input type="text" id="noicap" ref="noicap" :value="dataEmp.noiCapCCCD">
                                </div>
                            </div>
                        </div>
                        <div class="row row-2">
                            <div class="field">
                                <label for="diachi">Địa chỉ</label>
                                <input type="text" id="diachi" ref="diachi" :value="dataEmp.diaChi">
                            </div>
                        </div>
                        <div class="row-3">
                            <div class="row-3-1">
                                <div class="field">
                                    <label for="didong">ĐT di động</label>
                                    <input type="text" id="didong" ref="didong" :value="dataEmp.dtDiDong">
                                </div> 
                                <div class="field">
                                    <label for="codinh">ĐT cố định</label>
                                    <input type="text" id="codinh" ref="codinh" :value="dataEmp.dtCoDinh">
                                </div> 
                                <div class="field">
                                    <label for="email">Email</label>
                                    <input type="text" id="email" ref="email" :value="dataEmp.email">
                                </div>
                            </div> 
                            <div class="row-3-1">
                                <div class="field">
                                    <label for="tknh">Tài khoản ngân hàng</label>
                                    <input type="text" id="tknh" ref="tknh" :value="dataEmp.tkNganHang">
                                </div> 
                                <div class="field">
                                    <label for="tennh">Tên ngân hàng</label>
                                    <input type="text" id="tennh" ref="tennh" :value="dataEmp.tenNganHang">
                                </div> 
                                <div class="field">
                                    <label for="chinhanh">Chi nhánh</label>
                                    <input type="text" id="chinhanh" ref="chinhanh" :value="dataEmp.chiNhanh">
                                </div> 
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="form__footer">
                        <span style="order: 2;">
                            <button id="btn__save" type="button" class="btn btn__white" @click="handelUpdate()">Cất</button>
                            <button id="btn__save__2" type="button" class="btn add__emp" @click="handelFocus()" >Cất và Thêm</button>
                        </span>
                        <button type="button" class="btn btn__white" style="order: 1;">Hủy</button>
                    </div>
                </form>
            </div>
</template>

<script>
import EmployeeAction from '../../action/EmployeeAction.js';
export default {
    props:{
        loadData: {
            type: Function
        },
        eData:{
            type: String
        },
        pageNumber:{
            type: Number
        },
        pageSize:{
            type: Number
        }
    },
    emits:["isActiveShowUpd","focusForm"],
    methods:{
        clearForm(){
            this.$refs.manv.value = "";
            this.$refs.tennv.value = "";
            this.$refs.tendv.value = "";
            this.$refs.chucdanh.value = "";
            this.$refs.ngaysinh.value = "";
            this.$refs.cmnd.value = "";
            this.$refs.ngaycap.value = "";
            this.$refs.noicap.value = "";
            this.$refs.diachi.value = "";
            this.$refs.didong.value = "";
            this.$refs.codinh.value = "";
            this.$refs.email.value = "";
            this.$refs.tknh.value = "";
            this.$refs.tennh.value = "";
            this.$refs.chinhanh.value = "";
        },
        handelClickCloseDialog(){
            this.isActiveDialogUpdate = false;
            this.$emit("isActiveShowUpd", this.isActiveDialogUpdate);
        },

        handelFocus(){
            this.$refs['manv'].focus();
        },
        
        handelUpdate(){
            alert(this.checkGender)
            var manv = this.$refs.manv.value
            var tennv = this.$refs.tennv.value
            // var tendv = this.$refs.tendv.value            
            var gender = Number(this.checkGender);
            let chucDanh = this.$refs.chucdanh.value
            let ngaySinh = this.$refs.ngaysinh.value
            // let dob = this.$refs.ngaysinh.value
            let cccd = this.$refs.cmnd.value
            let ngayCapCCCD = this.$refs.ngaycap.value
            let noiCapCCCD = this.$refs.noicap.value
            let diaChi = this.$refs.diachi.value
            let dtDiDong = this.$refs.didong.value
            let dtCoDinh = this.$refs.codinh.value
            let email = this.$refs.email.value
            let tkNganHang = this.$refs.tknh.value
            let tenNganHang =this.$refs.tennh.value
            let chiNhanh = this.$refs.chinhanh.value

            const formDataUpdate = {
                EmployeeCode: manv,
                EmployeeName: tennv,
                DepartmentId: "142cb08f-7c31-21fa-8e90-67245e8b283e",
                Gender: gender,
                PositionName: chucDanh,
                DateOfBirth: ngaySinh,
                IdentityNumber: cccd,
                IdentityDate: ngayCapCCCD,
                IdentityPlace: noiCapCCCD,
                PhoneNumber: dtDiDong,
                Email: email,
                Address: diaChi,
                TelephoneNumber: dtCoDinh,
                BankAccountNumber: tkNganHang,
                BankName: tenNganHang,
                BankBranchName: chiNhanh,
                
            }


            EmployeeAction.updateEmployee(this.eData,formDataUpdate).then(
                (res)=>{
                    console.log(res.data)
                    this.loadData(this.pageSize,this.pageNumber)
                    this.handelClickCloseDialog();
                }
            ).catch(e=>
                {
                    alert(e.response.data.userMsg);
                }
            );
        },

        async loadFormUpdate(){
            // this.$refs.manv.value = this.eData.EmployeeCode;
            // this.$refs.tennv.value = this.eData.EmployeeName;
            // this.$refs.tendv.value = this.eData.DepartmentName;
            // this.checkGender = this.eData.Gender;
            // this.$refs.chucdanh.value = this.eData.PositionName;
            // this.$refs.ngaysinh= this.eData.DateOfBirth;
            // this.$refs.cmnd.value = this.eData.IdentityNumber;
            // this.$refs.ngaycap.value = this.eData.IdentityDate;
            // this.$refs.noicap.value = this.eData.IdentityPlace;
            // this.$refs.diachi.value = this.eData.Address;
            // this.$refs.didong.value = this.eData.PhoneNumber;
            // this.$refs.codinh.value = this.eData.TelephoneNumber;
            // this.$refs.email.value = this.eData.Email;
            // this.$refs.tknh.value = this.eData.BankAccountNumber;
            // this.$refs.tennh.value = this.eData.BankName;
            // this.$refs.chinhanh.value = this.eData.BankBranchName;
            const id = this.eData;
            console.log(id);
            const res = await EmployeeAction.getDataUpdate(id)

            const contact = res.data;
            const id2 = contact.DepartmentId
            const res2 = await EmployeeAction.getDepartmentById(id2)
            const contactDp = res2.data

            this.dataEmp.manv = contact.EmployeeCode
            this.dataEmp.tennv = contact.EmployeeName
            this.dataEmp.iddv = contact.DepartmentId
            this.dataEmp.tendv = contactDp.DepartmentName
            this.dataEmp.gender = contact.Gender
            this.dataEmp.chucDanh = contact.PositionName
            this.dataEmp.ngaySinh = contact.DateOfBirth
            this.dataEmp.cccd = contact.IdentityNumber
            this.dataEmp.ngayCapCCCD = contact.IdentityDate
            this.dataEmp.noiCapCCCD = contact.IdentityPlace
            this.dataEmp.diaChi = contact.Address
            this.dataEmp.dtDiDong = contact.PhoneNumber
            this.dataEmp.dtCoDinh = contact.TelephoneNumber
            this.dataEmp.email = contact.Email
            this.dataEmp.tkNganHang = contact.BankAccountNumber
            this.dataEmp.tenNganHang = contact.BankName
            this.dataEmp.chiNhanh = contact.BankBranchName
            console.log(contact);
        },
    },
    data() {
        return {
            isActiveDialogUpdate: true,
            checkGender:1,
            dataEmp: {
                manv:'',
                tennv : '',
                iddv: '', 
                tendv:'',
                gender : '', 
                chucDanh : '', 
                ngaySinh : '', 
                cccd : '',
                ngayCapCCCD : '', 
                noiCapCCCD : '', 
                diaChi : '', 
                dtDiDong : '',
                dtCoDinh : '',
                email : '', 
                tkNganHang : '',
                tenNganHang : '',
                chiNhanh : '',
                },
        }
    },
    beforeUpdate() {
        this.loadFormUpdate()
    },
    updated() {
    },
}
</script>

<style scoped>

@import url('../../style/components/DialogEmployee.css');

</style>