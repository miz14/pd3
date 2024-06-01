import axios from "axios";
import { useSelector } from "react-redux";

const ax = axios.create({
    baseURL: 'secret'
})

class Network {
    async get_all_group() {
        const response = await ax.get('/group_role/get_all_group')
        return response
    }
    async register(data) {
        
        const response = await ax({
            method: 'post',
            url: '/auth/register',
            data: data,
        })
        return response
    }

    async login(data) {
        const formData = new FormData();
        formData.set('username', data["username"]);
        formData.set('password', data["password"]);
        const res = ax({ method: 'post', url: 'auth/login', data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        }})
        return res
    }
    async get_my_data(token) {
        console.log(token)
        const res = ax({
            method: 'get',
            url: '/users/me',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            // data: {"token" : token}
        })
        return res
    }

    async get_disciplines_teacher(token) {
        const res = ax({
            method: 'get',
            url: '/laboratory/get_full_discipline_for_teacher',
            headers: {
                'Authorization': 'Bearer ' + token
            },
        })
        return res
    }
    async get_disciplines_teacher_info(token, discipline_id) {
        console.log([discipline_id])
        const res = ax({
            method: 'get',
            url: '/laboratory/info_discipline_by_id',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            params: {
                discipline_id: discipline_id
            }
        })
        return res
    }
}

const network = new Network()

export default network