const listNumberOfPage = [
    {
        value: 10
    },
    {
        value: 20
    },
    {
        value: 30
    },
    {
        value: 50
    },
    {
        value: 100
    }
]
export {listNumberOfPage};

const listErrorValidate = {
    errorEmployeeCodeNull:"Mã không được để trống!",
    errorEmployeeNameNull:"Tên không được để trống!",
    errorDepartmentNull:"Đơn vị không được để trống!",
    errorEmployeeCodeDuplicated:"Mã đã tồn tại trong hệ thống!",
    errorDateOfBirth: "Ngày sinh không lớn hơn ngày hiện tại!",
    errorIdentityDate: "Ngày cấp không lớn hơn ngày hiện tại!",
}
export {listErrorValidate}

const typeButton = {
    deleteMultiple:"DELETEMULTIPLE",
    deleteOneRecord: "DELETEONE",
    delete:"DELETE",
    add:"ADD",
    edit:"EDIT",
    load:"LOAD"
}
export {typeButton}

const listThTableEmployee=[
    {
        nameTh:"Mã nhân viên",
        title:"",
        nameData:"EmployeeCode"
    },
    {
        nameTh : 'Tên nhân viên',
        title:"",
        nameData:"EmployeeName"
    },
    {
        nameTh : 'Giới tính',
        title:"",
        nameData:"GenderName"
    },
    {
        nameTh : 'Ngày sinh', 
        title:"",
        nameData:"DateOfBirth"
    },
    {
        nameTh : 'Số CMND',
        title:"Số chứng minh nhân dân",
        nameData:"IdentityNumber"
    },
    {
        nameTh : 'Chức danh', 
        title:"",
        nameData:"JobPositionName"
    },
    {
        nameTh:'Tên đơn vị',
        title:"",
        nameData:"DepartmentName"
    },
    {
        nameTh : 'Số tài khoản',
        title:"",
        nameData:"BankAccountNumber"
    },
    {
        nameTh : 'Tên ngân hàng',
        title:"",
        nameData:"BankName"
    },
    {
        nameTh : 'Chi nhánh ngân hàng',
        title:"",
        nameData:"BankBranchName"
    }
]

export {listThTableEmployee}

const listToastMessage={
    messageAdd: "Thêm mới nhân viên thành công.",
    messageUpdate: "Cập nhập nhân viên thành công.",
    messageDelete: "Xóa nhân viên thành công."
}
export{listToastMessage}

const alertMessage={
    alertChangeData:"Dữ liệu đã bị thay đổi. Bạn có muốn cất không?"
}
export{alertMessage}