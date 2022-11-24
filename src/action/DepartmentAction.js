import axios from "axios";

class DepartmentAction{

    getDepartment(){
        return axios.get(`http://localhost:5080/api/v1/Departments`)
    }

    getDepartmentById(id){
        return axios.get(`http://localhost:5080/api/v1/Departments/${id}`)
    }

}

export default new DepartmentAction();