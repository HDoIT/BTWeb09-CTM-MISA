import axios from "axios";

class DepartmentAction{

    getDepartment(){
        return axios.get(`https://amis.manhnv.net/api/v1/Departments`)
    }

    getDepartmentById(id){
        return axios.get(`https://amis.manhnv.net/api/v1/Departments/${id}`)
    }

}

export default new DepartmentAction();