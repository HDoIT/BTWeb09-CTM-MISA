import axios from "axios";

class EmployeeAction{

    getAll(){
        return axios.get('https://amis.manhnv.net/api/v1/Employees/filter')
    }

    getAllPaging(filter,pageSize,pageNumber){
        return axios.get(`https://amis.manhnv.net/api/v1/Employees/filter?pageSize=${pageSize}&pageNumber=${pageNumber}&employeeFilter=${filter}`)
    }

    createEmployee(postData){
        return axios.post('https://amis.manhnv.net/api/v1/Employees',postData)
    }

    deleteEmployee(id){
        return axios.delete(`https://amis.manhnv.net/api/v1/Employees/${id}`)
    }

    updateEmployee(id,postData){
        return axios.put(`https://amis.manhnv.net/api/v1/Employees/${id}`,postData)
    }

    getDataUpdate(id){
        return axios.get(`https://amis.manhnv.net/api/v1/Employees/${id}`)
    }

    getDepartment(){
        return axios.get(`https://amis.manhnv.net/api/v1/Departments`)
    }

    getDepartmentById(id){
        return axios.get(`https://amis.manhnv.net/api/v1/Departments/${id}`)
    }

}

export default new EmployeeAction();