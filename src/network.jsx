import axios from "axios";

const network = axios.create({
    baseURL: ''
})

function register(email, name, password) {
    const form_data = new FormData()
    //ЧТО ЭТО
    form_data.set('email', email)

    form_data.set('email', email)
    form_data.set('email', email)

    axios.post()
}