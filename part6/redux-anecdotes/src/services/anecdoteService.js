import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (data) => {
    const response = await axios.post(baseUrl, data)
    return response.data
}

export default { getAll, create }