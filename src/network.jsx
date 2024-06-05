import axios from "axios";
import { useSelector } from "react-redux";

const ax = axios.create({
    baseURL: '128.0.0.1:8000'
})

class Network {
    async get_all_group() {
        const response = await ax.get('/group_role/get_all_group')
        return response
    }
    async get_all_teachers() {
        const response = await ax.get('/group_role/get_all_teachers')
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
        const res = ax({
            method: 'post', url: 'auth/login', data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
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

    async update_lab_teacher(token, laboratory_id, name, url, deadline) {
        const res = ax({
            method: 'patch',
            url: '/laboratory/update_laboratory',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            params: {
                laboratory_id: laboratory_id
            },
            data: {
                name: name,
                url: url,
                deadline: deadline
            }
        })
        return res
    }
    async delete_lab_teacher(token, laboratory_id) {
        console.log(laboratory_id)
        const res = ax({
            method: 'delete',
            url: '/laboratory/delete_laboratory_by_id',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            params: {
                laboratory_id: laboratory_id
            }
        })
        return res
    }
    async add_lab_teacher(token, name, url, discipline_id, deadline) {
        const res = ax({
            method: 'post',
            url: '/laboratory/add_laboratory',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: {
                name: name,
                url: url,
                discipline_id: discipline_id,
                deadline: deadline
            }
        })
        return res
    }
    async delete_discipline_teacher(token, discipline_id) {
        const res = ax({
            method: 'delete',
            url: '/laboratory/delete_discipline_by_id',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            params: {
                discipline_id: discipline_id,
            }
        })
        return res
    }

    async get_all_subjects() {
        const res = ax({
            method: 'get',
            url: '/laboratory/get_all_subject',
        })
        return res
    }
    async update_discipline(token, discipline_id, group_id_list, teacher_id_list) {
        console.log([discipline_id, group_id_list, teacher_id_list])
        const res = ax({
            method: 'patch',
            url: '/laboratory/update_discipline_for_teacher/',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: {
                id: discipline_id,
                group_id_list: group_id_list,
                teacher_id_list: teacher_id_list,
            }
        })
        return res
    }
    async add_discipline_teacher(token, group_id_list, subject_id, teacher_id_list) {

        const res = ax({
            method: 'post',
            url: '/laboratory/add_full_discipline',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            data: {
                group_id_list: group_id_list,
                subject_id: subject_id,
                teacher_id_list: teacher_id_list,
            }
        })
        return res
    }


    async get_disciplines_student(token) {
        const res = ax({
            method: 'get',
            url: '/laboratory/get_full_discipline_for_student',
            headers: {
                'Authorization': 'Bearer ' + token
            },
        })
        return res
    }
    async get_discipline_student_info(token, discipline_id) {
        const res = ax({
            method: 'get',
            url: '/laboratory/get_full_laboratory_for_student',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            params: {
                id_discipline: discipline_id
            }
        })
        return res
    }

    async hotworks_get_data_teacher(token) {
        const res = ax({
            method: 'get',
            url: '/laboratory/get_full_laboratory_for_student',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            params: {
                id_discipline: discipline_id
            }
        })
        return res
    }

    async add_laboratory_student(token, id_lab, id_teacher, id_discipline, url) {

        const params = id_teacher != -1?{
            id_lab: id_lab,
            id_teacher: id_teacher,
            id_discipline: id_discipline,
            url: url
        }:{
            id_lab: id_lab,
            id_discipline: id_discipline,
            url: url
        }

        const res = ax({
            method: 'post',
            url: '/student_laboratory/add_student_laboratory',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            params: params
        })
        return res
    }

    async get_all_student_laboratory_for_teacher(token, is_personally, discipline_id = null, group_id = null) {
        console.log(is_personally)
        const res = ax({
            method: 'get',
            url: '/student_laboratory/get_all_student_laboratory_for_teacher',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            params: {
                is_personally: is_personally,
                discipline_id: discipline_id,
                group_id: group_id
            }
        })
        return res
    }
    async get_all_student_laboratory_for_student(token, discipline_id = null) {
        console.log([111, discipline_id])
        const res = ax({
            method: 'get',
            url: '/student_laboratory/get_all_student_laboratory_for_student',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            params: {
                discipline_id: discipline_id,
            }
        })
        return res
    }
    async accept_student_laboratory(token, student_laboratory_id) {
        const res = ax({
            method: 'patch',
            url: '/student_laboratory/accept_student_laboratory/',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            params: {
                student_laboratory_id: student_laboratory_id
            }
        })
        return res
    }
    async deny_student_laboratory(token, student_laboratory_id) {
        const res = ax({
            method: 'patch',
            url: '/student_laboratory/deny_student_laboratory/',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            params: {
                student_laboratory_id: student_laboratory_id
            }
        })
        return res
    }
    
    async repeat_student_laboratory(token, student_laboratory_id, url, id_teacher) {
        const params = id_teacher != -1?{
            student_laboratory_id: student_laboratory_id,
            id_teacher: id_teacher,
            url: url
        }:{
            student_laboratory_id: student_laboratory_id,
            // id_teacher: null,
            url: url
        }
        console.log(params)
        const res = ax({
            
            method: 'patch',
            url: '/student_laboratory/repeat_student_laboratory/',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            params: params
        })
        return res
    }
}

const network = new Network()

export default network