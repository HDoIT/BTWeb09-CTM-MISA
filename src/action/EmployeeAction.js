import axios from "axios";

class EmployeeAction{

    getAll(){
        return axios.get('http://localhost:5080/api/v1/Employees')
    }

    getMax(){
        return axios.get('http://localhost:5080/api/v1/Employees/MaxEmployeeCode')
    }

    getAllPaging(filter,pageSize,pageNumber){
        return axios.get(`http://localhost:5080/api/v1/Employees/filter?keyword=${filter}&sortColumn=EmployeeCode&sortOrder=DESC&limit=${pageSize}&pageNumber=${pageNumber}`)
    }

    createEmployee(postData){
        return axios.post('http://localhost:5080/api/v1/Employees',postData)
    }

    deleteEmployee(id){
        return axios.delete(`http://localhost:5080/api/v1/Employees/${id}`)
    }

    deleteMultipleEmployee(listID){
        return axios.post('http://localhost:5080/api/v1/Employees/deletebatch',listID)
    }

    updateEmployee(id,postData){
        return axios.put(`http://localhost:5080/api/v1/Employees/${id}`,postData)
    }

    getDataUpdate(id){
        return axios.get(`http://localhost:5080/api/v1/Employees/${id}`)
    }

}

export default new EmployeeAction();