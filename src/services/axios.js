import axios from "axios";

const axiosInstance = (token) => {
    return axios.create({
        headers: {
            Authorization: (token) ? 'Bearer ' + token : ''
        }
    })
}

export default axiosInstance